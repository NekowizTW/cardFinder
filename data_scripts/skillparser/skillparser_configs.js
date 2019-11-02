//meta:
//side: 'team', 'enemy'
//taraget: 'self', 'other', 'single' 'all'
//

//AS: Condition, Effect, Cost
const AS_category = {
    '效果-提升攻擊': {
        'type': 'Effect',
        'text': '^((?!(依照|並)).)*提升攻擊力',
        'meta':{
            'side': 'enemy',
            'target': 'self',
            'effect': 'coefficient|1'
        }
    },
    '效果-自己提升攻擊': {
        'type': 'Effect',
        'text': '(^((?!(憑運氣|不定幅)).)*提升給予敵方(?!全體).*的傷害|給予敵方單體.*傷害$|(給予|對)敵方單體.*擊$|將敵方單體|世界的攻擊|破滅性的一擊|1球)',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性特效-1': {
        'type': 'Effect',
        'text': '給予#attr#屬性敵方單體(少量|大量|特效|巨大|極大|超級大)?傷害$',
        'parameter': ['attr'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性特效-2': {
        'type': 'Effect',
        'text': '提升對#attr#屬性敵方的傷害',
        'parameter': ['attr'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-逆向屬性特效': {
        'type': 'Effect',
        'text': '給予#attr#屬性以外的敵方單體特效傷害',
        'parameter': ['attr'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-連擊': {
        'type': 'Effect',
        'text': '連續((#combo#)次)?攻擊敵方(單體)?(#combo#次)?',
        'parameter': ['combo', 'combo'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'combo': 'parameter|6',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性特效連擊-1': {
        'type': 'Effect',
        'text': '給予#attr#屬性敵方單體連續#combo#次特效傷害',
        'parameter': ['attr','combo'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|1',
            'combo': 'parameter|2',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性特效連擊-2': {
        'type': 'Effect',
        'text': '(對|給予)#attr#屬性敵方單體(發動)?特(效|攻)#combo#連擊',
        'parameter': ['attr','combo'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|2',
            'combo': 'parameter|5',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性特效連擊-3': {
        'type': 'Effect',
        'text': '給予#attr#屬性敵方單體.*#combo#(連續|連続|次)(攻擊|攻撃|傷害)',
        'parameter': ['attr','combo'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'attr': 'parameter|1',
            'combo': 'parameter|2',
            'effect': 'coefficient|1'
        }
    },
    '效果-種族特效': {
        'type': 'Effect',
        'text': '給予種族為#breed#的敵方單體.*傷害',
        'parameter': ['breed'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'breed': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-隊友提升攻擊': {
        'type': 'Effect',
        'text': '(提升(全體)?隊友的攻擊力|並提升攻擊力)',
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性隊友提升攻擊': {
        'type': 'Effect',
        'text': '提升#attr#屬性隊友(的)?攻擊力',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'attr': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-種族隊友提升攻擊力': {
        'type': 'Effect',
        'text': '提升#breed#隊友的攻擊力',
        'parameter': ['breed'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'breed': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '效果-全體攻擊': {
        'type': 'Effect',
        'text': '(分散攻擊|敵方全體)',//給予敵方全體.*#attr#屬性傷害|給予敵方全體.*擊
        'meta':{
            'side': 'enemy',
            'target': 'all',
            'effect': 'coefficient|1'
        }
    },
    '效果-不分散全體攻擊': {
        'type': 'Effect',
        'text': '不論敵方人數多寡',
        'meta':{
            'side': 'enemy',
            'target': 'all',
            'effect': 'coefficient|1'
        }
    },
    '效果-賭博攻擊': {
        'type': 'Effect',
        'text': '憑運氣提升給予敵方的傷害|孤注一擲|傷害隨機提升|不定幅提升給予敵方的傷害',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1'
        }
    },
    '效果-失去的憤怒': {
        'type': 'Effect',
        'text': '依照無法戰鬥的夥伴數.*提升攻擊力',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1'
        }
    },
    '效果-吸血': {
        'type': 'Effect',
        'text': '(吸收.*HP|附加敵方HP吸收|並吸取敵人的HP)',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1'
        }
    },
    '效果-屬性的庇佑': {
        'type': 'Effect',
        'text': '依照隊伍中屬性種類數.*提升攻擊力',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|3',
        }
    },
    '效果-回復': {
        'type': 'Effect',
        'text': '回復(#attr#屬性隊友|全體隊友|我方全體).*HP',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'attr': 'parameter|1|all',
            'effect': 'coefficient|1'
        }
    },
    '效果-回復自身': {
        'type': 'Effect',
        'text': '回復自己.*HP',
        'meta':{
            'side': 'team',
            'target': 'self'
        }
    },
    '效果-減輕傷害': {
        'type': 'Effect',
        'text': '減輕#percent##attr#屬性傷害',
        'parameter': ['percent', 'attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'attr': 'parameter|3'
        }
    },
    '效果-技能複製': {
        'type': 'Effect',
        'text': '發動左方相鄰精靈的答題技能',
    },
    '條件-連段數': {
        'type': 'Condition',
        'text': '^(連續答對#chain#題|#chain#連鎖)',
        'parameter': ['chain', 'chain'],
        'meta':{
            'chain': 'parameter|3|2',
        }
    },
    '條件-剩餘HP以上-1': {
        'type': 'Condition',
        'text': '(剩餘)?HP(在)?#percent#以上時',
        'parameter': ['percent'],
        'meta':{
            'percent': 'parameter|3',
        }
    },
    '條件-剩餘HP以上-2': {
        'type': 'Condition',
        'text': '(HP全滿時|MAX HP狀態時)',
        'meta':{
            'percent': '100',
        }
    },
    '條件-剩餘HP以下': {
        'type': 'Condition',
        'text': '剩餘HP在#percent#以下時',
        'parameter': ['percent'],
        'meta':{
            'percent': 'parameter|1',
        }
    },
    '條件-只有自己屬性': {
        'type': 'Condition',
        'text': '隊伍中只有自己是#attr#屬性時',
        'parameter': ['attr'],
        'meta':{
            'attr': 'parameter|1',
        }
    },
    '條件-隊長': {
        'type': 'Condition',
        'text': '若為隊長時'
    },
    '條件-若為種族': {
        'type': 'Condition',
        'text': '若為#breed#',
        'parameter': ['breed'],
        'meta':{
            'breed': 'parameter|1',
        }
    },
    '條件-種族數': {
        'type': 'Condition',
        'text': '依照#breed#夥伴數',
        'parameter': ['breed'],
        'meta':{
            'breed': 'parameter|1',
        }
    },
    '條件-若為屬性': {
        'type': 'Condition',
        'text': '若為#attr#屬性時',
        'parameter': ['attr'],
        'meta':{
            'attr': 'parameter|1',
        }
    },
    '條件-若為副屬性': {
        'type': 'Condition',
        'text': '複屬性為#attr#屬性時又再提升',
        'parameter': ['attr'],
        'meta':{
            'attr': 'parameter|1',
        }
    },
    '條件-快速回答': {
        'type': 'Condition',
        'text': '若回答快則',
        'parameter': ['attr']
    },
    '條件-卡片屬性在數量以下': {
        'type': 'Condition',
        'text': '隊伍中#attr#屬性卡片在3張以下時',
        'parameter': ['attr'],
        'meta':{
            'attr': 'parameter|1',
        }
    },
    '條件-問題屬性數量-2以上': {
        'type': 'Condition',
        'text': '問題類型擁有2種顏色'
    },
    '條件-問題屬性數量-2到3': {
        'type': 'Condition',
        'text': '問題類型擁有2種或3種顏色時'
    },
    '條件-問題屬性數量-all': {
        'type': 'Condition',
        'text': '問題類型的顏色增加時'
    },
    '增幅-又再提升': {
        'type': 'Kicker',
        'text': '又再.*提升$|提升更多|回復更多',
        'meta':{
            'effect': 'coefficient|1',
        }
    },
    '增幅-又再增傷': {
        'type': 'Kicker',
        'text': '再加重傷害|可提升傷害|再給予特效傷害',
        'meta':{
            'effect': 'coefficient|1',
        }
    },
    '增幅-又再減輕': {
        'type': 'Kicker',
        'text': '再減輕#percent#',
        'parameter': ['percent'],
        'meta':{
            'effect': 'parameter|1',
        }
    },
    '增幅-又可連擊': {
        'type': 'Kicker',
        'text': '(可連續攻擊#combo#次|改為#combo#連擊)',
        'parameter': ['combo', 'combo'],
        'meta':{
            'combo': 'parameter|2|3|4',
        }
    },
    '費用-單體犧牲': {
        'type': 'Cost',
        'text': '使用MAXHP的#percent#',
        'parameter': ['percent'],
        'meta':{
            'percent': 'parameter|1',
        }
    },
    '費用-全體犧牲': {
        'type': 'Cost',
        'text': '(使用|消耗)隊友MAXHP的#percent#',
        'parameter': ['percent'],
        'meta':{
            'percent': 'parameter|1',
        }
    }
}

//SS: Effect, Kicker, Condition, Cost, Trait
const SS_category = {
    '效果-單體傷害': {
        'type': 'Effect',
        'text': '(給予敵方單體傷害|以轟天雷擊淨化敵方單體|使敵方單體不留痕跡地消失)',
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1'
        }
    },
    '效果-全體傷害': {
        'type': 'Effect',
        'text': '(給予敵方全體奮力的一擊|以大劍橫掃敵方全體|以雷斬消滅敵方全體|復仇的必殺斬擊|使敵方全體不留痕跡地消失|以獄炎燒毀敵方全體|伴隨幸福的排除一擊|伴隨寬容的消滅一擊|回歸虛無的慈愛一擊)',
        'meta':{
            'side': 'enemy',
            'target': 'all',
            'effect': 'coefficient|1'
        }
    },
    '效果-大魔術': {
        'type': 'Effect',
        'text': '給予敵方#range#.{0,3}(#attr#屬性)(超級大|的)?傷害$',
        'parameter': ['range', 'attr'],
        'meta':{
            'side': 'enemy',
            'target': 'parameter|1',
            'attr': 'parameter|3',
            'effect': 'coefficient|1'
        }
    },
    '效果-多重魔術-1': {
        'type': 'Effect',
        'text': '給予敵方單體連續#combo#次(大量|中量)?#attr#屬性(.{2})?傷害',
        'parameter': ['combo', 'attr'],
        'coefficient': 1,
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1',
            'combo': 'parameter|1',
            'attr': 'parameter|3',
        }
    },
    '效果-多重魔術-2': {
        'type': 'Effect',
        'text': '連續#combo#次造成敵方單體#attr#屬性.*傷害',
        'parameter': ['combo', 'attr'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1',
            'combo': 'parameter|1',
            'attr': 'parameter|2',
        }
    },
    '效果-比例削減': {
        'type': 'Effect',
        'text': '減少敵方#range##percent#HP',
        'parameter': ['range', 'percent'],
        'meta':{
            'side': 'enemy',
            'target': 'parameter|1',
            'percent': 'parameter|2'
        }
    },
    '效果-強化傷害-1': {
        'type': 'Effect',
        'text': '提升(#attr#屬性隊友|(全體)?隊友)(的)?攻擊力#turn#回合',
        'parameter': ['attr', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'attr': 'parameter|2',
            'turn': 'parameter|5',
        }
    },
    '效果-強化傷害-2': {
        'type': 'Effect',
        'text': '提升(#attr#屬性隊友|(全體)?隊友)(的)?攻擊力$',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'attr': 'parameter|2',
            'turn': 'coefficient|1'
        }
    },
    '效果-強化自身傷害-1': {
        'type': 'Effect',
        'text': '(提高自身力量#turn#回合|使自己擁有開拓命運的力量#turn#回合)',
        'parameter': ['turn', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'coefficient|1',
            'turn': 'parameter|2|3'
        }
    },
    '效果-強化自身傷害-2': {
        'type': 'Effect',
        'text': '提升自己(的)?攻擊力#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'coefficient|1',
            'turn': 'parameter|2'
        }
    },
    '效果-強化傷害-3': {
        'type': 'Effect',
        'text': '提升攻擊力#turn#回合$',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'coefficient|1',
            'turn': 'parameter|1'
        }
    },
    '效果-減傷盾-1': {
        'type': 'Effect',
        'text': '減輕敵方給予全體隊友的傷害#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'turn': 'parameter|1'
        }
    },
    '效果-減傷盾-2': {
        'type': 'Effect',
        'text': '^減輕#percent#(#attr#(屬性)?)?傷害#turn#回合',
        'parameter': ['percent', 'attr', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'attr': 'parameter|4|全',
            'turn': 'parameter|6'
        }
    },
    '效果-減傷盾-3': {
        'type': 'Effect',
        'text': '減輕#percent##attr#屬性傷害$',
        'parameter': ['percent', 'attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'attr': 'parameter|3',
            'turn': 'coefficient|1'
        }
    },
    '效果-減傷盾-4': {
        'type': 'Effect',
        'text': '並減輕#percent#傷害#turn#回合',
        'parameter': ['percent', 'attr', 'turn'],
        'meta':{
            'side': 'team',
            'effect': 'parameter|1',
            'attr': 'parameter|全',
            'turn': 'parameter|3'
        }
    },
    '效果-回復-百分比': {
        'type': 'Effect',
        'text': '^回復(全體隊友|#attr#屬性隊友)?(的|少量|中量|大量|超大量|特大量|超特量)?HP',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'attr': 'parameter|2|全'
        }
    },
    '效果-回復-點數': {
        'type': 'Effect',
        'text': '^並?回復(全體隊友|#attr#屬性隊友)?#number#點?HP',
        'parameter': ['attr', 'number'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|3',
            'attr': 'parameter|2|全'
        }
    },
    '效果-全回復-團補': {
        'type': 'Effect',
        'text': '回復(全體|#attr#屬性)隊友的?全部的?HP',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': '100%'
        }
    },
    '效果-全回復-單補': {
        'type': 'Effect',
        'text': '回復一位隊友全部HP',
        'meta':{
            'side': 'team',
            'target': 'single',
            'effect': '100%'
        }
    },
    '效果-回復-其他隊友': {
        'type': 'Effect',
        'text': '回復其他隊友全部HP',
        'meta':{
            'side': 'team',
            'target': 'other',
            'effect': '100%'
        }
    },
    '效果-徐徐回復-1': {
        'type': 'Effect',
        'text': '^逐漸回復(全體隊友的)?HP#turn#回合',
        'parameter': ['attr', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'turn': 'parameter|1'
        }
    },
    '效果-徐徐回復-2': {
        'type': 'Effect',
        'text': '逐漸回復自己的HP#turn#回合',
        'parameter': ['attr', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'coefficient|1',
            'turn': 'parameter|1'
        }
    },
    '效果-回復異常狀態': {
        'type': 'Effect',
        'text': '回復(全體隊友(的)?)?異常狀態'
    },
    '效果-復活-1': {
        'type': 'Effect',
        'text': '使(其他|全體|#attr#屬性)?隊友以#percent#HP(狀態)?復活',
        'parameter': ['attr', 'percent'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|3',
            'attr': 'parameter|2|全'
        }
    },
    '效果-復活-2': {
        'type': 'Effect',
        'text': '使(#attr#屬性|全體)?隊友復活',
        'parameter': ['attr'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'attr': 'parameter|2|all'
        }
    },
    '效果-起死回生-1': {
        'type': 'Effect',
        'text': '#turn#回合內即使遭受致命傷害',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'turn': 'parameter|1'
        }
    },
    '效果-起死回生-2': {
        'type': 'Effect',
        'text': '也可以#percent#HP狀態復活',
        'parameter': ['percent'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1'
        }
    },
    '效果-BOOST': {
        'type': 'Effect',
        'text': '(並)?有.*發動爆擊',
        'meta':{
            'side': 'team',
            'target': 'all'
        }
    },
    '效果-提升數值上限-全體': {
        'type': 'Effect',
        'text': '提升全體隊友#number#(攻擊力和HP|攻擊力|HP)(（上限值：#number#）)?',
        'parameter': ['number', 'number'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'ability': 'parameter|3',
            'effect': 'parameter|1',
            'limit': 'parameter|5'
        }
    },
    '效果-提升數值上限-自身': {
        'type': 'Effect',
        'text': '提升自身#number#(攻擊力和HP|攻擊力|HP)(（上限值：#number#）)?',
        'parameter': ['number', 'number'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'ability': 'parameter|3',
            'effect': 'parameter|1',
            'limit': 'parameter|5'
        }
    },
    '效果-異常盾': {
        'type': 'Effect',
        'text': '使敵方的異常狀態攻擊失效#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'turn': 'parameter|1'
        }
    },
    '效果-數字盾': {
        'type': 'Effect',
        'text': '使#number#以下的全屬性傷害失效#turn#回合',
        'parameter': ['number', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'turn': 'parameter|3'
        }
    },
    '效果-充能': {
        'type': 'Effect',
        'text': '縮短發動特殊技能回合數#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1'
        }
    },
    '效果-延遲': {
        'type': 'Effect',
        'text': '(敵方#range#(的)?)?攻擊延遲#turn#回合',
        'parameter': ['range', 'turn'],
        'meta':{
            'side': 'team',
            'target': 'parameter|2|全體',
            'effect': 'parameter|4'
        }
    },
    '效果-技反': {
        'type': 'Effect',
        'text': '技能(物理)?反擊待機#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|2'
        }
    },
    '效果-強技反': {
        'type': 'Effect',
        'text': '且(物理)?反擊時加重傷害'
    },
    '效果-多段物反': {
        'type': 'Effect',
        'text': '多段式(物理)?反擊待機'
    },
    '效果-嘲諷': {
        'type': 'Effect',
        'text': '使敵方集中攻擊自己(#turn#回合)?',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'parameter|2'
        }
    },
    '效果-鐵壁': {
        'type': 'Effect',
        'text': '使攻擊或異常狀態攻擊等效果失效#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'self',
            'effect': 'parameter|1'
        }
    },
    '效果-毒-1': {
        'type': 'Effect',
        'text': '給予敵方全體.{0,2}毒攻擊傷害#turn#回合$',
        'parameter': ['turn'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1',
            'turn': 'parameter|1'
        }
    },
    '效果-毒-2': {
        'type': 'Effect',
        'text': '給予敵方全體毒攻擊固定#number#傷害#turn#回合',
        'parameter': ['number', 'turn', 'number'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'effect': 'parameter|1',
            'turn': 'parameter|3'
        }
    },
    '效果-虛無之瞳': {
        'type': 'Effect',
        'text': '#turn#回合後使敵方單體化為虛無',
        'parameter': ['turn'],
        'meta':{
            'side': 'enemy',
            'target': 'single',
            'turn': 'parameter|1'
        }
    },
    '效果-效果解除': {
        'type': 'Effect',
        'text': '解除(敵方#range#的)?(防禦|阻隔傷害|物理反擊|技能反擊|屬性吸收|防禦＆阻隔傷害)',
        'parameter': ['range'],
        'meta':{
            'side': 'enemy',
            'target': 'parameter|2|全體'
        }
    },
    '效果-賦予連鎖數-1': {
        'type': 'Effect',
        'text': '賦予連鎖數加#chain#的效果',
        'parameter': ['chain'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1'
        }
    },
    '效果-賦予連鎖數-2': {
        'type': 'Effect',
        'text': '追加連鎖數#chain#',
        'parameter': ['chain'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1'
        }
    },
    '效果-保護連鎖': {
        'type': 'Effect',
        'text': '保護連鎖數#turn#回合',
        'parameter': ['turn'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1'
        }
    },
    '效果-斬擊大魔術-1': {
        'type': 'Effect',
        'text': '發動#attr#屬性的#combo#連擊',
        'parameter': ['attr', 'combo'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'coefficient|1',
            'attr': 'parameter|1',
            'combo': 'parameter|2'
        }
    },
    '效果-斬擊大魔術-2': {
        'type': 'Effect',
        'text': '再依照連擊數增加連鎖數'
    },
    '效果-時限大魔術': {
        'type': 'Effect',
        'text': '#turn#回合後給予敵方單體#attr#屬性傷害（上限設置數：#combo#）',
        'parameter': ['turn', 'attr', 'combo'],
        'meta': {
            'side': 'enemy',
            'target': 'single',
            'effect': 'coefficient|1',
            'turn': 'parameter|1',
            'attr': 'parameter|2',
            'limit': 'parameter|3'
        }
    },
    '效果-問題類型洗牌': {
        'type': 'Effect',
        'text': '問題類型重新洗牌'
    },
    '效果-盤面-轉色': {
        'type': 'Effect',
        'text': '將問題(類型)?化為#attr#屬性',
        'parameter': ['attr'],
        'meta': {
            'attr': 'parameter|1'
        }
    },
    '效果-盤面-+C': {
        'type': 'Effect',
        'text': '賦予問題類型連鎖數加#chain#',
        'parameter': ['chain'],
        'meta': {
            'side': 'team',
            'effect': 'parameter|2'
        }
    },
    '效果-盤面-減傷': {
        'type': 'Effect',
        'text': '賦予(問題類型)?減輕#percent#傷害的效果',
        'parameter': ['percent'],
        'meta': {
            'side': 'team',
            'effect': 'parameter|2'
        }
    },
    '效果-盤面-加速': {
        'type': 'Effect',
        'text': '賦予(問題類型)?技能充填加#turn#的效果',
        'parameter': ['turn'],
        'meta': {
            'effect': 'parameter|2'
        }
    },
    '效果-盤面-攻擊': {
        'type': 'Effect',
        'text': '賦予(問題類型)?提升攻擊力的效果',
        'meta': {
            'side': 'team',
            'effect': 'coefficient|1'
        }
    },
    '效果-盤面-回復': {
        'type': 'Effect',
        'text': '賦予(問題類型)?回復(HP)?的效果',
        'meta': {
            'side': 'team',
            'effect': 'coefficient|1'
        }
    },
    '效果-盤面-問題效果-dummy': {
        'type': 'Effect',
        'text': '(問題類型不變|在使用特殊技能前不會重複|到發動特殊技能為止不疊加）)'
    },
    '效果-盤面-問題隨機效果-1': {
        'type': 'Effect',
        'text': '(並)?(隨機)?賦予(問題類型)?((連鎖|減輕(#percent#)?傷害|(特殊)?技能充填(加#chain#)?|提升攻擊力|回復(HP)?)(及|、|和|或)){1,3}(連鎖|減輕(#percent#)?傷害|(特殊)?技能充填(加#chain#)?|提升攻擊力|回復(HP)?)(其中之一)?的效果',
        'parameter': ['percent', 'chain', 'percent', 'chain'],
    },
    '效果-盤面-問題隨機效果-2': {
        'type': 'Effect',
        'text': '並隨機賦予一種效果'
    },
    '效果-盤面-問題隨機效果-3': {
        'type': 'Effect',
        'text': '抽籤'
    },
    '效果-複製': {
        'type': 'Effect',
        'text': '發動隊友前一次發動的特殊技能'
    },
    '效果-刪去回答': {
        'type': 'Effect',
        'text': '刪除#combo#個答案選項',
        'parameter': ['combo'],
        'meta': {
            'side': 'team',
            'effect': 'parameter|1'
        }
    },
    '效果-延長答題時間限制': {
        'type': 'Effect',
        'text': '延長#second#秒答題技能時間限制#turn#回合',
        'parameter': ['second', 'turn'],
        'meta': {
            'side': 'team',
            'time': 'parameter|1',
            'turn': 'parameter|2'
        }
    },
    '效果-找出答案': {
        'type': 'Effect',
        'text': '找出答案',
        'parameter': ['answer'],
    },
    '追加效果-傷害': {
        'type': 'Addition',
        'text': '並給予#attr#屬性傷害',
        'parameter': ['attr'],
        'meta': {
            'attr': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '追加效果-回復': {
        'type': 'Addition',
        'text': '(又再|並)回復(全體)?隊友((?!全部)|的|#percent#)HP',
        'parameter': ['percent'],
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '追加效果-大補': {
        'type': 'Addition',
        'text': '並回復全部HP',
        'meta': {
            'effect': '100%'
        }
    },
    '追加效果-徐回': {
        'type': 'Addition',
        'text': '^(並|再)逐漸回復(全體隊友的)?HP#turn#回合',
        'parameter': ['turn'],
        'meta': {
            'turn': 'parameter|4',
            'effect': 'coefficient|1'
        }
    },
    '追加效果-復活': {
        'type': 'Addition',
        'text': '^又再以#percent#HP狀態復活',
        'parameter': ['percent'],
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '追加效果-減輕傷害': {
        'type': 'Addition',
        'text': '並減輕傷害',
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '追加效果-提升數值上限': {
        'type': 'Addtion',
        'text': '並提升#number#(攻擊力和HP|攻擊力|HP)（上限值：#number#）',
        'parameter': ['number', 'number'],
        'meta':{
            'side': 'team',
            'ability': 'parameter|3',
            'effect': 'parameter|1',
            'limit': 'parameter|4'
        }
    },
    '條件-達到連鎖數': {
        'type': 'Condition',
        'text': '^#chain#連鎖時',
        'parameter': ['chain'],
        'meta': {
            'chain': 'parameter|1'
        }
    },
    '條件-快速回答': {
        'type': 'Condition',
        'text': '若平均回答時間越快'
    },
    '條件-底力發動': {
        'type': 'Condition',
        'text': '剩餘HP在#percent#以下時',
        'parameter': ['percent'],
        'meta': {
            'percent': 'parameter|1'
        }
    },
    '條件-精神抖擻': {
        'type': 'Condition',
        'text': '剩餘HP在#percent#以上時',
        'parameter': ['percent'],
        'meta': {
            'percent': 'parameter|1'
        }
    },
    '條件-自身處於負面狀態': {
        'type': 'Condition',
        'text': '(自身處於)?(中毒|屬性弱化|答題技能封印|詛咒)狀態時',
        'meta': {
            'effect': 'parameter|2'
        }
    },
    '條件-複屬性': {
        'type': 'Condition',
        'text': '複屬性為#attr#屬性時',
        'parameter': ['attr'],
        'meta': {
            'attr': 'parameter|1'
        }
    },
    '費用-犧牲自己': {
        'type': 'Cost',
        'text': '犧牲自己|以自己的性命為代價'
    },
    '費用-每回合消耗HP': {
        'type': 'Cost',
        'text': '(與每回合#percent#|每回合消耗(隊友)?MAXHP的#percent#)',
        'parameter': ['percent', 'percent'],
        'meta': {
            'percent': 'parameter|5|2'
        }
    },
    '費用-降低數值上限-全體': {
        'type': 'Cost',
        'text': '減少全體隊友#number#(攻擊力|HP)',
        'parameter': ['number'],
        'meta': {
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'type': 'parameter|3'
        }
    },
    '費用-降低自己數值上限-自身': {
        'type': 'Cost',
        'text': '減少自己#number#(攻擊力|HP)',
        'parameter': ['number'],
        'meta': {
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'stat': 'parameter|3'
        }
    },
    '費用-消耗連鎖': {
        'type': 'Cost',
        'text': '消耗#chain#連鎖',
        'parameter': ['chain'],
        'meta': {
            'chain': 'parameter|1'
        }
    },
    '費用-反動': {
        'type': 'Cost',
        'text': '使用技能後陷入封印狀態#turn#回合',
        'parameter': ['turn'],
        'meta': {
            'chain': 'parameter|1'
        }
    },
    '費用-反動蝕': {
        'type': 'Cost',
        'text': '使用技能後全體隊友陷入封印狀態#turn#回合',
        'parameter': ['turn'],
        'meta': {
            'chain': 'parameter|1'
        }
    },
    '費用-犧牲魔術-固定': {
        'type': 'Cost',
        'text': '使用#number#點HP',
        'parameter': ['number'],
        'meta': {
            'effect': 'parameter|1'
        }
    },
    '費用-犧牲魔術-自身': {
        'type': 'Cost',
        'text': '使用MAXHP的#percent#',
        'parameter': ['percent'],
        'meta': {
            'percent': 'parameter|1'
        }
    },
    '費用-犧牲魔術-全體': {
        'type': 'Cost',
        'text': '使用(全體)?隊友MAXHP的#percent#',
        'parameter': ['percent'],
        'meta': {
            'percent': 'parameter|2'
        }
    },
    '費用-蓄力': {
        'type': 'Cost',
        'text': '蓄力#turn#回合後',
        'parameter': ['turn'],
        'meta': {
            'turn': 'parameter|1'
        }
    },
    '費用-強化精靈': {
        'type': 'Cost',
        'text': '發動中無法行動'
    },
    '增幅-加重傷害': {
        'type': 'Kicker',
        'text': '((?!精靈越多則再)|並|再)加重傷害',
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '增幅-特效大魔術': {
        'type': 'Kicker',
        'text': '(並|再)給予#attr#屬性敵方特效傷害',
        'parameter': ['attr'],
        'meta': {
            'attr': 'parameter|2',
            'effect': 'coefficient|1'
        }
    },
    '增幅-殘滅大魔術': {
        'type': 'Kicker',
        'text': '再給予#attr#屬性傷害#turn#回合',
        'parameter': ['attr', 'turn'],
        'meta': {
            'attr': 'parameter|1',
            'turn': 'parameter|2',
            'effect': 'coefficient|1'
        }
    },
    '增幅-弱化大魔術': {
        'type': 'Kicker',
        'text': '再使敵方防禦力弱化#turn#回合',
        'parameter': ['turn'],
        'meta': {
            'turn': 'parameter|1',
            'effect': 'coefficient|1'
        }
    },
    '增幅-激化大魔術': {
        'type': 'Effect',
        'text': '每次發動效果值提升2倍（上限：#combo#階段）',
        'parameter': ['combo'],
        'meta': {
            'limit': 'parameter|1'
        }
    },
    '增幅-純屬性大魔術': {
        'type': 'Effect',
        'text': '單#attr#屬性的精靈越多則再加重傷害',
        'parameter': ['attr'],
        'meta': {
            'attr': 'parameter|1'
        }
    },
    '增幅-提升傷害': {
        'type': 'Kicker',
        'text': '可提升給予敵方的傷害',
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '增幅-追加連擊次數': {
        'type': 'Kicker',
        'text': '再追加#combo#次傷害',
        'parameter': ['combo'],
        'meta': {
            'combo': 'parameter|1'
        }
    },
    '增幅-回復HP': {
        'type': 'Kicker',
        'text': '(並回復HP|回復更多)',
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '增幅-再提升效果': {
        'type': 'Kicker',
        'text': '又再提升$',
        'meta': {
            'effect': 'coefficient|1'
        }
    },
    '增幅-再提升回合數效果': {
        'type': 'Kicker',
        'text': '又再.*#turn#回合$',
        'parameter': ['turn'],
        'meta': {
            'effect': 'parameter|1'
        }
    },
    '增幅-再提升斬血效果': {
        'type': 'Kicker',
        'text': '再減少#percent#$',
        'parameter': ['percent'],
        'meta': {
            'effect': 'parameter|1'
        }
    },
    '增幅-再提升復活效果': {
        'type': 'Kicker',
        'text': '(則可|並)以#percent#HP狀態復活',
        'parameter': ['percent'],
        'meta': {
            'effect': 'parameter|2'
        }
    },
    '增幅-再提升雙圍效果': {
        'type': 'Kicker',
        'text': '再提升#number#（上限值：#number#）',
        'parameter': ['number', 'number'],
        'meta':{
            'side': 'team',
            'target': 'all',
            'effect': 'parameter|1',
            'limit': 'parameter|3'
        }
    },
    '特性-無視技反': {
        'type': 'Trait',
        'text': '無視技能反彈|無視技能反擊'
    },
    '特性-任務中僅限一次': {
        'type': 'Trait',
        'text': '於一次任務中|僅限一次|每次任務只可使用一次'
    }
};

const param_patterns = {
    'turn': { token: '#turn#', regex: '([0-2]?[0-9]|30)' }, // 0~30
    'chain': { token: '#chain#', regex: '([0-1]?[0-9]|20)' }, // 0~20
    'combo': { token: '#combo#', regex: '([1-2]?[0-9])' }, // 0~20
    'breed': { token: '#breed#', regex: '(((龍族|神族|魔族|天使|妖精|亞人|物質|魔法生物|戰士|術士|AbCd)(與|或|、)){0,2}(龍族|神族|魔族|天使|妖精|亞人|物質|魔法生物|戰士|術士|AbCd))' },
    'attr': { token: '#attr#', regex: '((?:[火|水|雷|光|闇]、){0,2}[火|水|雷|光|闇|全])' }, // (A、)B
    'answer': { token: '#answer#', regex: '[1-2]' }, // 1-2
    'percent': { token: '#percent#', regex: '(100|[0-9]?[0-9])(%|％)' }, // 0%~100%
    'number': { token: '#number#', regex: '([1-9]?[0-9]?(0|5)0)' }, // 50, 100, 150, ..., 9500
    'range': { token: '#range#', regex: '(單體|全體)' },
    'second': { token: '#second#', regex: '([0-2]?[0-9]|30)' } //0~30
}

module.exports = {
  AS: AS_category,
  SS: SS_category,
  RegPatterns: param_patterns
};