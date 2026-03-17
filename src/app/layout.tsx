import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geovideography',
  description: 'The ultimate high-tech global atlas and flag intelligence system.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30">
        <div className="fixed inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] border-b border-slate-100/5 -z-10" />
        <div className="fixed inset-0 bg-gradient-to-t from-background via-transparent to-transparent -z-10" />
        {children}
      </body>
    </html>
  );
}
