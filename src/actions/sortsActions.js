import { createAsyncThunk } from '@reduxjs/toolkit';

export const setSortBy = createAsyncThunk(
  'sorts/setSortBy',
  async (sortBy) => (sortBy),
);

export const setOrderBy = createAsyncThunk(
  'sorts/setOrderBy',
  async (orderBy) => (orderBy),
);

export const setPaging = createAsyncThunk(
  'sorts/setPaging',
  async (paging) => (paging),
);

export const setPageNum = createAsyncThunk(
  'sorts/setPageNum',
  async (pageNum) => (pageNum),
);
