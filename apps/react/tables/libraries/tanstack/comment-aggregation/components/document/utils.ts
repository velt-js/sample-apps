import { TableData, ViewType, CommentContext } from './types';

// Seeded random number generator for consistent SSR/client hydration
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
};

// Get week number for a date based on day of year
// Week 1: Jan 1-7, Week 2: Jan 8-14, etc.
export const getWeekNumber = (date: Date): number => {
  // Get the day of year (1-365/366)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Calculate week number (1-indexed)
  return Math.ceil(dayOfYear / 7);
};

// Parse date string and return metadata
export const parseDateWithMetadata = (dateStr: string): TableData['dateMetadata'] => {
  const [day, month, year] = dateStr.split(' ');
  const monthMap: Record<string, number> = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };

  const date = new Date(parseInt(year), monthMap[month] - 1, parseInt(day));

  return {
    day: parseInt(day),
    month: monthMap[month],
    year: parseInt(year),
    week: getWeekNumber(date),
  };
};

// Generate 100 rows of data with deterministic values
export const generateTableData = (): TableData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data: TableData[] = [];
  const random = seededRandom(12345); // Fixed seed for consistency

  for (let i = 0; i < 100; i++) {
    const day = (i % 28) + 1;
    const month = months[Math.floor(i / 28) % 12];
    const year = 2025;
    const dateStr = `${day} ${month} ${year}`;

    data.push({
      id: i,
      date: dateStr,
      x: `$${Math.floor(random() * 500) + 300}`,
      linkedin: `$${Math.floor(random() * 600) + 400}`,
      facebook: `$${Math.floor(random() * 500) + 400}`,
      instagram: `$${Math.floor(random() * 600) + 400}`,
      dateMetadata: parseDateWithMetadata(dateStr),
    });
  }

  return data;
};

// Get cell formatting key
export const getCellFormattingKey = (rowId: number, field: string) => `${rowId}-${field}`;

// Date comparator function to properly sort dates
export const dateComparator = (valueA: string, valueB: string) => {
  // Parse date strings like "1 Apr 2025" into Date objects
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split(' ');
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day));
  };

  const dateA = parseDate(valueA);
  const dateB = parseDate(valueB);

  return dateA.getTime() - dateB.getTime();
};

// Helper function to sum channel spend
const sumChannelSpend = (rows: TableData[], channel: keyof TableData): string => {
  const sum = rows.reduce((acc, row) => {
    const value = row[channel];
    if (typeof value === 'string' && value.startsWith('$')) {
      return acc + parseInt(value.substring(1));
    }
    return acc;
  }, 0);
  return `$${sum}`;
};

// Aggregate data by week
export const aggregateDataByWeek = (data: TableData[]): TableData[] => {
  const weekMap = new Map<string, TableData[]>();

  data.forEach(row => {
    if (!row.dateMetadata) return;
    const key = `${row.dateMetadata.year}-W${row.dateMetadata.week}`;
    if (!weekMap.has(key)) {
      weekMap.set(key, []);
    }
    weekMap.get(key)!.push(row);
  });

  return Array.from(weekMap.entries()).map(([weekKey, rows], index) => {
    const firstRow = rows[0];
    const meta = firstRow.dateMetadata!;

    return {
      id: index,
      date: `Week ${meta.week}, ${meta.year}`,
      x: sumChannelSpend(rows, 'x'),
      linkedin: sumChannelSpend(rows, 'linkedin'),
      facebook: sumChannelSpend(rows, 'facebook'),
      instagram: sumChannelSpend(rows, 'instagram'),
      dateMetadata: {
        week: meta.week,
        month: meta.month,
        year: meta.year,
        day: 0, // No specific day for weekly view
      },
    };
  });
};

// Aggregate data by month
export const aggregateDataByMonth = (data: TableData[]): TableData[] => {
  const monthMap = new Map<string, TableData[]>();

  data.forEach(row => {
    if (!row.dateMetadata) return;
    const key = `${row.dateMetadata.year}-${row.dateMetadata.month}`;
    if (!monthMap.has(key)) {
      monthMap.set(key, []);
    }
    monthMap.get(key)!.push(row);
  });

  return Array.from(monthMap.entries()).map(([monthKey, rows], index) => {
    const firstRow = rows[0];
    const meta = firstRow.dateMetadata!;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

    return {
      id: index,
      date: `${monthNames[meta.month - 1]} ${meta.year}`,
      x: sumChannelSpend(rows, 'x'),
      linkedin: sumChannelSpend(rows, 'linkedin'),
      facebook: sumChannelSpend(rows, 'facebook'),
      instagram: sumChannelSpend(rows, 'instagram'),
      dateMetadata: {
        month: meta.month,
        year: meta.year,
        week: 0,
        day: 0,
      },
    };
  });
};

// Generate comment context based on view type
export const generateCommentContext = (
  rowData: TableData,
  channel: string,
  viewType: ViewType
): CommentContext => {
  const { dateMetadata } = rowData;
  if (!dateMetadata) return { channel, month: 1, year: 2025 };

  const baseContext: CommentContext = {
    channel,
    month: dateMetadata.month,
    year: dateMetadata.year,
  };

  switch (viewType) {
    case 'day':
      if (dateMetadata.day && dateMetadata.day > 0) {
        baseContext.day = dateMetadata.day;
      }
      if (dateMetadata.week && dateMetadata.week > 0) {
        baseContext.week = dateMetadata.week;
      }
      return baseContext;
    case 'week':
      if (dateMetadata.week && dateMetadata.week > 0) {
        baseContext.week = dateMetadata.week;
      }
      return baseContext;
    case 'month':
      return baseContext;
    default:
      return baseContext;
  }
};
