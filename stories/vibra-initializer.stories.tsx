import type { Meta, StoryObj } from '@storybook/react';
import VibraInitializer from '../components/vibra-initializer';
import vibra from 'vibra';
import useVibra from '../hooks/use-vibra';

const meta = {
  title: 'Components/VibraInitializer',
  component: VibraInitializer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# VibraInitializer Component

A React component that initializes Vibra stores with their initial values and provides error handling capabilities.

## Features
- Initializes multiple Vibra stores with their initial values
- Built-in error boundary for graceful error handling
- Type-safe implementation
- Silent failure mode for initialization errors

## Usage
\`\`\`tsx
import { VibraInitializer } from 'vibra-react';
import vibra from 'vibra';

// Create your stores
const counterStore = vibra(0);
const userStore = vibra({ name: '', age: 0 });

function App() {
  return (
    <VibraInitializer
      stores={[
        [counterStore, 0],
        [userStore, { name: 'John', age: 30 }]
      ]}
      onError={(error) => console.error(error)}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VibraInitializer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example store
const counterStore = vibra(0);
const userStore = vibra({ name: '', age: 0 });

// Example component using the stores
const StoreConsumer = () => {
  const counter = useVibra(counterStore);
  const user = useVibra(userStore);

  return (
    <div
      style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>Store Values:</h3>
      <p>Counter: {counter}</p>
      <p>
        User: {user.name} ({user.age} years old)
      </p>
    </div>
  );
};

export const Basic: Story = {
  args: {
    stores: [
      [counterStore, 42],
      [userStore, { name: 'John Doe', age: 30 }],
    ],
  },
  render: (args) => (
    <div>
      <VibraInitializer {...args} />
      <StoreConsumer />
    </div>
  ),
};

export const WithErrorHandling: Story = {
  args: {
    stores: [
      [counterStore, 42],
      [userStore, { name: 'John Doe', age: 30 }],
    ],
    onError: (error) => {
      console.error('Vibra initialization error:', error);
      alert('Error initializing stores: ' + error.message);
    },
  },
  render: (args) => (
    <div>
      <VibraInitializer {...args} />
      <StoreConsumer />
    </div>
  ),
};

export const InvalidStore: Story = {
  args: {
    // @ts-expect-error - Intentionally passing invalid store for demonstration
    stores: [[null, 42]],
    onError: (error) => {
      console.error('Vibra initialization error:', error);
      alert('Error initializing stores: ' + error.message);
    },
  },
  render: (args) => (
    <div>
      <VibraInitializer {...args} />
      <StoreConsumer />
    </div>
  ),
};
