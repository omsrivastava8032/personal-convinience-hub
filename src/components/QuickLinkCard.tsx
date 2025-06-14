
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface QuickLinkCardProps {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ title, href, icon: Icon, description }) => {
  const isExternal = href.startsWith('http');

  const cardContent = (
    <Card className="h-full flex flex-col hover:border-primary/80 hover:shadow-lg transition-all group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0 flex items-center text-sm text-primary font-medium group-hover:underline">
        Go to {title} <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Card>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block rounded-lg">
        {cardContent}
      </a>
    );
  }
  
  return (
    <Link to={href} className="block rounded-lg">
      {cardContent}
    </Link>
  );
};

export default QuickLinkCard;
