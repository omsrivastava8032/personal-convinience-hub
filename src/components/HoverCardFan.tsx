
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Calendar, ListTodo, BarChart3, GraduationCap } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  description: string;
  gradient: string;
}

const cards: CardData[] = [
  {
    id: 'github',
    title: 'GitHub',
    icon: Github,
    href: 'https://github.com/omsri8032',
    description: 'View code & contributions',
    gradient: 'from-gray-700 to-gray-900'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: Calendar,
    href: '/calendar',
    description: 'Manage schedule',
    gradient: 'from-blue-600 to-blue-800'
  },
  {
    id: 'tasks',
    title: 'Tasks',
    icon: ListTodo,
    href: '#',
    description: 'Track progress',
    gradient: 'from-green-600 to-green-800'
  },
  {
    id: 'snapshot',
    title: 'Today\'s Snapshot',
    icon: BarChart3,
    href: '#',
    description: 'Daily overview',
    gradient: 'from-purple-600 to-purple-800'
  }
];

const centerCard = {
  id: 'vtop',
  title: 'VTOP',
  icon: GraduationCap,
  href: 'https://vtop.vit.ac.in/vtop/login',
  description: 'VIT Student Portal',
  gradient: 'from-orange-500 to-red-600'
};

const HoverCardFan: React.FC = () => {
  const getCardPosition = (index: number) => {
    const positions = [
      { x: -180, y: -120 }, // top-left
      { x: 180, y: -120 },  // top-right
      { x: -180, y: 120 },  // bottom-left
      { x: 180, y: 120 }    // bottom-right
    ];
    return positions[index];
  };

  const CardComponent = ({ card, position, isCenter = false }: { 
    card: CardData | typeof centerCard; 
    position?: { x: number; y: number }; 
    isCenter?: boolean;
  }) => {
    const Icon = card.icon;
    const isExternal = card.href.startsWith('http');

    const cardContent = (
      <motion.div
        initial={isCenter ? {} : { x: 0, y: 0, scale: 0.8, opacity: 0.6 }}
        whileHover={isCenter ? {} : { scale: 1.05 }}
        animate={position ? { 
          x: position.x, 
          y: position.y, 
          scale: 1, 
          opacity: 1 
        } : { 
          x: 0, 
          y: 0, 
          scale: isCenter ? 1 : 0.8, 
          opacity: isCenter ? 1 : 0.6 
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8
        }}
        className={`
          absolute w-64 h-40 rounded-2xl backdrop-blur-lg border border-white/20 p-6 cursor-pointer
          shadow-2xl hover:shadow-3xl transition-all duration-300
          bg-gradient-to-br ${card.gradient} bg-opacity-80
          ${isCenter ? 'z-20 scale-110' : 'z-10'}
        `}
      >
        <div className="flex flex-col h-full justify-between text-white">
          <div className="flex items-center justify-between mb-4">
            <Icon className="h-8 w-8 text-white/90" />
            <div className="w-3 h-3 rounded-full bg-white/30" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-white/80 text-sm">{card.description}</p>
          </div>
        </div>
      </motion.div>
    );

    if (isExternal) {
      return (
        <a href={card.href} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      );
    }

    return (
      <a href={card.href}>
        {cardContent}
      </a>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[600px] relative">
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl" />
      
      {/* Container for all cards */}
      <motion.div 
        className="relative w-80 h-80 group"
        initial={false}
      >
        {/* Center card - always visible */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CardComponent card={centerCard} isCenter={true} />
        </div>

        {/* Surrounding cards - animate on group hover */}
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:pointer-events-auto pointer-events-none"
          >
            <motion.div
              initial={{ x: 0, y: 0, scale: 0.8, opacity: 0.6 }}
              animate={{
                x: 0,
                y: 0,
                scale: 0.8,
                opacity: 0.6
              }}
              whileHover={{
                scale: 1.05,
                zIndex: 25
              }}
              variants={{
                hover: {
                  x: getCardPosition(index).x,
                  y: getCardPosition(index).y,
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8
                  }
                },
                initial: {
                  x: 0,
                  y: 0,
                  scale: 0.8,
                  opacity: 0.6,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.8
                  }
                }
              }}
              className="group-hover:animate-none"
              style={{
                position: 'absolute',
                willChange: 'transform, opacity'
              }}
            >
              <CardComponent card={card} />
            </motion.div>
          </motion.div>
        ))}

        {/* Invisible hover area to maintain hover state */}
        <div className="absolute inset-0 transform scale-150 group-hover:scale-[2.5] transition-transform duration-300" />
      </motion.div>
    </div>
  );
};

export default HoverCardFan;
