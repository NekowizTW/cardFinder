import React from 'react';

import {
  CustomTablePagination, SearchBar, WikiImage,
} from '../../../../components';
import useGetExCards from '../../../../hooks/useGetExCards';
import SlotContext from '../SlotContext';

const PAGING_OPTIONS = [
  6, 12, 48, 100,
];

export default function EditEX() {
  const { slotData, onUpdate } = React.useContext(SlotContext);
  const [paging, setPaging] = React.useState(6);
  const [pageNum, setPageNum] = React.useState(0);

  const { exCards, triggerFilter } = useGetExCards();

  const totalCount = exCards.length;
  const slicedEXCards = exCards.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (value) => {
    setPageNum(0);
    triggerFilter(value);
  };

  const handleReset = () => {
    setPageNum(0);
    triggerFilter('');
  };

  const handleAdd = (cardId) => {
    if (slotData.exs.length === 3) return;

    onUpdate([
      ...slotData.exs,
      cardId,
    ], 'exs');
  };

  return (
    <div className="pure-g">
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
              {slicedEXCards.map((optionCard) => (
                <button
                  key={`options-${optionCard.id}-img`}
                  className="pure-u-1 pure-u-md-1-2"
                  onClick={() => handleAdd(optionCard.id)}
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
                    <WikiImage filename={optionCard.smallFilename} height={60} width={60} />
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
