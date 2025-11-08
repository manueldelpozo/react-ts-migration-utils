// src/createSafeContext.tsx
import { createContext, useContext, type Provider } from 'react';

/**
 * Creates a type-safe React Context that guarantees a non-null value.
 * It throws an error if the context is used outside its provider.
 *
 * @returns A [useContextHook, ContextProvider] tuple.
 *
 * @example
 * // 1. Create the context
 * const [useUser, UserProvider] = createSafeContext<User>();
 *
 * // 2. Wrap your app
 * <UserProvider value={{ name: 'Jane' }}>
 * <MyComponent />
 * </UserProvider>
 *
 * // 3. Consume the context
 * const user = useUser(); // Type is `User`, not `User | null`
 */
export function createSafeContext<T>() {
    // 1. Create the context with `null` as the default
    const context = createContext<T | null>(null);

    // 2. Create the custom hook
    const useSafeContext = () => {
        const value = useContext(context);

        // 3. Throw an error if consumed without a provider
        if (value === null) {
            throw new Error('useSafeContext must be used within a Provider');
        }

        return value;
    };

    // 4. Return the hook and the provider
    // We type-cast the Provider to avoid issues with the `null` default
    return [useSafeContext, context.Provider as Provider<T>] as const;
}
