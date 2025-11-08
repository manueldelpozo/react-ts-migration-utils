# React TS Migration Utils

A small set of high-impact utilities to solve the most painful parts of migrating a legacy React + JavaScript codebase to TypeScript.

[![NPM version](https://img.shields.io/npm/v/react-ts-migration-utils.svg)](https://www.npmjs.com/package/react-ts-migration-utils)

## The Problem

When migrating a React JS app to TypeScript, you hit the same annoying problems:
1.  How do I convert all my `PropTypes` to `interface` or `type` definitions?
2.  How do I type `React.createContext` without making every consumer check for `null`?

This library provides small helpers to solve these problems instantly.

## Installation

```bash
npm install react-ts-migration-utils
```

## Usage

### TypeFromPropTypes

Convert your PropTypes definitions to TypeScript types:

```typescript
import PropTypes from 'prop-types';
import type { TypeFromPropTypes } from 'react-ts-migration-utils';

const MyComponentPropTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  email: PropTypes.string,
};

type MyComponentProps = TypeFromPropTypes<typeof MyComponentPropTypes>;
// Result:
// {
//   name: string;
//   age?: number | null;
//   email?: string | null;
// }

function MyComponent(props: MyComponentProps) {
  // Your component code
}
```

### createSafeContext

Create a type-safe React Context without null checks:

```typescript
import { createSafeContext } from 'react-ts-migration-utils';

// 1. Define your context type
interface User {
  name: string;
  email: string;
}

// 2. Create the context
const [useUser, UserProvider] = createSafeContext<User>();

// 3. Wrap your app
function App() {
  return (
    <UserProvider value={{ name: 'Jane', email: 'jane@example.com' }}>
      <MyComponent />
    </UserProvider>
  );
}

// 4. Use in any component (no null checks needed!)
function MyComponent() {
  const user = useUser(); // Type is `User`, not `User | null`
  return <div>{user.name}</div>;
}
```

## License

MIT