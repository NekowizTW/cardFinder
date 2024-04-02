export const EXAS_CONDITIONS = [
  {
    label: '組隊相關',
    options: [
      { value: /「設為隊長」/, label: '設為隊長' },
    ],
  },
  {
    label: '隊伍狀態相關',
    options: [
      { value: /「隊友精靈的HP從未滿100%變為100%」/, label: '隊友精靈的HP從未滿100%變為100%' },
      { value: /「隊友精靈受到傷害合計(\d次)」/, label: '隊友精靈受到傷害合計數次' },
    ],
  },
  {
    label: '答題相關',
    options: [
      { value: /「正確答題(\d次)?」/, label: '正確答題數次' },
      { value: /「正確回答2色以上的問題類型(\d次)?」/, label: '正確回答2色以上的問題類型數次' },
      { value: /「正確回答3色以上的問題類型(\d次)?」/, label: '正確回答3色以上的問題類型數次' },
    ],
  },
  {
    label: '連鎖數相關',
    options: [
      { value: /「連鎖數達\d+次以上」/, label: '連鎖數達數次以上' },
    ],
  },
  {
    label: '其他',
    options: [],
  },
];

export const EXAS_TYPES = [
  {
    label: '全體化',
    options: [
      { value: /全體化/, label: '全體化' },
    ],
  },
  {
    label: '連續化',
    options: [
      { value: /連續化/, label: '連續化' },
    ],
  },
  {
    label: '貫穿',
    options: [
      { value: /貫穿/, label: '貫穿' },
    ],
  },
  {
    label: '攻擊',
    options: [
      { value: /^攻擊/, label: '攻擊' },
      { value: /連擊/, label: '連擊' },
      { value: /追擊/, label: '追擊' },
      { value: /瀕死攻擊/, label: '瀕死攻擊' },
      { value: /連鎖攻擊/, label: '連鎖攻擊' },
      { value: /精神抖擻攻擊/, label: '精神抖擻攻擊' },
      { value: /^種族數攻擊/, label: '種族數攻擊' },
      { value: /掠奪攻擊/, label: '掠奪攻擊' },
      { value: /問題類型顏色數攻擊/, label: '問題類型顏色數攻擊' },
      { value: /問題類型屬性次數攻擊/, label: '問題類型屬性次數攻擊' },
    ],
  },
  {
    label: '特效',
    options: [
      { value: /狀態特效/, label: '狀態特效' },
      { value: /屬性特效/, label: '屬性特效' },
      { value: /種族特效/, label: '種族特效' },
      { value: /融合特效/, label: '融合特效' },
    ],
  },
  {
    label: '防禦',
    options: [
      { value: /防禦/, label: '防禦' },
      { value: /阻隔傷害/, label: '阻隔傷害' },
      { value: /傷害減免/, label: '傷害減免' },
    ],
  },
  {
    label: '補助',
    options: [
      { value: /^強化攻擊/, label: '強化攻擊' },
      { value: /^強化複屬性攻擊/, label: '強化複屬性攻擊' },
      { value: /強化種族攻擊/, label: '強化種族攻擊' },
      { value: /整合（攻擊）/, label: '整合【攻擊】' },
      { value: /整合（強化攻擊）/, label: '整合【強化攻擊】' },
      { value: /整合（強化複屬性攻擊）/, label: '整合【強化複屬性攻擊】' },
      { value: /^反擊/, label: '反擊' },
      { value: /增加連鎖數/, label: '增加連鎖數' },
      { value: /連鎖數反擊/, label: '連鎖數反擊' },
      { value: /EX強化/, label: 'EX強化' },
      { value: /保留問題類型/, label: '保留問題類型' },
      { value: /獅子奮迅/, label: '獅子奮迅' },
      { value: /領域加速/, label: '領域加速' },
      { value: /融合特殊變化/, label: '融合特殊變化' },
      { value: /強化種族數攻擊/, label: '強化種族數攻擊' },
      { value: /掩護/, label: '掩護' },
      { value: /逆襲攻擊/, label: '逆襲攻擊' },
      { value: /提升能力數值/, label: '提升能力數值' },
      { value: /純屬性特殊變化/, label: '純屬性特殊變化' },
      { value: /統一特殊變化/, label: '統一特殊變化' },
    ],
  },
  {
    label: '回復',
    options: [
      { value: /回復/, label: '回復' },
      { value: /起死回生/, label: '起死回生' },
    ],
  },
  {
    label: '其他',
    options: [],
  },
];
