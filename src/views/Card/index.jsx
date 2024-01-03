import { ArrowLeft, ExternalLink } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { LoadingOverlay, SenzaiRow } from '../../components';
import useGetCard from '../../hooks/useGetCard';
import { FETCH_STATUS, WIKI_URL } from '../../model/variables';

import CardTabs from './CardTabs';
import Cover from './Cover';
import ReverseLinks from './ReverseLinks';
import Stats from './Stats';

import './styles.scss';

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
          to="/"
          className="pure-button pure-button-primary"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <ArrowLeft size={20} />
        </Link>
        <a
          href={`${WIKI_URL}/卡片資料/${cardId}`}
          className="pure-button"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center' }}
          aria-label={`Wiki data for ${cardId}`}
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
      {card?.name && (
        <>
          <div
            className="pure-u-1
        pure-u-md-2-5"
            style={{
              boxSizing: 'border-box',
              padding: '0 1em 0',
            }}
          >
            <Cover
              id={card?.id}
              name={card?.name}
              cardFilename={card?.card_filename}
              smallFilename={card?.small_filename}
            />
            <SenzaiRow
              belongsTo={card?.id}
              senzaiArr={card?.senzaiArr ?? []}
              senzaiLArr={card?.senzaiLArr ?? []}
            />
            <Stats
              maxHp={card?.max_hp}
              maxAtk={card?.max_atk}
              breed={card?.breed}
              evoNow={card?.evo_now}
              evoMax={card?.evo_max}
              cost={card?.cost}
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
        </>
      )}
    </div>
  );
}
