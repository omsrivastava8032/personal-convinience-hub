
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    description: string;
    icon: string;
  } | null;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ isOpen, onClose, badge }) => {
  if (!badge) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-4xl animate-bounce">
            {badge.icon}
          </div>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Badge Earned!
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {badge.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {badge.description}
          </p>
          
          <div className="pt-4">
            <Button onClick={onClose} className="w-full">
              Awesome! 🎉
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeModal;
