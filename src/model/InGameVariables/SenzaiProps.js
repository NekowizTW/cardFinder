// eslint-disable-next-line import/prefer-default-export
export const SENZAIS = [
  {
    label: '精靈當前HP相關',
    options: [
      { value: /^戰鬥結束後HP回復.$/, label: '戰後回復【全體補血】' },
      { value: /^九死一生.$/, label: '九死一生【自身】' },
    ],
  },
  {
    label: '更換精靈',
    options: [
      { value: /^更換精靈$/, label: '更換精靈【自身】' },
      { value: /^自動更換精靈$/, label: '自動更換精靈【自身、AUTO用】' },
    ],
  },
  {
    label: 'HP變動',
    options: [
      { value: /^HP‧攻擊力反轉/, label: 'HP‧攻擊力反轉' },
      { value: /^提升傷害\S＆HP下降\S/, label: '提升傷害＆HP下降【自身】' },
      { value: /^ADVERITAS$/, label: 'ADVERITAS【提升傷害＆HP下降(自身)】' },
    ],
  },
  {
    label: '快速技能',
    options: [
      { value: /第二回快速技能\S/, label: '第二回快速技能' },
    ],
  },
  {
    label: '敵方技能失效',
    options: [
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
    ],
  },
  {
    label: '傳奇型態觸發',
    options: [
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
    ],
  },
  {
    label: '心眼相關',
    options: [
      { value: /^_心眼相關$/, label: '_心眼相關', disabled: true },
      { value: /^心眼$/, label: '心眼【顯示敵方當前血量、盤面題目答對率】' },
      { value: /^心眼・破$/, label: '心眼・破【顯示敵方技能反彈時的行動】' },
      { value: /^心眼・絕$/, label: '心眼・絕【顯示敵方下次的行動】' },
      { value: /^心眼・怒$/, label: '心眼・怒【顯示敵方的憤怒條件】' },
      { value: /^心眼・逝$/, label: '心眼・逝【顯示敵方死亡時的行動】' },
    ],
  },
  {
    label: '連鎖相關',
    options: [
      { value: /^提升連鎖\S$/, label: '起始連鎖增加' },
      { value: /^防禦連鎖\S$/, label: '連鎖防禦' },
    ],
  },
  {
    label: '答題相關',
    options: [
      { value: /^減少難易度\S$/, label: '盤面三色下降' },
      { value: /^增加難易度Ⅴ＆攻擊力上升Ⅰ$/, label: '盤面三色上升、全體增攻' },
      { value: /^答對3色問題(類型)?時，將給予敵方的傷害變為\d(\.\d)?倍。$/, label: '盤面三色增傷' },
      { value: /^答題技能延長\S$/, label: '答題技能時間延長' },
      { value: /^EXCELLENT回答時間延長\S$/, label: 'EXCELLENT回答時間延長' },
      { value: /^答題重置$/, label: '答題重置' },
    ],
  },
  {
    label: '擊破相關',
    options: [
      { value: /^擊破・回復$/, label: '擊破・回復' },
      { value: /^擊破・增加連鎖數\S?$/, label: '擊破・增加連鎖數' },
      { value: /^擊破・強化攻擊$/, label: '擊破・強化攻擊' },
      { value: /^擊破・防禦連鎖$/, label: '擊破・防禦連鎖' },
      { value: /^魔劍弓【夢現射手】$/, label: '魔劍弓【夢現射手】【自身增攻】' },
      { value: /^球體魔匠具【霍蒙克魯斯】$/, label: '球體魔匠具【霍蒙克魯斯】【全體回血】' },
      { value: /^暗器【不可視之災】$/, label: '暗器【不可視之災】【全體扣血】' },
      { value: /^魔匠棺【阿爾卡】$/, label: '魔匠棺【阿爾卡】【連鎖增加】' },
      { value: /^刺突劍【注射器】$/, label: '刺突劍【注射器】【連鎖防禦】' },
    ],
  },
  {
    label: '公會會長/覺醒【主線增益】',
    options: [
      { value: /^公會會長的誓約\S$/, label: '公會會長的誓約【主線增血】' },
      { value: /^公會會長的驕傲\S$/, label: '公會會長的驕傲【主線增攻】' },
      { value: /^覺醒的光輝\S$/, label: '覺醒的光輝【主線增血】' },
      { value: /^覺醒的力量\S$/, label: '覺醒的力量【主線增攻】' },
    ],
  },
  {
    label: '天選者',
    options: [
      { value: /^天選者之證$/, label: '天選者之證【低機率頭目戰全體技能充填全滿】' },
      { value: /^天選者的光輝$/, label: '天選者的光輝【低機率頭目戰全體AS攻擊倍率增加】' },
      { value: /^天選者的光輝\*$/, label: '天選者的光輝【70%機率頭目戰全體AS攻擊倍率增加】' },
      { value: /^天選者的尊嚴$/, label: '天選者的尊嚴【低機率頭目戰全體AS攻擊次數增加】' },
      { value: /^天選者的榮譽$/, label: '天選者的榮譽【低機率頭目戰全體SS施放次數增加】' },
    ],
  },
  {
    label: '邊界騎士團',
    options: [
      { value: /^邊界騎士團的覺悟$/, label: '邊界騎士團的覺悟【起死回生，全體增益】' },
    ],
  },
  {
    label: '結算相關',
    options: [
      { value: /掉寶率上升\S/, label: '掉寶率上升' },
      { value: /獲得EXP量上升\S/, label: '獲得EXP量上升' },
      { value: /獲得金幣量上升\S/, label: '獲得金幣量上升' },
    ],
  },
  {
    label: '技能型潛能',
    options: [
      { value: /^變身$/, label: '變身【可主動施放】' },
      { value: /^終戰之凜煌眼$/, label: '終戰之凜煌眼【全體恐怖失效、全體回復反轉失效、回血、傷害盾、可主動施放】' },
      { value: /^資產魔法$/, label: '資產魔法【可主動施放】' },
    ],
  },
];
