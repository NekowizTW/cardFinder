import { createAsyncThunk } from '@reduxjs/toolkit';

import CalculateHelper from '../helper/CalculateHelper';
import { cardNotFoundTemplate, exCardNotFoundTemplate, senzaiNotFoundTemplate } from '../model/NotFoundTemplates';

export const RestoreTeam = createAsyncThunk(
  'team/restore',
  async ({ leaderEX, teamSlot, helperSlot }) => ({
    leaderEX, teamSlot, helperSlot,
  }),
);

export const SetTeamSlotData = createAsyncThunk(
  'team/setTeamSlotData',
  async ({ index, slotData }) => ({
    index, slotData,
  }),
);

export const SetLeaderEXData = createAsyncThunk(
  'team/setLeaderEXData',
  async ({ leaderEX }) => ({ leaderEX }),
);

export const UpdateCalculation = createAsyncThunk(
  'team/updateCalculation',
  async ({ team }, { getState, rejectWithValue }) => {
    const { sourceCards, sourceEXCards, sourceSenzais } = getState().cards;
    if (sourceCards.length === 0) return rejectWithValue('not ready');

    const remapTeam = team.map((teamSlot) => {
      const targetCard = sourceCards.find((card) => card.id === teamSlot.id)
        || cardNotFoundTemplate;
      const targetSenzais = targetCard?.senzaiArr.map(
        (szName) => sourceSenzais.find((senzai) => senzai.name === szName)
          || senzaiNotFoundTemplate,
      ) ?? [];
      const targetEXs = teamSlot.exs.map((ex) => {
        const targetEXCard = sourceEXCards.find((exCard) => exCard.id === ex)
          || exCardNotFoundTemplate;
        return sourceSenzais.find((senzai) => senzai.name === targetEXCard.senzai_1)
          || senzaiNotFoundTemplate;
      });

      return {
        ...targetCard,
        sz: targetSenzais,
        exs: targetEXs,
      };
    });

    return {
      isCalculated: true,
      ...CalculateHelper(remapTeam),
    };
  },
);
