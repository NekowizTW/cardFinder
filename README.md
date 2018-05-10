NekowizTW cardFinder
====

Introduction
----

此專案為「問答RPG 魔法使與黑貓維茲」的第三方工具，目的是為了讓玩家能夠以複合的規則來搜尋卡片。

除了搜尋與查看卡片以外，透過點擊列表中的頭像選擇卡片，你可以組合出遊戲內的隊伍，並呈現出遊戲內的能力數值。

 - [Wikia初次公佈](http://zh.nekowiz.wikia.com/d/p/2943329612333175972)
 - [PTT黑貓版回應](https://www.ptt.cc/bbs/MysticWiz/M.1488204519.A.E77.html)
 - [巴哈黑貓版第三人宣傳](https://forum.gamer.com.tw/Co.php?bsn=25730&sn=93209)

Data
----

資料來源為[黑貓Wikia](http://zh.nekowiz.wikia.com/)上玩家透過遊戲中的資訊操寫到Wikia紀錄，本工具在遵守CC-BY-SA的狀況下引用到網站上作為玩家遊戲外的資料查詢工具。

Contribute
----

若要支援此專案，請在[Wikia論壇](http://zh.nekowiz.wikia.com/d/f)上發表你的意願或是透過此專案的Issue提報來告知。

此專案在資料同步處理部份不限制nodejs版本（備註），但如果要能完整執行此專案，請使用nodejs 7.10.1。

備註：資料同步處理部份只需要安裝lodash以及node-jsonp，透過執行``node cardBase.js``即可完成一次資料同步處理。但佈署上需要同時佈署到``master``以及``gh-pages``兩個branch上。

Thanks
----

感謝 @FalseChord 協助資料處理以及搜尋界面的改良
感謝 @alantea 提供機器協助資料同步處理

License
----

程式碼採用MIT授權，原始資料採用CC-BY-SA授權
