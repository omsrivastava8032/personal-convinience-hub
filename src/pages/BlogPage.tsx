
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rss } from 'lucide-react';

const BlogPage: React.FC = () => {
  return (
    <div className="space-y-8 text-center">
      <header>
        <h1 className="text-4xl font-bold text-primary">My Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Thoughts, tutorials, and updates. Coming soon!</p>
      </header>

      <section className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-4">
          Subscribe to the newsletter to get the latest posts directly in your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button type="submit">Subscribe</Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">(Newsletter functionality is a placeholder.)</p>
      </section>
      
      <section>
         <Button variant="outline" asChild>
            <a href="/rss.xml" target="_blank"> {/* Placeholder RSS link */}
                <Rss className="mr-2 h-4 w-4" /> RSS Feed
            </a>
        </Button>
         <p className="text-xs text-muted-foreground mt-2">(RSS feed functionality is a placeholder.)</p>
      </section>

      <div className="py-16">
        <p className="text-2xl text-muted-foreground">Blog posts will appear here soon...</p>
      </div>
    </div>
  );
};

export default BlogPage;
