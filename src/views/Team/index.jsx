import React from 'react';

import { LoadingOverlay } from '../../components';
import useGetCard from '../../hooks/useGetCard';
import { FETCH_STATUS } from '../../model/variables';

import Builder from './Builder';
import Introduction from './Introduction';
import Statistics from './Statistics';

export default function Team() {
  const { status } = useGetCard('10000');

  if (status !== FETCH_STATUS.SUCCESS) {
    return (
      <LoadingOverlay />
    );
  }

  return (
    <div>
      <Builder />
      <Statistics />
      <Introduction />
    </div>
  );
}
