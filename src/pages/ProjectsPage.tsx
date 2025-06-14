
import React from 'react';
import RepoCard from '@/components/RepoCard';

const placeholderRepos = [
  { name: 'Awesome Project X', description: 'A revolutionary app that changes the world. Built with React and Tailwind CSS.', stars: 120, lastCommit: '2 days ago', tech: ['React', 'Web'], demoUrl: '#' },
  { name: 'Data Analyzer Pro', description: 'Python tool for advanced data analysis and visualization. Uses Pandas and Matplotlib.', stars: 75, lastCommit: '5 days ago', tech: ['Python', 'ML'], demoUrl: null },
  { name: 'Java Spring Boot API', description: 'Robust backend API for enterprise applications. Secure and scalable.', stars: 200, lastCommit: '1 week ago', tech: ['Java'], demoUrl: null },
];

const ProjectsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">My Projects & Code</h1>
        <p className="mt-2 text-lg text-muted-foreground">A showcase of my public repositories and personal projects.</p>
      </header>

      {/* TODO: Add filters for technology */}
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderRepos.map(repo => (
          <RepoCard 
            key={repo.name}
            name={repo.name}
            description={repo.description}
            stars={repo.stars}
            lastCommit={repo.lastCommit}
            tech={repo.tech}
            repoUrl="#" // Placeholder link to GitHub repo
            demoUrl={repo.demoUrl}
          />
        ))}
      </section>
      <p className="text-center text-muted-foreground italic">
        More projects coming soon! Live GitHub API integration planned.
      </p>
    </div>
  );
};

export default ProjectsPage;
