import { createAsyncThunk } from '@reduxjs/toolkit';

// Reference: https://gist.github.com/sarakusha/bb63f1a4a0143afc257eca57f2acc5f2

/**
 * A debounced analogue of the `createAsyncThunk` from `@reduxjs/toolkit`
 * @param typePrefix - a string action type value
 * @param payloadCreator - a callback function that should return a promise containing the result
 *   of some asynchronous logic
 * @param wait - the number of milliseconds to delay.
 * @param options - the options object
 */
const createDebouncedAsyncThunk = (
  typePrefix,
  payloadCreator,
  wait,
  options,
) => {
  const { maxWait = 0, leading = false } = options ?? {};
  let timer = 0;
  let maxTimer = 0;
  let resolve;
  const invoke = () => {
    window.clearTimeout(maxTimer);
    maxTimer = 0;
    if (resolve) {
      resolve(true);
      resolve = undefined;
    }
  };
  const cancel = () => {
    if (resolve) {
      resolve(false);
      resolve = undefined;
    }
  };
  return createAsyncThunk(typePrefix, payloadCreator, {
    condition() {
      const immediate = leading && !timer;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        invoke();
        timer = 0;
      }, wait);
      if (immediate) return true;
      cancel();
      if (maxWait && !maxTimer) maxTimer = window.setTimeout(invoke, maxWait);
      return new Promise((res) => {
        resolve = res;
      });
    },
  });
};

export default createDebouncedAsyncThunk;
