import React from 'react';
import PropTypes from 'prop-types';

import { WikiImage } from '../../../components';

import './styles.scss';

const noteObj = {
  deathEscape: { fmt: '九死一生', image: 'Senzai_Konki.png' },
  breedDefense: { fmt: '減輕種族傷害', image: 'Senzai_Shield_Breed.png' },
  propDefense: {
    fmt: '減輕屬性傷害',
    火: { fmt: '減輕火屬性傷害', image: 'Senzai_Shield_F.png' },
    水: { fmt: '減輕水屬性傷害', image: 'Senzai_Shield_W.png' },
    雷: { fmt: '減輕雷屬性傷害', image: 'Senzai_Shield_T.png' },
    光: { fmt: '減輕光屬性傷害', image: 'Senzai_Shield_DL.png' },
    闇: { fmt: '減輕闇屬性傷害', image: 'Senzai_Shield_DL.png' },
    火水: { fmt: '減輕火水屬性傷害', image: 'Senzai_Shield_FW.png' },
    火雷: { fmt: '減輕火雷屬性傷害', image: 'Senzai_Shield_FT.png' },
    水雷: { fmt: '減輕水雷屬性傷害', image: 'Senzai_Shield_WT.png' },
    闇光: { fmt: '減輕闇光屬性傷害', image: 'Senzai_Shield_DL.png' },
    光闇: { fmt: '減輕闇光屬性傷害', image: 'Senzai_Shield_DL.png' },
    火水雷: { fmt: '減輕火水雷屬性傷害', image: 'Senzai_Shield_FWT.png' },
    火水雷闇光: {
      fmt: '減輕火水雷闇光屬性傷害',
      image: 'Senzai_Shield_FWTDL.png',
    },
  },
  skillDefense: { fmt: '使敵方狀態技能失效', image: 'Senzai_Invalidate.png' },
  recoverAtEnd: { fmt: '戰鬥結束後回復', image: 'Senzai_Recover.png' },
  memberChange: { fmt: '戰鬥期間可被替換', image: 'Senzai_更換精靈.png' },
  HPATKSwap: { fmt: 'HP與攻擊力的值對調', image: 'ExAwake_HP‧攻擊力反轉.png' },
  asUp: { fmt: '答題技能效果增益', image: 'Senzai_AS.png' },
  ssUp: { fmt: '特殊技能效果增益', image: 'ExAwake_SP.png' },
};

function groupByTarget(flags) {
  return Array.from(Array(6), (_, idx) => flags.filter((flag) => flag.target[idx]));
}

