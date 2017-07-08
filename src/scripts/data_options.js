export const PROPS = [
  { value: '火', label: '火屬性' },
  { value: '水', label: '水屬性' },
  { value: '雷', label: '雷屬性' }
];
export const PROPS2 = [
  { value: '火', label: '火屬性' },
  { value: '水', label: '水屬性' },
  { value: '雷', label: '雷屬性' },
  { value: '光', label: '光屬性' },
  { value: '闇', label: '闇屬性' }
];
export const BREEDS = [
  { value: '龍族', label: '龍族'},
  { value: '神族', label: '神族'},
  { value: '魔族', label: '魔族'},
  { value: '天使', label: '天使'},
  { value: '妖精', label: '妖精'},
  { value: '亞人', label: '亞人'},
  { value: '物質', label: '物質'},
  { value: '魔法生物', label: '魔法生物'},
  { value: '戰士', label: '戰士'},
  { value: '術士', label: '術士'},
  { value: '道具', label: '道具'},
  { value: 'AbCd', label: 'AbCd'}
];
export const RANKS = [
  { value: 'X', label: '只列出最終進化'},
  { value: 'LtoL', label: 'LtoL'},
  { value: 'L', label: 'L'},
  { value: 'SS+', label: 'SS+'},
  { value: 'SS', label: 'SS'},
  { value: 'S+', label: 'S+'},
  { value: 'S', label: 'S'},
  { value: 'A+', label: 'A+'},
  { value: 'A', label: 'A'},
  { value: 'B+', label: 'B+'},
  { value: 'B', label: 'B'},
  { value: 'C+', label: 'C+'}
];

