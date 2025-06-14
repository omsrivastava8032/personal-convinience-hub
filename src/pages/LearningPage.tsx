
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookCopy, Youtube, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const LearningPage: React.FC = () => {
  const dsaSheetEmbedUrl = "YOUR_DSA_SHEET_EMBED_URL_HERE"; // Replace with your actual Google Sheet or PDF embed URL
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
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">Learning & Reference Library</h1>
        <p className="mt-2 text-lg text-muted-foreground">My collection of cheat sheets, notes, and useful resources.</p>
      </header>

      <section id="dsa">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookCopy className="mr-3 h-6 w-6 text-primary" />
          Striver’s DSA Sheet
        </h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              This section is intended to embed Striver's DSA Sheet. Please replace
              <code>YOUR_DSA_SHEET_EMBED_URL_HERE</code> in the code with your actual embeddable link (e.g., a Google Sheet published to the web, or a direct PDF link if your hosting allows embedding).
            </p>
            {dsaSheetEmbedUrl === "YOUR_DSA_SHEET_EMBED_URL_HERE" ? (
              <div className="mt-4 h-96 bg-muted rounded flex items-center justify-center">
                <p className="text-muted-foreground italic text-center">
                  DSA Sheet embed area. <br />
                  Provide a URL to embed the content.
                </p>
              </div>
            ) : (
              <iframe
                src={dsaSheetEmbedUrl}
                title="Striver's DSA Sheet"
                className="w-full h-96 border-0 rounded"
                allowFullScreen
              ></iframe>
            )}
          </CardContent>
        </Card>
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
          {cheatSheets.map(sheet => (
            <Card key={sheet.title} className="flex flex-col">
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
          {videoTutorials.map(video => (
            <Card key={video.title}>
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningPage;

