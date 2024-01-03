import React from 'react';

import {
  CustomTablePagination, SearchBar, WikiImage,
} from '../../../../components';
import useGetExcards from '../../../../hooks/useGetExCards';
import SlotContext from '../SlotContext';

const PAGING_OPTIONS = [
  6, 12, 48, 100,
];

export default function EditEX() {
  const { slotData, onUpdate } = React.useContext(SlotContext);
  const [count, setCount] = React.useState(0);
  const [paging, setPaging] = React.useState(6);
  const [pageNum, setPageNum] = React.useState(0);

  const { exCards, triggerFilter } = useGetExcards();

  const slicedEXCards = exCards.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (value) => triggerFilter(value);

  const handleReset = () => triggerFilter('');

  const handleAdd = (cardId) => {
    if (slotData.exs.length === 3) return;

    onUpdate([
      ...slotData.exs,
      cardId,
    ], 'exs');
  };

  React.useEffect(() => {
    setCount(exCards.length);
    setPageNum(0);
  }, [exCards.length]);

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
              type="button"
              onClick={handleReset}
              style={{ height: 36.4, flex: 0.2 }}
            >
              清除
            </button>
          </div>
          <h4 className="pure-u-1" style={{ textAlign: 'left' }}>搜尋結果</h4>
          <div className="pure-u-1">
            <div className="pure-g">
              {slicedEXCards.map((optionCard) => (
                <button
                  type="button"
                  className="pure-u-1 pure-u-md-1-2"
                  key={`options-${optionCard.id}-img`}
                  onClick={() => handleAdd(optionCard.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    gap: 16,
                    backgroundColor: 'trasnparent',
                  }}
                >
                  <div className="imgFrame">
                    <WikiImage filename={optionCard.smallFilename} width={60} height={60} />
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
              count={count}
              pageNum={pageNum}
              onPageNumChange={setPageNum}
              paging={paging}
              onPagingChange={setPaging}
              pagingOptions={PAGING_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
