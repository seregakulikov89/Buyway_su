import './globals.css';

export const metadata = {
  title: 'Buy way',
  description: 'Buy Way RU/KZ landing page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
