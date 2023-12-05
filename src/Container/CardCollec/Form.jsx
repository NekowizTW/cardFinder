import React from 'react';
import _ from 'lodash';
import TextFilter from 'react-text-filter';
import Tabs,
{ TabPane } from 'rc-tabs';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

import Action from '../../Redux/Action';

function cleanArray(actual) {
  const newArray = new Array();
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

function optionRestore(paramSource, options) {
  const params = { filterText: '', ...paramSource };
  const filter = {};
  filter.props = params.props || [];
  filter.props2 = params.props2 || [];
  filter.breeds = params.breeds || [];
  filter.ranks = params.ranks || [];
  filter.onlyHaifu = params.onlyHaifu || false;
  filter.as = _.uniqBy(params.as, 'label') || [];
  filter.ss = params.ss || [];
  filter.as2 = _.uniqBy(params.as2, 'label') || [];
  filter.ss2 = params.ss2 || [];
  filter.zz = params.zz || [];
  filter.exasCondition = params.exasCondition || [];
  filter.exasType = params.exasType || [];
  filter.filterText = params.filterText;
  return filter;
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    if (!_.isEmpty(props.query)) {
      Action.filterChange(optionRestore(props.query, props.settings));
    }
    this.state = { tabIndex: '0' };
  }

  tabIndexChange(e) {
    this.setState({ tabIndex: e });
  }

  filterChange(type) {
    return (obj) => {
      if (type === 'filterText') {
        Action.filterChange(Object.assign(this.props.filter, { [type]: obj.target.value }));
      } else if (type === 'onlyHaifu') {
        Action.filterChange(Object.assign(this.props.filter, { [type]: obj.target.checked }));
      } else {
        Action.filterChange(Object.assign(this.props.filter, { [type]: obj }));
      }
    };
  }

  resetFilter(e) {
    Action.filterChange({});
  }

  render() {
    return (
      <div id="CardCollecForm">
        <div className="pure-form pure-g">
          <TextFilter
            filter={this.props.filter.filterText}
            onFilter={this.filterChange.bind(this)('filterText')}
            debounceTimeout={100}
            minLength={1}
            placeholder="請輸入卡片編號或卡片名字"
            className="pure-u-5-6"
          />
          <button
            type="button"
            className="button-error pure-button pure-u-1-6 reset_btn"
            onClick={this.resetFilter.bind(this)}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>重置</span>
          </button>
        </div>
        <Tabs
          activeKey={this.state.tabIndex}
          onChange={this.tabIndexChange.bind(this)}
          renderTabBar={(props, DefaultTabBar) => (
            <div className="pure-menu pure-menu-horizontal pure-menu-scrollable">
              <ul className="pure-menu-list">
                {
                props.panes.map((pane) => {
                  const itemClass = `pure-menu-item ${props.activeKey === pane.key ? 'pure-menu-selected' : ''}`;
                  return (
                    <li className={itemClass} key={pane.key}>
                      <a
                        href="#"
                        className="pure-menu-link"
                        onClick={(a) => {
                          this.tabIndexChange(pane.key);
                        }}
                      >
                        {pane.props.tab}
                      </a>
                    </li>
                  );
                })
              }
              </ul>
            </div>
          )}
        >
          <TabPane tab="基本屬性" key="0">
            <Select
              placeholder="請選擇主屬性"
              name="form-props-field"
              className="pure-u-1  pure-u-md-1-2"
              value={this.props.filter.props}
              options={this.props.settings.PROPS}
              isMulti
              onChange={this.filterChange.bind(this)('props')}
            />
            <Select
              placeholder="請選擇副屬性"
              name="form-props-field"
              className="pure-u-1  pure-u-md-1-2"
              value={this.props.filter.props2}
              options={this.props.settings.PROPS2}
              isMulti
              onChange={this.filterChange.bind(this)('props2')}
            />
            <Select
              placeholder="請選擇種族"
              name="form-breeds-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.breeds}
              options={this.props.settings.BREEDS}
              isMulti
              onChange={this.filterChange.bind(this)('breeds')}
            />
            <Select
              placeholder="請選擇稀有度"
              name="form-ranks-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.ranks}
              options={this.props.settings.RANKS}
              isMulti
              onChange={this.filterChange.bind(this)('ranks')}
            />
          </TabPane>
          <TabPane tab="答題技能" key="1">
            <Select
              placeholder="請選擇答題技能"
              name="form-as-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.as}
              options={this.props.settings.SKILL_AS || []}
              isMulti
              onChange={this.filterChange.bind(this)('as')}
            />
            <Select
              placeholder="請選擇答題技能2"
              name="form-as2-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.as2}
              options={this.props.settings.SKILL_AS2 || []}
              isMulti
              onChange={this.filterChange.bind(this)('as2')}
            />
          </TabPane>
          <TabPane tab="特殊技能" key="2">
            <Select
              placeholder="請選擇特殊技能"
              name="form-ss-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.ss}
              options={this.props.settings.SKILL_SS || []}
              isMulti
              onChange={this.filterChange.bind(this)('ss')}
            />
            <Select
              placeholder="請選擇特殊技能2"
              name="form-ss2-field"
              className="pure-u-1 pure-u-md-1-2"
              value={this.props.filter.ss2}
              options={this.props.settings.SKILL_SS2 || []}
              isMulti
              onChange={this.filterChange.bind(this)('ss2')}
            />
          </TabPane>
          <TabPane tab="潛能/L發動能力" key="3">
            <Select
              placeholder="請選擇潛能/L發動效果(只提供特殊潛能查詢)"
              name="form-zz-field"
              className="pure-u-1 pure-u-md-1"
              value={this.props.filter.zz}
              options={this.props.settings.ZZ || []}
              isMulti
              onChange={this.filterChange.bind(this)('zz')}
            />
          </TabPane>
          <TabPane tab="EXAS" key="4">
            <Select
              placeholder="請選擇EXAS觸發條件"
              name="form-exasCondition-field"
              className="pure-u-1 pure-u-md-1"
              value={this.props.filter.exasCondition}
              options={this.props.settings.EXASCondition || []}
              isMulti
              onChange={this.filterChange.bind(this)('exasCondition')}
            />
            <Select
              placeholder="請選擇EXAS技能類型"
              name="form-exasType-field"
              className="pure-u-1 pure-u-md-1"
              value={this.props.filter.exasType}
              options={this.props.settings.EXASType || []}
              isMulti
              onChange={this.filterChange.bind(this)('exasType')}
            />
          </TabPane>
        </Tabs>
        <label htmlFor="filter-onlyHaifu">
          <input id="filter-onlyHaifu" type="checkbox" value={this.props.onlyHaifu} onChange={this.filterChange.bind(this)('onlyHaifu')} />
          <span style={{ paddingLeft: '0.5em' }}>限定配布卡（列表有紅色標記）</span>
        </label>
      </div>
    );
  }
}

export default Form;
