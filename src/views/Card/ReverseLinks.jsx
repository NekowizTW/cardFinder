import { Search } from 'lucide-react';
import React from 'react';
import PropTypes from 'prop-types';

import useOnReverseSearch from '../../hooks/useOnReverseSearch';

function ReverseSearchButton({ label, sub, handler }) {
  return (
    <button
      className="reverse-search-button"
      type="button"
      onClick={handler}
      aria-label={`search on ${label}`}
    >
      <div className="lead">
        <Search size={20} />
      </div>
      <div className="context">
        <b>{label}</b>
        <br />
        {sub && (
          <span>{sub}</span>
        )}
      </div>
    </button>
  );
}

ReverseSearchButton.propTypes = {
  label: PropTypes.string,
  sub: PropTypes.string,
  handler: PropTypes.func,
};

ReverseSearchButton.defaultProps = {
  label: '',
  sub: '',
  handler: () => {},
};

export default function ReverseLinks({
  card,
}) {
  const {
    searchMainProp,
    searchMainPropWithSubProp,
    searchBreed,
    searchAS,
    searchAS2,
    searchSS,
    searchSS2,
    searchEXASCondition,
    searchEXASType,
  } = useOnReverseSearch(card);

  return (
    <>
      <h4>搜索關聯卡片</h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <ReverseSearchButton
          label="主屬性"
          sub={card.prop}
          handler={searchMainProp}
        />
        {card.prop2 && (
          <ReverseSearchButton
            label="雙屬性"
            sub={`${card.prop}${card.prop2}`}
            handler={searchMainPropWithSubProp}
          />
        )}
        <ReverseSearchButton
          label="種族"
          sub={card.breed}
          handler={searchBreed}
        />
        <ReverseSearchButton
          label="答題技能"
          sub={card.asData.type}
          handler={searchAS}
        />
        {card.as2 && (
          <ReverseSearchButton
            label="答題技能2"
            sub={card.as2Data.type}
            onClick={searchAS2}
          />
        )}
        <ReverseSearchButton
          label="特殊技能"
          sub={card.ssData.type}
          handler={searchSS}
        />
        {card.ss2 && (
          <ReverseSearchButton
            label="特殊技能2"
            sub={card.ss2Data.type}
            handler={searchSS2}
          />
        )}
        {card.EXASData && (
          <ReverseSearchButton
            label="EXAS觸發條件"
            sub={card.EXASData.condition}
            handler={searchEXASCondition}
          />
        )}
        {card.EXASData && (
          <ReverseSearchButton
            label="EXAS技能類型"
            sub={card.EXASData.type}
            handler={searchEXASType}
          />
        )}
      </div>
    </>
  );
}

ReverseLinks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.any,
};

ReverseLinks.defaultProps = {
  card: {},
};
