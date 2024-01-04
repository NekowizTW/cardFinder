import { Copy, ScreenShare } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toPng } from 'html-to-image';

import { SetLeaderEXData, SetTeamSlotData, UpdateCalculation } from '../../actions/teamActions';
import useOnScreenShotMode from '../../hooks/useOnScreenShotMode';

import LeaderEXRow from './LeaderEXRow';
import TeamSlotRow from './SlotDataRow';
import { encode } from './utils';

const getPagePrefix = () => {
  const lstSlash = window.location.href.lastIndexOf('team') + 4;
  return window.location.href.substring(0, lstSlash);
};

export default function Builder() {
  const [dismiss, setDismiss] = React.useState(false);
  const dispatch = useDispatch();
  const captureRef = React.useRef(null);
  const {
    leaderEX, teamSlot, helperSlot, isCalculated, calculated, errorSenzai,
  } = useSelector((state) => state.team);
  const [teamUrl, setTeamUrl] = React.useState(encode({ leaderEX, teamSlot, helperSlot }));
  const [copyStatus, setCopyStatus] = React.useState(false);
  const { isEnabled, toggle } = useOnScreenShotMode();

  const teamFullUrl = React.useMemo(() => `${getPagePrefix()}/${teamUrl}`, [teamUrl]);
  const reportLink = 'https://docs.google.com/forms/d/e/1FAIpQLSee_Qv-mXFiYq5T3eFhjRR4zU21ut9FUKGLU4ud53RJv0aSgw/viewform?usp=pp_url'
    + `&entry.1990257246=使用隊伍搜尋器計算潛能時發生問題，潛能列表如下：%0A${errorSenzai.join('%0A')}`
    + `&entry.1921144916=${encodeURIComponent(teamFullUrl)}`;

  const handleScreenShot = () => {
    toggle();
    toPng(captureRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Team${encode({ leaderEX, teamSlot, helperSlot })}.png`;
        link.href = dataUrl;
        link.click();
        toggle();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(teamFullUrl);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 500);
  };

  const handleChangeLeaderEX = (newValue) => dispatch(SetLeaderEXData({ leaderEX: newValue }));

  const handleChangeSlotData = (newValue) => dispatch(SetTeamSlotData({
    index: newValue.idx, slotData: newValue,
  }));

  React.useEffect(() => {
    setTeamUrl(encode({ leaderEX, teamSlot, helperSlot }));
  }, [helperSlot, leaderEX, teamSlot]);

  React.useEffect(() => {
    if (!isCalculated) {
      setDismiss(false);
      dispatch(UpdateCalculation({ team: [...teamSlot, helperSlot] }));
    }
  }, [dispatch, helperSlot, isCalculated, teamSlot]);

  return (
    <>
      <div className="pure-form">
        <h4>分享組隊成果</h4>
        <input
          type="text"
          value={teamFullUrl}
          readOnly
          style={{ width: '100%' }}
        />
        <div className="button-group">
          <button
            type="button"
            className={`pure-button ${copyStatus ? 'button-success' : ''}`}
            onClick={handleCopyUrl}
            disabled={copyStatus}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Copy size={16} />
            {copyStatus ? '已複製' : '複製網址'}
          </button>
          <button
            type="button"
            className="pure-button"
            onClick={handleScreenShot}
            disabled={isEnabled}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <ScreenShare size={16} />
            {isEnabled ? '生成中' : '下載截圖'}
          </button>
        </div>
      </div>
      {errorSenzai.length !== 0 && !dismiss && (
      <div className="alert">
        <button
          type="button"
          className="closebtn"
          onClick={() => setDismiss(true)}
          style={{ background: 'none', border: 'none' }}
        >
          &times;
        </button>
        以下潛能在計算期間出現問題，隊伍部份數值可能不正確。
        <a href={reportLink} target="_blank" rel="noreferrer">點此回報</a>
        <ol>
          {errorSenzai.map((name) => <li>{name}</li>)}
        </ol>
      </div>
      )}
      <div
        ref={captureRef}
        style={{
          backgroundColor: isEnabled ? '#fafafa' : 'inherit',
          width: isEnabled ? '800px' : 'auto',
        }}
      >
        <div>
          <h4>隊伍內容</h4>
          <div className="">
            {[...teamSlot, helperSlot]
              .map((slot, idx) => ({ ...slot, idx }))
              .map((slotData) => (
                <TeamSlotRow
                  key={`team-${slotData.idx}`}
                  slotData={slotData}
                  onChange={handleChangeSlotData}
                  senzaiSummand={calculated[slotData.idx]}
                />
              ))}
          </div>
        </div>
        <div>
          <h4>大結晶</h4>
          <div className="cardItem teamItem pure-g">
            <LeaderEXRow leaderEX={leaderEX} onChange={handleChangeLeaderEX} />
          </div>
        </div>
      </div>
    </>
  );
}
