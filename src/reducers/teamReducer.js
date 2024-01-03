import { createReducer } from '@reduxjs/toolkit';

import {
  RestoreTeam, SetLeaderEXData, SetTeamSlotData, UpdateCalculation,
} from '../actions/teamActions';

const initCalculate = {
  isCalculated: true,
  calculated: [],
  globalFlags: {},
  certainFlags: [],
  errorSenzai: [],
};

const initialState = {
  leaderEX: '',
  teamSlot: Array.from(
    { length: 5 },
    () => ({
      id: '-1', exas: false, szSlot: 10, mana: 0, exs: [],
    }),
  ),
  helperSlot: {
    id: '-1', szSlot: 10, mana: 0, exs: [],
  },
  ...initCalculate,
};

const teamReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(RestoreTeam.fulfilled, (state, action) => ({
      ...state,
      leaderEX: action.payload.leaderEX,
      teamSlot: action.payload.teamSlot,
      helperSlot: action.payload.helperSlot,
      isCalculated: false,
    }))
    .addCase(SetTeamSlotData.fulfilled, (state, action) => {
      if (action.payload.index === 5) {
        const { exas, ...helperSlot } = action.payload.slotData;
        return {
          ...state,
          helperSlot,
          isCalculated: false,
        };
      }

      return {
        ...state,
        teamSlot: state.teamSlot.with(action.payload.index, action.payload.slotData),
        isCalculated: false,
      };
    })
    .addCase(SetLeaderEXData.fulfilled, (state, action) => ({
      ...state,
      leaderEX: action.payload.leaderEX,
    }))
    .addCase(UpdateCalculation.fulfilled, (state, action) => ({
      ...state,
      isCalculated: action.payload.isCalculated,
      calculated: action.payload.calculated,
      globalFlags: action.payload.globalFlags,
      certainFlags: action.payload.certainFlags,
      errorSenzai: action.payload.errorSenzai,
    }))
    .addCase(UpdateCalculation.rejected, (state, action) => {
      console.error({ state, action });
      throw new Error('Calculation Rejected');
    });
});

export default teamReducer;
