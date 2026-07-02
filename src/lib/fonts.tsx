import { Lora } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400'],
  variable: '--font-lora',
  display: 'swap',
});
