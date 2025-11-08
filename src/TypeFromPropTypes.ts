// src/TypeFromPropTypes.ts

// We are simply re-exporting the built-in InferProps utility
// from 'prop-types' but giving it an intuitive name
// that a developer migrating a project will search for.
import type { InferProps } from 'prop-types';

/**
 * Infers a TypeScript type (interface) from a React `PropTypes` object.
 * * @example
 * const myPropTypes = {
 * name: PropTypes.string.isRequired,
 * age: PropTypes.number
 * };
 * * type MyProps = TypeFromPropTypes<typeof myPropTypes>;
 * // Result:
 * // {
 * //   name: string;
 * //   age?: number | null;
 * // }
 */
export type TypeFromPropTypes<T> = InferProps<T>;
