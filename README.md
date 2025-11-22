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

### Local playground

To try the utilities locally without publishing:

```bash
# from repo root
npm install
npm run build            # builds the library to dist/
cd examples/playground
npm install              # links local package via file:../..
npm run dev              # open the URL shown
```

Or via root scripts:

```bash
npm run playground:dev
```

### TypeFromPropKeys

Automatically infer TypeScript types from prop names using intelligent naming conventions. This utility analyzes your prop names and infers appropriate types based on common React and JavaScript naming patterns, dramatically speeding up the migration process from JavaScript to TypeScript.

Instead of manually typing every prop (e.g., `onClick: () => void`, `isVisible: boolean`, `itemCount: number`), simply pass your props object with `any` or `unknown` types, and `TypeFromPropKeys` will intelligently infer the correct types based on naming conventions. It even works with mixed types—if a prop already has a specific type, it will preserve it; if it's `unknown` or `any`, it will infer from the name.

This is especially powerful during migrations when you have hundreds of components to convert. You can quickly add type safety without spending hours writing type definitions, and the inferred types are based on industry-standard naming conventions that most React codebases already follow.

```typescript
import type { TypeFromPropKeys } from 'react-ts-migration-utils';

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
}: TypeFromPropKeys<{
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

**Works with mixed known and unknown types:**
```typescript
import type { TypeFromPropKeys } from 'react-ts-migration-utils';
import type { PropsWithChildren } from 'react';

interface MixedProps {
  onClick: unknown;  // Will be inferred as function
  count: number;     // Will remain as number (more specific)
  name: string;      // Will remain as string (more specific)
};

// Use PropsWithChildren to add children prop
type ComponentProps = PropsWithChildren<TypeFromPropKeys<MixedProps>>;
// Result:
// {
//   onClick: (...args: any[]) => void | Promise<void>;
//   count: number;
//   name: string;
//   children?: ReactNode;
// }

function MyComponent({ onClick, count, name, children }: ComponentProps) {
  return (
    <div onClick={onClick}>
      <h1>{name}</h1>
      <p>Count: {count}</p>
      {children}
    </div>
  );
}
```

**Supported Patterns:**

| Category | Pattern Examples | Inferred Type | Notes |
|----------|-----------------|---------------|-------|
| **Event Handlers** | `onClick`, `onChange`, `onSubmit`, `handleClick`, `handleSubmit`, `setValue`, `getData`, `toggleState`, `resetForm`, `clearCache`, `updateItem`, `deleteRecord`, `createUser`, `saveData`, `loadContent`, `fetchData`, `cancelAction`, `closeModal`, `openDialog` | `(...args: any[]) => void \| Promise<void>` | Matches any prop starting with: `on`, `handle`, `set`, `get`, `toggle`, `reset`, `clear`, `update`, `delete`, `create`, `save`, `load`, `fetch`, `submit`, `cancel`, `close`, `open` (capitalized) |
| **Booleans** | `isVisible`, `hasError`, `doesExist`, `areEnabled`, `willLoad`, `canEdit`, `shouldRender`, `didMount`, `doShow`, `showModal`, `hidePanel`, `disabled`, `checked`, `required`, `readonly`, `readOnly`, `selected`, `open`, `loading`, `hidden`, `focused` | `boolean` | Matches props starting with: `is`, `has`, `does`, `are`, `will`, `can`, `should`, `did`, `do`, `show`, `hide` (capitalized), or common boolean props |
| **Arrays** | `list`, `items`, `array`, `collection`, `values`, `keys`, `entries`, `userList`, `itemArray`, `dataCollection` | `Array<any>` | Matches exact names or props ending with: `List`, `Items`, `Array`, `Collection`, `Values`, `Keys`, `Entries` (capitalized) |
| **Numbers** | `count`, `size`, `width`, `height`, `index`, `length`, `page`, `limit`, `offset`, `duration`, `timeout`, `delay`, `amount`, `price`, `value`, `number`, `quantity`, `total`, `max`, `min`, `itemCount`, `pageSize`, `maxWidth`, `minHeight` | `number` | Matches exact names or props ending with: `Count`, `Size`, `Width`, `Height`, `Index`, `Length`, `Page`, `Limit`, `Offset`, `Duration`, `Timeout`, `Delay`, `Amount`, `Price`, `Value`, `Number`, `Quantity`, `Total`, `Max`, `Min` (capitalized) |
| **Objects** | `config`, `options`, `settings`, `data`, `info`, `meta`, `context`, `state`, `status`, `userConfig`, `appOptions`, `themeSettings` | `Record<string, any>` | Matches exact names or props ending with: `Config`, `Options`, `Settings`, `Data`, `Info`, `Meta`, `Context`, `State`, `Status` (capitalized) |
| **Dates** | `date`, `time`, `timestamp`, `startDate`, `endDate`, `startTime`, `endTime`, `birthday`, `birthDate`, `dueDate`, `releaseDate`, `createdAt`, `updatedAt`, `deletedAt`, `publishedAt`, `expiresAt`, `userDate`, `eventTime`, `logTimestamp` | `string \| number \| Date` | Matches exact date names, props ending with: `Date`, `Time`, `Timestamp` (capitalized), or props ending with `At` after: `created`, `updated`, `deleted`, `published`, `expires` |
| **Strings** | `id`, `ID`, `key`, `name`, `title`, `label`, `text`, `message`, `url`, `URL`, `href`, `path`, `type`, `class`, `className`, `src`, `alt`, `placeholder`, `content`, `description`, `color`, `mode`, `theme`, `userId`, `userName`, `pageTitle`, `itemLabel` | `string` | Matches exact names or props ending with: `Id`, `ID`, `Key`, `Name`, `Title`, `Label`, `Text`, `Message`, `Url`, `URL`, `Href`, `Path`, `Type`, `Class`, `ClassName`, `Src`, `Alt`, `Placeholder`, `Content`, `Description`, `Color`, `Mode`, `Theme` (capitalized) |

### InferComponentProps

Extract and infer props types directly from a React component. This utility automatically extracts the props type from a component and applies `TypeFromPropKeys` to infer types based on naming conventions.

```typescript
import type { InferComponentProps } from 'react-ts-migration-utils';

// Function component with unknown types
const MyComponent = (props: {
  onClick: unknown;
  count: unknown;
  isVisible: unknown;
}) => {
  // component implementation
};

// Automatically infer the props type
type Props = InferComponentProps<typeof MyComponent>;
// Result:
// {
//   onClick: (...args: any[]) => void | Promise<void>;
//   count: number;
//   isVisible: boolean;
// }
```

**Works with React.FC components:**
```typescript
import type { InferComponentProps } from 'react-ts-migration-utils';

const MyComponent: React.FC<{
  isVisible: unknown;
  title: unknown;
}> = (props) => {
  // component implementation
};

type Props = InferComponentProps<typeof MyComponent>;
// Result:
// {
//   isVisible: boolean;
//   title: string;
// }
```

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