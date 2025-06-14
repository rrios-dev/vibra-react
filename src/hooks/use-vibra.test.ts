import { renderHook, act } from '@testing-library/react';
import vibra from 'vibra';
import useVibra from './use-vibra';

describe('useVibra', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial store value', () => {
    const store = vibra<number>(0);
    const initialValue = 42;
    store.set(initialValue);

    const { result } = renderHook(() => useVibra(store));
    expect(result.current).toBe(initialValue);
  });

  it('should update when store value changes', () => {
    const store = vibra<number>(0);
    const initialValue = 42;
    const newValue = 100;
    store.set(initialValue);

    const { result } = renderHook(() => useVibra(store));

    act(() => {
      store.set(newValue);
    });

    expect(result.current).toBe(newValue);
  });

  it('should handle multiple updates in sequence', () => {
    const store = vibra<number>(0);
    const values = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useVibra(store));

    values.forEach((value) => {
      act(() => {
        store.set(value);
      });
      expect(result.current).toBe(value);
    });
  });

  it('should unsubscribe when component unmounts', () => {
    const store = vibra<number>(0);
    const initialValue = 42;
    store.set(initialValue);

    // Mock subscribe to return a jest.fn()
    const unsubscribeMock = jest.fn();
    jest.spyOn(store, 'subscribe').mockImplementation(() => unsubscribeMock);

    const { unmount } = renderHook(() => useVibra(store));

    // Unmount the component
    unmount();

    // Verify unsubscribe was called
    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it('should handle complex object values', () => {
    interface TestState {
      count: number;
      text: string;
      nested: {
        value: number;
      };
    }

    const store = vibra<TestState>({ count: 0, text: '', nested: { value: 0 } });
    const initialValue: TestState = { count: 0, text: 'initial', nested: { value: 1 } };
    const newValue: TestState = { count: 1, text: 'updated', nested: { value: 2 } };

    store.set(initialValue);
    const { result } = renderHook(() => useVibra(store));

    act(() => {
      store.set(newValue);
    });

    expect(result.current).toEqual(newValue);
  });

  it('should handle null and undefined values', () => {
    const store = vibra<string | null | undefined>(null);
    const { result } = renderHook(() => useVibra(store));

    expect(result.current).toBeNull();

    act(() => {
      store.set(undefined);
    });
    expect(result.current).toBeUndefined();

    act(() => {
      store.set('test');
    });
    expect(result.current).toBe('test');
  });

  it('should maintain referential equality for unchanged values', () => {
    const store = vibra<{ value: number }>({ value: 0 });
    const { result, rerender } = renderHook(() => useVibra(store));

    const firstResult = result.current;
    rerender();
    expect(result.current).toBe(firstResult);

    act(() => {
      store.set({ value: 0 }); // Same value, different reference
    });
    expect(result.current).not.toBe(firstResult);
  });

  it('should handle store with no initial value', () => {
    const store = vibra<number | undefined>(undefined);
    const { result } = renderHook(() => useVibra(store));

    expect(result.current).toBeUndefined();

    act(() => {
      store.set(42);
    });
    expect(result.current).toBe(42);
  });
});
