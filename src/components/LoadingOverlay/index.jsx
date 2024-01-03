import React from 'react';

export default function LoadingOverlay() {
  return (
    <div
      style={{
        width: '100%', minHeight: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <p>黑貓走路中...</p>
    </div>
  );
}
