import { PipContainer } from 'react-ui-pip';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata = {
  title: 'React UI PiP Demo',
  description: 'Interactive demo of react-ui-pip library',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PipContainer />
        <Navigation />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
