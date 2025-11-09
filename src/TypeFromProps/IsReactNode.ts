type CommonReactNodeProp = 'icon'
    | 'header'
    | 'footer'
    | 'content'
    | 'render'
    | 'component'
    | 'element'
    | 'overlay'
    | 'trigger'
    | 'tooltip'
    | 'badge'
    | 'avatar'
    | 'image'
    | 'logo';

export type IsReactNode = 'children' | Capitalize<CommonReactNodeProp> | CommonReactNodeProp;

