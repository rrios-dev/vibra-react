'use client';

import vibra  from 'vibra';
import { useState, useEffect } from 'react';

function useVibra<T>(vibraStore: ReturnType<typeof vibra<T>>) {
  const [state, setState] = useState<T>(vibraStore.get());

  useEffect(() => {
    const unsubscribe = vibraStore.subscribe((value) => {
      setState(value);
    });

    return () => {
      unsubscribe();
    };
  }, [vibraStore]);

  return state;
}

export default useVibra;
