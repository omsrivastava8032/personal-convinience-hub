
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface QuickLinkCardProps {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  index?: number;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ title, href, icon: Icon, description, index = 0 }) => {
  const isExternal = href.startsWith('http');

  const cardContent = (
    <Card className="h-full flex flex-col transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:shadow-primary/25 group cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="group-hover:text-foreground transition-colors duration-300">{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        Go to {title} <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Card>
  );

  if (isExternal) {
    return (
      <div 
        className="block rounded-lg transform transition-all duration-300"
        style={{
          transform: `translateY(${index * 20}px) rotate(${index * 2 - 3}deg)`,
          zIndex: 10 - index
        }}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      </div>
    );
  }
  
  return (
    <div 
      className="block rounded-lg transform transition-all duration-300"
      style={{
        transform: `translateY(${index * 20}px) rotate(${index * 2 - 3}deg)`,
        zIndex: 10 - index
      }}
    >
      <Link to={href}>
        {cardContent}
      </Link>
    </div>
  );
};

export default QuickLinkCard;
