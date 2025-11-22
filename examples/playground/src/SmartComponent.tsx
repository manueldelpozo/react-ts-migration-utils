import type { PropsWithChildren } from 'react';
import { TypeFromPropKeys } from 'react-ts-migration-utils';

interface SmartComponentPropsAny {
    isVisible: unknown,
    itemCount: unknown,
    userName: unknown,
    onClick: unknown,
    headerIcon?: unknown,
    createdAt: unknown,
    config: unknown,
};

type SmartComponentProps = PropsWithChildren<TypeFromPropKeys<SmartComponentPropsAny>>;

export function SmartComponent({
    isVisible,
    itemCount,
    userName,
    onClick,
    children,
    headerIcon,
    createdAt,
}: SmartComponentProps) {
    if (!isVisible) return null;
    return (
        <div style={{ padding: 8, border: '1px solid #ddd', borderRadius: 8 }} onClick={onClick}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>{headerIcon}</span>
                <span>{children}</span>
            </div>
            <div>{userName} has {itemCount} items</div>
            {createdAt && <div>Created: {String(createdAt)}</div>}
        </div>
    );
}
