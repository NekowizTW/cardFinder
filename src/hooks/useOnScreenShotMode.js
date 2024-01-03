import React from 'react';

export default function useOnScreenShotMode() {
  const [screenShotMode, setScreenShotMode] = React.useState(false);

  const screenShotStyle = React.useMemo(() => ({
    md: screenShotMode ? '' : '-md',
    rwd: screenShotMode ? '' : 'pure-u-1',
  }), [screenShotMode]);

  const toggle = () => setScreenShotMode((prev) => !prev);

  return {
    isEnabled: screenShotMode,
    ...screenShotStyle,
    toggle,
  };
}
