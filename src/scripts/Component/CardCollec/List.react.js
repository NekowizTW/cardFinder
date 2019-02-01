import React          from 'react';
import ReactDOM       from 'react-dom';
import ReactPaginate  from 'react-paginate';
import Console        from 'console-browserify';

import CardCollecAction from '../../Actions/CardCollecAction';
import CardCollecStore  from '../../Store/CardCollecStore';

import Card from './Card.react';

class List extends React.Component {
  constructor(props) {
    super();
    this.changePage = this.changePage.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  changePage(pageSel) {
    let page = pageSel.selected;
    if(page < 0 || page > this.props.settings.maxPage) return;
    CardCollecAction.setListing({'page': page});
  }
  changeSettings(type) {
    return (event) => {
      const value = event.target.value;
      CardCollecAction.setListing( Object.assign(this.props.settings, {[type]: value}) );
    }
  }
  render() {
    return (<div>
      <div>
        <div className={'pure-form cardListOptions'}>
        <span className={'pure-u-1-2 pure-u-md-1-8 cardListOptionsTag'}>
          每頁顯示：
        </span>
        <span className={'pure-u-1-2 pure-u-md-1-8'}>
          <select className={'pure-input-1'} defaultValue={this.props.settings.paging} onChange={this.changeSettings('paging')}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </span>
        <span className={'pure-u-1-2 pure-u-md-1-8 cardListOptionsTag'}>
          排序：
        </span>
        <span className={'pure-u-1-2 pure-u-md-1-8'}>
          <select className={'pure-input-1'} defaultValue={this.props.settings.sorting} onChange={this.changeSettings('sorting')}>
            <option value="id">編號</option>
            <option value="max_atk">攻擊力</option>
            <option value="max_hp">血量</option>
            <option value="cost">Cost</option>
          </select>
        </span>
        <span className={'pure-u-1-2 pure-u-md-1-8 cardListOptionsTag'}>
          排列順序：
        </span>
        <span className={'pure-input-1'} className={'pure-u-1 pure-u-md-1-4'}>
          <select className={'pure-input-1'} defaultValue={this.props.settings.ordering} onChange={this.changeSettings('ordering')}>
            <option value="desc">降序(由高到低)</option>
            <option value="asc">升序(由低到高)</option>
          </select>
        </span>
        </div>
      </div>
      <div>
        <div id={'paging-nav'} className={"pure-menu pure-menu-horizontal pure-menu-scrollable"}>
          <ReactPaginate previousLabel={"上一頁"}
                         nextLabel={"下一頁"}
                         breakLabel={<a href="#" className="pure-menu-link">...</a>}
                         breakClassName={"pure-menu-list"}
                         pageCount={this.props.settings.maxPage}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.changePage}
                         forcePage={this.props.settings.page}
                         containerClassName={"pure-menu-list"}
                         pageClassName={"pure-menu-item"}
                         pageLinkClassName={"pure-menu-link"}
                         activeClassName={"pure-menu-selected"}
                         previousClassName={"pure-menu-item"}
                         nextClassName={"pure-menu-item"}
                         previousLinkClassName={"pure-menu-link"}
                         nextLinkClassName={"pure-menu-link"}
                         disabledClassName={"pure-menu-disabled"}
                         />
        </div>
      </div>
      <Card CardData={this.props.list} team={this.props.team}/>
      <div>
        <div id={'paging-nav'} className={"pure-menu pure-menu-horizontal pure-menu-scrollable"}>
          <ReactPaginate previousLabel={"上一頁"}
                         nextLabel={"下一頁"}
                         breakLabel={<a href="#" className="pure-menu-link">...</a>}
                         breakClassName={"pure-menu-list"}
                         pageCount={this.props.settings.maxPage}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.changePage}
                         forcePage={this.props.settings.page}
                         containerClassName={"pure-menu-list"}
                         pageClassName={"pure-menu-item"}
                         pageLinkClassName={"pure-menu-link"}
                         activeClassName={"pure-menu-selected"}
                         previousClassName={"pure-menu-item"}
                         nextClassName={"pure-menu-item"}
                         previousLinkClassName={"pure-menu-link"}
                         nextLinkClassName={"pure-menu-link"}
                         disabledClassName={"pure-menu-disabled"}
                         />
        </div>
      </div>
    </div>);
  }
}

export default List;
