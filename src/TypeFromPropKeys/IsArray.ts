type CommonArrayProp = 'list'
    | 'items'
    | 'array'
    | 'collection'
    | 'values'
    | 'keys'
    | 'entries';

type HasArraySufix = `${string}${Capitalize<CommonArrayProp>}`;

export type IsArray = HasArraySufix | CommonArrayProp;
