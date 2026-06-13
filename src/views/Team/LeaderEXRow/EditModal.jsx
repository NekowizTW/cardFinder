import React from 'react';

import PropTypes from 'prop-types';

import {
  CustomModal, CustomTablePagination, SearchBar, WikiImage,
} from '../../../components';
import useGetLeaderExCard from '../../../hooks/useGetLeaderExCard';
import useGetLeaderExCards from '../../../hooks/useGetLeaderExCards';

const PAGING_OPTIONS = [
  6, 12, 48, 100,
];

export default function EditModal({
  leaderEX, open, onSave, onClose,
}) {
  const [selected, setSelected] = React.useState(leaderEX);
  const currentLeaderEX = useGetLeaderExCard(selected);
  const { leaderEXCards, triggerFilter } = useGetLeaderExCards();
  const [paging, setPaging] = React.useState(6);
  const [pageNum, setPageNum] = React.useState(0);

  const options = React.useMemo(
    () => leaderEXCards.reduce((acc, [, leaderEXs]) => {
      acc.push(
        ...leaderEXs.map((leader) => ({
          value: `${leader.name}${leader.rank}`,
          ...leader,
        })),
      );

      return acc;
    }, []),
    [leaderEXCards],
  );

  const totalCount = options.length;
  const slicedOptions = options.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (value) => {
    setPageNum(0);
    triggerFilter(value);
  };

  const handleReset = () => {
    setPageNum(0);
    triggerFilter('');
  };

  const handleClose = () => onClose();

  const handleSave = () => {
    onSave({ leaderEX: selected });
    handleClose();
  };

  return (
    <CustomModal
      enableConfirm
      onClose={handleClose}
      onConfirm={handleSave}
      open={open}
      title="編輯精靈大結晶"
    >
      <div className="pure-g cardItem">
        <div className="pure-u-1 pure-u-md-1-3 imgFrame center-middle">
          <WikiImage
            filename={currentLeaderEX?.small_filename ?? '0000.png'}
            height={60}
            width={60}
          />
        </div>
        <div className="pure-u-1 pure-u-md-2-3">
          <h4>{currentLeaderEX?.name ?? '無'}</h4>
          <div className="leaderEX">
            <p>{currentLeaderEX?.condition ?? ''}</p>
            <p>{currentLeaderEX?.skill ?? ''}</p>
          </div>
        </div>
        <hr className="pure-u-1" />
        <div className="pure-u-1">
          <div className="pure-g">
            <div className="pure-u-1" style={{ display: 'flex' }}>
              <SearchBar
                onSearch={handleSearch}
                placeholder="請輸入結晶編號或結晶名字"
                style={{ flexGrow: 1 }}
              />
              <button
                className="button-error pure-button"
                onClick={handleReset}
                style={{ height: 36.4, flex: 0.2 }}
                type="button"
              >
                清除
              </button>
            </div>
            <h4 className="pure-u-1" style={{ textAlign: 'left' }}>搜尋結果</h4>
            <div className="pure-u-1">
              <div className="pure-g">
                {slicedOptions.map((optionCard) => (
                  <button
                    key={`options-${optionCard.value}-img`}
                    className="pure-u-1 pure-u-md-1-2"
                    onClick={() => setSelected(optionCard.value)}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: 'none',
                      gap: 16,
                      backgroundColor: 'trasnparent',
                    }}
                  >
                    <div className="imgFrame">
                      <WikiImage filename={optionCard.small_filename} height={60} width={60} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <legend>{optionCard.name}</legend>
                      <legend style={{ fontSize: 'small', color: '#333' }}>
                        {optionCard.skill}
                      </legend>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pure-u-1">
              <CustomTablePagination
                count={totalCount}
                onPageNumChange={setPageNum}
                onPagingChange={setPaging}
                pageNum={pageNum}
                paging={paging}
                pagingOptions={PAGING_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

EditModal.propTypes = {
  leaderEX: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
