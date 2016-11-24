var fs = require('fs');
var jsonfile = require('jsonfile');
var _ = require('lodash');
var RSVP = require('RSVP');
var assign = require('object-assign');

var list = [];
var groupType = {};
var data = {};
var help = function(){
  console.log('clear: clear screen');
  console.log(' read: read json file and parse to list, data');
  console.log('write: generate skill parse file');
  console.log(' help: print help');
};
var clear = function(){
  console.log('\033[2J');
};
var read = function(){
  var readFile = function(filename){
    var promise = new RSVP.Promise(function(resolve, reject){
      jsonfile.readFile('./'+filename, function(err, obj) {
        if(err){
          reject(err);
        }else{
          resolve(obj);
        }
      });
    });
    return promise;
  }
  var promises = {
    carddeck: readFile('./json/cardData.json'),
    as: readFile('./json/AnswerSkill.json'),
    ss: readFile('./json/SpecialSkill.json'),
    as2: readFile('./json/Answer2Skill.json'),
    ss2: readFile('./json/Special2Skill.json'),
    senzai: readFile('./json/SenzaiSkill.json')
  }

  RSVP.hash(promises).then(function(json) {
    for(var card in json.carddeck){
      var obj = {'id': json.carddeck[card].id, 'as': {}, 'ss': {}};
      obj.as = _.find(json.as, { 'name': json.carddeck[card].as});
      obj.ss = _.find(json.ss, { 'name': json.carddeck[card].ss});
      if(json.carddeck[card] === 'L'){
        var obj2 = {'id': json.carddeck[card].id, 'as2': {}, 'ss2': {}};
        obj2.as2 = _.find(json.as2, { 'name': json.carddeck[card].as2});
        obj2.ss2 = _.find(json.ss2, { 'name': json.carddeck[card].ss2});
        assign(obj, obj2);
      }
      list.push(obj);
    }
    assign(data, json);
    var counter = {
      'as': _.countBy(json.as, function(skill){ return skill.type}),
      'ss': _.countBy(json.ss, function(skill){ return skill.type}),
      'as2': _.countBy(json.as2, function(skill){ return skill.type}),
      'ss2': _.countBy(json.ss2, function(skill){ return skill.type})
    };
    assign(groupType, counter);
    console.log('parse complete');
  }).catch(function(err){
    console.log(err);
  });
};
var write = function(){
  if(list.length === 0){
    console.log('list has nothing');
    return;
  }else{
    fs.writeFile("./skillParse.json", JSON.stringify(list), function(err){
      if(err){
        return console.log(err);
      }
    });
    fs.writeFile("./skillCount.json", JSON.stringify(groupType), function(err){
      if(err){
        return console.log(err);
      }
    });
  }
}

module.exports = {
  list: list,
  data: data,
  groupType: groupType,
  help: help,
  clear: clear,
  read: read,
  write, write
};