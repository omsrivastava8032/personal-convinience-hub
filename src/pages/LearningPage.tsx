
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookCopy, Youtube, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import DsaSheetTracker from '@/components/DsaSheetTracker';

const LearningPage: React.FC = () => {
  const cheatSheets = [
    { title: 'Git Commands', description: 'Essential Git commands for version control.', link: '#' },
    { title: 'SQL Cheatsheet', description: 'Quick reference for common SQL queries.', link: '#' },
    { title: 'Linux Basics', description: 'Fundamental Linux commands and concepts.', link: '#' },
    { title: 'React Hooks', description: 'Overview of commonly used React Hooks.', link: '#' },
  ];
  const videoTutorials = [
    { title: 'Data Structures & Algorithms Full Course', embedUrl: 'https://www.youtube.com/embed/RBSGKlAvoiM' }, // Example: freeCodeCamp DSA
    { title: 'React JS Full Course for Beginners', embedUrl: 'https://www.youtube.com/embed/bMknfKXIFA8' }, // Example: freeCodeCamp React
  ];

  return (
    <div className="space-y-12">
      <header className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-primary">Learning & Reference Library</h1>
        <p className="mt-2 text-lg text-muted-foreground">My collection of cheat sheets, notes, and useful resources.</p>
      </header>

      <section id="dsa">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookCopy className="mr-3 h-6 w-6 text-primary" />
          Striver’s A2Z DSA Sheet Tracker
        </h2>
        <DsaSheetTracker />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Search className="mr-3 h-6 w-6 text-primary" />
          Cheat Sheets & Notes
        </h2>
        <div className="flex gap-2 mb-4">
          <Input type="search" placeholder="Search cheat sheets (e.g., Git, SQL)..." className="flex-grow" />
          <Button variant="outline">Search</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cheatSheets.map((sheet, index) => (
            <div key={sheet.title} className="animate-fade-in" style={{ animationDelay: `${100 * index}ms`, animationFillMode: 'backwards' }}>
              <Card className="flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {sheet.title}
                    {sheet.link !== '#' && (
                      <a href={sheet.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </CardTitle>
                  <CardDescription>{sheet.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs text-muted-foreground">
                    {sheet.link === '#' ? '(Content coming soon)' : 'Click the link icon to view.'}
                  </p>
                  {/* You can add more detailed content or previews here later */}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
            Searchable and taggable cheat sheets feature is planned for a future update.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Youtube className="mr-3 h-6 w-6 text-red-600" />
          Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoTutorials.map((video, index) => (
            <div key={video.title} className="animate-fade-in" style={{ animationDelay: `${100 * index}ms`, animationFillMode: 'backwards' }}>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningPage;
