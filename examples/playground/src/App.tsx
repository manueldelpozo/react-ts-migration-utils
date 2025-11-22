import { SmartComponent } from './SmartComponent';
import { LegacyComponent } from './LegacyComponent';

export function App() {
    return (
        <div style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', padding: 16, display: 'grid', gap: 16 }}>
            <h1>react-ts-migration-utils playground</h1>

            <section>
                <h2>TypeFromPropTypes</h2>
                <LegacyComponent name="Ada Lovelace" age={28} />
            </section>

            <section>
                <h2>TypeFromProps</h2>
                <SmartComponent
                    isVisible
                    itemCount={3}
                    userName="Grace"
                    onClick={() => console.log('clicked')}
                    createdAt={new Date()}
                    config={{}}
                >
                    Hello from children
                </SmartComponent>
            </section>
        </div>
    );
}
