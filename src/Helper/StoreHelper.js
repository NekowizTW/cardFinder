import _ from 'lodash';

import Store from '../Redux/Store.js'

// card relative
export function getCardById (id) {
  return _.find(Store.getState().SourceCards, { id: id }) ||
          {
            'id': '-1',
            'prop': '無',
            'prop2': '無',
            'breed': '道具',
            'rank': '',
            'name': '無',
            'max_hp': 0,
            'max_atk': 0,
            'cost': 0,
            'small_filename': '0000.png',
            'asData': {'name':'無','info':'','type':'無','attrs':[[]]},
            'ssData': {'name':'無','info':'','type':'無','attrs':[[]]},
            'as2Data': {'name':'無','info':'','type':'無','attrs':[[]]},
            'ss2Data': {'name':'無','info':'','type':'無','attrs':[[]]},
            'senzaiArr': []
          }
}
// Senzai Relative
export function getSenzaiByName (name) {
  return _.find(Store.getState().SourceSenzai, {'name': name}) ||
                _.find(Store.getState().SourceSenzai, {'name': '無'})
}
// exCard relative
export function getEXCardById (id) {
  return _.find(Store.getState().SourceEXCards, { id: id }) ||
          { name: '無結晶', id: '', senzai_1: ''}
}
// leaderEX relative
export function getLeaderEXByValue (value) {
  if (value.length === 0)
    return { name: '無結晶', rank: '', condition: '無', skill: '無', small_filename: '0000.png'}
  return _.find(Store.getState().SourceLeaderEXCards, (o) => {
    return `${o.name}${o.rank}` === value
  }) || { name: '無結晶', rank: '', condition: '無', skill: '無', small_filename: '0000.png'}
}