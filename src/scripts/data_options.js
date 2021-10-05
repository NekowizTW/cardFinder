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
  { value: /無/, label: '無技能'},
  { value: /技能複製/, label: '技能複製'},
  { value: /_攻擊\(單體\)/, label: '攻擊(單體)', disabled: true },
  { value: /^攻擊/, label: '攻擊' },
  { value: /連鎖攻擊/, label: '連鎖攻擊' },
  { value: /種族數攻擊/, label: '種族數攻擊' },
  { value: /精神抖擻攻擊/, label: '精神抖擻攻擊' },
  { value: /瀕死攻擊/, label: '瀕死攻擊' },
  { value: /屬性的庇佑/, label: '屬性的庇佑' },
  { value: /問題類型顏色數攻擊/, label: '問題類型顏色數攻擊' },
  { value: /悲嘆的憤怒/, label: '悲嘆的憤怒' },
  { value: /吸收/, label: '吸收' },
  { value: /賭博攻擊/, label: '賭博攻擊' },
  { value: /_攻擊\(全體\)/, label: '攻擊(全體)', disabled: true },
  { value: /分散攻擊/, label: '分散攻擊' },
  { value: /全體攻擊/, label: '全體攻擊' },
  { value: /種族特效\(全體\)/, label: '種族特效(全體)' },
  { value: /_補助/, label: '補助', disabled: true },
  { value: /強化攻擊/, label: '強化攻擊' },
  { value: /強化種族攻擊/, label: '強化種族攻擊' },
  { value: /強化複屬性攻擊/, label: '強化複屬性攻擊' },
  { value: /防禦/, label: '防禦' },
  { value: /傷害減免/, label: '傷害減免' },
  { value: /_特效/, label: '特效', disabled: true },
  { value: /屬性特效/, label: '屬性特效' },
  { value: /種族特效/, label: '種族特效' },
  { value: /屬性特效連擊/, label: '屬性特效連擊' },
  { value: /_連擊/, label: '連擊', disabled: true },
  { value: /連擊/, label: '連擊' },
  { value: /屬性特效連擊/, label: '屬性特效連擊' },
  { value: /_回復/, label: '回復', disabled: true },
  { value: /回復/, label: '回復' },
  { value: /回復\(自身\)/, label: '回復(自身)' },
  { value: /_其他/, label: '其他', disabled: true },
  { value: /追擊/, label: '追擊' },
];
export const SKILL_AS2 = [
  { value: /無/, label: '無技能'},
  { value: /技能複製/, label: '技能複製'},
  { value: /_攻擊\(單體\)/, label: '攻擊(單體)', disabled: true },
  { value: /^攻擊/, label: '攻擊' },
  { value: /連鎖攻擊/, label: '連鎖攻擊' },
  { value: /種族數攻擊/, label: '種族數攻擊' },
  { value: /精神抖擻攻擊/, label: '精神抖擻攻擊' },
  { value: /瀕死攻擊/, label: '瀕死攻擊' },
  { value: /屬性的庇佑/, label: '屬性的庇佑' },
  { value: /問題類型顏色數攻擊/, label: '問題類型顏色數攻擊' },
  { value: /悲嘆的憤怒/, label: '悲嘆的憤怒' },
  { value: /吸收/, label: '吸收' },
  { value: /賭博攻擊/, label: '賭博攻擊' },
  { value: /_攻擊\(全體\)/, label: '攻擊(全體)', disabled: true },
  { value: /分散攻擊/, label: '分散攻擊' },
  { value: /全體攻擊/, label: '全體攻擊' },
  { value: /種族特效\(全體\)/, label: '種族特效(全體)' },
  { value: /_補助/, label: '補助', disabled: true },
  { value: /強化攻擊/, label: '強化攻擊' },
  { value: /強化種族攻擊/, label: '強化種族攻擊' },
  { value: /強化複屬性攻擊/, label: '強化複屬性攻擊' },
  { value: /防禦/, label: '防禦' },
  { value: /傷害減免/, label: '傷害減免' },
  { value: /_特效/, label: '特效', disabled: true },
  { value: /屬性特效$/, label: '屬性特效' },
  { value: /種族特效/, label: '種族特效' },
  { value: /屬性特效連擊/, label: '屬性特效連擊' },
  { value: /_連擊/, label: '連擊', disabled: true },
  { value: /連擊/, label: '連擊' },
  { value: /屬性特效連擊/, label: '屬性特效連擊' },
  { value: /_回復/, label: '回復', disabled: true },
  { value: /回復/, label: '回復' },
  { value: /回復\(自身\)/, label: '回復(自身)' },
  { value: /_其他/, label: '其他', disabled: true },
  { value: /追擊/, label: '追擊' },
];
export const SKILL_SS = [
  { value: '無', label: '無'},
  { value: '技能複製', label: '技能複製' },
  { value: '_攻擊(單體)', label: '攻擊[單體]', disabled: true },
  { value: '大魔術(單體)', label: '大魔術[單體]' },
  { value: '延遲大魔術(單體)', label: '延遲大魔術[單體]' },
  { value: '特效大魔術(單體)', label: '特效大魔術[單體]' },
  { value: '犧牲魔術(單體)', label: '犧牲魔術[單體]' },
  { value: '自我犧牲魔術(單體)', label: '自我犧牲魔術[單體]' },
  { value: '反動大魔術(單體)', label: '反動大魔術[單體]' },
  { value: '反動大魔術‧蝕(單體)', label: '反動大魔術‧蝕[單體]' },
  { value: '弱化大魔術(單體)', label: '弱化大魔術[單體]' },
  { value: '斬擊大魔術', label: '斬擊大魔術[單體]' },
  { value: '多重魔術(單體)', label: '多重魔術[單體]' },
  { value: '時限大魔術', label: '時限大魔術[單體]' },
  { value: '解除效果大魔術(單體)【防禦＆阻隔傷害】', label: '解除效果大魔術[單體]【防禦＆阻隔傷害】'},
  { value: '解除效果大魔術(單體)【物理反擊】', label: '解除效果大魔術[單體]【物理反擊】'},
  { value: '解除效果大魔術(單體)【防禦＆阻隔傷害】', label: '單體解除效果大魔術[單體]【防禦＆阻隔傷害】' },
  { value: '比例削減(單體)', label: '比例削減[單體]' },
  { value: '虛無之瞳', label: '虛無之瞳[單體](死亡秒針)' },
  { value: '激化大魔術', label: '激化大魔術' },
  { value: '詠唱大魔術', label: '詠唱大魔術' },
  { value: '炸裂大魔術', label: '炸裂大魔術' },
  { value: '詠唱多重大魔術', label: '詠唱多重大魔術' },
  { value: '純屬性大魔術(單體)', label: '單體純屬性大魔術[單體]' },
  { value: '融合大魔術(單體)', label: '融合大魔術[單體]' },
  { value: '蓄積解放大魔術‧邪(單體)', label: '蓄積解放大魔術‧邪[單體]' },
  { value: '蓄積解放大魔術‧聖(單體)', label: '蓄積解放大魔術‧聖[單體]' },
  { value: '捕食大魔術(單體)', label: '捕食大魔術[單體]' },
  { value: '蓄積解放大魔術‧破(單體)', label: '蓄積解放大魔術‧破[單體]' },
  { value: '蓄積解放大魔術‧印(單體)', label: '蓄積解放大魔術‧印[單體]' },
  { value: '蓄積解放大魔術‧連(單體)', label: '蓄積解放大魔術‧連[單體]' },
  { value: '_攻擊(全體)', label: '攻擊[全體]', disabled: true },
  { value: '大魔術(全體)', label: '全體大魔術' },
  { value: '延遲大魔術(全體)', label: '延遲大魔術[全體]' },
  { value: '特效大魔術(全體)', label: '特效大魔術[全體]' },
  { value: '犧牲魔術(全體)', label: '犧牲魔術[全體]' },
  { value: '自我犧牲魔術(全體)', label: '自我犧牲魔術[全體]' },
  { value: '反動大魔術(全體)', label: '反動大魔術[全體]' },
  { value: '反動大魔術‧蝕(全體)', label: '反動大魔術‧蝕[全體]' },
  { value: '弱化大魔術(全體)', label: '弱化大魔術[全體]' },
  { value: '殘滅大魔術', label: '殘滅大魔術' },
  { value: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】', label: '解除效果大魔術[全體]【屬性吸收＆多層防護＆阻隔傷害】' },
  { value: '解除效果大魔術(全體)【物理反擊】', label: '解除效果大魔術[全體]【物理反擊】' },
  { value: '解除效果大魔術(全體)【物理反擊＆技能反擊】', label: '解除效果大魔術[全體]【物理反擊＆技能反擊】' },
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害】', label: '解除效果大魔術[全體]【防禦＆阻隔傷害】' },
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】', label: '解除效果大魔術[全體]【防禦＆阻隔傷害＆技能反擊】' },
  { value: '毒', label: '毒' },
  { value: '比例削減(全體)', label: '比例削減[全體]' },
  { value: '多重魔術(全體)', label: '多重魔術[全體]' },
  { value: '純屬性大魔術(全體)', label: '純屬性大魔術[全體]' },
  { value: '一閃斬擊大魔術', label: '一閃斬擊大魔術' },
  { value: '融合大魔術(全體)', label: '融合大魔術[全體]' },
  { value: '蓄積解放大魔術‧邪(全體)', label: '蓄積解放大魔術‧邪[全體]' },
  { value: '蓄積解放大魔術‧聖(全體)', label: '蓄積解放大魔術‧聖[全體]' },
  { value: '統一大魔術', label: '統一大魔術' },
  { value: '捕食大魔術(全體)', label: '捕食大魔術[全體]' },
  { value: '問題類型爆破大魔術', label: '問題類型爆破大魔術' },
  { value: '蓄積解放大魔術‧破(全體)', label: '蓄積解放大魔術‧破[全體]' },
  { value: 'L次數大魔術', label: 'L次數大魔術' },
  { value: '蓄積解放大魔術‧印(全體)', label: '蓄積解放大魔術‧印[全體]' },
  { value: '激化大魔術(全體)', label: '激化大魔術[全體]' },
  { value: '連鎖解放大魔術', label: '連鎖解放大魔術' },
  { value: '蓄積解放大魔術‧連(全體)', label: '蓄積解放大魔術‧連[全體]' },
  { value: '問題類型屬性次數大魔術', label: '問題類型屬性次數大魔術' },
  { value: '解除反轉大魔術', label: '解除反轉大魔術' },
  { value: '奇襲大魔術', label: '奇襲大魔術' },
  { value: '逆襲大魔術(全體)', label: '逆襲大魔術[全體]' },
  { value: '擊滅連彈', label: '擊滅連彈' },
  { value: '_防禦', label: '防禦', disabled: true },
  { value: '防禦', label: '防禦' },
  { value: '阻隔傷害', label: '阻隔傷害[全體]' },
  { value: '阻隔傷害(自身)', label: '阻隔傷害[自身]' },
  { value: '異常狀態失效', label: '異常狀態失效' },
  { value: '鐵壁‧極', label: '鐵壁‧極' },
  { value: '_問題類型', label: '問題類型', disabled: true },
  { value: '變換問題類型', label: '變換問題類型' },
  { value: '重新洗牌', label: '重新洗牌' },
  { value: '特殊變換問題類型【AS倍率強化】', label: '特殊變換問題類型【AS倍率強化】' },
  { value: '特殊變換問題類型【回復】', label: '特殊變換問題類型【回復】' },
  { value: '特殊變換問題類型【強化傷害】', label: '特殊變換問題類型【強化傷害】' },
  { value: '特殊變換問題類型【強化傷害＆AS倍率強化】', label: '特殊變換問題類型【強化傷害＆AS倍率強化】' },
  { value: '特殊變換問題類型【技能充填】', label: '特殊變換問題類型【技能充填】' },
  { value: '特殊變換問題類型【減輕傷害】', label: '特殊變換問題類型【減輕傷害】' },
  { value: '特殊變換問題類型【減輕傷害＆回復】', label: '特殊變換問題類型【減輕傷害＆回復】' },
  { value: '特殊變換問題類型【減輕傷害＆技能充填】', label: '特殊變換問題類型【減輕傷害＆技能充填】' },
  { value: '特殊變換問題類型【減輕傷害＆連鎖數增加】', label: '特殊變換問題類型【減輕傷害＆連鎖數增加】' },
  { value: '特殊變換問題類型【連鎖數增加】', label: '特殊變換問題類型【連鎖數增加】' },
  { value: '特殊變換問題類型【連鎖數增加＆強化傷害】', label: '特殊變換問題類型【連鎖數增加＆強化傷害】' },
  { value: '特殊變換問題類型【連鎖數增加＆技能充填】', label: '特殊變換問題類型【連鎖數增加＆技能充填】' },
  { value: '特殊變換問題類型【隨機】', label: '特殊變換問題類型【隨機】' },
  { value: '產生連結問題類型', label: '產生連結問題類型' },
  { value: '統一變換問題類型【減輕傷害】', label: '統一變換問題類型【減輕傷害】' },
  { value: '統一變換問題類型【連鎖數增加＆強化傷害】', label: '統一變換問題類型【連鎖數增加＆強化傷害】' },
  { value: '融合變換問題類型【AS倍率強化】', label: '融合變換問題類型【AS倍率強化】' },
  { value: '融合變換問題類型【減輕傷害】', label: '融合變換問題類型【減輕傷害】' },
  { value: '融合變換問題類型【減輕傷害＆技能充填】', label: '融合變換問題類型【減輕傷害＆技能充填】' },
  { value: '融合變換問題類型【連鎖數增加＆技能充填】', label: '融合變換問題類型【連鎖數增加＆技能充填】' },
  { value: '純屬性變換問題類型【技能充填】', label: '變換純屬性問題類型【技能充填】' },
  { value: '純屬性變換問題類型【減輕傷害】', label: '變換純屬性問題類型【減輕傷害】' },
  { value: '保留問題類型', label: '保留問題類型' },
  { value: '保留問題類型【強化傷害＆AS倍率強化】', label: '保留問題類型【強化傷害＆AS倍率強化】' },
  { value: '保留問題類型【減輕傷害＆技能充填】', label: '保留問題類型【減輕傷害＆技能充填】' },
  { value: '保留問題類型【連鎖數增加】', label: '保留問題類型【連鎖數增加】' },
  { value: '保留問題類型【連鎖數增加＆AS倍率強化】', label: '保留問題類型【連鎖數增加＆AS倍率強化】' },
  { value: '保留問題類型【連鎖數增加＆回復】', label: '保留問題類型【連鎖數增加＆回復】' },
  { value: '保留問題類型【連鎖數增加＆強化傷害】', label: '保留問題類型【連鎖數增加＆強化傷害】' },
  { value: '保留問題類型【連鎖數增加＆強化傷害＆回復】', label: '保留問題類型【連鎖數增加＆強化傷害＆回復】' },
  { value: '_支援', label: '支援', disabled: true },
  { value: '延遲(全體)', label: '延遲[全體]' },
  { value: '延遲(單體)', label: '延遲[單體]' },
  { value: '技能充填(全體)', label: '技能充填[全體]' },
  { value: '技能充填(單體)', label: '技能充填[單體]' },
  { value: '技能充填(相鄰)', label: '技能充填[相鄰]' },
  { value: '技能充填＆延遲(全體)', label: '技能充填＆延遲[全體]' },
  { value: '技能充填＆延遲(單體)', label: '技能充填＆延遲[單體]' },
  { value: '刪去回答', label: '刪去回答' },
  { value: '解除效果(全體)【屬性吸收】', label: '解除效果[全體]【屬性吸收】' },
  { value: '解除效果(全體)【物理反擊】', label: '解除效果[全體]【物理反擊】' },
  { value: '解除效果(全體)【防禦】', label: '解除效果[全體]【防禦】' },
  { value: '解除效果(全體)【防禦＆屬性免疫】', label: '解除效果[全體]【防禦＆屬性免疫】' },
  { value: '解除效果(全體)【防禦＆物理反擊】', label: '解除效果[全體]【防禦＆物理反擊】' },
  { value: '解除效果(全體)【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】', label: '解除效果[全體]【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】' },
  { value: '解除效果(全體)【防禦＆阻隔傷害】', label: '解除效果[全體]【防禦＆阻隔傷害】' },
  { value: '解除效果(單體)【屬性吸收】', label: '解除效果[單體]【屬性吸收】' },
  { value: '解除效果(單體)【物理反擊】', label: '解除效果[單體]【物理反擊】', disabled: true },
  { value: '解除效果(單體)【防禦＆阻隔傷害】', label: '解除效果[單體]【防禦＆阻隔傷害】' },
  { value: '提昇(全體)', label: '提昇[全體]' },
  { value: '提昇(單體)', label: '提昇[單體]' },
  { value: '提昇(相鄰)', label: '提昇[相鄰]' },
  { value: '提昇(自身)', label: '提昇[自身]' },
  { value: '強化傷害(全體)', label: '強化傷害[全體]' },
  { value: '強化傷害(指定屬性)', label: '強化傷害[指定屬性]' },
  { value: '強化傷害(自身)', label: '強化傷害[自身]' },
  { value: '強化傷害‧連', label: '強化傷害‧連' },
  { value: '強化複屬性傷害', label: '強化複屬性傷害' },
  { value: '提升能力數值(全體)', label: '提升能力數值[全體]' },
  { value: '提升能力數值(指定屬性)', label: '提升能力數值[指定屬性]' },
  { value: '提升能力數值(自身)', label: '提升能力數值[自身]' },
  { value: '強化精靈【強化傷害】', label: '強化精靈【強化傷害】' },
  { value: '強化精靈【強化傷害＆減輕傷害】', label: '強化精靈【強化傷害＆減輕傷害】' },
  { value: '強化精靈【持續回復＆強化傷害】', label: '強化精靈【持續回復＆強化傷害】' },
  { value: '強化精靈【持續回復＆強化傷害＆提升能力數值】', label: '強化精靈【持續回復＆強化傷害＆提升能力數值】' },
  { value: '強化精靈【持續回復＆提升能力數值】', label: '強化精靈【持續回復＆提升能力數值】' },
  { value: '強化精靈【持續回復＆減輕傷害】', label: '強化精靈【持續回復＆減輕傷害】' },
  { value: '強化精靈【持續回復＆減輕傷害＆強化傷害】', label: '強化精靈【持續回復＆減輕傷害＆強化傷害】' },
  { value: '強化精靈【持續回復＆減輕傷害＆提升能力數值】', label: '強化精靈【持續回復＆減輕傷害＆提升能力數值】' },
  { value: '強化精靈【持續回復＆減輕傷害＆提升能力數值＆異常狀態失效】', label: '強化精靈【持續回復＆減輕傷害＆提升能力數值＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆異常狀態失效】', label: '強化精靈【持續回復＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆起死回生＆強化傷害】', label: '強化精靈【持續回復＆起死回生＆強化傷害】' },
  { value: '強化精靈【持續回復＆起死回生＆提升能力數值】', label: '強化精靈【持續回復＆起死回生＆提升能力數值】' },
  { value: '強化精靈【持續回復＆起死回生＆減輕傷害】', label: '強化精靈【持續回復＆起死回生＆減輕傷害】' },
  { value: '強化精靈【提升能力數值】', label: '強化精靈【提升能力數值】' },
  { value: '強化精靈【減輕傷害】', label: '強化精靈【減輕傷害】' },
  { value: '強化精靈【異常狀態失效】', label: '強化精靈【異常狀態失效】' },
  { value: '強化精靈【異常狀態失效＆減輕傷害】', label: '強化精靈【異常狀態失效＆減輕傷害】' },
  { value: '物理反擊', label: '物理反擊' },
  { value: '物理反擊(多段式反擊)', label: '物理反擊[全體]【多段式反擊】' },
  { value: '物理反擊(多段式反擊)(自身)', label: '物理反擊[自身]【多段式反擊】' },
  { value: '物理反擊（充填）', label: '物理反擊【充填】' },
  { value: '防禦連鎖', label: '防禦連鎖' },
  { value: '延長AS時間限制', label: '延長AS時間限制' },
  { value: '挑釁', label: '挑釁' },
  { value: '狂暴化', label: '狂暴化' },
  { value: '純屬性強化', label: '純屬性強化' },
  { value: '賦予雙重技能(全體)', label: '賦予雙重技能[全體]' },
  { value: '賦予雙重技能(單體)', label: '賦予雙重技能[單體]' },
  { value: '賦予雙重技能(相鄰)', label: '賦予雙重技能[相鄰]' },
  { value: '賦予雙重技能(自身)', label: '賦予雙重技能[自身]' },
  { value: '賦予雙重技能(鄰近)', label: '賦予雙重技能[鄰近]' },
  { value: '犧牲連鎖強化', label: '犧牲連鎖強化' },
  { value: '行動感應', label: '行動感應' },
  { value: '強化擊破', label: '強化擊破[全體]' },
  { value: '強化擊破(自身)', label: '強化擊破[自身]' },
  { value: '融合強化', label: '融合強化[全體]' },
  { value: '融合強化(自身)', label: '融合強化[自身]' },
  { value: 'AS倍率強化', label: 'AS倍率強化' },
  { value: '回答時間停止', label: '回答時間停止' },
  { value: 'AS特殊變化', label: 'AS特殊變化' },
  { value: '決鬥', label: '決鬥' },
  { value: '賦予雙重AS', label: '賦予雙重AS[全體]' },
  { value: '賦予雙重AS(自身)', label: '賦予雙重AS[自身]' },
  { value: '無屬性變化', label: '無屬性變化' },
  { value: '強化蓄積解放‧聖', label: '蓄積解放強化‧聖' },
  { value: '強化種族傷害', label: '強化種族傷害' },
  { value: '強化反轉‧聖', label: '強化反轉‧聖' },
  { value: '強化反轉‧邪', label: '強化反轉‧邪' },
  { value: '統一強化', label: '統一強化' },
  { value: '強化攻擊特殊技能(鄰近)', label: '強化攻擊特殊技能[鄰近]' },
  { value: '連鎖強擊(指定屬性)', label: '連鎖強擊[全體,指定屬性]' },
  { value: '連鎖強擊(指定屬性)(單體)', label: '連鎖強擊[單體,指定屬性]' },
  { value: '連鎖強擊(自身)', label: '連鎖強擊[自身]' },
  { value: '犧牲能力數值強化（AS倍率）', label: '犧牲能力數值強化【AS倍率】' },
  { value: '_回復', label: '回復', disabled: true },
  { value: '回復', label: '回復' },
  { value: '回復/指定屬性', label: '回復[指定屬性]' },
  { value: '持續回復', label: '持續回復[全體]' },
  { value: '持續回復(自身)', label: '持續回復[自身]' },
  { value: '回復異常狀態', label: '回復異常狀態' },
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活' },
  { value: '復活', label: '復活' },
  { value: '自我犧牲復活', label: '自我犧牲復活' },
  { value: '起死回生', label: '起死回生[全體]' },
  { value: '起死回生(單體)', label: '起死回生[單體]' },
  { value: '複屬性回復', label: '複屬性回復' },
  { value: '_其他', label: '其他', disabled: true },
];
export const SKILL_SS2 = [
  { value: '無', label: '無'},
  { value: '技能複製', label: '技能複製' },
  { value: '_攻撃(單體)', label: '攻撃(單體)', disabled: true },
  { value: '大魔術(單體)', label: '大魔術[單體]' },
  { value: '延遲大魔術(單體)', label: '延遲大魔術[單體]' },
  { value: '特效大魔術(單體)', label: '特效大魔術[單體]' },
  { value: '犧牲魔術(單體)', label: '犧牲魔術[單體]' },
  { value: '自我犧牲魔術(單體)', label: '自我犧牲魔術[單體]' },
  { value: '反動大魔術(單體)', label: '反動大魔術[單體]' },
  { value: '反動大魔術‧蝕(單體)', label: '反動大魔術‧蝕[單體]' },
  { value: '弱化大魔術(單體)', label: '弱化大魔術[單體]' },
  { value: '斬擊大魔術', label: '斬擊大魔術' },
  { value: '多重魔術(單體)', label: '多重魔術[單體]' },
  { value: '時限大魔術', label: '時限大魔術' },
  { value: '解除效果大魔術(單體)【物理反擊】', label: '解除效果大魔術[單體]【物理反擊】' },
  { value: '解除效果大魔術(單體)【物理反擊＆多層防護】', label: '解除效果大魔術[單體]【物理反擊＆多層防護】' },
  { value: '解除效果大魔術(單體)【防禦＆阻隔傷害】', label: '解除效果大魔術[單體]【防禦＆阻隔傷害】' },
  { value: '解除效果大魔術(單體)【防禦＆阻隔傷害＆多層防護】', label: '解除效果大魔術[單體]【防禦＆阻隔傷害＆多層防護】' },
  { value: '比例削減(單體)', label: '比例削減[單體]' },
  { value: '虛無之瞳', label: '虛無之瞳[單體](死亡秒針)' },
  { value: '激化大魔術', label: '激化大魔術' },
  { value: '詠唱大魔術', label: '詠唱大魔術' },
  { value: '炸裂大魔術', label: '炸裂大魔術' },
  { value: '詠唱多重大魔術', label: '詠唱多重大魔術' },
  { value: '純屬性大魔術(單體)', label: '純屬性大魔術[單體]' },
  { value: '融合大魔術(單體)', label: '融合大魔術[單體]' },
  { value: '蓄積解放大魔術‧邪(單體)', label: '蓄積解放大魔術‧邪[單體]' },
  { value: '蓄積解放大魔術‧聖(單體)', label: '蓄積解放大魔術‧聖[單體]' },
  { value: '捕食大魔術(單體)', label: '捕食大魔術[單體]' },
  { value: '蓄積解放大魔術‧破(單體)', label: '蓄積解放大魔術‧破[單體]' },
  { value: '蓄積解放大魔術‧印(單體)', label: '蓄積解放大魔術‧印[單體]' },
  { value: '蓄積解放大魔術‧連(單體)', label: '蓄積解放大魔術‧連[單體]' },
  { value: '問題類型屬性次數大魔術(單體)', label: '問題類型屬性次數大魔術[單體]' },
  { value: '_攻撃(全體)', label: '攻撃(全體)', disabled: true },
  { value: '大魔術(全體)', label: '大魔術[全體]' },
  { value: '延遲大魔術(全體)', label: '延遲大魔術[全體]' },
  { value: '特效大魔術(全體)', label: '特效大魔術[全體]' },
  { value: '犧牲魔術(全體)', label: '犧牲魔術[全體]' },
  { value: '自我犧牲魔術(全體)', label: '自我犧牲魔術[全體]' },
  { value: '反動大魔術(全體)', label: '反動大魔術[全體]' },
  { value: '反動大魔術‧蝕(全體)', label: '反動大魔術‧蝕[全體]' },
  { value: '弱化大魔術(全體)', label: '弱化大魔術[全體]' },
  { value: '殘滅大魔術', label: '殘滅大魔術' },
  { value: '解除效果大魔術(全體)【屬性吸收】', label: '解除效果大魔術[全體]【屬性吸收】' },
  { value: '解除效果大魔術(全體)【屬性吸收＆多層防護】', label: '解除效果大魔術[全體]【屬性吸收＆多層防護】' },
  { value: '解除效果大魔術(全體)【屬性吸收＆多層防護＆阻隔傷害】', label: '解除效果大魔術[全體]【屬性吸收＆多層防護＆阻隔傷害】' },
  { value: '解除效果大魔術(全體)【屬性吸收＆防護牆】', label: '解除效果大魔術[全體]【屬性吸收＆防護牆】' },
  { value: '解除效果大魔術(全體)【物理反擊】', label: '解除效果大魔術[全體]【物理反擊】' },
  { value: '解除效果大魔術(全體)【物理反擊＆技能反擊】', label: '解除效果大魔術[全體]【物理反擊＆技能反擊】' },
  { value: '解除效果大魔術(全體)【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】', label: '解除效果大魔術[全體]【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】' },
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害】', label: '解除效果大魔術[全體]【防禦＆阻隔傷害】' },
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害＆多層防護】', label: '解除效果大魔術[全體]【防禦＆阻隔傷害＆多層防護】' },
  { value: '解除效果大魔術(全體)【防禦＆阻隔傷害＆技能反擊】', label: '解除效果大魔術[全體]【防禦＆阻隔傷害＆技能反擊】' },
  { value: '解除效果大魔術(全體)【阻隔傷害】', label: '解除效果大魔術[全體]【阻隔傷害】' },
  { value: '毒', label: '毒' },
  { value: '比例削減(全體)', label: '比例削減[全體]' },
  { value: '多重魔術(全體)', label: '多重魔術[全體]' },
  { value: '純屬性大魔術(全體)', label: '純屬性大魔術[全體]' },
  { value: '一閃斬擊大魔術', label: '一閃斬擊大魔術' },
  { value: '融合大魔術(全體)', label: '融合大魔術[全體]' },
  { value: '蓄積解放大魔術‧邪(全體)', label: '蓄積解放大魔術‧邪[全體]' },
  { value: '蓄積解放大魔術‧聖(全體)', label: '蓄積解放大魔術‧聖[全體]' },
  { value: '統一大魔術', label: '統一大魔術' },
  { value: '捕食大魔術(全體)', label: '捕食大魔術[全體]' },
  { value: '問題類型爆破大魔術', label: '問題類型爆破大魔術' },
  { value: '蓄積解放大魔術‧破(全體)', label: '蓄積解放大魔術‧破[全體]' },
  { value: 'L次數大魔術', label: 'L次數大魔術' },
  { value: '蓄積解放大魔術‧印(全體)', label: '蓄積解放大魔術‧印[全體]' },
  { value: '激化大魔術(全體)', label: '激化大魔術[全體]' },
  { value: '連鎖解放大魔術', label: '連鎖解放大魔術' },
  { value: '蓄積解放大魔術‧連(全體)', label: '蓄積解放大魔術‧連[全體]' },
  { value: '問題類型屬性次數大魔術', label: '問題類型屬性次數大魔術[全體]' },
  { value: '解除反轉大魔術', label: '解除反轉大魔術' },
  { value: '奇襲大魔術', label: '奇襲大魔術' },
  { value: '逆襲大魔術(全體)', label: '逆襲大魔術[全體]' },
  { value: '擊滅連彈', label: '擊滅連彈' },
  { value: '爆裂大魔術', label: '爆裂大魔術' },
  { value: '虛無之瞳(全體)', label: '虛無之瞳[全體]' },
  { value: '_防禦', label: '防禦', disabled: true },
  { value: '防禦', label: '防禦' },
  { value: '阻隔傷害', label: '阻隔傷害[全體]' },
  { value: '阻隔傷害(自身)', label: '阻隔傷害[自身]' },
  { value: '異常狀態失效', label: '異常狀態失效' },
  { value: '鐵壁‧極', label: '鐵壁‧極' },
  { value: '_問題類型', label: '問題類型', disabled: true },
  { value: '變換問題類型', label: '變換問題類型' },
  { value: '特殊變換問題類型【AS倍率強化】', label: '特殊變換問題類型【AS倍率強化】' },
  { value: '特殊變換問題類型【回復】', label: '特殊變換問題類型【回復】' },
  { value: '特殊變換問題類型【強化傷害】', label: '特殊變換問題類型【強化傷害】' },
  { value: '特殊變換問題類型【強化傷害＆AS倍率強化】', label: '特殊變換問題類型【強化傷害＆AS倍率強化】' },
  { value: '特殊變換問題類型【強化傷害＆回復】', label: '特殊變換問題類型【強化傷害＆回復】' },
  { value: '特殊變換問題類型【強化傷害＆技能充填】', label: '特殊變換問題類型【強化傷害＆技能充填】' },
  { value: '特殊變換問題類型【技能充填】', label: '特殊變換問題類型【技能充填】' },
  { value: '特殊變換問題類型【減輕傷害】', label: '特殊變換問題類型【減輕傷害】' },
  { value: '特殊變換問題類型【減輕傷害＆回復】', label: '特殊變換問題類型【減輕傷害＆回復】' },
  { value: '特殊變換問題類型【減輕傷害＆技能充填】', label: '特殊變換問題類型【減輕傷害＆技能充填】' },
  { value: '特殊變換問題類型【連鎖數增加】', label: '特殊變換問題類型【連鎖數增加】' },
  { value: '特殊變換問題類型【連鎖數增加＆強化傷害】', label: '特殊變換問題類型【連鎖數增加＆強化傷害】' },
  { value: '特殊變換問題類型【連鎖數增加＆技能充填】', label: '特殊變換問題類型【連鎖數增加＆技能充填】' },
  { value: '特殊變換問題類型【隨機】', label: '特殊變換問題類型【隨機】' },
  { value: '產生連結問題類型', label: '產生連結問題類型' },
  { value: '統一變換問題類型【回復】', label: '統一變換問題類型【回復】' },
  { value: '統一變換問題類型【強化傷害】', label: '統一變換問題類型【強化傷害】' },
  { value: '統一變換問題類型【減輕傷害】', label: '統一變換問題類型【減輕傷害】' },
  { value: '統一變換問題類型【減輕傷害＆回復】', label: '統一變換問題類型【減輕傷害＆回復】' },
  { value: '統一變換問題類型【連鎖數增加＆強化傷害】', label: '統一變換問題類型【連鎖數增加＆強化傷害】' },
  { value: '融合變換問題類型【強化傷害】', label: '融合變換問題類型【強化傷害】' },
  { value: '融合變換問題類型【技能充填】', label: '融合變換問題類型【技能充填】' },
  { value: '融合變換問題類型【減輕傷害】', label: '融合變換問題類型【減輕傷害】' },
  { value: '融合變換問題類型【連鎖數增加】', label: '融合變換問題類型【連鎖數增加】' },
  { value: '純屬性變換問題類型【回復】', label: '變換純屬性問題類型【回復】' },
  { value: '純屬性變換問題類型【技能充填】', label: '變換純屬性問題類型【技能充填】' },
  { value: '純屬性變換問題類型【減輕傷害】', label: '變換純屬性問題類型【減輕傷害】' },
  { value: '純屬性變換問題類型【連鎖數增加】', label: '變換純屬性問題類型【連鎖數增加】' },
  { value: '保留問題類型', label: '保留問題類型' },
  { value: '保留問題類型【AS倍率強化】', label: '保留問題類型【AS倍率強化】' },
  { value: '保留問題類型【減輕傷害＆技能充填】', label: '保留問題類型【減輕傷害＆技能充填】' },
  { value: '保留問題類型【連鎖數增加】', label: '保留問題類型【連鎖數增加】' },
  { value: '保留問題類型【連鎖數增加＆強化傷害】', label: '保留問題類型【連鎖數增加＆強化傷害】' },
  { value: '_支援', label: '支援', disabled: true },
  { value: '延遲(全體)', label: '延遲[全體]' },
  { value: '延遲(單體)', label: '延遲[單體]' },
  { value: '技能充填(全體)', label: '技能充填[全體]' },
  { value: '技能充填(單體)', label: '技能充填[單體]' },
  { value: '技能充填(相鄰)', label: '技能充填[相鄰]' },
  { value: '技能充填＆延遲(全體)', label: '技能充填＆延遲[全體]' },
  { value: '技能充填＆延遲(單體)', label: '技能充填＆延遲[單體]' },
  { value: '刪去回答', label: '刪去回答' },
  { value: '解除效果(全體)【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】', label: '解除效果[全體]【防禦＆防護牆＆阻隔傷害＆多層防護＆屬性吸收＆屬性免疫】' },
  { value: '解除效果(全體)【防禦＆阻隔傷害】', label: '解除效果[全體]【防禦＆阻隔傷害】' },
  { value: '提昇(全體)', label: '提昇[全體]' },
  { value: '提昇(單體)', label: '提昇[單體]' },
  { value: '提昇(相鄰)', label: '提昇[相鄰]' },
  { value: '提昇(自身)', label: '提昇[自身]' },
  { value: '強化傷害(全體)', label: '強化傷害[全體]' },
  { value: '強化傷害(指定屬性)', label: '強化傷害[指定屬性]' },
  { value: '強化傷害(自身)', label: '強化傷害[自身]' },
  { value: '強化複屬性傷害', label: '強化複屬性傷害' },
  { value: '提升能力數值(全體)', label: '提升能力數值[全體]' },
  { value: '提升能力數值(指定屬性)', label: '提升能力數值[指定屬性]' },
  { value: '提升能力數值(自身)', label: '提升能力數值[自身]' },
  { value: '強化精靈【強化傷害】', label: '強化精靈【強化傷害】' },
  { value: '強化精靈【強化傷害＆減輕傷害】', label: '強化精靈【強化傷害＆減輕傷害】' },
  { value: '強化精靈【持續回復＆強化傷害】', label: '強化精靈【持續回復＆強化傷害】' },
  { value: '強化精靈【持續回復＆強化傷害＆提升能力數值】', label: '強化精靈【持續回復＆強化傷害＆提升能力數值】' },
  { value: '強化精靈【持續回復＆強化傷害＆異常狀態失效】', label: '強化精靈【持續回復＆強化傷害＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆提升能力數值】', label: '強化精靈【持續回復＆提升能力數值】' },
  { value: '強化精靈【持續回復＆提升能力數值＆異常狀態失效】', label: '強化精靈【持續回復＆提升能力數值＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆減輕傷害】', label: '強化精靈【持續回復＆減輕傷害】' },
  { value: '強化精靈【持續回復＆減輕傷害＆強化傷害】', label: '強化精靈【持續回復＆減輕傷害＆強化傷害】' },
  { value: '強化精靈【持續回復＆減輕傷害＆提升能力數值】', label: '強化精靈【持續回復＆減輕傷害＆提升能力數值】' },
  { value: '強化精靈【持續回復＆減輕傷害＆提升能力數值＆異常狀態失效】', label: '強化精靈【持續回復＆減輕傷害＆提升能力數值＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆減輕傷害＆異常狀態失效】', label: '強化精靈【持續回復＆減輕傷害＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆異常狀態失效】', label: '強化精靈【持續回復＆異常狀態失效】' },
  { value: '強化精靈【持續回復＆起死回生＆強化傷害】', label: '強化精靈【持續回復＆起死回生＆強化傷害】' },
  { value: '強化精靈【持續回復＆起死回生＆提升能力數值】', label: '強化精靈【持續回復＆起死回生＆提升能力數值】' },
  { value: '強化精靈【持續回復＆起死回生＆減輕傷害】', label: '強化精靈【持續回復＆起死回生＆減輕傷害】' },
  { value: '強化精靈【提升能力數值】', label: '強化精靈【提升能力數值】' },
  { value: '強化精靈【減輕傷害】', label: '強化精靈【減輕傷害】' },
  { value: '強化精靈【減輕傷害＆異常狀態失效】', label: '強化精靈【減輕傷害＆異常狀態失效】' },
  { value: '物理反擊', label: '物理反擊' },
  { value: '物理反擊(多段式反擊)', label: '物理反擊[全體]【多段式反擊】' },
  { value: '物理反擊(多段式反擊)(自身)', label: '物理反擊[自身]【多段式反擊】' },
  { value: '防禦連鎖', label: '防禦連鎖' },
  { value: '延長AS時間限制', label: '延長AS時間限制' },
  { value: '挑釁', label: '挑釁' },
  { value: '狂暴化', label: '狂暴化' },
  { value: '純屬性強化', label: '純屬性強化' },
  { value: '賦予雙重技能(全體)', label: '賦予雙重技能[全體]' },
  { value: '賦予雙重技能(單體)', label: '賦予雙重技能[單體]' },
  { value: '賦予雙重技能(相鄰)', label: '賦予雙重技能[相鄰]' },
  { value: '賦予雙重技能(鄰近)', label: '賦予雙重技能[鄰近]' },
  { value: '犧牲連鎖強化', label: '犧牲連鎖強化' },
  { value: '行動感應', label: '行動感應' },
  { value: '強化擊破', label: '強化擊破' },
  { value: '融合強化', label: '融合強化[全體]' },
  { value: '融合強化(自身)', label: '融合強化[自身]' },
  { value: 'AS倍率強化', label: 'AS倍率強化' },
  { value: '回答時間停止', label: '回答時間停止' },
  { value: 'AS特殊變化', label: 'AS特殊變化' },
  { value: '決鬥', label: '決鬥' },
  { value: '賦予雙重AS', label: '賦予雙重AS[全體]' },
  { value: '賦予雙重AS(自身)', label: '賦予雙重AS[自身]' },
  { value: '物理反擊（充填）', label: '物理反擊【充填】' },
  { value: '無屬性變化', label: '無屬性變化[全體]' },
  { value: '無屬性變化(自身)', label: '無屬性變化[自身]' },
  { value: '強化蓄積解放‧聖', label: '蓄積解放強化‧聖' },
  { value: '強化種族傷害', label: '強化種族傷害' },
  { value: '強化反轉‧聖', label: '強化反轉‧聖' },
  { value: '強化反轉‧邪', label: '強化反轉‧邪' },
  { value: '統一強化', label: '統一強化' },
  { value: '強化攻擊特殊技能(鄰近)', label: '強化攻擊特殊技能[鄰近]' },
  { value: '強化傷害‧連', label: '強化傷害‧連' },
  { value: '連鎖強擊(指定屬性)', label: '連鎖強擊[指定屬性]' },
  { value: '連鎖強擊(指定屬性)(單體)', label: '連鎖強擊[單體,指定屬性]' },
  { value: '犧牲能力數值強化（AS倍率）', label: '犧牲能力數值強化【AS倍率】' },
  { value: '_回復', label: '回復', disabled: true },
  { value: '回復', label: '回復' },
  { value: '回復(指定屬性)', label: '回復[指定屬性]' },
  { value: '持續回復', label: '持續回復[全體]' },
  { value: '持續回復(自身)', label: '持續回復[自身]' },
  { value: '回復異常狀態', label: '回復異常狀態' },
  { value: '回復異常狀態＆復活', label: '回復異常狀態＆復活' },
  { value: '復活', label: '復活' },
  { value: '自我犧牲復活', label: '自我犧牲復活' },
  { value: '起死回生', label: '起死回生[全體]' },
  { value: '起死回生(單體)', label: '起死回生[單體]' },
  { value: '複屬性回復', label: '複屬性回復' },
  { value: '_其他', label: '其他', disabled: true },
];
export const ZZ = [
  { value: /^_精靈當前HP相關$/, label: '_精靈當前HP相關', disabled: true },
  { value: /^戰鬥結束後HP回復.$/, label: '戰後回復【全體補血】'},
  { value: /^九死一生.$/, label: '九死一生【自身】'},
  { value: /^_更換精靈$/, label: '_更換精靈', disabled: true },
  { value: /^更換精靈$/, label: '更換精靈【自身】'},
  { value: /^自動更換精靈$/, label: '自動更換精靈【自身、AUTO用】' },
  { value: /^_減少HP$/, label: '_減少HP', disabled: true },
  { value: /^HP‧攻擊力反轉/, label: 'HP‧攻擊力反轉' },
  { value: /^提升傷害\S＆HP下降\S/, label: '提升傷害＆HP下降【自身】' },
  { value: /^ADVERITAS$/, label: 'ADVERITAS【提升傷害＆HP下降(自身)】' },
  { value: /^_快速技能$/, label: '_快速技能', disabled: true },
  { value: /第二回快速技能\S/, label: '第二回快速技能' },
  { value: /^_敵方技能失效$/, label: '_敵方技能失效', disabled: true },
  { value: /^使敵方技能的(\S*)反轉屬性(\S*)失效$/, label: '反轉屬性【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)回復反轉(\S*)失效$/, label: '回復反轉【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)答題技能封印(\S*)失效$/, label: '答題技能封印【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)特殊技能(、答題技能)?封印(\S*)失效$/, label: '特殊技能封印【敵方技能】失效' },
  { value: /(^使敵方技能的封印失效$)|(^使敵方技能的(\S*)((死亡秒針、封印)|(答題技能封印、封印))(\S*)失效$)/, label: '封印【敵方技能】失效' },
  { value: /^使敵方技能的恐怖失效$/, label: '恐怖【敵方技能】失效' },
  { value: /^使敵方技能的恐慌吶喊失效$/, label: '恐慌吶喊【敵方技能】失效' },
  { value: /^使敵方技能的詛咒失效$/, label: '詛咒【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)死亡秒針(\S*)失效$/, label: '死亡秒針【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)毒攻擊(\S*)失效$/, label: '毒攻擊【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)屬性弱化(\S*)失效$/, label: '屬性弱化【敵方技能】失效' },
  { value: /^使敵方技能的(\S*)消除技能充填(\S*)失效$/, label: '消除技能充填【敵方技能】失效' },
  { value: /^以愛織成的結界$/, label: '以愛織成的結界【毒攻擊、屬性弱化、死亡秒針、特殊技能封印、答題技能封印、恐慌吶喊、回復反轉、屬性反轉、封印失效】' },
  { value: /^_傳奇型態觸發$/, label: '_傳奇型態觸發', disabled: true },
  { value: /^傳奇型態時僅自己有機率回避敵人的攻擊5回合$/, label: '自身迴避攻擊' },
  { value: /^煌眼$/, label: '煌眼【全體增攻、全體補血】' },
  { value: /^凜眼$/, label: '凜眼【全體傷害盾】' },
  { value: /^烈眼$/, label: '列眼【全體增攻、全體回合固定扣血】' },
  { value: /^惺眼$/, label: '惺眼【敵方單體延遲】' },
  { value: /^昏眼$/, label: '昏眼【提升攻擊次數】' },
  { value: /^劍聖眼$/, label: '劍聖眼【單體死亡秒針】' },
  { value: /^凜煌眼$/, label: '凜煌眼【全體增攻、傷害盾、全體補血】' },
  { value: /^冥王眼$/, label: '冥王眼【連鎖增加、全體減傷】' },
  { value: /^聖劍$/, label: '聖劍【自身爆擊】' },
  { value: /^昏暗英雄的戰略$/, label: '昏暗英雄的戰略【敵方單體弱化】' },
  { value: /^火的引導$/, label: '火的引導【全體單火增益、盤面火出上升】' },
  { value: /^水的引導$/, label: '水的引導【全體單水增益、盤面水出上升】' },
  { value: /^雷的引導$/, label: '雷的引導【全體單雷增益、盤面雷出上升】' },
  { value: /^霸的引導$/, label: '霸的引導【全體增益、盤面三色上升】' },
  { value: /^伏見之結印$/, label: '伏見之結印【全體增攻、補血】' },
  { value: /^狐狸的祝願$/, label: '狐狸的祝願【自身迴避攻擊】' },
  { value: /^暗影雙刃$/, label: '暗影雙刃【自身增攻、自身受傷增加、回復失效】' },
  { value: /^靈動釋放$/, label: '靈動釋放【自身增攻、自身受傷增加、回復失效】' },
  { value: /^力量的代價$/, label: '力量的代價【自身增攻、自身受傷增加、回復失效】' },
  { value: /^盛大的交響樂$/, label: '盛大的交響樂【全體增攻、回血】' },
  { value: /^龍血甦醒$/, label: '龍血甦醒【全體增攻、回血】' },
  { value: /^全軍突擊$/, label: '全軍突擊【全體增攻、回血】' },
  { value: /^唯我爆擊$/, label: '唯我爆擊【自身爆擊、EXAS無效】' },
  { value: /^弱點識破$/, label: '弱點識破【敵方單體弱化】' },
  { value: /^龍之RIZE$/, label: '龍之RIZE【全體龍族、全體戰士增傷、全體龍族增傷】' },
  { value: /^_心眼相關$/, label: '_心眼相關', disabled: true },
  { value: /^心眼$/, label: '心眼【顯示敵方當前血量、盤面題目答對率】' },
  { value: /^心眼・破$/, label: '心眼・破【顯示敵方技能反彈時的行動】' },
  { value: /^心眼・絕$/, label: '心眼・絕【顯示敵方下次的行動】' },
  { value: /^心眼・怒$/, label: '心眼・怒【顯示敵方的憤怒條件】' },
  { value: /^心眼・逝$/, label: '心眼・逝【顯示敵方死亡時的行動】' },
  { value: /^_連鎖相關$/, label: '_連鎖相關', disabled: true },
  { value: /^提升連鎖$/, label: '起始連鎖增加' },
  { value: /^防禦連鎖\S$/, label: '連鎖防禦' },
  { value: /^_答題相關$/, label: '_答題相關', disabled: true },
  { value: /^減少難易度\S$/, label: '盤面三色下降' },
  { value: /^增加難易度Ⅴ＆攻擊力上升Ⅰ$/, label: '盤面三色上升、全體增攻' },
  { value: /^答對3色問題(類型)?時，將給予敵方的傷害變為\d(\.\d)?倍。$/, label: '盤面三色增傷' },
  { value: /^答題技能延長\S$/, label: '答題技能時間延長' },
  { value: /^答題重置$/, label: '答題重置' },
  { value: /^_擊破相關$/, label: '_擊破相關', disabled: true },
  { value: /^擊破・回復$/, label: '擊破・回復' },
  { value: /^擊破・增加連鎖數\S?$/, label: '擊破・增加連鎖數' },
  { value: /^擊破・強化攻擊$/, label: '擊破・強化攻擊' },
  { value: /^擊破・防禦連鎖$/, label: '擊破・防禦連鎖' },
  { value: /^魔劍弓【夢現射手】$/, label: '魔劍弓【夢現射手】【自身增攻】' },
  { value: /^球體魔匠具【霍蒙克魯斯】$/, label: '球體魔匠具【霍蒙克魯斯】【全體回血】' },
  { value: /^暗器【不可視之災】$/, label: '暗器【不可視之災】【全體扣血】' },
  { value: /^魔匠棺【阿爾卡】$/, label: '魔匠棺【阿爾卡】【連鎖增加】' },
  { value: /^刺突劍【注射器】$/, label: '刺突劍【注射器】【連鎖防禦】' },
  { value: /^_公會會長\/覺醒$/, label: '_公會會長/覺醒【主線增益】', disabled: true },
  { value: /^公會會長的誓約\S$/, label: '公會會長的誓約【主線增血】' },
  { value: /^公會會長的驕傲\S$/, label: '公會會長的驕傲【主線增攻】' },
  { value: /^覺醒的光輝\S$/, label: '覺醒的光輝【主線增血】' },
  { value: /^覺醒的力量\S$/, label: '覺醒的力量【主線增攻】' },
  { value: /^_天選者$/, label: '_天選者【頭目戰增益、極低機率觸發、部分任務中無效、效果不會重複】', disabled: true },
  { value: /^天選者之證$/, label: '天選者之證【全體技能充填全滿】' },
  { value: /^天選者的光輝$/, label: '天選者的光輝【全體AS攻擊倍率增加】' },
  { value: /^天選者的尊嚴$/, label: '天選者的尊嚴【全體AS攻擊次數增加】' },
  { value: /^天選者的榮譽$/, label: '天選者的榮譽【全體SS施放次數增加】' },
  { value: /^_邊界騎士團$/, label: '_邊界騎士團【協力專用】', disabled: true },
  { value: /^邊界騎士團的覺悟$/, label: '邊界騎士團的覺悟【起死回生，全體增益】' },
  { value: /^_結算相關$/, label: '_結算相關', disabled: true },
  { value: /掉寶率上升\S/, label: '掉寶率上升' },
  { value: /獲得EXP量上升\S/, label: '獲得EXP量上升' },
  { value: /獲得金幣量上升\S/, label: '獲得金幣量上升' },
  { value: /^_技能型潛能$/, label: '_技能型潛能', disabled: true },
  { value: /^變身$/, label: '變身【可主動施放】' },
  { value: /^終戰之凜煌眼$/, label: '終戰之凜煌眼【全體恐怖失效、全體回復反轉失效、回血、傷害盾、可主動施放】' },
  { value: /^資產魔法$/, label: '資產魔法【可主動施放】' }
];

export const EXAS_Condition = [
  { value: /^組隊相關$/, label: '組隊相關', disabled: true },
  { value: /「設為隊長」/, label: '設為隊長'},
  { value: /「主屬性：\S、複屬性：\S」/, label: '主副屬性固定'},
  { value: /^隊伍狀態相關$/, label: '隊伍狀態相關', disabled: true },
  { value: /「隊友精靈的HP從未滿100%變為100%」/, label: '隊友精靈的HP從未滿100%變為100%'},
  { value: /^答題相關$/, label: '答題相關', disabled: true },
  { value: /「正確答題(\d次)?」/, label: '正確答題數次'},
  { value: /「正確回答2色以上的問題類型(\d次)?」/, label: '正確回答2色以上的問題類型數次'},
  { value: /「正確回答3色以上的問題類型(\d次)?」/, label: '正確回答3色以上的問題類型數次'},
  { value: /^連鎖數相關$/, label: '連鎖數相關', disabled: true },
  { value: /「連鎖數達\d+次以上」/, label: '連鎖數達數次以上'},
  { value: /「連鎖數封印」、「連鎖數解除」、「減少連鎖」/, label: '連鎖數封印、連鎖數解除、減少連鎖'},
];
export const EXAS_Type = [
  { value: /_全體化/, label: '全體化', disabled: true },
  { value: /全體化/, label: '全體化' },
  { value: /_連續化/, label: '連續化', disabled: true },
  { value: /連續化/, label: '連續化' },
  { value: /_貫穿/, label: '貫穿', disabled: true },
  { value: /貫穿/, label: '貫穿' },
  { value: /_攻擊/, label: '攻擊', disabled: true },
  { value: /^攻擊/, label: '攻擊' },
  { value: /連擊/, label: '連擊' },
  { value: /追擊/, label: '追擊' },
  { value: /瀕死攻擊/, label: '瀕死攻擊' },
  { value: /連鎖攻擊/, label: '連鎖攻擊' },
  { value: /精神抖擻攻擊/, label: '精神抖擻攻擊' },
  { value: /種族數攻擊/, label: '種族數攻擊' },
  { value: /掠奪攻擊/, label: '掠奪攻擊', disabled: true },
  { value: /_特效/, label: '特效', disabled: true },
  { value: /狀態特效/, label: '狀態特效' },
  { value: /屬性特效/, label: '屬性特效' },
  { value: /種族特效/, label: '種族特效' },
  { value: /_防禦/, label: '防禦', disabled: true },
  { value: /防禦/, label: '防禦' },
  { value: /阻隔傷害/, label: '阻隔傷害' },
  { value: /傷害減免/, label: '傷害減免' },
  { value: /_補助/, label: '補助', disabled: true },
  { value: /強化攻擊/, label: '強化攻擊' },
  { value: /強化複屬性攻擊/, label: '強化複屬性攻擊' },
  { value: /強化種族攻擊/, label: '強化種族攻擊' },
  { value: /整合（攻擊）/, label: '整合【攻擊】' },
  { value: /整合（強化攻擊）/, label: '整合【強化攻擊】' },
  { value: /整合（強化複屬性攻擊）/, label: '整合【強化複屬性攻擊】' },
  { value: /反擊/, label: '反擊' },
  { value: /增加連鎖數/, label: '增加連鎖數' },
  { value: /連鎖數反擊/, label: '連鎖數反擊' },
  { value: /EX強化/, label: 'EX強化' },
  { value: /保留問題類型/, label: '保留問題類型' },
  { value: /獅子奮迅/, label: '獅子奮迅' },
  { value: /領域加速/, label: '領域加速', disabled: true },
  { value: /_回復/, label: '回復', disabled: true },
  { value: /回復/, label: '回復' },
  { value: /起死回生/, label: '起死回生' },
];