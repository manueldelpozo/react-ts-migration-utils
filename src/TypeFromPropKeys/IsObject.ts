type CommonObjectProp = 'config'
    | 'options'
    | 'settings'
    | 'data'
    | 'info'
    | 'meta'
    | 'context'
    | 'state'
    | 'status';

type HasObjectSufix = `${string}${Capitalize<CommonObjectProp>}`;

export type IsObject = HasObjectSufix | CommonObjectProp;
