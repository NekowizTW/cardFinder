import React from 'react';
import PropTypes from 'prop-types';

const SkillStringIcon = React.memo(({ idx, type, skillTypes }) => {
  const flatSkills = skillTypes.reduce((acc, skillType) => {
    acc.push(...skillType.replace(/【\S+】/, '').split(/[・‧]/));
    return acc;
  }, []);

  const result = [...new Set(flatSkills)];
  return result.map((source) => {
    let wrapped = source;
    if (
      source.length >= 5
      && source.length <= 7
    ) {
      wrapped = `${source.slice(0, -2)}\n${source.slice(-2)}`;
    }
    return <div key={`slot${idx}-${type}-${source}`}>{wrapped}</div>;
  });
});

SkillStringIcon.propTypes = {
  idx: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['as', 'ss', 'exas']).isRequired,
  skillTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillStringIcon;
