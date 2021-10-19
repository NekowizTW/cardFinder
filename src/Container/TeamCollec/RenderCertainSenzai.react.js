import React from 'react'

import { tw_filenameFix,
         linkGenerator   } from '../../Helper/RenderHelper.js'

const noteObj = {
  deathEscape: { fmt: '九死一生', image: 'Senzai_Konki.png'},
  breedDefense: { fmt: '減輕種族傷害', image: 'Senzai_Shield_Breed.png' },
  propDefense: {
    'fmt': '減輕屬性傷害',
    '火': { fmt: '減輕火屬性傷害', image: 'Senzai_Shield_F.png'},
    '水': { fmt: '減輕水屬性傷害', image: 'Senzai_Shield_W.png'},
    '雷': { fmt: '減輕雷屬性傷害', image: 'Senzai_Shield_T.png'},
    '火水': { fmt: '減輕火水屬性傷害', image: 'Senzai_Shield_FW.png'},
    '火雷': { fmt: '減輕火雷屬性傷害', image: 'Senzai_Shield_FT.png'},
    '水雷': { fmt: '減輕水雷屬性傷害', image: 'Senzai_Shield_WT.png'},
    '闇光': { fmt: '減輕闇光屬性傷害', image: 'Senzai_Shield_DL.png'},
    '火水雷': { fmt: '減輕火水雷屬性傷害', image: 'Senzai_Shield_FWT.png'},
    '火水雷闇光': { fmt: '減輕火水雷闇光屬性傷害', image: 'Senzai_Shield_FWTDL.png'}
  },
  skillDefense: { fmt: '使敵方狀態技能失效', image: 'Senzai_Invalidate.png' },
  recoverAtEnd: { fmt: '戰鬥結束後回復', image: 'Senzai_Recover.png' },
  memberChange: { fmt: '戰鬥期間可被替換', image: 'Senzai_更換精靈.png' },
  HPATKSwap: { fmt: 'HP與攻擊力的值對調', image: 'ExAwake_HP‧攻擊力反轉.png' },
  asUp: { fmt: '答題技能效果增益', image: 'Senzai_AS.png' },
  ssUp: { fmt: '特殊技能效果增益', image: 'ExAwake_SP.png' },
}

