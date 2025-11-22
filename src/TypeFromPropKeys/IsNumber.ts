type CommonNumberProp = 'count'
    | 'size'
    | 'width'
    | 'height'
    | 'index'
    | 'length'
    | 'page'
    | 'limit'
    | 'offset'
    | 'duration'
    | 'timeout'
    | 'delay'
    | 'amount'
    | 'price'
    | 'value'
    | 'number'
    | 'quantity'
    | 'total'
    | 'max'
    | 'min';

type HasNumberSuffix = `${string}${Capitalize<CommonNumberProp>}`;

export type IsNumber = HasNumberSuffix | CommonNumberProp;
