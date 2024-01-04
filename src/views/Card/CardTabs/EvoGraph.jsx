import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { WikiImage } from '../../../components';
import useGetCard from '../../../hooks/useGetCard';
import { WIKI_URL } from '../../../model/variables';

import { siblingTester } from './utils';

const EvoAsset = React.memo(({ itemId }) => {
  const { card } = useGetCard(itemId);
  const smallFilename = card?.small_filename ?? `${itemId}.png`;

  return (
    <div className="pure-u-1-4 small_img">
      {!card && (
      <a href={`${WIKI_URL}/卡片資料/${itemId}`} target="_blank" aria-label={`wiki link to card ${itemId}`} rel="noreferrer">
        <WikiImage filename={smallFilename} width={60} height={60} />
      </a>
      )}
      {card && (
      <Link to={`/card/${itemId}`}>
        <WikiImage filename={smallFilename} width={60} height={60} />
      </Link>
      )}
    </div>
  );
});

EvoAsset.propTypes = {
  itemId: PropTypes.string,
};

EvoAsset.defaultProps = {
  itemId: '',
};

const EvoHeader = React.memo(({ cardId, isSelf }) => {
  const { card } = useGetCard(cardId);
  const {
    id, small_filename: smallFilename, evo_to: evoTo, evoArr, evo_price: evoPrice,
  } = card;
  const hasNext = !!evoTo;

  return (
    <div className="pure-u-1 evoNode">
      <div className="pure-g">
        <div className={`pure-u-1 small_img ${(isSelf ? 'self_card' : '')}`}>
          <Link to={`/card/${id}`}>
            <WikiImage filename={smallFilename} width={60} height={60} />
          </Link>
        </div>
        <div className={`evoSpace${hasNext ? ' down-arrow' : ''}`} />
        {isSelf && hasNext && evoArr && (
          <div className="pure-u-1">
            <div className="pure-g">
              <h4 className="pure-u-1">進化合成需要素材</h4>
              {evoArr.map((evoItem, idx) => [evoItem, idx]).map(([evoItem, idx]) => (
                <EvoAsset
                  key={`evoFrom-${id}-to-${evoTo}-${idx}`}
                  itemId={evoItem}
                />
              ))}
              <h4 className="pure-u-1">
                需要金幣：
                {evoPrice}
              </h4>
              <div className="down-arrow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

EvoHeader.propTypes = {
  cardId: PropTypes.string.isRequired,
  isSelf: PropTypes.bool,
};

EvoHeader.defaultProps = {
  isSelf: false,
};

const EvoList = React.memo(({ cardIds, currentCardId }) => (
  <div className="EvoContainer">
    {cardIds.map((cardId) => (
      Array.isArray(cardId) ? (
        <EvoList key={cardId.toString()} cardIds={cardId} currentCardId={currentCardId} />
      ) : (
        <EvoHeader key={cardId} cardId={cardId} isSelf={cardId === currentCardId} />
      )
    ))}
  </div>
));

const evoNodeType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

EvoList.propTypes = {
  cardIds: PropTypes.arrayOf(PropTypes.oneOfType([evoNodeType, PropTypes.arrayOf(evoNodeType)])),
  currentCardId: PropTypes.string.isRequired,
};

EvoList.defaultProps = {
  cardIds: [],
};

export default function EvoGraph({ id }) {
  const { sourceCards } = useSelector((state) => state.cards);

  if (!id) return <div />;

  const evoList = [
    ...siblingTester(id, sourceCards, false, true).reverse(),
    id,
    ...siblingTester(id, sourceCards, true, true),
  ];

  return (
    <div style={{ marginTop: 8 }}>
      <EvoList cardIds={evoList} currentCardId={id} />
    </div>
  );
}

EvoGraph.propTypes = {
  id: PropTypes.string,
};

EvoGraph.defaultProps = {
  id: '',
};
