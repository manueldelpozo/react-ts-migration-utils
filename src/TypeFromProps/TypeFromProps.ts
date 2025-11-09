import type { ReactNode } from 'react';
import type { IsArray } from './IsArray.js';
import type { IsBoolean } from './IsBoolean.js';
import type { IsDate } from './IsDate.js';
import type { IsHandler } from './IsHandler.js';
import type { IsNumber } from './IsNumber.js';
import type { IsObject } from './IsObject.js';
import type { IsReactNode } from './IsReactNode.js';
import type { IsString } from './IsString.js';

/**
 * Infers the type of a prop key based on naming conventions.
 * Returns the inferred type, or 'any' if no pattern matches.
 * 
 * Pattern matching order (most specific first):
 * 1. Event handlers (on*)
 * 2. React node patterns (children, icon, header, footer, etc.)
 * 3. Boolean patterns (is*, has*, disabled, etc.)
 * 4. Array/List patterns (*List, *Items, *Array, plural forms)
 * 5. Number patterns (*Count, *Size, *Width, etc.)
 * 6. Object patterns (*config, *options, *settings, etc.)
 * 7. Date/Time patterns (*Date, *Time, *At, createdAt, updatedAt, etc.)
 * 8. String patterns (*Id, *Name, *Title, etc.)
 * 9. Fallback to 'any'
 */
type InferPropType<K extends string> =
    K extends IsHandler ? (...args: any[]) => void | Promise<void>
    : K extends IsReactNode ? ReactNode
    : K extends IsBoolean ? boolean
    : K extends IsArray ? any[]
    : K extends IsNumber ? number
    : K extends IsObject ? Record<string, any>
    : K extends IsDate ? string | number | Date
    : K extends IsString ? string
    : any;

/**
 * Maps the keys of a component's props object and infers types based on naming conventions.
 * 
 * @template T - The props object type (typically a Record<string, any> or interface)
 * 
 * @example
 * ```typescript
 * type MyProps = TypeFromProps<{
 *   isVisible: any;
 *   itemCount: any;
 *   userName: any;
 *   onClick: any;
 *   children: any;
 *   headerIcon: any;
 *   createdAt: any;
 *   publishedDate: any;
 *   unknownProp: any;
 * }>;
 * // Result:
 * // {
 * //   isVisible: boolean;
 * //   itemCount: number;
 * //   userName: string;
 * //   onClick: (...args: any[]) => void | Promise<void>;
 * //   children: ReactNode;
 * //   headerIcon: ReactNode;
 * //   createdAt: string | number | Date;
 * //   publishedDate: string | number | Date;
 * //   unknownProp: any;
 * // }
 * ```
 */
export type TypeFromProps<T extends Record<string, any>> = {
    [K in keyof T]: InferPropType<K & string>;
};

