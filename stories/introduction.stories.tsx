import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Vibra React

A lightweight, type-safe React component library for managing state with Vibra stores.

## Overview

Vibra React provides a set of React components and hooks that make it easy to work with Vibra stores in your React applications. The library is designed to be:

- **Type-safe**: Full TypeScript support with proper type inference
- **Lightweight**: Minimal bundle size with no external dependencies
- **Easy to use**: Simple API that follows React best practices
- **Reliable**: Built-in error handling and testing support

## Installation

\`\`\`bash
npm install vibra-react vibra
# or
yarn add vibra-react vibra
# or
bun add vibra-react vibra
\`\`\`

## Quick Start

1. Create your Vibra stores:

\`\`\`tsx
import vibra from 'vibra';

// Simple counter store
const counterStore = vibra(0);

// Complex store with type
interface User {
  name: string;
  age: number;
}

const userStore = vibra<User>({ name: '', age: 0 });
\`\`\`

2. Initialize your stores using the VibraInitializer component:

\`\`\`tsx
import { VibraInitializer } from 'vibra-react';

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

3. Use the useVibra hook to access store values in your components:

\`\`\`tsx
import { useVibra } from 'vibra-react';

function Counter() {
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

## Features

### VibraInitializer Component

The VibraInitializer component provides a way to initialize multiple Vibra stores with their initial values. It includes:

- Type-safe store initialization
- Built-in error boundary
- Support for multiple stores
- Custom error handling

### useVibra Hook

The useVibra hook provides a simple way to subscribe to Vibra stores in your React components. Features include:

- Automatic component updates on store changes
- Type-safe store access
- Clean subscription management
- Support for any store type

## Best Practices

1. **Store Organization**
   - Keep stores in a dedicated directory
   - Use meaningful names for your stores
   - Group related stores together

2. **Type Safety**
   - Always define interfaces for complex store types
   - Use TypeScript's type inference to your advantage
   - Avoid using \`any\` type

3. **Error Handling**
   - Always provide an onError handler to VibraInitializer
   - Log errors appropriately
   - Consider implementing fallback UI for critical stores

4. **Performance**
   - Initialize stores as early as possible in your app
   - Use the useVibra hook only where needed
   - Consider using store selectors for complex state

## Contributing

We welcome contributions! Please see our [GitHub repository](https://github.com/rrios-dev/react-library-boilerplate) for more information.

## License

MIT © [Roberto Ríos](https://github.com/rrios-dev)
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Example component to demonstrate the library
const IntroductionDemo = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Vibra React</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Overview</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          A lightweight, type-safe React component library for managing state
          with Vibra stores. The library provides a simple and intuitive way to
          work with Vibra stores in your React applications.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Key Features
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>✨</span>
            Type-safe implementation with full TypeScript support
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>🚀</span>
            Lightweight with minimal bundle size
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>🎯</span>
            Simple and intuitive API
          </li>
          <li
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>🛡️</span>
            Built-in error handling
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Getting Started
        </h2>
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
          }}
        >
          <code>npm install vibra-react vibra</code>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Documentation
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Check out the following sections for detailed documentation:
        </p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a
              href="?path=/docs/components-vibrainitializer"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              VibraInitializer Component →
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a
              href="?path=/docs/hooks-usevibra"
              style={{ color: '#0070f3', textDecoration: 'none' }}
            >
              useVibra Hook →
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export const Default: Story = {
  render: () => <IntroductionDemo />,
};
