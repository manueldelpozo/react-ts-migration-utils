import PropTypes from 'prop-types';
import { TypeFromPropTypes } from 'react-ts-migration-utils';

// --- TypeFromPropTypes demo ---
const legacyPropTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    email: PropTypes.string,
};

type LegacyProps = TypeFromPropTypes<typeof legacyPropTypes>;

export function LegacyComponent(props: LegacyProps) {
    return (
        <div style={{ padding: 8, border: '1px solid #ddd', borderRadius: 8 }}>
            <strong>Legacy Props:</strong>
            <div>Name: {props.name}</div>
            <div>Age: {props.age ?? '—'}</div>
            <div>Email: {props.email ?? '—'}</div>
        </div>
    );
}
