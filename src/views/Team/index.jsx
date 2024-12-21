import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RestoreTeam } from '../../actions/teamActions';
import { LoadingOverlay } from '../../components';
import useGetCard from '../../hooks/useGetCard';
import { FETCH_STATUS } from '../../model/variables';

import Builder from './Builder';
import Introduction from './Introduction';
import Statistics from './Statistics';
import { decode } from './utils';

export default function Team() {
  const dispatch = useDispatch();
  const { team } = useParams();
  const { status } = useGetCard('10000');

  React.useEffect(() => {
    if (team) {
      dispatch(RestoreTeam(decode(team)));
    }
  }, [dispatch, team]);

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
