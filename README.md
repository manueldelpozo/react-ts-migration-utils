# React TS Migration Utils

A small set of high-impact utilities to solve the most painful parts of migrating a legacy React + JavaScript codebase to TypeScript.

[![NPM version](https://img.shields.io/npm/v/react-ts-migration-utils.svg)](https://www.npmjs.com/package/react-ts-migration-utils)

## The Problem

When migrating a React JS app to TypeScript, you hit the same annoying problems:
1.  How do I quickly type all my component props without manually writing types for every prop?
2.  How do I convert all my `PropTypes` to `interface` or `type` definitions?
3.  How do I type `React.createContext` without making every consumer check for `null`?

This library provides small helpers to solve these problems instantly.

## Installation

```bash
npm install react-ts-migration-utils
```

## Usage

### TypeFromProps

Automatically infer TypeScript types from prop names using intelligent naming conventions. Perfect for quickly typing components without manually writing every type!

```typescript
import type { TypeFromProps } from 'react-ts-migration-utils';

// Use with destructured props - define props inline in typeof
function MyComponent({
  isVisible,
  itemCount,
  userName,
  onClick,
  children,
  headerIcon,
  createdAt,
  publishedDate,
  config,
}: TypeFromProps<typeof {
  isVisible: any;
  itemCount: any;
  userName: any;
  onClick: any;
  children: any;
  headerIcon: any;
  createdAt: any;
  publishedDate: any;
  config: any;
}>) {
  // All props are properly typed based on their names!
  // Types inferred:
  // - isVisible: boolean           (is* → boolean)
  // - itemCount: number            (*Count → number)
  // - userName: string             (*Name → string)
  // - onClick: (...args: any[]) => void | Promise<void>  (on* → handler)
  // - children: ReactNode          (children → ReactNode)
  // - headerIcon: ReactNode        (*Icon → ReactNode)
  // - createdAt: string | number | Date  (*At → date)
  // - publishedDate: string | number | Date  (*Date → date)
  // - config: Record<string, any>  (config → object)
  
  if (isVisible) {
    return (
      <div onClick={onClick}>
        {headerIcon}
        {children}
        <span>{userName} has {itemCount} items</span>
      </div>
    );
  }
  return null;
}
```

**Supported Patterns:**
- **Event handlers**: `on*`, `handle*`, `set*`, etc. → `(...args: any[]) => void | Promise<void>`
- **React nodes**: `children`, `icon`, `header`, `footer`, `*Icon`, `*Content`, etc. → `ReactNode`
- **Booleans**: `is*`, `has*`, `disabled`, `checked`, etc. → `boolean`
- **Arrays**: `*List`, `*Items`, `*Array`, `items`, etc. → `any[]`
- **Numbers**: `*Count`, `*Size`, `*Width`, `*Height`, etc. → `number`
- **Objects**: `*config`, `*options`, `*settings`, `data`, etc. → `Record<string, any>`
- **Dates**: `*Date`, `*Time`, `*At`, `createdAt`, `updatedAt`, etc. → `string | number | Date`
- **Strings**: `*Id`, `*Name`, `*Title`, `*Label`, etc. → `string`

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