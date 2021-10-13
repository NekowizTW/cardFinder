import React      from 'react';
import ReactDOM   from 'react-dom';
import Select     from 'react-select';
import Pagination from 'rc-pagination';

import Action from '../../Redux/Action.js'

import Card from './Card.react.js';

const pagingOptions = [
  { value: 10,  label: '10' },
  { value: 25,  label: '25' },
  { value: 50,  label: '50' },
  { value: 100, label: '100' }
]

const sortOptions = [
  { value: 'id',      label: '編號' },
  { value: 'max_atk', label: '攻擊力' },
  { value: 'max_hp',  label: '血量' },
  { value: 'cost',    label: 'Cost' },
  { value: 'rank',    label: 'Rank' }
]

const orderOptions = [
  { value: 'desc', label: '降序(由高到低)' },
  { value: 'asc',  label: '升序(由低到高)' }
]

class List extends React.Component {
  constructor (props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
  }

  changePage (current, pageSize) {
    const page = current - 1;
    if(page < 0 || page > this.props.settings.maxPage) return;
    Action.setListing({ 'page': page });
  }

  changeSettings (type) {
    return (obj) => {
      Action.setListing( Object.assign(this.props.settings, {[type]: obj.value}) );
    }
  }

  render () {
    return (<div>
      <hr />
      <div>
        <div className={'pure-g cardListOptions'}>
          <span className={'pure-u-1-2 pure-u-md-1-4'}>
            每頁顯示
            <Select className={'pure-input-1'}
                    defaultValue={pagingOptions.find(option => option.value === this.props.settings.paging)}
                    onChange={this.changeSettings('paging')}
                    options={pagingOptions}
            />
          </span>
          <span className={'pure-u-1-2 pure-u-md-1-4'}>
            排序
            <Select className={'pure-input-1'}
                    defaultValue={sortOptions.find(option => option.value === this.props.settings.sorting)}
                    onChange={this.changeSettings('sorting')}
                    options={sortOptions}
            />
          </span>
          <span className={'pure-u-1 pure-u-md-1-2'}>
            排列方式
            <Select className={'pure-input-1'}
                    defaultValue={orderOptions.find(option => option.value === this.props.settings.ordering)}
                    onChange={this.changeSettings('ordering')}
                    options={orderOptions}
            />
          </span>
        </div>
      </div>
      <div>
        <div id={'paging-nav'}>
          <Pagination showSizeChanger={false}
                      showQuickJumper={{ goButton: <button className={'pure-button button-small'} type="button">跳轉</button> }}
                      current={this.props.settings.page + 1}
                      pageSize={this.props.settings.paging}
                      total={this.props.settings.totalCount}
                      onChange={this.changePage}
                      locale={'zh_TW'}
          />
        </div>
      </div>
      <Card CardData={this.props.list} team={this.props.team}/>
      <div>
        <div id={'paging-nav'}>
          <Pagination showSizeChanger={false}
                      showQuickJumper={{ goButton: <button className={'pure-button button-small'} type="button">跳轉</button> }}
                      current={this.props.settings.page + 1}
                      pageSize={this.props.settings.paging}
                      total={this.props.settings.totalCount}
                      onChange={this.changePage}
                      locale={'zh_TW'}
          />
        </div>
      </div>
    </div>)
  }
}

export default List
