// module
import RSVP     from 'rsvp';
import Console  from 'console-browserify';
import location from 'location-href';
import url      from 'url';

const cardSnap = {
  init(url, callback) {
    let promises = {
      card: this.getJSONfile(url+'cardData.json')
    };
    RSVP.hash(promises).then((result) => {
      return callback(result.card);
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