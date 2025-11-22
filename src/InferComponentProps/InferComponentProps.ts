import type { TypeFromPropKeys } from '../TypeFromPropKeys/TypeFromPropKeys.js';

/**
 * Infers the props type from a React component, automatically applying type inference
 * based on prop naming conventions.
 * 
 * This utility type extracts the props type from a React component (function component
 * or React.FC) and applies `TypeFromPropKeys` to infer more specific types based on naming
 * conventions. This is particularly useful when migrating from PropTypes or untyped
 * components to TypeScript.
 * 
 * @template C - The React component type (function component or React.FC)
 * @returns The inferred props type with naming-convention-based type inference, or `never` if C is not a valid component type
 * 
 * @example
 * ```typescript
 * // Function component
 * const MyComponent = (props: { onClick: unknown; count: unknown }) => {
 *   // component implementation
 * };
 * 
 * type Props = InferComponentProps<typeof MyComponent>;
 * // Result:
 * // {
 * //   onClick: (...args: any[]) => void | Promise<void>;
 * //   count: number;
 * // }
 * ```
 * 
 * @example
 * ```typescript
 * // React.FC component
 * const MyComponent: React.FC<{ isVisible: unknown; title: unknown }> = (props) => {
 *   // component implementation
 * };
 * 
 * type Props = InferComponentProps<typeof MyComponent>;
 * // Result:
 * // {
 * //   isVisible: boolean;
 * //   title: string;
 * // }
 * ```
 * 
 * @example
 * ```typescript
 * // With mixed known and unknown types
 * const MyComponent = (props: {
 *   onClick: unknown; // Will be inferred as function
 *   count: number;    // Will remain as number
 *   name: string;     // Will remain as string
 * }) => {
 *   // component implementation
 * };
 * 
 * type Props = InferComponentProps<typeof MyComponent>;
 * // Result:
 * // {
 * //   onClick: (...args: any[]) => void | Promise<void>;
 * //   count: number;
 * //   name: string;
 * // }
 * ```
 */
export type InferComponentProps<C> =
    C extends ((props: infer P) => any | React.FC<infer P>)
    ? TypeFromPropKeys<P>
    : never;
