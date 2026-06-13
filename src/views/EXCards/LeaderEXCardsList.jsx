import React from 'react';

import PropTypes from 'prop-types';

import StringHighlight from './StringHighlight';
import { fixedEncodeURIComponent, LeaderEXFormat } from './utils';
import {
  CustomTablePagination, LoadingOverlay, SearchBar, WikiImage,
} from '../../components';
import useGetLeaderExCards from '../../hooks/useGetLeaderExCards';
import { FETCH_STATUS } from '../../model/variables';

const LeaderEXCard = React.memo(({ groupLabel, leaderEXs, tokens }) => {
  const smallFilename = leaderEXs[0].small_filename;

  const groupId = fixedEncodeURIComponent(groupLabel);

  return (
    <div className="pure-u-1 excard-container">
      <div className="excard">
        <WikiImage filename={smallFilename} height={60} width={60} />
        <div className="info">
          <div className="pure-g">
            <h3 className="leaderEXCard pure-u-1 pure-u-md-1-3">
              {StringHighlight({ input: groupLabel, tokens })}
            </h3>
            <div className="pure-u-1 pure-u-md-2-3">
              {leaderEXs.map(({ rank }, i) => (
                <label
                  key={`excard-${groupId}-label-${rank}`}
                  className={`${i === 0 ? 'active' : ''}`}
                  htmlFor={`excard-${groupId}-input-${rank}`}
                >
                  {i + 1}
                </label>
              ))}
            </div>
          </div>
          {leaderEXs.map(
            ({
              rank, condition, skill,
            }, i) => (
              <div key={`excard-${groupId}-tab-${rank}`} className="excard-tab">
                <input
                  defaultChecked={i === 0}
                  id={`excard-${groupId}-input-${rank}`}
                  name={`excard-${groupId}-input`}
                  type="radio"
                  onChange={() => {
                    document.querySelectorAll(`label[for^="excard-${groupId}-input-"]`)
                      .forEach((el) => el.classList.remove('active'));
                    document.querySelector(`label[for="excard-${groupId}-input-${rank}"]`)
                      .classList.add('active');
                  }}
                />
                <div className="detail">
                  <p>
                    條件：
                    {StringHighlight({ input: condition, tokens })}
                  </p>
                  <hr />
                  <p>
                    技能：
                    {StringHighlight({ input: skill, tokens })}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
});

LeaderEXCard.propTypes = {
  groupLabel: PropTypes.string.isRequired,
  leaderEXs: PropTypes.arrayOf(LeaderEXFormat).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const PAGING_OPTIONS = [
  5, 10, 25, 50,
];

export default function LeaderEXCardsList() {
  const {
    leaderEXCards,
    status,
    tokens,
    triggerFilter,
  } = useGetLeaderExCards();
  const [paging, setPaging] = React.useState(PAGING_OPTIONS[0]);
  const [pageNum, setPageNum] = React.useState(0);

  const totalCount = leaderEXCards.length;
  const slicedLeaderEXCards = leaderEXCards.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (value) => {
    setPageNum(0);
    triggerFilter(value);
  };

  const handleReset = () => {
    setPageNum(0);
    triggerFilter('');
  };

  if (status !== FETCH_STATUS.SUCCESS) {
    return (
      <LoadingOverlay />
    );
  }

  return (
    <div className="pure-u-1">
      <div className="pure-form" style={{ display: 'flex', width: '100%' }}>
        <SearchBar
          onSearch={handleSearch}
          placeholder="請輸入結晶名稱或效果關鍵詞"
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
      <div className="pure-g" style={{ paddingTop: '0.5em' }}>
        {slicedLeaderEXCards.map(([groupLabel, leaderEXs]) => (
          <LeaderEXCard
            key={groupLabel}
            groupLabel={groupLabel}
            leaderEXs={leaderEXs}
            tokens={tokens}
          />
        ))}
      </div>
      <CustomTablePagination
        count={totalCount}
        onPageNumChange={setPageNum}
        onPagingChange={setPaging}
        pageNum={pageNum}
        paging={paging}
        pagingOptions={PAGING_OPTIONS}
      />
    </div>
  );
}
