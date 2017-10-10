import React          from 'react';
import ReactDOM       from 'react-dom';
import ReactPaginate  from 'react-paginate';
import Console        from 'console-browserify';

import CardCollecAction from '../Actions/CardCollecAction';
import CardCollecStore  from '../Store/CardCollecStore';

import Card from './Card.react';

class List extends React.Component {
  constructor() {
    super();
    let listing = CardCollecStore.getListing()
    let page = 1;
    let list = CardCollecStore.getCardList();
    let subset = list.slice(0, listing['paging']);
    let maxPage = Math.ceil(list.length / listing['paging']);
    this.state = {
      list: list,
      subset: subset,
      paging: listing['paging'],
      page: page,
      maxPage: maxPage,
      sorting: listing['sorting'],
      ordering: listing['ordering']
    };
    this.changePage = this.changePage.bind(this);
    this.changePaging = this.changePaging.bind(this);
  }
  componentDidMount() {
    CardCollecStore.addChangeListener(this.changeHandler.bind(this));
  }
  componentWillUnmount() {
    CardCollecStore.removeChangeListener(this.changeHandler.bind(this));
  }
  changeHandler() {
    let paging = this.state.paging, page = this.state.page;
    let list = CardCollecStore.getCardList();
    list = this.sortList(list);
    let subset = list.slice(0, paging);
    let maxPage = Math.ceil(list.length / paging);
    this.setState({ list: list, subset: subset, page: 1, maxPage: maxPage});
  }
  changePage(pageSel) {
    let page = pageSel.selected;
    let subset = [];
    if(page < 0 || page > this.state.maxPage) return;
    subset = this.state.list.slice(this.state.paging * page, this.state.paging * (page + 1));
    this.setState({page: page, subset: subset});
  }
  changePaging(event) {
    let paging = event.target.value;
    let subset = [];
    let maxPage = Math.ceil(this.state.list.length / paging);
    subset = this.state.list.slice(0, paging);
    this.setState({page: 1, paging: paging, subset: subset, maxPage: maxPage}, () => {
      CardCollecAction.setListing(['paging', paging]);
    });
  }
  changeSorting(event) {
    this.setState({sorting: event.target.value}, () => {
      this.state.list = this.sortList(this.state.list);
      let subset = this.state.list.slice(0, this.state.paging);
      this.setState({page: 1, subset: subset});
      CardCollecAction.setListing(['sorting', event.target.value]);
    });
  }
  changeOrdering(event) {
    this.setState({ordering: event.target.value}, () => {
      this.state.list = this.sortList(this.state.list);
      let subset = this.state.list.slice(0, this.state.paging);
      this.setState({page: 1, subset: subset});
      CardCollecAction.setListing(['ordering', event.target.value]);
    });
  }
  sortList(list){
    const rank_order = ['C+','B','B+','A','A+','S','S+','SS','SS+','L'];
    const ordering = this.state.ordering == 'desc'? -1 : 1;
    let self = this;
    return list.sort((a, b) => {
      if(self.state.sorting === 'rank'){
        var attrA = rank_order.indexOf(a['rank']),
            attrB = rank_order.indexOf(b['rank']);
      }else{
        var attrA = parseInt(a[self.state.sorting]),
            attrB = parseInt(b[self.state.sorting]);
      }
      if(attrA < 0 || attrB < 0) {
        return (attrA - attrB) * -1;//(attrA - attrB); //Make minus value stay in the last
      }else{
        return (attrA - attrB) * ordering;
      }
    });
  }
  render() {
    return (<div>
      <div>
        <div className={'pure-form cardListOptions'}>
        <span className={'pure-u-1-2 pure-u-md-1-4'}>
          <label>每頁顯示：</label>
          <select className={'pure-input-1'} defaultValue={this.state.paging} onChange={this.changePaging}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </span>
        <span className={'pure-u-1-2 pure-u-md-1-4'}>
          <label>排序：</label>
          <select className={'pure-input-1'} defaultValue={this.state.sorting} onChange={this.changeSorting.bind(this)}>
            <option value="id">編號</option>
            <option value="max_atk">攻擊力</option>
            <option value="max_hp">血量</option>
            <option value="cost">Cost</option>
            <option value="rank">Rank</option>
          </select>
        </span>
        <span className={'pure-input-1'} className={'pure-u-1 pure-u-md-1-2'}>
          <label>排列順序：</label>
          <select className={'pure-input-1'} defaultValue={this.state.ordering} onChange={this.changeOrdering.bind(this)}>
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
                         pageCount={this.state.maxPage}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.changePage}
                         forcePage={this.state.page}
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
      <Card CardData={this.state.subset}/>
      <div>
        <div id={'paging-nav'} className={"pure-menu pure-menu-horizontal pure-menu-scrollable"}>
          <ReactPaginate previousLabel={"上一頁"}
                         nextLabel={"下一頁"}
                         breakLabel={<a href="#" className="pure-menu-link">...</a>}
                         breakClassName={"pure-menu-list"}
                         pageCount={this.state.maxPage}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.changePage}
                         forcePage={this.state.page}
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
