# Vibra React

<div align="center">

[![npm version](https://img.shields.io/npm/v/vibra-react.svg)](https://www.npmjs.com/package/vibra-react)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/vibra-react)](https://bundlephobia.com/package/vibra-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/rrios-dev/vibra-react/blob/main/CONTRIBUTING.md)

A lightweight, type-safe React integration for Vibra state management.

[Documentation](https://vibra-react.vercel.app) • [Storybook](https://vibra-react-storybook.vercel.app) • [Report Bug](https://github.com/rrios-dev/vibra-react/issues) • [Request Feature](https://github.com/rrios-dev/vibra-react/issues)

</div>

## ✨ Features

- 🎯 **Type-Safe**: Full TypeScript support with proper type inference
- 🚀 **Lightweight**: Minimal bundle size with no external dependencies
- 🧪 **Tested**: Comprehensive test coverage with Jest and React Testing Library
- 📚 **Documented**: Detailed documentation with Storybook
- 🛠 **Developer Experience**: Hot reload, TypeScript support, and comprehensive tooling

## 📦 Installation

```bash
# Using npm
npm install vibra-react vibra

# Using yarn
yarn add vibra-react vibra

# Using pnpm
pnpm add vibra-react vibra

# Using bun
bun add vibra-react vibra
```

## 🔨 Core API

### VibraInitializer

A React component that initializes Vibra stores with their initial values.

```tsx
import { VibraInitializer } from 'vibra-react';
import vibra from 'vibra';

// Create your stores
const counterStore = vibra<number>(0);
const userStore = vibra<{ name: string; age: number }>({ name: '', age: 0 });

function App() {
  return (
    <VibraInitializer
      stores={[
        [counterStore, 42],
        [userStore, { name: 'John', age: 30 }]
      ]}
    />
  );
}
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stores` | `[ReturnType<typeof vibra<T>>, T][]` | Yes | Array of tuples containing store and initial value pairs |

### useVibra Hook

A React hook that provides a type-safe way to subscribe to Vibra stores.

```tsx
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
```

## 🚀 Quick Start

1. **Create your stores**
   ```tsx
   // stores/counter.ts
   import vibra from 'vibra';
   
   export const counterStore = vibra<number>(0);
   
   // stores/user.ts
   import vibra from 'vibra';
   
   export interface User {
     name: string;
     age: number;
   }
   
   export const userStore = vibra<User>({ name: '', age: 0 });
   ```

2. **Initialize stores in your app**
   ```tsx
   // App.tsx
   import { VibraInitializer } from 'vibra-react';
   import { counterStore, userStore } from './stores';
   
   function App() {
     return (
       <VibraInitializer
         stores={[
           [counterStore, 0],
           [userStore, { name: 'John', age: 30 }]
         ]}
       >
         <YourApp />
       </VibraInitializer>
     );
   }
   ```

3. **Use stores in your components**
   ```tsx
   // Counter.tsx
   import { useVibra } from 'vibra-react';
   import { counterStore } from './stores';
   
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
   ```

## 🎯 Best Practices

### Store Organization

1. **Keep stores in a dedicated directory**
   ```tsx
   src/
     stores/
       counter.ts
       user.ts
       auth.ts
       index.ts  // Export all stores
   ```

2. **Use meaningful names and types**
   ```tsx
   // stores/auth.ts
   import vibra from 'vibra';
   
   export interface AuthState {
     isAuthenticated: boolean;
     user: User | null;
   }
   
   export const authStore = vibra<AuthState>({
     isAuthenticated: false,
     user: null
   });
   ```

### Type Safety

1. **Always define interfaces for complex types**
   ```tsx
   interface Todo {
     id: string;
     text: string;
     completed: boolean;
   }
   
   const todoStore = vibra<Todo[]>([]);
   ```

2. **Use type guards when needed**
   ```tsx
   function isUser(value: unknown): value is User {
     return (
       typeof value === 'object' &&
       value !== null &&
       'name' in value &&
       'age' in value
     );
   }
   ```

### Performance

1. **Initialize stores early in your app**
   ```tsx
   // App.tsx
   function App() {
     return (
       <VibraInitializer stores={[...]}>
         <Router>
           <Routes>
             {/* Your routes */}
           </Routes>
         </Router>
       </VibraInitializer>
     );
   }
   ```

2. **Use the hook only where needed**
   ```tsx
   // Only subscribe to the store in components that need it
   function UserProfile() {
     const user = useVibra(userStore);
     return <div>{user.name}</div>;
   }
   ```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build the library
npm run build

# Run linter
npm run lint

# Run type checking
npm run type-check
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vibra](https://vibra.dev)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)

## 📞 Support

- [GitHub Issues](https://github.com/rrios-dev/vibra-react/issues)
- [Documentation](https://vibra-react.vercel.app)
- [Email Support](mailto:roberto@rrios.dev)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/rrios-dev">Roberto Ríos</a>
</div>
