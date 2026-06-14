import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setBasicPropsFilter } from '../../../actions/filtersActions';
import {
  BREEDS, PROPS2, PROPS, RANKS,
} from '../../../model/variables';

export default function BasicProps() {
  const dispatch = useDispatch();
  const {
    prop, prop2, breed, rank,
  } = useSelector((state) => state.filters);

  const handleChange = (key, newValue) => dispatch(setBasicPropsFilter({
    prop,
    prop2,
    breed,
    rank,
    [key]: newValue,
  }));

  return (
    <React.Fragment>
      <Select
        isMulti
        className="pure-u-1  pure-u-md-1-2"
        getOptionLabel={(option) => option.label}
        name="form-props-field"
        onChange={(newValue) => handleChange('prop', newValue)}
        options={PROPS}
        placeholder="請選擇主屬性"
        value={prop}
      />
      <Select
        isMulti
        className="pure-u-1  pure-u-md-1-2"
        name="form-props-field"
        onChange={(newValue) => handleChange('prop2', newValue)}
        options={PROPS2}
        placeholder="請選擇副屬性"
        value={prop2}
      />
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1-2"
        name="form-breeds-field"
        onChange={(newValue) => handleChange('breed', newValue)}
        options={BREEDS}
        placeholder="請選擇種族"
        value={breed}
      />
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1-2"
        name="form-ranks-field"
        onChange={(newValue) => handleChange('rank', newValue)}
        options={RANKS}
        placeholder="請選擇稀有度"
        value={rank}
      />
    </React.Fragment>
  );
}
