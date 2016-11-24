// module
import RSVP     from 'rsvp';
import Console  from 'console-browserify';
import location from 'location-href';
import url      from 'url';

const cardSnap = {
  init(url, callback) {
    let promises = {
      Senzai: this.getJSONfile(url+'SenzaiSkill.json'),
      Answer: this.getJSONfile(url+'AnswerSkill.json'),
      Special: this.getJSONfile(url+'SpecialSkill.json'),
      Answer2: this.getJSONfile(url+'Answer2Skill.json'),
      Special2: this.getJSONfile(url+'Special2Skill.json'),
      card: this.getJSONfile(url+'cardData.json')
    };
    RSVP.hash(promises).then((result) => {
      return callback(result);
    }).catch((error) => {
      Console.log(error);
    });
  },
  getJSONfile(url) {
    let promise = new RSVP.Promise((resolve, reject) => {
      let r = new XMLHttpRequest();
      r.open('GET', url, true);
      r.onreadystatechange = () => {
        if (r.readyState !== 4 || r.status !== 200) {
          if (r.status === 400) {
            reject(r.statusText);
          }
          return;
        } else {
          resolve(JSON.parse(r.response));
        }
      };
      return r.send();
    });
    return promise;
  }
};

export default cardSnap;