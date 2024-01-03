import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default function CustomStickyHeader({
  id, className, style, children,
}) {
  const stickyRef = React.useRef();

  React.useEffect(() => {
    if (stickyRef.current) {
      stickyRef.current.classList.add('sticky-header');
    }
  }, [stickyRef]);

  React.useEffect(() => {
    const target = stickyRef.current;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
      { threshold: [1] },
    );
    if (target) {
      observer.observe(stickyRef.current);
    }
    return () => observer.unobserve(target);
  }, [stickyRef]);

  return (
    <div ref={stickyRef} id={id} className={className} style={style}>
      {children}
    </div>
  );
}

CustomStickyHeader.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

CustomStickyHeader.defaultProps = {
  id: '',
  className: '',
  style: {},
};
