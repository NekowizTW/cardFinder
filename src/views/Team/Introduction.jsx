import React from 'react';
import { Link } from 'react-router-dom';

export default function Introduction() {
  return (
    <>
      <h2 className="content-subhead">使用說明</h2>
      <h3>隊伍編輯</h3>
      <ul>
        <li>可編輯項目：卡片、潛能數、瑪那、EXAS切換、結晶。</li>
        <li>點選編輯可以編輯卡片，點選下方完成或是右上方的x皆可退出編輯。</li>
        <li>編輯區下方可用搜尋來檢索你的卡片，僅篩選配布卡以及自選卡片，並顯示最多100個結果。</li>
        <li>瑪那有提供預設按鈕(+0, +200, +400)，潛能預設為10潛。</li>
        <li>EXAS切換僅適用隊長與隊員，預設為特殊技能。</li>
        <li>
          結晶僅提供下拉搜尋，最大設置兩個，台版特製卡請先設置優先權較高的結晶上去。
          <br />
          在塞滿兩結晶時清空第一結晶會導致第二結晶遞補至第一結晶，若因此無法編輯可以先點完成再點編輯。

        </li>
      </ul>
      <h3>隊伍匯出</h3>
      <ul>
        <li>本隊伍連結適用於再編輯，編輯後會生成新的網址。</li>
        <li>
          隊伍截圖會遮蔽AS, EXAS技能種類、SS技能CD時間以及編輯按鈕，在預設寬度下(800px)截圖。
          <br />
          但實際截圖後大小則依據設備而定，請自行縮放至需要的大小
        </li>
      </ul>
      <h3>潛能統計</h3>
      <ul>
        <li>已納入面板數值潛能：HP、ATK、Cost、首回技能冷卻回合CD(F)、次回技能冷卻回合CD(S)。</li>
        <li>僅用於分析隊伍在一般型態下的基礎能力，不包含傳奇型態以及技能結晶加成。</li>
        <li>若有設定援助者，該卡片的潛能加成也會納入計算。此舉會導致數值與遊戲內隊伍編輯數值不同，但會與遊戲內戰鬥狀態相同。</li>
        <li>若在隊伍中使用天邪鬼結晶，計算結果會與運作機制一致。</li>
      </ul>
      <div className="pure-group">
        <Link to="/" className="pure-button button-primary">←返回搜尋頁面</Link>
        <button
          type="button"
          className="pure-button button-success"
          // onClick={() => builderRef.current.scrollIntoView()}
        >
          回到隊伍
        </button>
      </div>
    </>
  );
}
