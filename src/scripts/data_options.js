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
  { value: '攻擊・種族數攻擊', label: '攻擊・種族數攻擊'},
  { value: '連鎖攻擊', label: '連鎖攻擊'},
  { value: '連鎖攻擊・防禦', label: '連鎖攻擊・防禦'},
  { value: '連鎖攻擊・屬性特效', label: '連鎖攻擊・屬性特效'},
  { value: '連鎖攻擊・屬性特效・防禦', label: '連鎖攻擊・屬性特效・防禦'},
  { value: '連鎖攻擊・強化複屬性攻擊', label: '連鎖攻擊・強化複屬性攻擊'},
  { value: '連鎖攻擊・種族數攻擊', label: '連鎖攻擊・依種族精靈數攻擊上升'},
  { value: '連鎖攻擊・強化種族攻擊', label: '連鎖攻擊・強化指定種族攻擊'},
  { value: '連鎖攻擊・悲嘆的憤怒', label: '連鎖攻擊・悲嘆的憤怒'},
  { value: '連鎖攻擊・回復', label: '連鎖攻擊・回復'},
  { value: '連鎖攻擊・防禦・強化複屬性攻擊', label: '連鎖攻擊・防禦・強化複屬性攻擊'},
  { value: '種族數攻擊', label: '依種族精靈數攻擊上升'},
  { value: '種族數攻擊・種族特效', label: '依種族精靈數攻擊上升・種族特效'},
  { value: '種族數攻擊・強化種族攻擊', label: '依種族精靈數攻擊上升・強化種族攻擊'},
  { value: '種族數攻擊・強化攻擊', label: '依種族精靈數攻擊上升・強化自身攻擊'},
  { value: '瀕死攻擊', label: '瀕死攻擊上升'},
  { value: '瀕死攻擊・防禦', label: '瀕死攻擊上升・防禦'},
  { value: '精神抖擻攻擊', label: '精神抖擻攻擊(血量一定比例以上攻擊上升)'},
  { value: '問題類型顏色數攻擊', label: '依問題類型顏色數攻擊上升'},
  { value: '悲嘆的憤怒', label: '悲嘆的憤怒(依己方陣亡數增加傷害)'},
  { value: '賭博攻擊', label: '賭博攻擊'},
  { value: '_隊伍攻擊上升系', label: '隊伍攻擊上升', disabled: true},
  { value: '強化攻擊', label: '強化隊伍攻擊'},
  { value: '強化攻擊・連鎖攻擊', label: '強化隊伍攻擊・連鎖攻擊'},
  { value: '強化攻擊・屬性特效', label: '強化隊伍攻擊・屬性特效'},
  { value: '強化攻擊・屬性特效連擊', label: '強化隊伍攻擊・屬性特效連擊'},
  { value: '強化攻擊・防禦', label: '強化隊伍攻擊・防禦'},
  { value: '強化攻擊・分散攻擊', label: '強化隊伍攻擊・分散攻擊'},
  { value: '強化攻擊・強化複屬性攻擊', label: '強化攻擊・強化複屬性攻擊'},
  { value: '強化攻擊・連擊', label: '強化攻擊・連擊'},
  { value: '強化攻擊・回復', label: '強化攻擊・回復'},
  { value: '強化複屬性攻擊', label: '強化複屬性攻擊'},
  { value: '強化複屬性攻擊・強化種族攻擊', label: '強化複屬性攻擊・強化指定種族攻擊'},
  { value: '強化複屬性攻擊・屬性特效', label: '強化複屬性攻擊・屬性特效'},
  { value: '強化複屬性攻擊・防禦', label: '強化複屬性攻擊・防禦'},
  { value: '強化種族攻擊', label: '強化種族攻擊'},
  { value: '強化種族攻擊・屬性特效', label: '強化指定種族攻擊・屬性特效'},
  { value: '強化種族攻擊・防禦', label: '強化指定種族攻擊・防禦'},
  { value: '強化種族攻擊・瀕死攻擊', label: '強化指定種族攻擊・瀕死攻擊'},
  { value: '強化種族攻擊・連鎖攻擊', label: '強化指定種族攻擊・連鎖攻擊'},
  { value: '_連擊系', label: '連擊系', disabled: true},
  { value: '連擊', label: '連擊'},
  { value: '連擊・強化攻擊', label: '連擊・強化攻擊'},
  { value: '連擊・瀕死攻擊', label: '連擊・瀕死攻擊'},
  { value: '連擊・賭博攻擊', label: '連擊・賭博攻擊'},
  { value: '連擊・強化複屬性攻擊', label: '連擊・強化複屬性攻擊'},
  { value: '連擊・強化種族攻擊', label: '連擊・強化種族攻擊'},
  { value: '連擊・屬性特效', label: '連擊・屬性特效'},
  { value: '連擊・回復', label: '連擊・回復'},
  { value: '連擊・防禦', label: '連擊・防禦'},
  { value: '_特效系', label: '特效系', disabled: true},
  { value: '屬性特效', label: '屬性特效'},
  { value: '屬性特效・強化攻擊', label: '屬性特效・強化攻擊'},
  { value: '屬性特效・強化複屬性攻擊', label: '屬性特效・強化複屬性攻擊'},
  { value: '屬性特效・種族數攻擊', label: '屬性特效・種族數攻擊'},
  { value: '屬性特效・回復', label: '屬性特效・回復'},
  { value: '屬性特效・悲嘆的憤怒', label: '屬性特效・悲嘆的憤怒'},
  { value: '屬性特效・賭博攻擊', label: '屬性特效・賭博攻擊'},
  { value: '屬性特效連擊', label: '屬性特效連擊'},
  { value: '屬性特效連擊・強化攻擊', label: '屬性特效連擊・強化攻擊'},
  { value: '屬性特效・強化種族攻擊', label: '屬性特效・強化種族攻擊'},
  { value: '屬性特效連擊・強化複屬性攻擊', label: '屬性特效連擊・強化複屬性攻擊'},
  { value: '種族特效', label: '種族特效'},
  { value: '種族特效・防禦', label: '種族特效・防禦'},
  { value: '種族特效・強化攻擊', label: '種族特效・強化攻擊'},
  { value: '種族特效・強化複屬性攻擊', label: '種族特效・強化複屬性攻擊'},
  { value: '_全體攻擊系', label: '全體攻擊系', disabled: true},
  { value: '分散攻擊', label: '分散攻擊'},
  { value: '分散攻擊・防禦', label: '分散攻擊・防禦'},
  { value: '全體攻擊', label: '全體攻擊'},
  { value: '全體攻擊・回復', label: '全體攻擊・回復'},
  { value: '全體攻擊・回復・防禦', label: '全體攻擊・回復・防禦'},
  { value: '全體攻擊・防禦', label: '全體攻擊・防禦'},
  { value: '種族特效(全體)', label: '種族特效(全體)'},
  { value: '_回復系', label: '回復系', disabled: true},
  { value: '回復', label: '回復'},
  { value: '回復・連鎖攻擊', label: '回復・連鎖攻擊'},
  { value: '回復・強化攻擊', label: '回復・強化攻擊'},
  { value: '回復・強化種族攻擊', label: '回復・強化種族攻擊'},
  { value: '回復・強化複屬性攻擊', label: '回復・強化複屬性攻擊'},
  { value: '回復・種族數攻擊', label: '回復・依種族精靈數攻擊上升'},
  { value: '回復・強化攻擊・防禦', label: '回復・強化攻擊・防禦'},
  { value: '回復・屬性特效', label: '回復・屬性特效'},
  { value: '回復・連擊', label: '回復・連擊'},
  { value: '回復・防禦', label: '回復・防禦'},
  { value: '回復・防禦・連鎖攻擊', label: '回復・防禦・連鎖攻擊'},
  { value: '連鎖回復', label: '連鎖回復'},
  { value: '回復(自身)', label: '回復(自身)'},
  { value: '_防禦', label: '防禦', disabled: true},
  { value: '防禦', label: '防禦'},
  { value: '防禦・屬性特效', label: '防禦・屬性特效'},
  { value: '防禦・強化攻擊', label: '防禦・強化攻擊'},
  { value: '防禦・精神抖擻攻擊', label: '防禦・精神抖擻攻擊'},
  { value: '防禦・強化複屬性攻擊', label: '防禦・強化複屬性攻擊'},
  { value: '防禦・強化種族攻擊・屬性特效連擊', label: '防禦・強化種族攻擊・屬性特效連擊'},
  { value: '防禦・強化複屬性攻擊・回復', label: '防禦・強化複屬性攻擊・回復'},
  { value: '防禦・回復', label: '防禦・回復'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '吸收', label: '吸收'},
  { value: '屬性的庇佑', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)'},
  { value: '屬性的庇佑・問題類型顏色數攻擊', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)・依問題類型顏色數攻擊上升'},
  { value: '屬性的庇佑・種族數攻擊', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)・依種族精靈數攻擊上升'},
  { value: '無', label: '無技能'}
];
export const SKILL_AS2 = [
  { value: '_自身攻擊上升系', label: '自身攻擊上升', disabled: true},
  { value: '攻擊', label: '攻擊上升'},
  { value: '攻擊・回復', label: '攻擊上升・回復'},
  { value: '攻擊・強化種族攻擊', label: '攻擊・強化指定種族攻擊'},
  { value: '攻擊・種族數攻擊', label: '攻擊・種族數攻擊'},
  { value: '連鎖攻擊', label: '連鎖攻擊'},
  { value: '連鎖攻擊・防禦', label: '連鎖攻擊・防禦'},
  { value: '連鎖攻擊・防禦・強化複屬性攻擊', label: '連鎖攻擊・防禦・強化複屬性攻擊'},
  { value: '連鎖攻擊・屬性特效', label: '連鎖攻擊・屬性特效'},
  { value: '連鎖攻擊・屬性特效・防禦', label: '連鎖攻擊・屬性特效・防禦'},
  { value: '連鎖攻擊・強化複屬性攻擊', label: '連鎖攻擊・強化複屬性攻擊'},
  { value: '連鎖攻擊・種族數攻擊', label: '連鎖攻擊・依種族精靈數攻擊上升'},
  { value: '連鎖攻擊・強化種族攻擊', label: '連鎖攻擊・強化指定種族攻擊'},
  { value: '連鎖攻擊・回復', label: '連鎖攻擊・回復'},
  { value: '連鎖攻擊・悲嘆的憤怒', label: '連鎖攻擊・悲嘆的憤怒'},
  { value: '種族數攻擊', label: '依種族精靈數攻擊上升'},
  { value: '種族數攻擊・種族特效', label: '依種族精靈數攻擊上升・種族特效'},
  { value: '種族數攻擊・強化種族攻擊', label: '依種族精靈數攻擊上升・強化種族攻擊'},
  { value: '種族數攻擊・強化攻擊', label: '依種族精靈數攻擊上升・強化自身攻擊'},
  { value: '瀕死攻擊', label: '瀕死攻擊上升'},
  { value: '瀕死攻擊・防禦', label: '瀕死攻擊上升・防禦'},
  { value: '精神抖擻攻擊', label: '精神抖擻攻擊(血量一定比例以上攻擊上升)'},
  { value: '問題類型顏色數攻擊', label: '依問題類型顏色數攻擊上升'},
  { value: '悲嘆的憤怒', label: '悲嘆的憤怒(依己方陣亡數增加傷害)'},
  { value: '賭博攻擊', label: '賭博攻擊'},
  { value: '_隊伍攻擊上升系', label: '隊伍攻擊上升', disabled: true},
  { value: '強化攻擊', label: '強化隊伍攻擊'},
  { value: '強化攻擊・連鎖攻擊', label: '強化隊伍攻擊・連鎖攻擊'},
  { value: '強化攻擊・屬性特效', label: '強化隊伍攻擊・屬性特效'},
  { value: '強化攻擊・屬性特效連擊', label: '強化隊伍攻擊・屬性特效連擊'},
  { value: '強化攻擊・防禦', label: '強化隊伍攻擊・防禦'},
  { value: '強化攻擊・種族數攻擊', label: '強化隊伍攻擊・依種族精靈數攻擊上升'},
  { value: '強化攻擊・分散攻擊', label: '強化隊伍攻擊・分散攻擊'},
  { value: '強化攻擊・強化複屬性攻擊', label: '強化攻擊・強化複屬性攻擊'},
  { value: '強化攻擊・連擊', label: '強化攻擊・連擊'},
  { value: '強化攻擊・回復', label: '強化攻擊・回復'},
  { value: '強化複屬性攻擊', label: '強化複屬性攻擊'},
  { value: '強化複屬性攻擊・屬性特效', label: '強化複屬性攻擊・屬性特效'},
  { value: '強化複屬性攻擊・強化種族攻擊', label: '強化複屬性攻擊・強化指定種族攻擊'},
  { value: '強化複屬性攻擊・防禦', label: '強化複屬性攻擊・防禦'},
  { value: '強化種族攻擊', label: '強化種族攻擊'},
  { value: '強化種族攻擊・屬性特效', label: '強化指定種族攻擊・屬性特效'},
  { value: '強化種族攻擊・防禦', label: '強化指定種族攻擊・防禦'},
  { value: '強化種族攻擊・瀕死攻擊', label: '強化指定種族攻擊・瀕死攻擊'},
  { value: '強化種族攻擊・連鎖攻擊', label: '強化指定種族攻擊・連鎖攻擊'},
  { value: '_連擊系', label: '連擊系', disabled: true},
  { value: '連擊', label: '連擊'},
  { value: '連擊・屬性特效', label: '連擊・屬性特效'},
  { value: '連擊・強化種族攻擊', label: '連擊・強化種族攻擊'},
  { value: '連擊・強化複屬性攻擊', label: '連擊・強化複屬性攻擊'},
  { value: '連擊・回復', label: '連擊・回復'},
  { value: '連擊・防禦', label: '連擊・防禦'},
  { value: '連擊・瀕死攻擊', label: '連擊・瀕死攻擊'},
  { value: '連擊・強化攻擊', label: '連擊・強化攻擊'},
  { value: '連擊・賭博攻擊', label: '連擊・賭博攻擊'},
  { value: '_特效系', label: '特效系', disabled: true},
  { value: '屬性特效', label: '屬性特效'},
  { value: '屬性特效・強化攻擊', label: '屬性特效・強化攻擊'},
  { value: '屬性特效・強化種族攻擊', label: '屬性特效・強化種族攻擊'},
  { value: '屬性特效・強化複屬性攻擊', label: '屬性特效・強化複屬性攻擊'},
  { value: '屬性特效・種族數攻擊', label: '屬性特效・種族數攻擊'},
  { value: '屬性特效・回復', label: '屬性特效・回復'},
  { value: '屬性特效・悲嘆的憤怒', label: '屬性特效・悲嘆的憤怒'},
  { value: '屬性特效・賭博攻擊', label: '屬性特效・賭博攻擊'},
  { value: '屬性特效連擊', label: '屬性特效連擊'},
  { value: '屬性特效連擊・強化攻擊', label: '屬性特效連擊・強化攻擊'},
  { value: '屬性特效連擊・強化複屬性攻擊', label: '屬性特效連擊・強化複屬性攻擊'},
  { value: '種族特效', label: '種族特效'},
  { value: '種族特效・防禦', label: '種族特效・防禦'},
  { value: '種族特效・強化攻擊', label: '種族特效・強化攻擊'},
  { value: '種族特效・強化複屬性攻擊', label: '種族特效・強化複屬性攻擊'},
  { value: '_全體攻擊系', label: '全體攻擊系', disabled: true},
  { value: '分散攻擊', label: '分散攻擊'},
  { value: '分散攻擊・防禦', label: '分散攻擊・防禦'},
  { value: '全體攻擊', label: '全體攻擊'},
  { value: '全體攻擊・回復', label: '全體攻擊・回復'},
  { value: '全體攻擊・回復・防禦', label: '全體攻擊・回復・防禦'},
  { value: '全體攻擊・防禦', label: '全體攻擊・防禦'},
  { value: '種族特效(全體)', label: '種族特效(全體)'},
  { value: '_回復系', label: '回復系', disabled: true},
  { value: '回復', label: '回復'},
  { value: '回復・防禦', label: '回復・防禦'},
  { value: '回復・強化攻擊・防禦', label: '回復・強化攻擊・防禦'},
  { value: '回復・強化攻擊', label: '回復・強化攻擊'},
  { value: '回復・強化種族攻擊', label: '回復・強化種族攻擊'},
  { value: '回復・強化複屬性攻擊', label: '回復・強化複屬性攻擊'},
  { value: '回復・種族數攻擊', label: '回復・依種族精靈數攻擊上升'},
  { value: '回復・屬性特效', label: '回復・屬性特效'},
  { value: '回復・連鎖攻擊', label: '回復・連鎖攻擊'},
  { value: '回復・連擊', label: '回復・連擊'},
  { value: '回復・防禦・連鎖攻擊', label: '回復・防禦・連鎖攻擊'},
  { value: '連鎖回復', label: '連鎖回復'},
  { value: '回復(自身)', label: '回復(自身)'},
  { value: '_防禦', label: '防禦', disabled: true},
  { value: '防禦', label: '防禦'},
  { value: '防禦・強化攻擊', label: '防禦・強化攻擊'},
  { value: '防禦・精神抖擻攻擊', label: '防禦・精神抖擻攻擊'},
  { value: '防禦・屬性特效', label: '防禦・屬性特效'},
  { value: '防禦・強化複屬性攻擊', label: '防禦・強化複屬性攻擊'},
  { value: '防禦・強化複屬性攻擊・回復', label: '防禦・強化複屬性攻擊・回復'},
  { value: '防禦・強化種族攻擊・屬性特效連擊', label: '防禦・強化種族攻擊・屬性特效連擊'},
  { value: '防禦・回復', label: '防禦・回復'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '吸收', label: '吸收'},
  { value: '屬性的庇佑', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)'},
  { value: '屬性的庇佑・問題類型顏色數攻擊', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)・依問題類型顏色數攻擊上升'},
  { value: '屬性的庇佑・種族數攻擊', label: '屬性的庇佑(依隊伍屬性數提升攻擊力)・依種族精靈數攻擊上升'},
  { value: '無', label: '無技能'}
];
export const SKILL_SS = [
  { value: '_攻擊', label: '攻擊/傷害', disabled: true},
  { value: '大魔術(單體)', label: '大魔術(給予單體傷害)'},
  { value: '大魔術(全體)', label: '大魔術(給予全體傷害)'},
  { value: '特效大魔術(單體)', label: '特效大魔術(給予單體特效傷害)'},
  { value: '特效大魔術(全體)', label: '特效大魔術(給予全體特效傷害)'},
  { value: '反動大魔術(單體)', label: '反動大魔術(給予單體傷害後自身陷入封印狀態)'},
  { value: '反動大魔術(全體)', label: '反動大魔術(給予全體傷害後自身陷入封印狀態)'},
  { value: '反動大魔術‧蝕(單體)', label: '反動大魔術‧蝕(給予單體傷害後全體陷入封印狀態)'},
  { value: '反動大魔術‧蝕(全體)', label: '反動大魔術‧蝕(給予全體傷害後全體陷入封印狀態)'},
  { value: '自我犧牲魔術(單體)', label: '自我犧牲魔術(使用自身HP造成單體傷害)'},
  { value: '自我犧牲魔術(全體)', label: '自我犧牲魔術(使用自身HP造成全體傷害)'},
  { value: '犧牲魔術(單體)', label: '犧牲魔術(使用全體HP造成單體傷害)'},
  { value: '犧牲魔術(全體)', label: '犧牲魔術(使用全體HP造成全體傷害)'},
  { value: '多重魔術(單體)', label: '多重魔術(單體)'},
  { value: '多重魔術(全體)', label: '多重魔術(全體)'},
  { value: '殘滅大魔術', label: '殘滅大魔術(徐徐炸)'},
  { value: '詠唱大魔術', label: '詠唱大魔術'},
  { value: '詠唱多重大魔術', label: '詠唱多重大魔術'},
  { value: '時限大魔術', label: '時限大魔術'},
  { value: '純屬性大魔術(單體)', label: '純屬性大魔術(單體)'},
  { value: '純屬性大魔術(全體)', label: '純屬性大魔術(全體)'},
  { value: '激化大魔術', label: '激化大魔術'},
  { value: '炸裂大魔術', label: '炸裂大魔術'},
  { value: '連鎖解放大魔術', label: '連鎖解放大魔術'},
  { value: '統一大魔術', label: '統一大魔術'},
  { value: '捕食大魔術(全體)', label: '捕食大魔術(全體)'},
  { value: '融合大魔術(全體)', label: '融合大魔術(全體)'},
  { value: '比例削減(單體)', label: '給予敵方單體當前HP削減'},
  { value: '比例削減(全體)', label: '給予敵方全體當前HP削減'},
  { value: '_賦予我方效果', label: '賦予我方效果', disabled: true},
  { value: '強化傷害(自身)', label: '強化傷害(自身)'},
  { value: '強化傷害(全體)', label: '強化傷害(全體)'},
  { value: '強化傷害(指定屬性)', label: '強化傷害(指定屬性)'},
  { value: '強化精靈【強化傷害】', label: '強化精靈【強化傷害】'},
  { value: '強化精靈【提升能力數值】', label: '強化精靈【提升能力數值】'},
  { value: '強化精靈【強化傷害＆減輕傷害】', label: '強化精靈【強化傷害＆減輕傷害】'},
  { value: '強化精靈【持續回復＆強化傷害】', label: '強化精靈【持續回復＆強化傷害】'},
  { value: '強化精靈【持續回復＆提升能力數值】', label: '強化精靈【持續回復＆提升能力數值】'},
  { value: '強化精靈【持續回復＆異常狀態失效】', label: '強化精靈【持續回復＆異常狀態失效】'},
  { value: '強化精靈【持續回復＆減輕傷害】', label: '強化精靈【持續回復＆減輕傷害】'},
  { value: '強化精靈【持續回復＆減輕傷害＆強化傷害】', label: '強化精靈【持續回復＆減輕傷害＆強化傷害】'},
  { value: '強化精靈【減輕傷害】', label: '強化精靈【減輕傷害】'},
  { value: '強化精靈【異常狀態失效】', label: '強化精靈【異常狀態失效】'},
  { value: '強化複屬性傷害', label: '強化複屬性傷害'},
  { value: '犧牲連鎖強化', label: '犧牲連鎖強化'},
  { value: '純屬性強化', label: '純屬性強化'},
  { value: '融合強化(全體)', label: '融合強化(全體)'},
  { value: 'AS倍率強化', label: 'AS倍率強化'},
  { value: '提昇(自身)', label: '提昇(自身)'},
  { value: '提昇(全體)', label: '提昇(全體)'},
  { value: '提昇(單體)', label: '提昇(單體)'},
  { value: '提昇(相鄰)', label: '提昇(相鄰)'},
  { value: '狂暴化', label: '狂暴化'},
  { value: '行動感應', label: '行動感應'},
  { value: '強化擊破', label: '強化擊破'},
  { value: '防禦', label: '傷害減輕'},
  { value: '提升能力數值(自身)', label: '提升能力數值(自身)'},
  { value: '提升能力數值(全體)', label: '提升能力數值(全體)'},
  { value: '異常狀態失效', label: '異常狀態失效'},
  { value: '阻隔傷害', label: '阻隔傷害(數字盾)'},
  { value: '鐵壁‧極', label: '鐵壁‧極'},
  { value: '賦予雙重技能(單體)', label: '賦予雙重技能(單體)'},
  { value: '賦予雙重技能(全體)', label: '賦予雙重技能(全體)'},
  { value: '技能充填(單體)', label: '技能充填(單體)'},
  { value: '技能充填(相鄰)', label: '技能充填(相鄰)'},
  { value: '技能充填(全體)', label: '技能充填(全體)'},
  { value: '技能充填＆延遲(全體)', label: '技能充填＆延遲(全體)'},
  { value: '技能充填＆延遲(單體)', label: '技能充填＆延遲(單體)'},
  { value: '物理反擊', label: '物理反擊'},
  { value: '物理反擊(多段式反擊)', label: '物理反擊(多段式反擊)'},
  { value: '挑釁', label: '挑釁'},
  { value: '_妨害敵方', label: '妨害敵方', disabled: true},
  { value: '延遲(全體)', label: '延遲(全體)'},
  { value: '延遲(單體)', label: '延遲(單體)'},
  { value: '延遲大魔術(全體)', label: '延遲大魔術(延遲效果並給予全體傷害)'},
  { value: '延遲大魔術(單體)', label: '延遲大魔術(延遲效果並給予單體傷害)'},
  { value: '毒', label: '毒'},
  { value: '虛無之瞳', label: '虛無之瞳(鮭魚)'},
  { value: '弱化大魔術(單體)', label: '弱化大魔術(單體)'},
  { value: '弱化大魔術(全體)', label: '弱化大魔術(全體)'},
  { value: '解除效果(單體)【防禦＆阻隔傷害】', label: '解除效果(單體)【防禦＆阻隔傷害】'},
  { value: '解除效果(單體)【物理反擊】', label: '解除效果(單體)【物理反擊】'},
  { value: '解除效果(單體)【屬性吸收】', label: '解除效果(單體)【屬性吸收】'},
  { value: '解除效果(全體)【防禦】', label: '解除效果(全體)【防禦】'},
  { value: '解除效果(全體)【防禦＆阻隔傷害】', label: '解除效果(全體)【防禦＆阻隔傷害】'},
  { value: '解除效果(全體)【物理反擊】', label: '解除效果(全體)【物理反擊】'},
  { value: '解除效果(全體)【屬性吸收】', label: '解除效果(全體)【屬性吸收】'},
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害】', label: '解除效果大魔術(全體)【防禦＆阻隔傷害】'},
  { value: '解除效果大魔術(全體)【物理反擊】', label: '解除效果大魔術(全體)【物理反擊】'},
  { value: '解除效果大魔術(全體)【物理反擊＆技能反擊】', label: '解除效果大魔術(全體)【物理反擊＆技能反擊】'},
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】', label: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】'},
  { value: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】', label: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】'},
  { value: '_回復相關', label: '回復相關', disabled: true},
  { value: '回復', label: '回復'},
  { value: '持續回復(自身)', label: '持續回復(自身徐徐回復)'},
  { value: '持續回復', label: '持續回復(全體徐徐回復)'},
  { value: '回復異常狀態', label: '回復異常狀態'},
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活'},
  { value: '回復/指定屬性', label: '回復/指定屬性'},
  { value: '復活', label: '復活'},
  { value: '自我犧牲復活', label: '自我犧牲復活'},
  { value: '起死回生(單體)', label: '起死回生(單體)'},
  { value: '起死回生', label: '起死回生'},
  { value: '複屬性回復', label: '複屬性回復'},
  { value: '_連鎖相關', label: '連鎖相關', disabled: true},
  { value: '斬擊大魔術', label: '斬擊大魔術'},
  { value: '一閃斬擊大魔術', label: '一閃斬擊大魔術'},
  { value: '防禦連鎖', label: '連鎖數保護'},
  { value: '_題目相關', label: '題目變換/賦予效果', disabled: true},
  { value: '重新洗牌', label: '重新洗牌'},
  { value: '變換問題類型', label: '變換問題類型'},
  { value: '特殊變換問題類型【連鎖數增加】', label: '特殊變換問題類型【連鎖數增加】'},
  { value: '特殊變換問題類型【強化傷害】', label: '特殊變換問題類型【強化傷害】'},
  { value: '特殊變換問題類型【減輕傷害】', label: '特殊變換問題類型【減輕傷害】'},
  { value: '特殊變換問題類型【回復】', label: '特殊變換問題類型【回復】'},
  { value: '特殊變換問題類型【技能充填】', label: '特殊變換問題類型【技能充填】'},
  { value: '特殊變換問題類型【隨機】', label: '特殊變換問題類型【隨機】'},
  { value: '特殊變換問題類型【連鎖數增加＆強化傷害】', label: '特殊變換問題類型【連鎖數增加＆強化傷害】'},
  { value: '特殊變換問題類型【連鎖數增加＆技能充填】', label: '特殊變換問題類型【連鎖數增加＆技能充填】'},
  { value: '特殊變換問題類型【減輕傷害＆回復】', label: '特殊變換問題類型【減輕傷害＆回復】'},
  { value: '特殊變換問題類型【減輕傷害＆技能充填】', label: '特殊變換問題類型【減輕傷害＆技能充填】'},
  { value: '產生連結問題類型', label: '產生連結問題類型'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '刪去回答', label: '刪去回答'},
  { value: '延長AS時間限制', label: '延長AS時間限制'},
  { value: '無', label: '無'},
];
export const SKILL_SS2 = [
  { value: '_攻擊', label: '攻擊/傷害', disabled: true},
  { value: '大魔術(單體)', label: '大魔術(給予單體傷害)'},
  { value: '大魔術(全體)', label: '大魔術(給予全體傷害)'},
  { value: '特效大魔術(單體)', label: '特效大魔術(給予單體特效傷害)'},
  { value: '特效大魔術(全體)', label: '特效大魔術(給予全體特效傷害)'},
  { value: '反動大魔術(全體)', label: '反動大魔術(給予全體傷害後自身陷入封印狀態)'},
  { value: '反動大魔術‧蝕(單體)', label: '反動大魔術‧蝕(給予單體傷害後全體陷入封印狀態)'},
  { value: '反動大魔術‧蝕(全體)', label: '反動大魔術‧蝕(給予全體傷害後全體陷入封印狀態)'},
  { value: '自我犧牲魔術(單體)', label: '自我犧牲魔術(使用自身HP造成單體傷害)'},
  { value: '自我犧牲魔術(全體)', label: '自我犧牲魔術(使用自身HP造成全體傷害)'},
  { value: '犧牲魔術(單體)', label: '犧牲魔術(使用全體HP造成單體傷害)'},
  { value: '犧牲魔術(全體)', label: '犧牲魔術(使用全體HP造成全體傷害)'},
  { value: '多重魔術(單體)', label: '多重魔術(單體)'},
  { value: '多重魔術(全體)', label: '多重魔術(全體)'},
  { value: '殘滅大魔術', label: '殘滅大魔術(徐徐炸)'},
  { value: '詠唱大魔術', label: '詠唱大魔術'},
  { value: '詠唱多重大魔術', label: '詠唱多重大魔術'},
  { value: '時限大魔術', label: '時限大魔術'},
  { value: '純屬性大魔術(單體)', label: '純屬性大魔術(單體)'},
  { value: '純屬性大魔術(全體)', label: '純屬性大魔術(全體)'},
  { value: '激化大魔術', label: '激化大魔術'},
  { value: '炸裂大魔術', label: '炸裂大魔術'},
  { value: '連鎖解放大魔術', label: '連鎖解放大魔術'},
  { value: '融合大魔術(全體)', label: '融合大魔術(全體)'},
  { value: '統一大魔術', label: '統一大魔術'},
  { value: '捕食大魔術(全體)', label: '捕食大魔術(全體)'},
  { value: '蓄積解放大魔術‧聖(全體)', label: '蓄積解放大魔術‧聖(全體)'},
  { value: '比例削減(單體)', label: '比例削減(單體)'},
  { value: '比例削減(全體)', label: '比例削減(全體)'},
  { value: '_賦予我方效果', label: '賦予我方效果', disabled: true},
  { value: '強化傷害(自身)', label: '強化傷害(自身)'},
  { value: '強化傷害(全體)', label: '強化傷害(全體)'},
  { value: '強化傷害(指定屬性)', label: '強化傷害(指定屬性)'},
  { value: '強化精靈【減輕傷害】', label: '強化精靈【減輕傷害】'},
  { value: '強化精靈【強化傷害】', label: '強化精靈【強化傷害】'},
  { value: '強化精靈【提升能力數值】', label: '強化精靈【提升能力數值】'},
  { value: '強化精靈【強化傷害＆減輕傷害】', label: '強化精靈【強化傷害＆減輕傷害】'},
  { value: '強化精靈【持續回復＆減輕傷害＆強化傷害】', label: '強化精靈【持續回復＆減輕傷害＆強化傷害】'},
  { value: '強化精靈【持續回復＆強化傷害】', label: '強化精靈【持續回復＆強化傷害】'},
  { value: '強化精靈【持續回復＆異常狀態失效】', label: '強化精靈【持續回復＆異常狀態失效】'},
  { value: '強化精靈【持續回復＆強化傷害＆異常狀態失效】', label: '強化精靈【持續回復＆強化傷害＆異常狀態失效】'},
  { value: '強化精靈【持續回復＆減輕傷害＆強化傷害】', label: '強化精靈【持續回復＆減輕傷害＆強化傷害】'},
  { value: '強化精靈【持續回復＆減輕傷害＆提升能力數值】', label: '強化精靈【持續回復＆減輕傷害＆提升能力數值】'},
  { value: '強化精靈【持續回復＆異常狀態失效】', label: '強化精靈【持續回復＆異常狀態失效】'},
  { value: '強化複屬性傷害', label: '強化複屬性傷害'},
  { value: '犧牲連鎖強化', label: '犧牲連鎖強化'},
  { value: '純屬性強化', label: '純屬性強化'},
  { value: '融合強化(全體)', label: '融合強化(全體)'},
  { value: '提昇(自身)', label: '提昇(自身)'},
  { value: '提昇(單體)', label: '提昇(單體)'},
  { value: '提昇(相鄰)', label: '提昇(相鄰)'},
  { value: '提昇(全體)', label: '提昇(全體)'},
  { value: '狂暴化', label: '狂暴化'},
  { value: '行動感應', label: '行動感應'},
  { value: '強化擊破', label: '強化擊破'},
  { value: 'AS倍率強化', label: 'AS倍率強化'},
  { value: '防禦', label: '傷害減輕'},
  { value: '提升能力數值(全體)', label: '提升能力數值(全體)'},
  { value: '提升能力數值(自身)', label: '提升能力數值(自身)'},
  { value: '異常狀態失效', label: '異常狀態失效'},
  { value: '阻隔傷害', label: '阻隔傷害(數字盾)'},
  { value: '鐵壁‧極', label: '鐵壁‧極'},
  { value: '技能充填(單體)', label: '技能充填(單體)'},
  { value: '技能充填(相鄰)', label: '技能充填(相鄰)'},
  { value: '技能充填(全體)', label: '技能充填(全體)'},
  { value: '技能充填＆延遲(全體)', label: '技能充填＆延遲(全體)'},
  { value: '技能充填＆延遲(單體)', label: '技能充填＆延遲(單體)'},
  { value: '賦予雙重技能(單體)', label: '賦予雙重技能(單體)'},
  { value: '賦予雙重技能(全體)', label: '賦予雙重技能(全體)'},
  { value: '物理反擊', label: '物理反擊'},
  { value: '物理反擊(多段式反擊)', label: '物理反擊(多段式反擊)'},
  { value: '挑釁', label: '挑釁'},
  { value: '_妨害敵方', label: '妨害敵方', disabled: true},
  { value: '延遲(全體)', label: '延遲(全體)'},
  { value: '延遲(單體)', label: '延遲(單體)'},
  { value: '延遲大魔術(全體)', label: '延遲大魔術(全體延遲效果並給予傷害)'},
  { value: '延遲大魔術(單體)', label: '延遲大魔術(單體延遲效果並給予傷害)'},
  { value: '毒', label: '毒'},
  { value: '虛無之瞳', label: '虛無之瞳(鮭魚)'},
  { value: '弱化大魔術(單體)', label: '弱化大魔術(單體)'},
  { value: '弱化大魔術(全體)', label: '弱化大魔術(全體)'},
  { value: '解除效果(全體)【防禦＆阻隔傷害】', label: '解除效果(全體)【防禦＆阻隔傷害】'},
  { value: '解除效果大魔術(單體)【防禦＆阻隔傷害】', label: '解除效果大魔術(單體)【防禦＆阻隔傷害】'},
  { value: '解除效果大魔術(單體)【物理反擊】', label: '解除效果大魔術(單體)【物理反擊】'},
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害】', label: '解除效果大魔術(全體)【防禦＆阻隔傷害】'},
  { value: '解除效果大魔術(全體)【阻隔傷害】', label: '解除效果大魔術(全體)【阻隔傷害】'},
  { value: '解除效果大魔術(全體)【物理反擊】', label: '解除效果大魔術(全體)【物理反擊】'},
  { value: '解除效果大魔術(全體)【物理反擊＆技能反擊】', label: '解除效果大魔術(全體)【物理反擊＆技能反擊】'},
  { value: '解除效果大魔術(全體)【屬性吸收】', label: '解除效果大魔術(全體)【屬性吸收】'},
  { value: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】', label: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】'},
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】', label: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】'},
  { value: '_回復相關', label: '回復相關', disabled: true},
  { value: '回復', label: '回復'},
  { value: '持續回復(自身)', label: '持續回復(自身徐徐回復)'},
  { value: '持續回復', label: '持續回復(徐徐回復)'},
  { value: '回復異常狀態', label: '回復異常狀態'},
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活'},
  { value: '回復/指定屬性', label: '回復/指定屬性'},
  { value: '複屬性回復', label: '複屬性回復'},
  { value: '復活', label: '復活'},
  { value: '自我犧牲復活', label: '自我犧牲復活'},
  { value: '起死回生', label: '起死回生'},
  { value: '起死回生(單體)', label: '起死回生(單體)'},
  { value: '_連鎖相關', label: '連鎖相關', disabled: true},
  { value: '斬擊大魔術', label: '斬擊大魔術'},
  { value: '一閃斬擊大魔術', label: '一閃斬擊大魔術'},
  { value: '防禦連鎖', label: '連鎖數保護'},
  { value: '_題目相關', label: '題目變換/賦予效果', disabled: true},
  { value: '變換問題類型', label: '變換問題類型'},
  { value: '特殊變換問題類型【連鎖數增加】', label: '特殊變換問題類型【連鎖數增加】'},
  { value: '特殊變換問題類型【強化傷害】', label: '特殊變換問題類型【強化傷害】'},
  { value: '特殊變換問題類型【減輕傷害】', label: '特殊變換問題類型【減輕傷害】'},
  { value: '特殊變換問題類型【回復】', label: '特殊變換問題類型【回復】'},
  { value: '特殊變換問題類型【技能充填】', label: '特殊變換問題類型【技能充填】'},
  { value: '特殊變換問題類型【隨機】', label: '特殊變換問題類型【隨機】'},
  { value: '特殊變換問題類型【減輕傷害＆回復】', label: '特殊變換問題類型【減輕傷害＆回復】'},
  { value: '特殊變換問題類型【減輕傷害＆技能充填】', label: '特殊變換問題類型【減輕傷害＆技能充填】'},
  { value: '特殊變換問題類型【強化傷害＆回復】', label: '特殊變換問題類型【強化傷害＆回復】'},
  { value: '特殊變換問題類型【連鎖數增加＆強化傷害】', label: '特殊變換問題類型【連鎖數增加＆強化傷害】'},
  { value: '特殊變換問題類型【連鎖數增加＆技能充填】', label: '特殊變換問題類型【連鎖數增加＆技能充填】'},
  { value: '特殊變換問題類型【強化傷害＆技能充填】', label: '特殊變換問題類型【強化傷害＆技能充填】'},
  { value: '產生連結問題類型', label: '產生連結問題類型'},
  { value: '_其他', label: '其他', disabled: true},
  { value: '技能複製', label: '技能複製'},
  { value: '刪去回答', label: '刪去回答'},
  { value: '延長AS時間限制', label: '延長AS時間限制'},
  { value: '無', label: '無'}
];
export const ZZ = [
  { value: /^精靈相關$/, label: '精靈相關', disabled: true},
  { value: /^戰鬥結束後HP回復.$/, label: '戰後回復（全體）'},
  { value: /^九死一生.$/, label: '九死一生（自身）'},
  { value: /^更換精靈/, label: '更換精靈（自身）'},
  { value: /^HP‧攻擊力反轉/, label: 'HP‧攻擊力反轉（自身）'},
  { value: /^第二回快速技能/, label: '第二回快速技能（自身）'},
  { value: /^提升傷害＆HP下降/, label: '提升傷害＆HP下降（自身）'},
  { value: /^敵方技能失效$/, label: '敵方技能失效', disabled: true},
  { value: /^使敵方技能的答題技能封印失效$/, label: 'AS技能封印無效'},
  { value: /^使敵方技能的特殊技能封印失效$/, label: 'SS封印無效'},
  { value: /^使敵方技能的封印失效$/, label: '封印無效'},
  { value: /^使敵方技能的毒攻擊失效$/, label: '毒攻擊無效'},
  { value: /^使敵方技能的死亡秒針失效$/, label: '死亡秒針無效'},
  { value: /^使敵方技能的消除技能充填失效$/, label: '消除技能充填無效'},
  { value: /^使敵方技能的回復反轉失效$/, label: '回復反轉無效'},
  { value: /^使敵方技能的反轉屬性失效$/, label: '屬性反轉無效'},
  { value: /^使敵方技能的恐怖失效$/, label: '恐怖無效'},
  { value: /^使敵方技能的詛咒失效$/, label: '詛咒無效'},
  { value: /^使敵方技能的特殊技能、答題技能封印失效$/, label: 'AS、SS封印無效'},
  { value: /^使敵方技能的毒攻擊、特殊技能封印失效$/, label: '毒、SS封印無效'},
  { value: /^使敵方技能的毒攻擊、屬性弱化、死亡秒針失效$/, label: '毒、屬性弱化、死秒無效'},
  { value: /^使敵方技能的毒攻擊、屬性弱化、死亡秒針、封印失效$/, label: '毒、屬性弱化、死秒、封印無效'},
  { value: /^連鎖相關$/, label: '連鎖相關', disabled: true},
  { value: /^提升連鎖.$/, label: '任務開始時賦予連鎖數加1的效果'},
  { value: /^防禦連鎖.$/, label: '於一次任務中，僅限一次保護連鎖數'},
  { value: /^心眼相關$/, label: '心眼相關', disabled: true},
  { value: /^心眼$/, label: '心眼（看見題目答對率與敵方血量）'},
  { value: /^心眼・破$/, label: '心眼・破（看穿敵方技能反彈時的行動）'},
  { value: /^心眼・絕$/, label: '心眼・絕（看穿敵方下次的行動）'},
  { value: /^心眼・怒$/, label: '心眼・怒（識破敵人的憤怒條件）'},
  { value: /^獎勵獲得$/, label: '獎勵獲得', disabled: true},
  { value: /^獲得EXP量上升.$/, label: '獲得EXP量上升'},
  { value: /^獲得金幣量上升.$/, label: '獲得金幣量上升'},
  { value: /^掉寶率上升.$/, label: '掉寶率上升'},
  { value: /^答題相關$/, label: '答題相關', disabled: true},
  { value: /^減少難易度.$/, label: '問答難易度微幅下降'},
  { value: /^答題技能延長.$/, label: '答題技能延長'},
  { value: /^答題重置/, label: '答錯回復至答題之前'},
  { value: /^主題技能$/, label: '主題技能', disabled: true},
  { value: /^天選者之證/, label: '天選者之證（王關低機率全體技能充填至全滿）'},
  { value: /^邊界騎士團的覺悟/, label: '邊界騎士團的覺悟（協力開場全體上升、受到致命傷全體復活）'}
];
