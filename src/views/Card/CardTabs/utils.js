/**
 * siblingTester - 追蹤卡片的進化路徑，向後追蹤時允許多路遞迴
 *
 * @param {string} id - 卡片的 ID
 * @param {Card[]} cards - 卡片陣列
 * @param {boolean} isForward - 是否為向前追蹤卡片的進化路徑，false為向後追蹤
 * @param {boolean} [isSelf=false] - 是否將起點 ID 加入列表中
 * @returns {string[]} 包含所有與給定卡片相關的卡片 ID 的列表
 */
// eslint-disable-next-line import/prefer-default-export
export function siblingTester(id, cards, isForward, isSelf = false) {
  // console.debug(`[siblingTest] Track id: ${id}, isForward: ${isForward}`);
  const evoList = [];
  if (id === '') return evoList;

  const data = cards.find((card) => card.id === id);
  if (!data) return evoList;

  if (!isForward) {
    if (data.evo_from.includes(',')) {
      const evoFrom2Way = data.evo_from.split(',');
      if (!isSelf) evoList.push(data.id);
      evoList.push([
        siblingTester(evoFrom2Way[0], cards, isForward).reverse(),
        siblingTester(evoFrom2Way[1], cards, isForward).reverse(),
      ]);
    } else {
      if (!isSelf) evoList.push(data.id);
      evoList.push(...siblingTester(data.evo_from, cards, isForward));
    }
  } else {
    if (!isSelf) evoList.push(data.id);
    evoList.push(...siblingTester(data.evo_to, cards, isForward));
  }

  // console.debug(`[siblingTest] Complete id: ${id}, isForward: ${isForward}, list: ${evoList}`);
  return evoList;
}
