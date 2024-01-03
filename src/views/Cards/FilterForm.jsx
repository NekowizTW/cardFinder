import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetFilters, setSearchFilter } from '../../actions/filtersActions';
import { SearchBar } from '../../components';

import FilterTabs from './FilterTabs';

// NOTE: sticky-header has zIndex, so this component need some configuration
//       to make the dropdown inside form over the sticky-header.
export default function FilterForm() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSearch = (search) => dispatch(setSearchFilter({ search }));

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div id="CardCollecForm" style={{ position: 'relative', zIndex: 3 }}>
      <div className="pure-form" style={{ display: 'flex' }}>
        <SearchBar
          defaultValue={filters?.search ?? ''}
          onSearch={handleSearch}
          placeholder="請輸入卡片編號或卡片名字"
          style={{ flexGrow: 1 }}
        />
        <button
          className="button-error pure-button"
          type="button"
          onClick={handleReset}
          style={{ height: 36.4, flex: 0.2 }}
        >
          重置
        </button>
      </div>
      <FilterTabs />
    </div>
  );
}
