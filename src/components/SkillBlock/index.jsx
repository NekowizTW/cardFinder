import React from 'react';
import PropTypes from 'prop-types';

export default function SkillBox({
  type, title, right, subTitle, info,
}) {
  return (
    <div className={`skillData ${type}`}>
      <h4 style={{
        margin: 0, width: '100%', display: 'inline-flex', justifyContent: 'space-between', flexWrap: 'wrap',
      }}
      >
        <span>{title}</span>
        <span>{right}</span>
      </h4>
      <p style={{ margin: 0, fontWeight: 600 }}>
        <small>{subTitle}</small>
      </p>
      <p>
        {info}
      </p>
    </div>
  );
}

SkillBox.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  right: PropTypes.string,
  subTitle: PropTypes.string,
  info: PropTypes.string,
};

SkillBox.defaultProps = {
  type: '',
  title: '',
  right: '',
  subTitle: '',
  info: '',
};