export default function CertainSenzai({ certainFlags }) {
  const tableHeader = [
    '潛能類型',
    '隊長(1)',
    '隊員(2)',
    '隊員(3)',
    '隊員(4)',
    '隊員(5)',
    '援助',
  ];
  const grouped = {
    deathEscape: certainFlags.filter((o) => o.deathEscape !== undefined),
    breedDefense: certainFlags.filter((o) => o.breedDefense !== undefined),
    propDefense: certainFlags.filter((o) => o.propDefense !== undefined),
    skillDefense: certainFlags.filter((o) => o.skillDefense !== undefined),
    recoverAtEnd: certainFlags.filter((o) => o.recoverAtEnd !== undefined),
    memberChange: certainFlags.filter((o) => o.memberChange !== undefined),
    HPATKSwap: certainFlags.filter((o) => o.HPATKSwap !== undefined),
  };

  return (
    <div className="certainFlags">
      <table className="pure-table pure-table-bordered rwdtable">
        <thead>
          <tr>
            {tableHeader.map((name) => (
              <th key={`th-${name}`}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grouped.deathEscape.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.deathEscape.fmt}</td>
              {Object.entries(groupByTarget(grouped.deathEscape)).map(
                ([tar, effects]) => (
                  <td
                    key={`deathEscape-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i, effect]) => (
                      <div key={`deathEscape-${tar}-${i}`}>
                        <WikiImage
                          filename={noteObj.deathEscape.image}
                          width={24}
                          height={24}
                        />
                        <p
                          style={{
                            verticalAlign: 'middle',
                            display: 'inline-block',
                          }}
                        >
                          {`HP${effect.deathEscape.condition}%↑`}
                          <br />
                          {`${effect.deathEscape.probability}%機率`}
                        </p>
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.breedDefense.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.breedDefense.fmt}</td>
              {Object.entries(groupByTarget(grouped.breedDefense)).map(
                ([tar, effects]) => (
                  <td
                    key={`breedDefense-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i, effect]) => (
                      <div key={`breedDefense-${tar}-${i}`}>
                        {Object.entries(effect.breedDefense.breed).map(
                          ([idx, breed]) => (
                            <div key={`breedDefense-${tar}-${i}-${idx}`}>
                              <WikiImage
                                filename={noteObj.breedDefense.image}
                                width={24}
                                height={24}
                              />
                              <p
                                style={{
                                  verticalAlign: 'middle',
                                  display: 'inline-block',
                                }}
                              >
                                {`${breed}: ${effect.breedDefense.ratio}%`}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.propDefense.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.propDefense.fmt}</td>
              {Object.entries(groupByTarget(grouped.propDefense)).map(
                ([tar, effects]) => (
                  <td
                    key={`propDefense-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i, effect]) => (
                      <div key={`propDefense-${tar}-${i}`}>
                        <WikiImage
                          filename={
                            noteObj.propDefense[effect.propDefense.elmts].image
                          }
                          width={24}
                          height={24}
                        />
                        <p
                          style={{
                            verticalAlign: 'middle',
                            display: 'inline-block',
                          }}
                        >
                          {effect.propDefense.ratio !== undefined
                            ? `${effect.propDefense.ratio}%`
                            : `${effect.propDefense.const}點`}
                        </p>
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.skillDefense.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.skillDefense.fmt}</td>
              {Object.entries(groupByTarget(grouped.skillDefense)).map(
                ([tar, effects]) => (
                  <td
                    key={`skillDefense-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i, effect]) => (
                      <div key={`skillDefense-${tar}-${i}`}>
                        {Object.entries(effect.skillDefense).map(
                          ([idx, type]) => (
                            <div key={`skillDefense-${tar}-${i}-${idx}`}>
                              <WikiImage
                                filename={noteObj.skillDefense.image}
                                width={24}
                                height={24}
                              />
                              <p
                                style={{
                                  verticalAlign: 'middle',
                                  display: 'inline-block',
                                }}
                              >
                                {`${type}`}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.recoverAtEnd.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.recoverAtEnd.fmt}</td>
              {Object.entries(groupByTarget(grouped.recoverAtEnd)).map(
                ([tar, effects]) => (
                  <td
                    key={`recoverAtEnd-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i, effect]) => (
                      <div key={`recoverAtEnd-${tar}-${i}`}>
                        <WikiImage
                          filename={noteObj.recoverAtEnd.image}
                          width={24}
                          height={24}
                        />
                        <p
                          style={{
                            verticalAlign: 'middle',
                            display: 'inline-block',
                          }}
                        >
                          {`${effect.recoverAtEnd.ratio}%`}
                        </p>
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.memberChange.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.memberChange.fmt}</td>
              {Object.entries(groupByTarget(grouped.memberChange)).map(
                ([tar, effects]) => (
                  <td
                    key={`memberChange-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i]) => (
                      <div key={`memberChange-${tar}-${i}`}>
                        <WikiImage
                          filename={noteObj.memberChange.image}
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
          {grouped.HPATKSwap.length !== 0 && (
            <tr>
              <td data-label={tableHeader[0]}>{noteObj.HPATKSwap.fmt}</td>
              {Object.entries(groupByTarget(grouped.HPATKSwap)).map(
                ([tar, effects]) => (
                  <td
                    key={`HPATKSwap-${tar}`}
                    data-label={
                      effects.length !== 0 ? tableHeader[tar + 1] : ''
                    }
                  >
                    {Object.entries(effects).map(([i]) => (
                      <p key={`HPATKSwap-${tar}-${i}`}>
                        <WikiImage
                          src={noteObj.HPATKSwap.image}
                          width={24}
                          height={24}
                        />
                      </p>
                    ))}
                  </td>
                ),
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CertainSenzai.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  certainFlags: PropTypes.arrayOf(PropTypes.object).isRequired,
};
