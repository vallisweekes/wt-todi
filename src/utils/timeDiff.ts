import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const timeDifference = (date: string): string => dayjs().to(dayjs(date));

export default timeDifference;
