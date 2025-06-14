import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import vibra from 'vibra';
import VibraInitializer from './vibra-initializer';

describe('VibraInitializer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Store Initialization', () => {
    it('should initialize stores with provided values', () => {
      const store1 = vibra<number>(0);
      const store2 = vibra<number>(0);
      const initialValue1 = 42;
      const initialValue2 = 100;

      render(
        <VibraInitializer
          stores={[
            [store1, initialValue1],
            [store2, initialValue2],
          ]}
        />,
      );

      expect(store1.get()).toBe(initialValue1);
      expect(store2.get()).toBe(initialValue2);
    });

    it('should handle empty stores array', () => {
      const { container } = render(<VibraInitializer stores={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it('should reinitialize stores on re-render with new values', () => {
      const store = vibra<number>(0);
      const initialValue = 42;
      const newValue = 100;

      const { rerender } = render(
        <VibraInitializer stores={[[store, initialValue]]} />,
      );

      act(() => {
        store.set(newValue);
      });

      // Re-render with same store but different value
      rerender(<VibraInitializer stores={[[store, initialValue]]} />);
      expect(store.get()).toBe(initialValue);

      // Re-render with different store and value
      const newStore = vibra<number>(0);
      rerender(<VibraInitializer stores={[[newStore, 200]]} />);
      expect(newStore.get()).toBe(200);
    });
  });

  describe('Type Safety', () => {
    it('should handle different store types', () => {
      // Test with number store
      const numberStore = vibra<number>(0);
      render(<VibraInitializer stores={[[numberStore, 42]]} />);
      expect(numberStore.get()).toBe(42);

      // Test with string store
      const stringStore = vibra<string>('');
      render(<VibraInitializer stores={[[stringStore, 'test']]} />);
      expect(stringStore.get()).toBe('test');

      // Test with object store
      const objectStore = vibra<{ value: number }>({ value: 0 });
      render(<VibraInitializer stores={[[objectStore, { value: 100 }]]} />);
      expect(objectStore.get()).toEqual({ value: 100 });
    });

    it('should maintain type safety with generic types', () => {
      type CustomType = { id: number; name: string };
      const store = vibra<CustomType>({ id: 0, name: '' });
      const value: CustomType = { id: 1, name: 'test' };

      render(<VibraInitializer stores={[[store, value]]} />);
      expect(store.get()).toEqual(value);
    });
  });

  describe('Component Behavior', () => {
    it('should update store values on prop changes', () => {
      const store = vibra<number>(0);
      const initialValue = 42;
      const newValue = 100;

      const { rerender } = render(
        <VibraInitializer stores={[[store, initialValue]]} />,
      );
      expect(store.get()).toBe(initialValue);

      // Update with new value
      rerender(<VibraInitializer stores={[[store, newValue]]} />);
      expect(store.get()).toBe(newValue);

      // Update with different store
      const newStore = vibra<number>(0);
      rerender(<VibraInitializer stores={[[newStore, 200]]} />);
      expect(newStore.get()).toBe(200);
    });

    it('should handle store updates outside component', () => {
      const store = vibra<number>(0);
      const initialValue = 42;
      const newValue = 100;

      render(<VibraInitializer stores={[[store, initialValue]]} />);
      expect(store.get()).toBe(initialValue);

      act(() => {
        store.set(newValue);
      });

      expect(store.get()).toBe(newValue);
    });
  });
});
