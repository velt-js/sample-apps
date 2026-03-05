import { TableData } from './types';

// Seeded random number generator for consistent SSR/client hydration
const seededRandom = (seed: number) => {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
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

    data.push({
      id: i,
      date: `${day} ${month} ${year}`,
      x: `$${Math.floor(random() * 500) + 300}`,
      linkedin: `$${Math.floor(random() * 600) + 400}`,
      facebook: `$${Math.floor(random() * 500) + 400}`,
      instagram: `$${Math.floor(random() * 600) + 400}`,
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
