type HandlerPrefix = 'on'
    | 'handle'
    | 'set'
    | 'get'
    | 'toggle'
    | 'reset'
    | 'clear'
    | 'update'
    | 'delete'
    | 'create'
    | 'save'
    | 'load'
    | 'fetch'
    | 'submit'
    | 'cancel'
    | 'close'
    | 'open';

type HasHandlerPrefix = `${HandlerPrefix}${Capitalize<string>}`;

type CommonHandlerProp = 'onClick'
    | 'onChange'
    | 'onSubmit'
    | 'onReset'
    | 'onClear'
    | 'onUpdate'
    | 'onDelete'
    | 'onCreate'
    | 'onSave'
    | 'onLoad'
    | 'onFetch'
    | 'onSubmit';

export type IsHandler = HasHandlerPrefix | CommonHandlerProp;
