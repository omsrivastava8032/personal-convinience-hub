
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
  return (
    <Link to={href} className="block hover:shadow-lg transition-shadow rounded-lg">
      <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Icon className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <div className="p-6 pt-0 flex items-center text-sm text-primary hover:underline">
          Go to {title} <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </Card>
    </Link>
  );
};

export default QuickLinkCard;
