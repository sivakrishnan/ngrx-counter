export const loadCounterState = async () => {
    const { provideState } = await import('@ngrx/store');
    const { counterReducer } = await import('./state/counter.reducer');
    return provideState({ name: 'counter', reducer: counterReducer });
  };