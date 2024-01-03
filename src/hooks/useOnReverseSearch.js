import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAllPropsFilter } from '../actions/filtersActions';
import { constructRegExp } from '../helper/cardsFilter';
import flattenOptions from '../helper/flattenOptions';
import {
  BREEDS,
  EXAS_CONDITIONS,
  EXAS_TYPES,
  PROPS,
  PROPS2,
  SKILL_AS,
  SKILL_AS2,
  SKILL_SS,
  SKILL_SS2,
} from '../model/variables';

const defaultFilters = {
  search: '',
  prop: [],
  prop2: [],
  breed: [],
  rank: [],
  as: [],
  as2: [],
  ss: [],
  ss2: [],
  senzai: [],
  exasCondition: [],
  exasType: [],
  isHaifu: false,
  isMaxEvo: true,
};

const EXAS_CONDITIONS_FLATTEN = flattenOptions(EXAS_CONDITIONS);
const EXAS_TYPES_FLATTEN = flattenOptions(EXAS_TYPES);
const SKILL_AS_FLATTEN = flattenOptions(SKILL_AS);
const SKILL_AS2_FLATTEN = flattenOptions(SKILL_AS2);
const SKILL_SS_FLATTEN = flattenOptions(SKILL_SS);
const SKILL_SS2_FLATTEN = flattenOptions(SKILL_SS2);

export default function useOnReverseSearch(card) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchMainProp = () => {
    if (!card.prop) return;

    const selectedProp = PROPS.filter((option) => option.value === card.prop);
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      prop: selectedProp,
    }));
    navigate('/', { state: { tab: 'basicProps' } });
  };

  const handleSearchMainPropWithSubProp = () => {
    if (!card.prop || !card.prop2) return;

    const selectedProp = PROPS.filter((option) => option.value === card.prop);
    const selectedProp2 = PROPS2.filter((option) => option.value === card.prop2);
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      prop: selectedProp,
      prop2: selectedProp2,
    }));
    navigate('/', { state: { tab: 'basicProps' } });
  };

  const handleSearchBreed = () => {
    if (!card.breed) return;

    const selectedBreed = BREEDS.filter((option) => option.value === card.breed);
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      breed: selectedBreed,
    }));
    navigate('/', { state: { tab: 'basicProps' } });
  };

  const handleSearchAS = () => {
    if (!card.asData.type) return;

    const asTypes = card.asData.type.split(/[・‧]+/);
    const selectedAS = SKILL_AS_FLATTEN.filter((option) => {
      const re = constructRegExp(option.value);
      return asTypes.some((asType) => re.test(asType));
    });
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      as: selectedAS,
    }));
    navigate('/', { state: { tab: 'asProps' } });
  };

  const handleSearchAS2 = () => {
    if (!card.as2Data.type) return;

    const as2Types = card.as2Data.type.split(/[・‧]+/);
    const selectedAS2 = SKILL_AS2_FLATTEN.filter((option) => {
      const re = constructRegExp(option.value);
      return as2Types.some((as2Type) => re.test(as2Type));
    });
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      as2: selectedAS2,
    }));
    navigate('/', { state: { tab: 'asProps' } });
  };

  const handleSearchSS = () => {
    if (!card.ssData.type) return;

    const ssType = card.ssData.type;
    const selectedSS = SKILL_SS_FLATTEN.filter((option) => (
      option.value.includes(ssType)
    ));
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      ss: selectedSS,
    }));
    navigate('/', { state: { tab: 'ssProps' } });
  };

  const handleSearchSS2 = () => {
    if (!card.ss2Data.type) return;

    const ss2Type = card.ss2Data.type;
    const selectedSS2 = SKILL_SS2_FLATTEN.filter((option) => (
      option.value.includes(ss2Type)
    ));
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      ss2: selectedSS2,
    }));
    navigate('/', { state: { tab: 'ssProps' } });
  };

  const handleSearchEXASCondition = () => {
    if (!card.EXASData) return;

    const exasCondition = card.EXASData.condition;
    const selectedEXASCondition = EXAS_CONDITIONS_FLATTEN.filter((option) => {
      const re = constructRegExp(option.value);
      return re.test(exasCondition);
    });
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      exasCondition: selectedEXASCondition,
    }));
    navigate('/', { state: { tab: 'exasProps' } });
  };

  const handleSearchEXASType = () => {
    if (!card.EXASData) return;

    const exasTypes = card.EXASData.type.split(/[・‧]+/);
    const selectedEXASType = EXAS_TYPES_FLATTEN.filter((option) => {
      const re = constructRegExp(option.value);
      return exasTypes.some((exasType) => re.test(exasType));
    });
    dispatch(setAllPropsFilter({
      ...defaultFilters,
      exasType: selectedEXASType,
    }));
    navigate('/', { state: { tab: 'exasProps' } });
  };

  return {
    searchMainProp: handleSearchMainProp,
    searchMainPropWithSubProp: handleSearchMainPropWithSubProp,
    searchBreed: handleSearchBreed,
    searchAS: handleSearchAS,
    searchAS2: handleSearchAS2,
    searchSS: handleSearchSS,
    searchSS2: handleSearchSS2,
    searchEXASCondition: handleSearchEXASCondition,
    searchEXASType: handleSearchEXASType,
  };
}
