type CommonObjectProp = 'config'
    | 'options'
    | 'settings'
    | 'data'
    | 'info'
    | 'meta'
    | 'context'
    | 'state'
    | 'status';

type HasObjectPrefix = `${string}${Capitalize<CommonObjectProp>}`;

export type IsObject = HasObjectPrefix | CommonObjectProp;
