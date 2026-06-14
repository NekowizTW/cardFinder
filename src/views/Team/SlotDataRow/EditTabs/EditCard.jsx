import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  resetFilters,
  setAdditionalPropsFilter,
  setSearchFilter,
} from '../../../../actions/filtersActions';
import {
  CustomSwitch, CustomTablePagination, SearchBar, WikiImage,
} from '../../../../components';
import useGetFilteredCards from '../../../../hooks/useGetFilteredCards';
import SlotContext from '../SlotContext';

const PAGING_OPTIONS = [
  6, 12, 48, 100,
];

export default function EditCard() {
  const dispatch = useDispatch();
  const { onUpdate } = React.useContext(SlotContext);
  const [paging, setPaging] = React.useState(6);
  const [pageNum, setPageNum] = React.useState(0);

  const { filteredCards } = useGetFilteredCards();
  const filters = useSelector((state) => state.filters);
  const { isHaifu, isMaxEvo, isSelectedOnly } = filters;

  const totalCount = filteredCards.length;
  const cards = React.useMemo(
    () => filteredCards.toSorted((lhs, rhs) => rhs.id - lhs.id),
    [filteredCards],
  );
  const slicedCards = cards.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (search) => {
    setPageNum(0);
    dispatch(setSearchFilter({ search }));
  };

  const handleChange = (key, newValue) => {
    setPageNum(0);
    dispatch(setAdditionalPropsFilter({
      isMaxEvo,
      isHaifu,
      isSelectedOnly,
      [key]: newValue,
    }));
  };

  const handleReset = () => {
    setPageNum(0);
    dispatch(resetFilters());
  };

  return (
    <div className="pure-g">
      <div className="pure-u-1">
        <div className="pure-g">
          <div className="pure-u-1" style={{ display: 'flex' }}>
            <SearchBar
              defaultValue={filters?.search ?? ''}
              onSearch={handleSearch}
              placeholder="請輸入卡片編號或卡片名字"
              style={{ flexGrow: 1 }}
            />
            <button
              className="button-error pure-button"
              onClick={handleReset}
              style={{ height: 36.4, flex: 0.2 }}
              type="button"
            >
              重置
            </button>
          </div>
          <div className="pure-u-1" style={{ margin: '4px 0 4px', display: 'flex', gap: 12 }}>
            <CustomSwitch
              checked={isMaxEvo}
              label="只顯示最終進化"
              onChange={(checked) => handleChange('isMaxEvo', checked)}
            />
            <CustomSwitch
              checked={isHaifu}
              label="只顯示配佈卡"
              onChange={(checked) => handleChange('isHaifu', checked)}
            />
            <CustomSwitch
              checked={isSelectedOnly}
              label="只顯示已選擇的卡片"
              onChange={(checked) => handleChange('isSelectedOnly', checked)}
            />
          </div>
          <h4 className="pure-u-1" style={{ textAlign: 'left' }}>搜尋結果</h4>
          <div className="pure-u-1">
            <div className="pure-g">
              {slicedCards.map((optionCard) => (
                <button
                  key={`options-${optionCard.id}-img`}
                  className="pure-u-1 pure-u-md-1-2"
                  onClick={() => onUpdate(optionCard.id, 'id')}
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
                    <legend>{`No. ${optionCard.id}`}</legend>
                    <legend>{optionCard.name}</legend>
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
  );
}
