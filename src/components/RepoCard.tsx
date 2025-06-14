
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Github } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RepoCardProps {
  name: string;
  description: string;
  stars: number;
  lastCommit: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string | null;
}

const RepoCard: React.FC<RepoCardProps> = ({ name, description, stars, lastCommit, tech, repoUrl, demoUrl }) => {
  const lastCommitDate = new Date(lastCommit);
  const timeAgo = formatDistanceToNow(lastCommitDate, { addSuffix: true });
  
  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{name}</CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="w-4 h-4 mr-1 text-yellow-400" /> {stars} stars
          <span className="mx-2">·</span>
          Updated {timeAgo}
        </div>
        <div className="flex flex-wrap gap-2">
          {tech.slice(0, 5).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 pt-4 border-t">
        <Button variant="outline" asChild size="sm">
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" /> View on GitHub
          </a>
        </Button>
        {demoUrl && (
          <Button variant="default" asChild size="sm">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RepoCard;