export const SKILL_AS = [
  { value: '_自身攻擊上升系', label: '自身攻擊上升', disabled: true},
  { value: '攻擊', label: '攻擊上升'},
  { value: '攻擊・回復', label: '攻擊上升・回復'},
  { value: '連段數攻擊', label: '連段數攻擊上升'},
  { value: '連段數攻擊・防禦', label: '連段數攻擊上升・防禦'},
  { value: '連段數攻擊・回復', label: '連段數攻擊上升・回復'},
  { value: '連段數攻擊・屬性特效', label: '連段數攻擊上升・屬性特效'},
  { value: '種族數攻擊', label: '依種族精靈數攻擊上升'},
  { value: '種族數攻擊・種族特攻', label: '依種族精靈數攻擊上升・種族特攻'},
  { value: '連段數攻擊・種族數攻擊', label: '連段數攻擊上升・依種族精靈數攻擊上升'},
  { value: '連段數攻擊・種族攻擊強化', label: '連段數攻擊上升・種族攻擊強化'},
  { value: '連段數攻擊・複屬性攻擊強化', label: '連段數攻擊上升・複屬性攻擊強化'},
  { value: '複屬性攻擊強化・防禦', label: '複屬性攻擊強化・防禦'},
  { value: '瀕死攻擊', label: '瀕死攻擊上升'},
  { value: '快調攻擊', label: '快調攻擊上升'},
  { value: '問題屬性攻擊', label: '問題屬性攻擊上升'},
  { value: '失去的憤怒', label: '失去的憤怒(依己方陣亡數增加傷害)'},
  { value: '賭博攻擊', label: '賭博攻擊'},
  { value: '_隊伍攻擊強化系', label: '隊伍攻擊強化', disabled: true},
  { value: '攻擊強化', label: '隊伍攻擊強化'},
  { value: '攻擊強化・防禦', label: '隊伍攻擊強化・防禦'},
  { value: '攻擊強化・連段數攻擊', label: '隊伍攻擊強化・連段數攻擊上升'},
  { value: '攻擊強化・屬性特效', label: '隊伍攻擊強化・屬性特效'},
  { value: '複屬性攻擊強化', label: '複屬性攻擊強化'},
  { value: '複屬性攻擊強化・回復・防禦', label: '複屬性攻擊強化・回復・防禦'},
  { value: '複屬性攻擊強化・種族攻擊強化', label: '複屬性攻擊強化・種族攻擊強化'},
  { value: '種族攻擊強化', label: '指定種族攻擊強化'},
  { value: '種族攻擊強化・防禦', label: '指定種族攻擊強化・防禦'},
  { value: '種族攻擊強化・連段數攻擊', label: '指定種族攻擊強化・連段數攻擊'},
  { value: '_連擊系', label: '連擊系', disabled: true},
  { value: '連擊', label: '連擊'},
  { value: '連擊・回復', label: '連擊・回復'},
  { value: '連擊・複屬性攻擊強化', label: '連擊・複屬性攻擊強化'},
  { value: '連擊・防禦', label: '連擊・防禦'},
  { value: '連擊・瀕死攻擊', label: '連擊・瀕死攻擊'},
  { value: '連擊・屬性特效', label: '連擊・屬性特效'},
  { value: '_特效系', label: '特效系', disabled: true},
  { value: '屬性特效', label: '屬性特效'},
  { value: '屬性特效・回復', label: '屬性特效・回復'},
  { value: '屬性特效・防禦', label: '屬性特效・防禦'},
  { value: '屬性特效連擊', label: '屬性特效連擊'},
  { value: '屬性特效連擊・複屬性攻擊強化', label: '屬性特效連擊・複屬性攻擊強化'},
  { value: '攻擊強化・屬性特效連擊', label: '攻擊強化．屬性特效連擊'},
  { value: '種族特攻', label: '種族特攻'},
  { value: '_全體攻擊系', label: '全體攻擊系', disabled: true},
  { value: '分散攻擊', label: '分散攻擊'},
  { value: '分散攻擊・防禦', label: '分散攻擊・防禦'},
  { value: '攻擊強化・分散攻擊', label: '分散攻擊・隊伍攻擊強化'},
  { value: '全體攻擊', label: '全體攻擊'},
  { value: '全體攻擊・回復', label: '全體攻擊・回復'},
  { value: '種族特攻/全體攻擊', label: '種族特攻/全體攻擊'},
  { value: '_回復系', label: '回復系', disabled: true},
  { value: '回復', label: '回復'},
  { value: '回復・防禦', label: '回復・防禦'},
  { value: '回復・攻擊強化', label: '回復・攻擊強化'},
  { value: '回復・複屬性攻擊強化', label: '回復・複屬性攻擊強化'},
  { value: '回復・種族攻擊強化', label: '回復・種族攻擊強化'},
  { value: '回復・種族數攻擊', label: '回復・依種族精靈數攻擊上升'},
  { value: '連段數回復', label: '連段數回復'},
  { value: '連段數回復・防禦', label: '連段數回復・防禦'},
  { value: '連段數回復・防禦・複屬性攻擊強化', label: '連段數回復・防禦・複屬性攻擊強化'},
  { value: '回復/自身', label: '回復/自身'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '吸收', label: '吸收'},
  { value: '防禦', label: '防禦'},
  { value: '屬性的庇佑', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)'},
  { value: '無', label: '無技能'}
];
export const SKILL_AS2 = [
  { value: '_自身攻擊上升系', label: '自身攻擊上升', disabled: true},
  { value: '攻擊', label: '攻擊上升'},
  { value: '攻擊・回復', label: '攻擊上升・回復'},
  { value: '攻擊・種族攻擊強化', label: '攻擊・種族攻擊強化'},
  { value: '連段數攻擊', label: '連段數攻擊上升'},
  { value: '連段數攻擊・防禦', label: '連段數攻擊上升・防禦'},
  { value: '連段數攻擊・回復', label: '連段數攻擊上升・回復'},
  { value: '連段數攻擊・屬性特效', label: '連段數攻擊上升・屬性特效'},
  { value: '種族數攻擊', label: '依種族精靈數攻擊上升'},
  { value: '種族數攻擊・種族特攻', label: '依種族精靈數攻擊上升・種族特攻'},
  { value: '連段數攻擊・種族數攻擊', label: '連段數攻擊上升・依種族精靈數攻擊上升'},
  { value: '連段數攻擊・複屬性攻擊強化', label: '連段數攻擊上升・複屬性攻擊強化'},
  { value: '複屬性攻擊強化・防禦', label: '複屬性攻擊強化・防禦'},
  { value: '瀕死攻擊', label: '瀕死攻擊上升'},
  { value: '快調攻擊', label: '快調攻擊上升'},
  { value: '問題屬性攻擊', label: '問題屬性攻擊上升'},
  { value: '失去的憤怒', label: '失去的憤怒(依己方陣亡數增加傷害)'},
  { value: '賭博攻擊', label: '賭博攻擊'},
  { value: '_隊伍攻擊上升系', label: '隊伍攻擊上升', disabled: true},
  { value: '攻擊強化', label: '隊伍攻擊強化'},
  { value: '攻擊強化・連段數攻擊', label: '攻擊強化・連段數攻擊上升'},
  { value: '攻擊強化・屬性特效', label: '隊伍攻擊強化・屬性特效'},
  { value: '攻擊強化・屬性特效連擊', label: '攻擊強化・屬性特效連擊'},
  { value: '攻擊強化・防禦', label: '隊伍攻擊強化・防禦'},
  { value: '複屬性攻擊強化', label: '複屬性攻擊強化'},
  { value: '複屬性攻擊強化・回復・防禦', label: '複屬性攻擊強化・回復・防禦'},
  { value: '複屬性攻擊強化・種族攻擊強化', label: '複屬性攻擊強化・種族攻擊強化'},
  { value: '種族攻擊強化', label: '指定種族攻擊強化'},
  { value: '種族攻擊強化・防禦', label: '指定種族攻擊強化・防禦'},
  { value: '種族攻擊強化・連段數攻擊', label: '指定種族攻擊強化・連段數攻擊'},
  { value: '攻擊強化・種族數攻擊', label: '攻擊強化・依種族精靈數攻擊上升'},
  { value: '_連擊系', label: '連擊系', disabled: true},
  { value: '連擊', label: '連擊'},
  { value: '連擊・回復', label: '連擊・回復'},
  { value: '連擊・複屬性攻擊強化', label: '連擊・複屬性攻擊強化'},
  { value: '連擊・防禦', label: '連擊・防禦'},
  { value: '連擊・瀕死攻擊', label: '連擊・瀕死攻擊'},
  { value: '連擊・屬性特效', label: '連擊・屬性特效'},
  { value: '_特效系', label: '特效系', disabled: true},
  { value: '屬性特效', label: '屬性特效'},
  { value: '屬性特效・回復', label: '屬性特效・回復'},
  { value: '屬性特效・防禦', label: '屬性特效・防禦'},
  { value: '屬性特效連擊', label: '屬性特效連擊'},
  { value: '屬性特效連擊・複屬性攻擊強化', label: '屬性特效連擊・複屬性攻擊強化'},
  { value: '種族特攻', label: '種族特攻'},
  { value: '_全體攻擊系', label: '全體攻擊系', disabled: true},
  { value: '分散攻擊', label: '分散攻擊'},
  { value: '分散攻擊・防禦', label: '分散攻擊・防禦'},
  { value: '攻擊強化・分散攻擊', label: '分散攻擊・隊伍攻擊強化'},
  { value: '全體攻擊', label: '全體攻擊'},
  { value: '全體攻擊・回復', label: '全體攻擊・回復'},
  { value: '種族特攻/全體攻擊', label: '種族特攻/全體攻擊'},
  { value: '_回復系', label: '回復系', disabled: true},
  { value: '回復', label: '回復'},
  { value: '回復・防禦', label: '回復・防禦'},
  { value: '回復・攻擊強化', label: '回復・攻擊強化'},
  { value: '回復・連段數攻擊', label: '回復・連段數攻擊上升'},
  { value: '回復・種族攻擊強化', label: '回復・指定種族攻擊強化'},
  { value: '回復・複屬性攻擊強化', label: '回復・複屬性攻擊強化'},
  { value: '回復・種族數攻擊', label: '回復・依種族精靈數攻擊上升'},
  { value: '連段數回復', label: '連段數回復'},
  { value: '連段數回復・防禦', label: '連段數回復・防禦'},
  { value: '連段數回復・防禦・複屬性攻擊強化', label: '連段數回復・防禦・複屬性攻擊強化'},
  { value: '回復/自身', label: '回復/自身'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '吸收', label: '吸收'},
  { value: '防禦', label: '防禦'},
  { value: '屬性的庇佑', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)'},
  { value: '無', label: '無技能'}
];
export const SKILL_SS = [
  { value: '_攻擊', label: '攻擊/傷害', disabled: true},
  { value: '大魔術/單體', label: '大魔術/單體(給予單體傷害)'},
  { value: '大魔術/全體', label: '大魔術/全體(給予全體傷害)'},
  { value: '特效大魔術/全體', label: '特效大魔術/全體(特效傷害)'},
  { value: '特效大魔術/單體', label: '特效大魔術/單體(特效傷害)'},
  { value: '反動大魔術/全體', label: '反動大魔術/全體(給予傷害後陷入封印狀態)'},
  { value: '反動大魔術/單體', label: '反動大魔術/單體(給予傷害後陷入封印狀態)'},
  { value: '反動大魔術‧蝕/單體', label: '反動大魔術‧蝕/單體(給予傷害後陷入封印狀態)'},
  { value: '自我犧牲魔術/單體', label: '自我犧牲魔術/單體(使用HP造成傷害)'},
  { value: '自我犧牲魔術/全體', label: '自我犧牲魔術/全體(使用HP造成傷害)'},
  { value: '犧牲魔術/單體', label: '犧牲魔術/單體(使用全體HP造成傷害)'},
  { value: '犧牲魔術/全體', label: '犧牲魔術/全體(使用全體HP造成傷害)'},
  { value: '多重魔術', label: '多重魔術(連擊)'},
  { value: '殘滅大魔術', label: '殘滅大魔術(徐徐炸)'},
  { value: '比例削減/單體', label: '比例削減/單體'},
  { value: '比例削減/全體', label: '比例削減/全體'},
  { value: '_賦予我方效果', label: '賦予我方效果', disabled: true},
  { value: '強化傷害(自身)', label: '強化傷害(自身)'},
  { value: '強化傷害', label: '強化傷害/隊伍'},
  { value: '強化精靈/減輕傷害', label: '強化精靈/減輕傷害'},
  { value: '強化精靈/強化傷害＆減輕傷害', label: '強化精靈/強化傷害＆減輕傷害'},
  { value: '強化精靈/持續回復＆減輕傷害', label: '強化精靈/持續回復＆減輕傷害'},
  { value: '強化精靈/逐漸回復＆強化傷害', label: '強化精靈/持續回復＆強化傷害'},
  { value: '提昇(自身)', label: '提昇(自身) (Boost)'},
  { value: '提昇', label: '提昇 (Boost)'},
  { value: '防禦', label: '傷害減輕'},
  { value: '提升能力數值', label: '提升能力數值'},
  { value: '異常狀態失效', label: '異常狀態失效'},
  { value: '阻隔傷害', label: '阻隔傷害(數字盾)'},
  { value: '鐵壁‧極', label: '鐵壁‧極'},
  { value: '技能充填', label: '技能充填'},
  { value: '技能充填＆延遲/全體', label: '技能充填＆延遲/全體'},
  { value: '技能充填＆延遲/單體', label: '技能充填＆延遲/單體'},
  { value: '反擊', label: '反擊'},
  { value: '挑撥', label: '挑撥(嘲諷)'},
  { value: '_妨害敵方', label: '妨害敵方', disabled: true},
  { value: '延遲/全體', label: '延遲/全體'},
  { value: '延遲/單體', label: '延遲/單體'},
  { value: '延遲大魔術/全體', label: '延遲大魔術/全體(延遲效果並給予傷害)'},
  { value: '延遲大魔術/單體', label: '延遲大魔術/單體(延遲效果並給予傷害)'},
  { value: '毒', label: '毒'},
  { value: '虛無之瞳', label: '虛無之瞳(鮭魚)'},
  { value: '弱化大魔術/單體', label: '弱化大魔術/單體'},
  { value: '弱化大魔術/全體', label: '弱化大魔術/全體'},
  { value: '效果解除/物理反擊', label: '效果解除/物理反擊'},
  { value: '效果解除大魔術/物理反擊＆技能反擊', label: '效果解除大魔術/物理反擊＆技能反擊'},
  { value: '效果解除/防禦', label: '效果解除/防禦'},
  { value: '效果解除/防禦＆阻隔傷害', label: '效果解除/防禦＆阻隔傷害'},
  { value: '效果解除(單體)/物理反擊', label: '效果解除/物理反擊/單體'},
  { value: '效果解除(單體)/防禦＆阻隔傷害', label: '效果解除/防禦＆阻隔傷害/單體'},
  { value: '效果解除大魔術/防禦＆阻隔傷害', label: '效果解除大魔術/防禦＆阻隔傷害'},
  { value: '效果解除大魔術/防禦＆阻隔傷害＆技能反擊', label: '效果解除大魔術/防禦＆阻隔傷害＆技能反擊'},
  { value: '_回復相關', label: '回復相關', disabled: true},
  { value: '回復', label: '回復'},
  { value: '持續回復', label: '持續回復(徐徐回復)'},
  { value: '回復異常狀態', label: '回復異常狀態'},
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活'},
  { value: '回復/指定屬性', label: '回復/指定屬性'},
  { value: '復活', label: '復活'},
  { value: '自我犧牲復活', label: '自我犧牲復活'},
  { value: '起死回生', label: '起死回生'},
  { value: '_連鎖相關', label: '連鎖相關', disabled: true},
  { value: '斬擊大魔術', label: '斬擊大魔術'},
  { value: '防禦連鎖', label: '連鎖數保護'},
  { value: '_題目相關', label: '題目變換/賦予效果', disabled: true},
  { value: '重新洗牌', label: '重新洗牌'},
  { value: '變換問題類型', label: '變換問題類型'},
  { value: '特殊變換問題類型/連鎖數增加', label: '特殊變換問題類型/連鎖數增加'},
  { value: '特殊變換問題類型/強化傷害', label: '特殊變換問題類型/強化傷害'},
  { value: '特殊變換問題類型/防禦', label: '特殊變換問題類型/防禦'},
  { value: '特殊變換問題類型/回復', label: '特殊變換問題類型/回復'},
  { value: '特殊變換問題類型/技能充填', label: '特殊變換問題類型/技能充填'},
  { value: '特殊變換問題類型/隨機', label: '特殊變換問題類型/隨機'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '刪去回答', label: '刪去回答'},
  { value: '延長AS時間限制', label: '延長AS時間限制'},
  { value: '無', label: '無'},
];
export const SKILL_SS2 = [
  { value: '_攻擊', label: '攻擊/傷害', disabled: true},
  { value: '大魔術/單體', label: '大魔術/單體(給予單體傷害)'},
  { value: '大魔術/全體', label: '大魔術/全體(給予全體傷害)'},
  { value: '特效大魔術/全體', label: '特效大魔術/全體(特效傷害)'},
  { value: '特效大魔術/單體', label: '特效大魔術/單體(特效傷害)'},
  { value: '反動大魔術/全體', label: '反動大魔術/全體(給予傷害後陷入封印狀態)'},
  { value: '反動大魔術‧蝕/單體', label: '反動大魔術‧蝕/單體(給予傷害後陷入封印狀態)'},
  { value: '自我犧牲魔術/單體', label: '自我犧牲魔術/單體(使用HP造成傷害)'},
  { value: '自我犧牲魔術/全體', label: '自我犧牲魔術/全體(使用HP造成傷害)'},
  { value: '犧牲魔術/單體', label: '犧牲魔術/單體(使用全體HP造成傷害)'},
  { value: '犧牲魔術/全體', label: '犧牲魔術/全體(使用全體HP造成傷害)'},
  { value: '多重魔術', label: '多重魔術(連擊)'},
  { value: '殘滅大魔術', label: '殘滅大魔術(徐徐炸)'},
  { value: '比例削減/單體', label: '比例削減/單體'},
  { value: '比例削減/全體', label: '比例削減/全體'},
  { value: '_賦予我方效果', label: '賦予我方效果', disabled: true},
  { value: '強化傷害(自身)', label: '強化傷害(自身)'},
  { value: '強化傷害', label: '強化傷害/隊伍'},
  { value: '強化精靈/減輕傷害', label: '強化精靈/減輕傷害'},
  { value: '強化精靈/強化傷害＆減輕傷害', label: '強化精靈/強化傷害＆減輕傷害'},
  { value: '強化精靈/逐漸回復＆強化傷害', label: '強化精靈/持續回復＆強化傷害'},
  { value: '強化精靈/持續回復＆減輕傷害＆強化傷害', label: '強化精靈/持續回復＆減輕傷害＆強化傷害'},
  { value: '提昇(自身)', label: '提昇(自身) (Boost)'},
  { value: '提昇', label: '提昇 (Boost)'},
  { value: '防禦', label: '傷害減輕'},
  { value: '提升能力數值', label: '提升能力數值'},
  { value: '異常狀態失效', label: '異常狀態失效'},
  { value: '阻隔傷害', label: '阻隔傷害(數字盾)'},
  { value: '鐵壁‧極', label: '鐵壁‧極'},
  { value: '技能充填', label: '技能充填'},
  { value: '技能充填＆延遲/全體', label: '技能充填＆延遲/全體'},
  { value: '技能充填＆延遲/單體', label: '技能充填＆延遲/單體'},
  { value: '反擊', label: '反擊'},
  { value: '挑撥', label: '挑撥(嘲諷)'},
  { value: '_妨害敵方', label: '妨害敵方', disabled: true},
  { value: '延遲/全體', label: '延遲/全體'},
  { value: '延遲/單體', label: '延遲/單體'},
  { value: '延遲大魔術/全體', label: '延遲大魔術/全體(延遲效果並給予傷害)'},
  { value: '延遲大魔術/單體', label: '延遲大魔術/單體(延遲效果並給予傷害)'},
  { value: '毒', label: '毒'},
  { value: '虛無之瞳', label: '虛無之瞳(鮭魚)'},
  { value: '弱化大魔術/單體', label: '弱化大魔術/單體'},
  { value: '弱化大魔術/全體', label: '弱化大魔術/全體'},
  { value: '效果解除大魔術/物理反擊', label: '效果解除大魔術/物理反擊'},
  { value: '效果解除大魔術(單體)/物理反擊', label: '效果解除/物理反擊/單體'},
  { value: '效果解除大魔術/物理反擊＆技能反擊', label: '效果解除大魔術/物理反擊＆技能反擊'},
  { value: '效果解除/防禦＆阻隔傷害', label: '效果解除/防禦＆阻隔傷害'},
  { value: '解除效果大魔術/阻隔傷害', label: '解除效果大魔術/阻隔傷害'},
  { value: '效果解除大魔術/防禦＆阻隔傷害', label: '效果解除大魔術/防禦＆阻隔傷害'},
  { value: '效果解除大魔術(單體)/防禦＆阻隔傷害', label: '效果解除/防禦＆阻隔傷害/單體'},
  { value: '效果解除大魔術/防禦＆阻隔傷害＆技能反擊', label: '效果解除大魔術/防禦＆阻隔傷害＆技能反擊'},
  { value: '效果解除大魔術/屬性吸收', label: '效果解除大魔術/屬性吸收'},
  { value: '_回復相關', label: '回復相關', disabled: true},
  { value: '回復', label: '回復'},
  { value: '持續回復', label: '持續回復(徐徐回復)'},
  { value: '回復/額外附加效果', label: '回復/額外附加效果'},
  { value: '回復異常狀態', label: '回復異常狀態'},
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活'},
  { value: '回復/指定屬性', label: '回復/指定屬性'},
  { value: '復活', label: '復活'},
  { value: '自我犧牲復活', label: '自我犧牲復活'},
  { value: '起死回生', label: '起死回生'},
  { value: '_連鎖相關', label: '連鎖相關', disabled: true},
  { value: '斬擊大魔術', label: '斬擊大魔術'},
  { value: '防禦連鎖', label: '連鎖數保護'},
  { value: '_題目相關', label: '題目變換/賦予效果', disabled: true},
  { value: '變換問題類型', label: '變換問題類型'},
  { value: '特殊變換問題類型/連鎖數增加', label: '特殊變換問題類型/連鎖數增加'},
  { value: '特殊變換問題類型/強化傷害', label: '特殊變換問題類型/強化傷害'},
  { value: '特殊變換問題類型/防禦', label: '特殊變換問題類型/防禦'},
  { value: '特殊變換問題類型/回復', label: '特殊變換問題類型/回復'},
  { value: '特殊變換問題類型/技能充填', label: '特殊變換問題類型/技能充填'},
  { value: '特殊變換問題類型/隨機', label: '特殊變換問題類型/隨機'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '刪去回答', label: '刪去回答'},
  { value: '延長AS時間限制', label: '延長AS時間限制'},
  { value: '無', label: '無'}
];
export const ZZ = [
  { value: '戰鬥結束後HP回復', label: '戰後回復'},
  { value: '九死一生', label: '九死一生'},
  { value: '心眼', label: '心眼'},
  { value: '心眼‧破', label: '心眼‧破'},
  { value: '答題技能封印失效', label: 'AS技能封印無效'},
  { value: '特殊技能封印失效', label: 'SS封印無效'},
  { value: '使敵方技能的封印失效', label: '封印無效'},
  { value: '特殊技能、答題技能封印失效', label: 'AS、SS封印無效'},
  { value: '毒攻擊失效', label: '毒攻擊無效'},
  { value: '死亡秒針失效', label: '死亡秒針無效'},
  { value: '毒攻擊、屬性弱化、死亡秒針失效', label: '毒、屬性弱化、死秒無效'},
  { value: '消除技能充填失效', label: '消除技能充填無效'},
  { value: '回復反轉失效', label: '回復反轉無效'},
  { value: '獲得EXP量上升', label: '獲得EXP量上升'},
  { value: '獲得金幣量上升', label: '獲得金幣量上升'},
  { value: '掉寶率上升', label: '掉寶率上升'},
  { value: '減少難易度', label: '問答難易度微幅下降'},
  { value: '更換精靈', label: '更換精靈'}
  { value: '提升連鎖', label: '任務開始時賦予連鎖數加1的效果'}
  { value: '防禦連鎖', label: '於一次任務中，僅限一次保護連鎖數'}
];
