
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const colorPalettes = [
  { primary: '25.9 95.5% 54.1%', foreground: '26 83.3% 14.1%' }, // Orange
  { primary: '221.2 83.2% 53.3%', foreground: '210 40% 98%' },   // Blue
  { primary: '142.1 76.2% 36.3%', foreground: '144.9 80.4% 10%' },  // Green
  { primary: '262.1 83.3% 57.8%', foreground: '263.4 70% 9.6%' }, // Violet
  { primary: '346.8 77.2% 49.8%', foreground: '355.7 100% 97.3%' }, // Rose
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const { primary, foreground } = colorPalettes[colorIndex];
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-foreground', foreground);
    root.style.setProperty('--ring', primary);
  }, [colorIndex]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % colorPalettes.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
