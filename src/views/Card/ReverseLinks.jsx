import React from 'react';

import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

import useOnReverseSearch from '../../hooks/useOnReverseSearch';

const ReverseSearchButton = ({ label, sub, handler }) => (
  <button
    aria-label={`search on ${label}`}
    className="reverse-search-button"
    onClick={handler}
    type="button"
  >
    <div className="lead">
      <Search size={20} />
    </div>
    <div className="context">
      <b>{label}</b>
      <br />
      {sub ? <span>{sub}</span> : null}
    </div>
  </button>
);

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
    <React.Fragment>
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
          handler={searchMainProp}
          label="主屬性"
          sub={card.prop}
        />
        {card.prop2 ? (
          <ReverseSearchButton
            handler={searchMainPropWithSubProp}
            label="雙屬性"
            sub={`${card.prop}${card.prop2}`}
          />
        ) : null}
        <ReverseSearchButton
          handler={searchBreed}
          label="種族"
          sub={card.breed}
        />
        <ReverseSearchButton
          handler={searchAS}
          label="答題技能"
          sub={card.asData.type}
        />
        {card.as2 ? (
          <ReverseSearchButton
            label="答題技能2"
            onClick={searchAS2}
            sub={card.as2Data.type}
          />
        ) : null}
        <ReverseSearchButton
          handler={searchSS}
          label="特殊技能"
          sub={card.ssData.type}
        />
        {card.ss2 ? (
          <ReverseSearchButton
            handler={searchSS2}
            label="特殊技能2"
            sub={card.ss2Data.type}
          />
        ) : null}
        {card.EXASData ? (
          <ReverseSearchButton
            handler={searchEXASCondition}
            label="EXAS觸發條件"
            sub={card.EXASData.condition}
          />
        ) : null}
        {card.EXASData ? (
          <ReverseSearchButton
            handler={searchEXASType}
            label="EXAS技能類型"
            sub={card.EXASData.type}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

ReverseLinks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.any,
};

ReverseLinks.defaultProps = {
  card: {},
};
