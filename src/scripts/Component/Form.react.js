import React      from 'react';
import Select     from 'react-select';
import TextFilter from 'react-text-filter';
import url        from 'url';
import location   from 'location-href';
import _          from 'lodash';
import assign     from "object-assign";
import { IndexLink, Link } from 'react-router';
import Console    from 'console-browserify';

import Tabs, { TabPane }   from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import InkTabBar from 'rc-tabs/lib/InkTabBar';

import CardCollecAction from '../Actions/CardCollecAction';
import CardCollecStore  from '../Store/CardCollecStore';

let url_parse = url.parse(location(), true);
let path = url_parse.href.replace(url_parse.hash, '');

_.mixin({
  'findByArray': function(collection, property, values) {
    return _.filter(collection, function(item) {
      return _.includes(values, _.get(item, property));
    });
  }
});

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function optionRestore(paramSource, options){
  let params = assign({filterText: ""}, paramSource);
  let filter = {};
  filter.props = _.findByArray(options.PROPS, 'value', params.props) || [];
  filter.props2 = _.findByArray(options.PROPS2, 'value', params.props2) || [];
  filter.breeds = _.findByArray(options.BREEDS, 'value', params.breeds) || [];
  filter.ranks = _.findByArray(options.RANKS, 'value', params.ranks) || [];
  filter.as = _.findByArray(options.SKILL_AS, 'value', params.as) || [];
  filter.ss = _.findByArray(options.SKILL_SS, 'value', params.ss) || [];
  filter.as2 = _.findByArray(options.SKILL_AS2, 'value', params.as2) || [];
  filter.ss2 = _.findByArray(options.SKILL_SS2, 'value', params.ss2) || [];
  filter.zz = _.findByArray(options.ZZ, 'value', params.zz) || [];
  filter.filterText = params.filterText;
  return filter;
}

function generateURL(formObj){
  let url = '#/?';
  let query = [
    _.map(formObj.props, function(o){ return 'props='+o.value; }),
    _.map(formObj.prop2, function(o){ return 'props2='+o.value; }),
    _.map(formObj.breeds, function(o){ return 'breeds='+o.value; }),
    _.map(formObj.ranks, function(o){ return 'ranks='+o.value; }),
    _.map(formObj.as, function(o){ return 'as='+o.value; }),
    _.map(formObj.ss, function(o){ return 'ss='+o.value; }),
    _.map(formObj.as2, function(o){ return 'as2='+o.value; }),
    _.map(formObj.ss2, function(o){ return 'ss2='+o.value; }),
    (formObj.filterText === '')? []:('filterText='+formObj.filterText)
  ];
  for(let column in query){
     if(query[column] instanceof Array) {
        query[column] = query[column].join("&");
    }
  }
  url = url + cleanArray(query).join("&");
  return url;
}

// generate the filter to filter cards

