type CommonDateProp = 'date'
    | 'time'
    | 'timestamp'
    | 'startDate'
    | 'endDate'
    | 'startTime'
    | 'endTime'
    | 'birthday'
    | 'birthDate'
    | 'dueDate'
    | 'releaseDate';

type DateSuffix = 'date' | 'time' | 'timestamp';

type HasDateSuffix = `${string}${Capitalize<DateSuffix>}`;

type DatePrefix = 'created'
    | 'updated'
    | 'deleted'
    | 'published'
    | 'expires';

type HasAtSuffix = `${DatePrefix}At`;

export type IsDate = HasDateSuffix | HasAtSuffix | CommonDateProp;
