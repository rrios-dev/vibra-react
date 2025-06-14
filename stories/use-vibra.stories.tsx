import type { Meta, StoryObj } from '@storybook/react';
import useVibra from '../hooks/use-vibra';
import vibra from 'vibra';
import { useEffect } from 'react';

const meta = {
  title: 'Hooks/useVibra',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# useVibra Hook

A React hook that provides a type-safe way to subscribe to Vibra stores and automatically updates components when the store value changes.

## Features
- Type-safe store subscription
- Automatic component updates on store changes
- Clean subscription management
- Works with any Vibra store type

## Usage
\`\`\`tsx
import { useVibra } from 'vibra-react';
import vibra from 'vibra';

// Create a store
const counterStore = vibra(0);

function Counter() {
  // Subscribe to the store
  const count = useVibra(counterStore);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => counterStore.set(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Type Safety
The hook is fully type-safe and will infer the store's value type:

\`\`\`tsx
// Store with a specific type
interface User {
  name: string;
  age: number;
}

const userStore = vibra<User>({ name: '', age: 0 });

function UserProfile() {
  // TypeScript knows this is User type
  const user = useVibra(userStore);
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof useVibra>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example store
const counterStore = vibra(0);

// Example component using the hook
const Counter = () => {
  const count = useVibra(counterStore);

  useEffect(() => {
    // Simulate store updates
    const interval = setInterval(() => {
      counterStore.set(count + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>Counter Example</h3>
      <p>Current count: {count}</p>
      <button onClick={() => counterStore.set(count + 1)}>Increment</button>
    </div>
  );
};

// Example with complex type
interface User {
  name: string;
  age: number;
}

const userStore = vibra<User>({ name: 'John', age: 30 });

const UserProfile = () => {
  const user = useVibra(userStore);

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '20px',
      }}
    >
      <h3>User Profile Example</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={() => userStore.set({ ...user, age: user.age + 1 })}>
        Increment Age
      </button>
    </div>
  );
};

export const Basic: Story = {
  render: () => <Counter />,
};

export const WithComplexType: Story = {
  render: () => <UserProfile />,
};

export const MultipleStores: Story = {
  render: () => (
    <div>
      <Counter />
      <UserProfile />
    </div>
  ),
};
