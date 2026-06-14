import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

import CardRow from './CardRow';
import {
  setOrderBy, setPageNum, setPaging, setSortBy,
} from '../../actions/sortsActions';
import { clearSelected, toggleCards } from '../../actions/userActions';
import {
  CustomSwitch, CustomTablePagination, LoadingOverlay,
} from '../../components';
import useGetFilteredCards from '../../hooks/useGetFilteredCards';
import { FETCH_STATUS } from '../../model/variables';

const getAttrAsNumber = (card, key) => {
  let rawValue;

  switch (key) {
    case 'id':
    case 'max_atk':
    case 'max_hp':
    case 'cost':
      rawValue = card[key];
      break;
    case 'ss1.cdf':
      rawValue = card.ssData?.cdf;
      break;
    case 'ss1.cds':
      rawValue = card.ssData?.cds;
      break;
    case 'ss2.cdf':
      rawValue = card.ss2Data?.cdf;
      break;
    case 'ss2.cds':
      rawValue = card.ss2Data?.cds;
      break;
    default:
      rawValue = card.id;
  }

  const numberValue = Number.parseInt(rawValue, 10);
  return Number.isNaN(numberValue) ? 0 : numberValue;
};

const sortOptions = [
  { value: 'id', label: '編號' },
  { value: 'max_atk', label: '攻擊力' },
  { value: 'max_hp', label: '血量' },
  { value: 'cost', label: 'Cost' },
  { value: 'rank', label: 'Rank' },
  { value: 'ss1.cdf', label: 'SS 首回CD' },
  { value: 'ss1.cds', label: 'SS 次回CD' },
  { value: 'ss2.cdf', label: 'SS2 首回CD' },
  { value: 'ss2.cds', label: 'SS2 次回CD' },
];

const orderOptions = [
  { value: -1, label: '降序(由高到低)' },
  { value: 1, label: '升序(由低到高)' },
];

const PAGING_OPTIONS = [
  10, 25, 50, 100,
];

export default function List() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { filteredCards, status } = useGetFilteredCards();
  const { selected } = useSelector((state) => state.user);
  const {
    sortBy, orderBy, paging, pageNum,
  } = useSelector((state) => state.sorts);
  const [enabledSelect, setEnabledSelect] = React.useState(false);

  const totalCount = filteredCards.length;

  const cards = React.useMemo(() => filteredCards.toSorted((lhs, rhs) => {
    const primaryCmp = (getAttrAsNumber(lhs, sortBy) - getAttrAsNumber(rhs, sortBy)) * orderBy;
    if (primaryCmp !== 0) return primaryCmp;

    return getAttrAsNumber(lhs, 'id') - getAttrAsNumber(rhs, 'id');
  }), [filteredCards, orderBy, sortBy]);
  const slicedCards = cards.slice(paging * pageNum, paging * (pageNum + 1));
  const selectedCardSet = new Set(selected);
  const isPageSelected = slicedCards.every(({ id }) => selectedCardSet.has(id));

  const handleSelect = (id, checked) => dispatch(toggleCards({ ids: [id], checked }));

  const handleSelectAll = () => dispatch(
    toggleCards({ ids: slicedCards.map(({ id }) => id), checked: !isPageSelected }),
  );

  const handleClearAll = () => dispatch(clearSelected());

  const handleSetSortBy = (nextSortBy) => dispatch(setSortBy(nextSortBy));

  const handleSetOrderBy = (nextOrderBy) => dispatch(setOrderBy(nextOrderBy));

  const handleSetPaging = (nextPaging) => dispatch(setPaging(nextPaging));

  const handleSetPageNum = (nextPageNum) => dispatch(setPageNum(nextPageNum));

  React.useEffect(() => {
    const cardId = location.hash.replace('#', '');
    document.getElementById(cardId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [cards, paging, location.hash, dispatch]);

  return (
    <React.Fragment>
      <hr />
      <div
        className="pure-g"
        style={{
          position: 'relative',
          zIndex: 2,
          alignItems: 'flex-end',
        }}
      >
        <div className="pure-u-1 pure-u-md-1-2">
          <CustomSwitch
            checked={enabledSelect}
            label="啟用卡片選擇"
            onChange={(checked) => setEnabledSelect(checked)}
          />
        </div>
        <div className="pure-u-1-2 pure-u-md-1-4">
          <Select
            isOptionSelected={(option, selectedValue) => option.value === selectedValue}
            label="排序"
            onChange={(newValue) => handleSetSortBy(newValue.value)}
            options={sortOptions}
            value={sortOptions.find((option) => option.value === sortBy)}
          />
        </div>
        <div className="pure-u-1-2 pure-u-md-1-4">
          <Select
            isOptionSelected={(option, selectedValue) => option.value === selectedValue}
            label="排列方式"
            onChange={(newValue) => handleSetOrderBy(newValue.value)}
            options={orderOptions}
            value={orderOptions.find((option) => option.value === orderBy)}
          />
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
      }}
      >
        {enabledSelect ? (
          <div style={{
            margin: '1em 0 0', display: 'flex', alignItems: 'center', gap: 4,
          }}
          >
            <p style={{ lineHeight: '1em' }}>{`已選擇${selected.length}張卡片`}</p>
            <button
              className={`pure-button button-xsmall ${isPageSelected ? 'button-error' : ''}`}
              onClick={handleSelectAll}
              type="button"
            >
              {isPageSelected ? '取消全選' : '全選'}
            </button>
            <button
              className="pure-button button-xsmall button-warning"
              disabled={selected.length === 0}
              onClick={handleClearAll}
              type="button"
            >
              清除所有選擇
            </button>
          </div>
        ) : null}
      </div>
      <div style={{ paddingTop: '0.5em' }}>
        {status !== FETCH_STATUS.SUCCESS && (
          <LoadingOverlay />
        )}
        {slicedCards.map((card) => (
          <CardRow
            key={card.id}
            data={card}
            isSelected={selectedCardSet.has(card.id)}
            onSelect={handleSelect}
            selectEnabled={enabledSelect}
          />
        ))}
      </div>
      <CustomTablePagination
        count={totalCount}
        onPageNumChange={handleSetPageNum}
        onPagingChange={handleSetPaging}
        pageNum={pageNum}
        paging={paging}
        pagingOptions={PAGING_OPTIONS}
      />
    </React.Fragment>
  );
}
