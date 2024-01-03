import React from 'react';
import PropTypes from 'prop-types';

import {
  CustomStickyHeader, CustomTablePagination, SearchBar, WikiImage,
} from '../../components';
import useGetExcards from '../../hooks/useGetExCards';
import { FETCH_STATUS } from '../../model/variables';

import StringHighlight from './StringHighlight';
import { EXFormat, sourceParser } from './utils';

const EXCard = React.memo(({ ex, tokens }) => {
  const {
    name, description, smallFilename, source,
  } = ex;
  const { link, text } = sourceParser(source);

  return (
    <div className="pure-u-1 pure-u-md-1-2 excard-container">
      <div className="excard">
        <WikiImage filename={smallFilename} width={60} height={60} />
        <div className="info">
          <h3>{StringHighlight({ input: name, tokens })}</h3>
          <p className="detail">
            {StringHighlight({ input: description, tokens })}
          </p>
          <p className="source">
            取得來源：
            <span>
              {link && (
                <a href={link.href}>{link.text}</a>
              )}
              {text}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
});

EXCard.propTypes = {
  ex: EXFormat.isRequired,
  tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const PAGING_OPTIONS = [
  6, 12, 48, 100,
];

export default function EXCardsList() {
  const {
    exCards,
    status,
    tokens,
    triggerFilter,
  } = useGetExcards();
  const [count, setCount] = React.useState(0);
  const [paging, setPaging] = React.useState(6);
  const [pageNum, setPageNum] = React.useState(0);

  const slicedEXCards = exCards.slice(paging * pageNum, paging * (pageNum + 1));

  const handleSearch = (value) => triggerFilter(value);

  const handleReset = () => triggerFilter('');

  React.useEffect(() => {
    setCount(exCards.length);
    setPageNum(0);
  }, [exCards.length]);

  return (
    <>
      <CustomStickyHeader
        style={{
          display: 'flex', flexDirection: 'column', gap: 16, width: '100%',
        }}
      >
        <div className="pure-form" style={{ display: 'flex' }}>
          <SearchBar
            onSearch={handleSearch}
            placeholder="請輸入結晶名稱或效果關鍵詞"
            disabled={status !== FETCH_STATUS.SUCCESS}
            style={{ flexGrow: 1 }}
          />
          <button
            className="button-error pure-button"
            type="button"
            disabled={status !== FETCH_STATUS.SUCCESS}
            onClick={handleReset}
            style={{ height: 36.4, flex: 0.2 }}
          >
            清除
          </button>
        </div>
        <CustomTablePagination
          count={count}
          pageNum={pageNum}
          onPageNumChange={setPageNum}
          paging={paging}
          onPagingChange={setPaging}
          pagingOptions={PAGING_OPTIONS}
        />
      </CustomStickyHeader>
      <div className="pure-g">
        {slicedEXCards.map((exCard) => (
          <EXCard key={exCard.id} ex={exCard} tokens={tokens} />
        ))}
      </div>
    </>
  );
}