class Form extends React.Component {
  constructor(props) {
    super(props);
    let filter = {};
    filter = assign(filter, CardCollecStore.getLastFilter());
    this.state = assign(filter, CardCollecStore.getSkillCategories(), {tabIndex: "0"});
  }
  componentDidMount() {
    CardCollecStore.addChangeListener(this.changeHandler.bind(this));
    if(!_.isEmpty(this.props.filter)){
      this.setState(optionRestore(this.props.filter, CardCollecStore.getSkillCategories()), () => {
        this.handleChange();
      });
    }
  }
  componentWillUnmount() {
    CardCollecStore.removeChangeListener(this.changeHandler.bind(this));
  }
  changeHandler(){
    //console.log(this.state, CardCollecStore.getSkillCategories());
    this.setState(CardCollecStore.getSkillCategories());
  }
  tabIndexChange(e){
    this.setState({'tabIndex': e});
  }
  searchChange(e) {
    let text = e.target.value;
    this.setState({'filterText': text}, () => {
      this.handleChange();
    });
  }
  resetFilter(e){
    this.setState(optionRestore({}, {}), () => {
      this.handleChange();
    });
  }
  propsChange(obj) {
    this.setState({'props': obj}, () => {
      this.handleChange();
    });
  }
  props2Change(obj) {
    this.setState({'props2': obj}, () => {
      this.handleChange();
    });
  }
  breedsChange(obj) {
    this.setState({'breeds': obj}, () => {
      this.handleChange();
    });
  }
  ranksChange(obj) {
    this.setState({'ranks': obj}, () => {
      this.handleChange();
    });
  }
  asChange(obj) {
    this.setState({'as': obj}, () => {
      this.handleChange();
    });
  }
  ssChange(obj) {
    this.setState({'ss': obj}, () => {
      this.handleChange();
    });
  }
  as2Change(obj) {
    this.setState({'as2': obj}, () => {
      this.handleChange();
    });
  }
  ss2Change(obj) {
    this.setState({'ss2': obj}, () => {
      this.handleChange();
    });
  }
  zzChange(obj) {
    this.setState({'zz': obj}, () => {
      this.handleChange();
    });
  }
  handleChange() {
    CardCollecAction.filterChange(this.state);
  }
  render() {
    let formObj = this.state;
    let url = generateURL(formObj);
    return (<div id="CardCollecForm">
      {/*<div className={'pure-g'}>
        <p className={'pure-u-1-1'}>本頁網址: <a href={url}>{path + url}</a></p>
      </div>*/}
      <div className={'pure-form pure-g'}>
        <TextFilter
          filter={this.state.filterText} onFilter={this.searchChange.bind(this)}
          debounceTimeout={100} minLength={1}
          placeholder={'請輸入卡片編號或卡片名字'} className={'pure-u-20-24'}
        />
        <div className={'pure-u-1-24'} />
        <button
          type='button'
          className={'button-error pure-button pure-u-3-24 reset_btn'}
          onClick={this.resetFilter.bind(this)}
        ><i className={'fa fa-ban'} aria-hidden="true"></i><span>重置</span></button>
      </div>
      <Tabs
      activeKey={this.state.tabIndex}
      onChange={this.tabIndexChange.bind(this)}
      renderTabBar={()=><InkTabBar />}
      renderTabContent={()=><TabContent  animated={false}/>}
      >
        <TabPane tab='基本屬性' key='0'>
           <label className='pure-u-1-2'><Select
            placeholder="請選擇主屬性" name="form-props-field"
            value={this.state.props} options={this.state.PROPS}
            multi={true} onChange={this.propsChange.bind(this)}
          /></label>
          <label className='pure-u-1-2'><Select
            placeholder="請選擇副屬性" name="form-props-field"
            value={this.state.props2} options={this.state.PROPS2}
            multi={true} onChange={this.props2Change.bind(this)}
          /></label>
          <Select
            placeholder="請選擇種族" name="form-breeds-field" className='pure-u-1-2'
            value={this.state.breeds} options={this.state.BREEDS}
            multi={true} onChange={this.breedsChange.bind(this)}
          />
          <Select
            placeholder="請選擇稀有度" name="form-ranks-field" className='pure-u-1-2'
            value={this.state.ranks} options={this.state.RANKS}
            multi={true} onChange={this.ranksChange.bind(this)}
          />
        </TabPane>
        <TabPane tab='答題技能' key='1'>
          <Select
            placeholder="請選擇答題技能" name="form-as-field" className='pure-u-1-2'
            value={this.state.as} options={this.state.SKILL_AS||[]}
            multi={true} onChange={this.asChange.bind(this)}
          />
          <Select
            placeholder="請選擇答題技能2" name="form-as2-field" className='pure-u-1-2'
            value={this.state.as2} options={this.state.SKILL_AS2||[]}
            multi={true} onChange={this.as2Change.bind(this)}
          />
        </TabPane>
        <TabPane tab='特殊技能' key='2'>
          <Select
            placeholder="請選擇特殊技能" name="form-ss-field" className='pure-u-1-2'
            value={this.state.ss} options={this.state.SKILL_SS||[]}
            multi={true} onChange={this.ssChange.bind(this)}
          />
          <Select
            placeholder="請選擇特殊技能2" name="form-ss2-field" className='pure-u-1-2'
            value={this.state.ss2} options={this.state.SKILL_SS2||[]}
            multi={true} onChange={this.ss2Change.bind(this)}
          />
        </TabPane>
        <TabPane tab='潛能/L發動能力' key='3'>
          <Select
            placeholder="請選擇潛能/L發動效果(只提供特殊潛能查詢)" name="form-zz-field" className='pure-u-1'
            value={this.state.zz} options={this.state.ZZ||[]}
            multi={true} onChange={this.zzChange.bind(this)}
          />
        </TabPane>
        </Tabs>
    </div>);
  }
}

export default Form;
