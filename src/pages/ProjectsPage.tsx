
import React from 'react';
import RepoCard from '@/components/RepoCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the shape of a GitHub repository object
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics: string[];
  language: string | null;
  html_url: string;
  homepage: string | null;
}

const fetchRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch('https://api.github.com/users/omsri8032/repos?sort=pushed&per_page=12');
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch GitHub repositories');
  }
  return response.json();
};

const ProjectsPage: React.FC = () => {
  const { data: repos, isLoading, error } = useQuery<GitHubRepo[], Error>({
    queryKey: ['githubRepos-omsri8032'],
    queryFn: fetchRepos,
  });

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">My Projects & Code</h1>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of my public repositories from GitHub.</p>
      </header>

      {/* TODO: Add filters for technology */}
      
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {error && (
         <Alert variant="destructive">
           <AlertTitle>Error Fetching Projects</AlertTitle>
           <AlertDescription>
             Could not fetch repositories from GitHub. Please try again later.
             <p className="text-xs mt-2 font-mono">{error.message}</p>
           </AlertDescription>
         </Alert>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos?.map(repo => (
          <RepoCard 
            key={repo.id}
            name={repo.name}
            description={repo.description || 'No description available.'}
            stars={repo.stargazers_count}
            lastCommit={repo.pushed_at}
            tech={[...repo.topics, repo.language].filter(Boolean) as string[]}
            repoUrl={repo.html_url}
            demoUrl={repo.homepage}
          />
        ))}
      </section>
      
      {repos && repos.length > 0 && (
         <p className="text-center text-muted-foreground italic">
           Showing the 12 most recently updated projects.
         </p>
      )}
    </div>
  );
};

export default ProjectsPage;
