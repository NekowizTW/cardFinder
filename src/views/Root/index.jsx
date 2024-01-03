import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
}
