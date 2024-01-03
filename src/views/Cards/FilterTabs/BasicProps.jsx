import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setBasicPropsFilter } from '../../../actions/filtersActions';
import {
  BREEDS, PROPS, PROPS2, RANKS,
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
    <>
      <Select
        name="form-props-field"
        className="pure-u-1  pure-u-md-1-2"
        value={prop}
        options={PROPS}
        isMulti
        onChange={(newValue) => handleChange('prop', newValue)}
        getOptionLabel={(option) => option.label}
        placeholder="請選擇主屬性"
      />
      <Select
        name="form-props-field"
        className="pure-u-1  pure-u-md-1-2"
        value={prop2}
        options={PROPS2}
        isMulti
        onChange={(newValue) => handleChange('prop2', newValue)}
        placeholder="請選擇副屬性"
      />
      <Select
        name="form-breeds-field"
        className="pure-u-1 pure-u-md-1-2"
        value={breed}
        options={BREEDS}
        isMulti
        onChange={(newValue) => handleChange('breed', newValue)}
        placeholder="請選擇種族"
      />
      <Select
        name="form-ranks-field"
        className="pure-u-1 pure-u-md-1-2"
        value={rank}
        options={RANKS}
        isMulti
        onChange={(newValue) => handleChange('rank', newValue)}
        placeholder="請選擇稀有度"
      />
    </>
  );
}
