import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = dayjs(dateString);
  const now = dayjs();

  if (date.isAfter(now)) return 'In the future';

  return date.from(now, true); // Shorter form without "ago" or "in" prefix
}
