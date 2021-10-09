import _      from 'lodash';

// card relative
export function getCardById (store, id) {
  return _.find(store.SourceCards, { id: id })
}
// Senzai Relative
export function getSenzaiByName (store, name) {
  return _.find(store.SourceSenzai, {'name': name}) ||
                _.find(store.SourceSenzai, {'name': '無'})
}
