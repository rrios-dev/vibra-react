'use client';
import { useEffect } from 'react';
import vibra from 'vibra';

export interface VibraInitializerProps<T> {
  stores: [ReturnType<typeof vibra<T>>, T][];
}

// Main Component
const VibraInitializer = <T,>({ stores }: VibraInitializerProps<T>) => {
  useEffect(() => {
    stores.forEach(([store, value]) => {
      store.set(value);
    });
  }, [stores]);

  return null;
};

export default VibraInitializer;
