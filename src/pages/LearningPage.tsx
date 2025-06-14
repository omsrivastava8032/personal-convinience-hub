
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookCopy, Youtube } from 'lucide-react';

const LearningPage: React.FC = () => {
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
        <div className="bg-card p-6 rounded-lg shadow">
          <p className="text-muted-foreground">
            This section will embed Striver's DSA Sheet (PDF or Google Sheet). 
            For now, this is a placeholder. You can provide the link/file to embed.
          </p>
          {/* Placeholder for embed */}
          <div className="mt-4 h-64 bg-muted rounded flex items-center justify-center">
            <p className="text-muted-foreground italic">DSA Sheet embed area</p>
          </div>
        </div>
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
        <div className="bg-card p-6 rounded-lg shadow">
          <p className="text-muted-foreground">
            Searchable and taggable cheat sheets will be available here. (e.g., Linux commands, SQL queries, Git tips).
            This feature is planned for a future update.
          </p>
          {/* Placeholder for cheat sheets list */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Git Commands', 'SQL Cheatsheet', 'Linux Basics'].map(item => (
              <div key={item} className="p-4 bg-muted rounded text-center">
                <p className="font-medium">{item}</p>
                <p className="text-xs text-muted-foreground">(Coming Soon)</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Youtube className="mr-3 h-6 w-6 text-red-600" />
          Video Tutorials
        </h2>
        <div className="bg-card p-6 rounded-lg shadow">
          <p className="text-muted-foreground">
            Embedded video tutorials from my favorite YouTube playlists will be featured here.
          </p>
          {/* Placeholder for video embeds */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(item => (
              <div key={item} className="aspect-video bg-muted rounded flex items-center justify-center">
                <p className="text-muted-foreground italic">YouTube Video Embed {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPage;
