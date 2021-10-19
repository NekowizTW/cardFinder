export function initEffect (len, type) {
  return {target: Array(len).fill(false), [type]: 0}
}

export function initFlag (len, type) {
  return {target: Array(len).fill(false), global: false, [type]: 0}
}

export function fetchValFromInfo (info, re) {
  const m = re.exec(info)
  if (m !== null)
    return m[1]
  else
    return 0
}

export function fullWidthNumber2Integer (str) {
  const m = '０１２３４５６７'
  const numStr = str.split('').map(c => m.indexOf(c)).join('')
  return parseInt(numStr)
}