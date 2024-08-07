import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

import {
  setOrderBy, setPageNum, setPaging, setSortBy,
} from '../../actions/sortsActions';
import { clearSelected, toggleCards } from '../../actions/userActions';
import {
  CustomSwitch, CustomTablePagination, LoadingOverlay,
} from '../../components';
import useGetFilteredCards from '../../hooks/useGetFilteredCards';
import { FETCH_STATUS } from '../../model/variables';

import CardRow from './CardRow';

const getAttrAsNumber = (card, key) => {
  switch (key) {
    case 'id':
    case 'max_atk':
    case 'max_hp':
    case 'cost':
      return Number.parseInt(card[key], 10);
    case 'ss1.cdf':
      return Number.parseInt(card.ssData.cdf, 10);
    case 'ss1.cds':
      return Number.parseInt(card.ssData.cds, 10);
    case 'ss2.cdf':
      return Number.parseInt(card.ss2Data.cdf, 10);
    case 'ss2.cds':
      return Number.parseInt(card.ss2Data.cds, 10);
    default:
      return Number.parseInt(card.id, 10);
  }
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
  const [count, setCount] = React.useState(0);

  const cards = React.useMemo(() => {
    setCount(filteredCards.length);
    return filteredCards.toSorted((lhs, rhs) => {
      const cmp = (getAttrAsNumber(lhs, sortBy) - getAttrAsNumber(rhs, sortBy)) * orderBy;
      return cmp !== 0 ? cmp : (getAttrAsNumber(lhs, 'id') - getAttrAsNumber(rhs, 'id')) * orderBy;
    });
  }, [filteredCards, orderBy, sortBy]);
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
    document.getElementById(cardId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [cards, paging, location.hash, dispatch]);

  return (
    <>
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
            label="啟用卡片選擇"
            checked={enabledSelect}
            onChange={(e) => setEnabledSelect(e.target.checked)}
          />
        </div>
        <div className="pure-u-1-2 pure-u-md-1-4">
          <Select
            value={sortOptions.find((option) => option.value === sortBy)}
            options={sortOptions}
            isOptionSelected={(option, selectedValue) => option.value === selectedValue}
            label="排序"
            onChange={(newValue) => handleSetSortBy(newValue.value)}
          />
        </div>
        <div className="pure-u-1-2 pure-u-md-1-4">
          <Select
            value={orderOptions.find((option) => option.value === orderBy)}
            options={orderOptions}
            isOptionSelected={(option, selectedValue) => option.value === selectedValue}
            label="排列方式"
            onChange={(newValue) => handleSetOrderBy(newValue.value)}
          />
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
      }}
      >
        {enabledSelect && (
          <div style={{
            margin: '1em 0 0', display: 'flex', alignItems: 'center', gap: 4,
          }}
          >
            <p style={{ lineHeight: '1em' }}>{`已選擇${selected.length}張卡片`}</p>
            <button
              type="button"
              className={`pure-button button-xsmall ${isPageSelected ? 'button-error' : ''}`}
              onClick={handleSelectAll}
            >
              {isPageSelected ? '取消全選' : '全選'}
            </button>
            <button
              type="button"
              className="pure-button button-xsmall button-warning"
              onClick={handleClearAll}
              disabled={selected.length === 0}
            >
              清除所有選擇
            </button>
          </div>
        )}
      </div>
      <div style={{ paddingTop: '0.5em' }}>
        {status !== FETCH_STATUS.SUCCESS && (
          <LoadingOverlay />
        )}
        {slicedCards.map((card) => (
          <CardRow
            key={card.id}
            data={card}
            selectEnabled={enabledSelect}
            isSelected={selectedCardSet.has(card.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <CustomTablePagination
        count={count}
        pageNum={pageNum}
        onPageNumChange={handleSetPageNum}
        paging={paging}
        onPagingChange={handleSetPaging}
        pagingOptions={PAGING_OPTIONS}
      />
    </>
  );
}
