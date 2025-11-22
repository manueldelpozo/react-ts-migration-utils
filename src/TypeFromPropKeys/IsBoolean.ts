type BoolPrefix = 'is'
    | 'has'
    | 'does'
    | 'are'
    | 'will'
    | 'can'
    | 'should'
    | 'did'
    | 'do'
    | 'show'
    | 'hide';

type HasBoolPrefix = `${BoolPrefix}${Capitalize<string>}`;

type IsCommonBoolProp = 'disabled'
    | 'checked'
    | 'required'
    | 'readonly'
    | 'readOnly'
    | 'selected'
    | 'open'
    | 'loading'
    | 'hidden'
    | 'focused'
    | 'focusedOn'
    | 'focusedWithin'
    | 'focusedVisible'
    | 'focusedInvisible'
    | 'focusedIn'
    | 'focusedOut';

export type IsBoolean = HasBoolPrefix | IsCommonBoolProp;
