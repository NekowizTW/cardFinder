// module
// This module can be use to self-hosting service.
import { logger } from 'log-prettier';

const availableJSON = {
  '卡片資料': 'cardData.json',
  'AS技能': 'AnswerSkill.json',
  'SS技能': 'SpecialSkill.json',
  'AS2技能': 'Answer2Skill.json',
  'SS2技能': 'Special2Skill.json',
  'EXAS技能': 'EXASSkill.json',
  '潛在能力': 'SenzaiSkill.json',
  '結晶': 'exCard.json',
  '大結晶': 'leaderEX.json'
}

/*
  CardSnap: capture snapshot of card data.
  parameter
  -     baseUrl<string>:　url which card data is served.
  - list<Array<string>>: type of data which is in availableJSON list
  return
  - <Promise>: availabe to use async / await functions
*/ 
const CardSnap = (baseUrl, list)=> {
  const tasks = list.map(type => {
    return new Promise((resolve, reject) => {
      const url = `${baseUrl}/${availableJSON[type]}`
      fetch(url)
        .then(raw => raw.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
      })
  })
  
  return Promise.all(tasks)
}

export default CardSnap;