String.prototype.format = function() {
  const args = arguments;
  return this.replace(/{(\d+)}/g, (match, number) => { 
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}


class RenderCertainSenzai extends React.Component {
  constructor (props) {
    super(props)
  }

  groupByTarget (arr) {
    let effects = Array.from(Array(6), () => new Array())
    arr.forEach(item => {
      for (const i in effects) {
        if (!item.target[i]) continue
        effects[i].push(item)
      }
    })

    return effects
  }

  render () {
    const tableHeader = ['潛能類型', '隊長(1)', '隊員(2)', '隊員(3)', '隊員(4)', '隊員(5)', '援助']
    if (this.props.calculated.length === 0)
      return <div></div>
    const flags = this.props.calculated[5].certain
    const grouped = {
      deathEscape: flags.filter(o => o.deathEscape !== undefined),
      breedDefense: flags.filter(o => o.breedDefense !== undefined),
      propDefense: flags.filter(o => o.propDefense !== undefined),
      skillDefense: flags.filter(o => o.skillDefense !== undefined),
      recoverAtEnd: flags.filter(o => o.recoverAtEnd !== undefined),
      memberChange: flags.filter(o => o.memberChange !== undefined),
      HPATKSwap: flags.filter(o => o.HPATKSwap !== undefined),
    }
    return <div>
      <table className={'pure-table pure-table-bordered rwdtable'}>
        <thead>
          <tr>
            {tableHeader.map((name, idx) => <th key={`th-${idx}`}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {grouped.deathEscape.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.deathEscape.fmt}</td>
            {this.groupByTarget(grouped.deathEscape).map((effects, tar) => {
              return <td key={`deathEscape-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`deathEscape-${tar}-${i}`}>
                  <img src={linkGenerator(noteObj.deathEscape.image)} style={{ verticalAlign: 'middle' }} />
                  <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                    {`HP${effect.deathEscape.condition}%↑`}
                    <br />
                    {`${effect.deathEscape.probability}%機率`}
                  </p>
                </div>)}
              </td>
            })}
          </tr>}
          {grouped.breedDefense.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.breedDefense.fmt}</td>
            {this.groupByTarget(grouped.breedDefense).map((effects, tar) => {
              return <td key={`breedDefense-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`breedDefense-${tar}-${i}`}>
                  {effect.breedDefense.breed.map((breed, idx) => <div key={`breedDefense-${tar}-${i}-${idx}`}>
                    <img src={linkGenerator(noteObj.breedDefense.image)} style={{ verticalAlign: 'middle' }} />
                    <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                      {`${breed}: ${effect.breedDefense.ratio}%`}
                    </p>
                  </div>)}
                </div>)}
              </td>
            })}
          </tr>}
          {grouped.propDefense.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.propDefense.fmt}</td>
            {this.groupByTarget(grouped.propDefense).map((effects, tar) => {
              return <td key={`propDefense-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`propDefense-${tar}-${i}`}>
                  <img src={linkGenerator(noteObj.propDefense[effect.propDefense.elmts].image)} style={{ verticalAlign: 'middle' }} />
                  <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                    {effect.propDefense.ratio !== undefined ? `${effect.propDefense.ratio}%` : `${effect.propDefense.const}點`}
                  </p>
                </div>)}
            </td>})}
          </tr>}
          {grouped.skillDefense.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.skillDefense.fmt}</td>
            {this.groupByTarget(grouped.skillDefense).map((effects, tar) => {
              return <td key={`skillDefense-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`skillDefense-${tar}-${i}`}>
                  {effect.skillDefense.map((type, idx) => <div key={`skillDefense-${tar}-${i}-${idx}`}>
                    <img src={linkGenerator(noteObj.skillDefense.image)} style={{ verticalAlign: 'middle' }} />
                    <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                      {`${type}`}
                    </p>
                  </div>)}
                </div>)}
              </td>
            })}
          </tr>}
          {grouped.recoverAtEnd.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.recoverAtEnd.fmt}</td>
            {this.groupByTarget(grouped.recoverAtEnd).map((effects, tar) => {
              return <td key={`recoverAtEnd-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`recoverAtEnd-${tar}-${i}`}>
                  <img src={linkGenerator(noteObj.recoverAtEnd.image)} style={{ verticalAlign: 'middle' }} />
                  <p style={{ verticalAlign: 'middle', display: 'inline-block' }}>
                    {`${effect.recoverAtEnd.ratio}%`}
                  </p>
                </div>)}
              </td>
            })}
          </tr>}
          {grouped.memberChange.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.memberChange.fmt}</td>
            {this.groupByTarget(grouped.memberChange).map((effects, tar) => {
              return <td key={`memberChange-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <div key={`memberChange-${tar}-${i}`}>
                  <img src={linkGenerator(noteObj.memberChange.image)} style={{ verticalAlign: 'middle' }} />
                </div>)}
              </td>
            })}
          </tr>}
          {grouped.HPATKSwap.length !== 0 && <tr>
            <td data-label={tableHeader[0]}>{noteObj.HPATKSwap.fmt}</td>
            {this.groupByTarget(grouped.HPATKSwap).map((effects, tar) => {
              return <td key={`HPATKSwap-${tar}`}
                         data-label={effects.length !== 0 ? tableHeader[tar + 1] : ''}>
                {effects.map((effect, i) => <p key={`HPATKSwap-${tar}-${i}`}>
                  <img src={linkGenerator(noteObj.HPATKSwap.image)} style={{ verticalAlign: 'middle' }} />
                </p>)}
              </td>
            })}
          </tr>}
        </tbody>
      </table>
    </div>
  }
}

export default RenderCertainSenzai