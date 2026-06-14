import React from 'react';

import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import CardTabs from './CardTabs';
import Cover from './Cover';
import ReverseLinks from './ReverseLinks';
import Stats from './Stats';
import './styles.scss';
import { LoadingOverlay, SenzaiRow } from '../../components';
import useGetCard from '../../hooks/useGetCard';
import { FETCH_STATUS, WIKI_URL } from '../../model/variables';

export default function Card() {
  const { cardId } = useParams();
  const { card, status } = useGetCard(cardId);

  if (status !== FETCH_STATUS.SUCCESS) {
    return (
      <LoadingOverlay />
    );
  }

  return (
    <div className="cardDetail">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link
          className="pure-button pure-button-primary"
          style={{ display: 'inline-flex', alignItems: 'center' }}
          to={{
            pathname: '/',
            hash: `#${cardId}`,
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <a
          aria-label={`Wiki data for ${cardId}`}
          className="pure-button"
          href={`${WIKI_URL}/卡片資料/${cardId}`}
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center' }}
          target="_blank"
        >
          <ExternalLink size={20} />
        </a>
      </div>
      {!card?.name && (
        <p>
          {`No. ${cardId}`}
          目前尚未有資料，請點左上角按鈕返回搜尋界面或是右上角到維基編輯。
          <br />
          若該項目已被編輯，請等待至少三天讓搜尋器與維基同步。
        </p>
      )}
      {card?.name ? (
        <React.Fragment>
          <div
            className="pure-u-1
        pure-u-md-2-5"
            style={{
              boxSizing: 'border-box',
              padding: '0 1em 0',
            }}
          >
            <Cover
              cardFilename={card?.card_filename}
              id={card?.id}
              name={card?.name}
              smallFilename={card?.small_filename}
            />
            <SenzaiRow
              belongsTo={card?.id}
              senzaiArr={card?.senzaiArr ?? []}
              senzaiLArr={card?.senzaiLArr ?? []}
            />
            <Stats
              breed={card?.breed}
              cost={card?.cost}
              evoMax={card?.evo_max}
              evoNow={card?.evo_now}
              maxAtk={card?.max_atk}
              maxHp={card?.max_hp}
            />
          </div>
          <div
            className="pure-u-1 pure-u-md-3-5"
            style={{
              boxSizing: 'border-box',
              padding: '0 1em 0',
            }}
          >
            <CardTabs card={card} />
          </div>
          <hr />
          <ReverseLinks card={card} />
        </React.Fragment>
      ) : null}
    </div>
  );
}
