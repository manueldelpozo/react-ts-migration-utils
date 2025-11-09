type CommonStringProp = 'id'
    | 'ID'
    | 'key'
    | 'name'
    | 'title'
    | 'label'
    | 'text'
    | 'message'
    | 'url'
    | 'URL'
    | 'href'
    | 'path'
    | 'type'
    | 'class'
    | 'className'
    | 'src'
    | 'alt'
    | 'placeholder'
    | 'content'
    | 'description'
    | 'color'
    | 'mode'
    | 'theme';

type HasStringSuffix = `${string}${Capitalize<CommonStringProp>}`;

export type IsString = HasStringSuffix | CommonStringProp;
