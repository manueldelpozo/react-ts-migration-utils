import type { IsArray } from './IsArray.js';
import type { IsBoolean } from './IsBoolean.js';
import type { IsDate } from './IsDate.js';
import type { IsHandler } from './IsHandler.js';
import type { IsNumber } from './IsNumber.js';
import type { IsObject } from './IsObject.js';
import type { IsString } from './IsString.js';

/**
 * Maps a prop key name to its inferred type based on naming conventions.
 * 
 * This type uses conditional type checking to infer the type of a prop based on its key name:
 * - Keys matching `IsHandler` (e.g., `onClick`, `handleSubmit`) → function types
 * - Keys matching `IsBoolean` (e.g., `isVisible`, `hasError`) → boolean
 * - Keys matching `IsArray` (e.g., `items`, `list`) → Array<any>
 * - Keys matching `IsNumber` (e.g., `count`, `size`) → number
 * - Keys matching `IsObject` (e.g., `config`, `options`) → Record<string, any>
 * - Keys matching `IsDate` (e.g., `createdAt`, `updatedAt`) → string | number | Date
 * - Keys matching `IsString` (e.g., `title`, `name`) → string
 * - All other keys → any
 * 
 * @template K - The prop key name as a string literal type
 * @returns The inferred type based on the key name convention
 * 
 * @example
 * ```typescript
 * type HandlerType = TypeFromKeyProp<'onClick'>; // (...args: any[]) => void | Promise<void>
 * type BooleanType = TypeFromKeyProp<'isVisible'>; // boolean
 * type NumberType = TypeFromKeyProp<'count'>; // number
 * ```
 */
type TypeFromPropKey<K extends string> =
    K extends IsHandler ? (...args: any[]) => void | Promise<void>
    : K extends IsBoolean ? boolean
    : K extends IsArray ? Array<any>
    : K extends IsNumber ? number
    : K extends IsObject ? Record<string, any>
    : K extends IsDate ? (string | number | Date)
    : K extends IsString ? string
    : any;

/**
 * Utility type that returns the inferred type if it's not `unknown`, otherwise returns the fallback type.
 * 
 * This is used to prefer known types over `unknown` when both are possible.
 * 
 * @template U - The type to check
 * @template I - The fallback type to use if U is `unknown`
 * @returns U if it's not `unknown`, otherwise I
 * 
 * @example
 * ```typescript
 * type Known = GetKnownType<string, any>; // string
 * type Fallback = GetKnownType<unknown, any>; // any
 * ```
 */
type GetKnownType<U, I> = unknown extends U ? I : U;

/**
 * Utility type that selects the best known type between a key-based type and a value type.
 * 
 * This type prefers:
 * 1. The value type if it's known (not `unknown`)
 * 2. The key-based type if the value type is `unknown` but the key-based type is known
 * 3. `any` as a last resort
 * 
 * @template KT - The type inferred from the key name
 * @template V - The actual value type from the props
 * @returns The best known type available
 * 
 * @example
 * ```typescript
 * // If value type is known, use it
 * type Example1 = GetBetterKnownType<string, number>; // number
 * 
 * // If value type is unknown but key type is known, use key type
 * type Example2 = GetBetterKnownType<string, unknown>; // string
 * 
 * // If both are unknown, fall back to any
 * type Example3 = GetBetterKnownType<unknown, unknown>; // any
 * ```
 */
type GetBetterKnownType<KT, V> = GetKnownType<V, GetKnownType<KT, any>>;

/**
 * Transforms a props object type by inferring more specific types for each prop based on naming conventions.
 * 
 * This utility type analyzes each key in the input type and attempts to infer a more specific type
 * based on common naming patterns. It combines the inferred type from the key name with the actual
 * value type, preferring the more specific known type when available.
 * 
 * This is particularly useful when migrating from PropTypes or untyped props to TypeScript, as it
 * can automatically infer types based on naming conventions without requiring explicit type annotations.
 * 
 * @template T - The input props object type
 * @returns A new type with inferred types for each prop based on naming conventions
 * 
 * @example
 * ```typescript
 * // Input type with unknown or any types
 * type InputProps = {
 *   onClick: unknown;
 *   isVisible: unknown;
 *   count: unknown;
 *   title: unknown;
 * };
 * 
 * // Output type with inferred types
 * type OutputProps = TypeFromPropKeys<InputProps>;
 * // Result:
 * // {
 * //   onClick: (...args: any[]) => void | Promise<void>;
 * //   isVisible: boolean;
 * //   count: number;
 * //   title: string;
 * // }
 * ```
 * 
 * @example
 * ```typescript
 * // Works with mixed known and unknown types
 * type MixedProps = {
 *   onClick: unknown; // Will be inferred as function
 *   count: number; // Will remain as number (more specific)
 *   name: string; // Will remain as string (more specific)
 * };
 * 
 * type Inferred = TypeFromPropKeys<MixedProps>;
 * // Result:
 * // {
 * //   onClick: (...args: any[]) => void | Promise<void>;
 * //   count: number;
 * //   name: string;
 * // }
 * ```
 */
export type TypeFromPropKeys<T> = {
    [K in keyof T]: GetBetterKnownType<TypeFromPropKey<K & string>, T[K]>;
};

