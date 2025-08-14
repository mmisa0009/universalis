import './global.css';
import {Inter, Be_Vietnam_Pro, Playfair_Display, Roboto} from 'next/font/google';

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});
const beVietnamPro = Be_Vietnam_Pro({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
});
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
});
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'UCMSA Universalis',
  description: 'University College Maastricht Study Association',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${beVietnamPro.variable} ${playfairDisplay.variable} ${roboto.variable}`}>
      <head>
        {/*  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />*/}
      </head>
      <body className='bg-[#001C3D] text-[#FFF8F0]'>
        {children}
      </body>
    </html>
  );
}