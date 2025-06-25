import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Code2, 
  Database, 
  Globe, 
  Target, 
  Clock, 
  CheckCircle2, 
  Circle,
  TrendingUp,
  BookOpen,
  Brain,
  Zap,
  RotateCcw
} from 'lucide-react';

interface ProgressState {
  [key: string]: boolean;
}

const StudyRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState('phase1');
  const [progress, setProgress] = useState<ProgressState>({});

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadmap-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('roadmap-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleProgress = (key: string) => {
    setProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      setProgress({});
      localStorage.removeItem('roadmap-progress');
    }
  };

  const calculatePhaseProgress = (phaseId: string) => {
    const phaseKeys = Object.keys(progress).filter(key => key.startsWith(phaseId));
    if (phaseKeys.length === 0) return 0;
    const completed = phaseKeys.filter(key => progress[key]).length;
    return Math.round((completed / phaseKeys.length) * 100);
  };

  const phases = [
    {
      id: 'phase1',
      title: 'DSA + Dev + Aptitude Intensive',
      duration: 'July - September 2025',
      weeks: 12,
      focus: ['DSA Fundamentals', 'Web Development', 'Aptitude'],
      color: 'bg-red-500',
      priority: 'DSA: 60% | Web Dev: 30% | Aptitude: 10%'
    },
    {
      id: 'phase2', 
      title: 'DSA Mastery + Advanced Dev',
      duration: 'October - December 2025',
      weeks: 13,
      focus: ['DSA Advanced', 'Full-Stack Development', 'Interview Prep'],
      color: 'bg-orange-500',
      priority: 'DSA: 50% | Web Dev: 30% | Core: 20%'
    },
    {
      id: 'phase3',
      title: 'Core Subjects + System Design',
      duration: 'January - March 2026', 
      weeks: 12,
      focus: ['System Design', 'Core CS Subjects', 'Interview Ready'],
      color: 'bg-green-500',
      priority: 'Core: 40% | System Design: 30% | Projects: 30%'
    }
  ];

  const monthlyBreakdown = [
    {
      month: 'July 2025',
      phase: 1,
      weeks: [
        {
          title: 'DSA Fundamentals (INTENSIVE)',
          topics: ['Arrays, Strings, Basic Math', 'Time/Space Complexity', 'Two Pointers, Sliding Window'],
          problems: '4-5 problems daily',
          webDev: 'HTML5, CSS3 fundamentals',
          aptitude: 'Basic quantitative (Numbers, Percentages)'
        },
        {
          title: 'DSA Data Structures',
          topics: ['Linked Lists (all variations)', 'Stacks, Queues, Deques', 'Hash Tables, Hash Maps'],
          problems: '5-6 problems daily',
          webDev: 'JavaScript ES6+, DOM manipulation',
          aptitude: 'Profit/Loss, Simple Interest'
        }
      ]
    },
    {
      month: 'August 2025',
      phase: 1,
      weeks: [
        {
          title: 'DSA Trees (INTENSIVE)',
          topics: ['Binary Trees, BST', 'Tree traversals, construction'],
          problems: '6-7 problems daily',
          webDev: 'Advanced JavaScript, Async programming',
          aptitude: 'Time & Work, Speed & Distance'
        },
        {
          title: 'Advanced Trees + Recursion',
          topics: ['AVL Trees, Segment Trees', 'Recursion, Backtracking'],
          problems: '6-7 problems daily',
          webDev: 'React.js fundamentals, Components',
          aptitude: 'Verbal reasoning, Grammar basics'
        }
      ]
    },
    {
      month: 'September 2025',
      phase: 1,
      weeks: [
        {
          title: 'Dynamic Programming (INTENSIVE)',
          topics: ['1D DP, 2D DP patterns', 'Knapsack problems, LIS, LCS'],
          problems: '7-8 problems daily',
          webDev: 'React Hooks, State management',
          aptitude: 'Reading comprehension, Verbal ability'
        },
        {
          title: 'Graphs Foundation',
          topics: ['Graph representation, BFS, DFS', 'Shortest path algorithms'],
          problems: '6-7 problems daily',
          webDev: 'React Router, Context API',
          aptitude: 'Non-verbal reasoning, Pattern recognition'
        }
      ]
    }
  ];

  const milestones = [
    {
      id: 'milestone-1',
      date: 'End of July 2025',
      achievements: ['100+ DSA problems solved', 'HTML/CSS/JavaScript fundamentals complete', 'Basic aptitude foundation'],
      status: 'upcoming'
    },
    {
      id: 'milestone-2',
      date: 'End of October 2025',
      achievements: ['400+ DSA problems solved', 'React + Node.js proficiency', 'Aptitude speed improved'],
      status: 'upcoming'
    },
    {
      id: 'milestone-3',
      date: 'End of December 2025',
      achievements: ['800+ DSA problems solved (COMPLETE)', 'Full-stack development skills', 'Interview ready'],
      status: 'upcoming',
      major: true
    },
    {
      id: 'milestone-4',
      date: 'March 2026',
      achievements: ['All subjects mastered', 'Strong portfolio', 'Placement ready'],
      status: 'upcoming',
      major: true
    }
  ];

  const overallProgress = () => {
    const totalItems = Object.keys(progress).length;
    if (totalItems === 0) return 0;
    const completedItems = Object.values(progress).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="space-y-8">
      {/* Progress Reset Button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={resetProgress} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset Progress
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-2xl font-bold">9 Months</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Code2 className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">DSA Target</p>
                <p className="text-2xl font-bold">800+</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-2xl font-bold">March 2026</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            3-Phase Journey Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const phaseProgress = calculatePhaseProgress(phase.id);
              return (
                <div key={phase.id} className="relative">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{phase.title}</h3>
                        <Badge variant="secondary">{phase.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{phase.priority}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {phase.focus.map((focus) => (
                          <Badge key={focus} variant="outline" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{phaseProgress}%</span>
                        </div>
                        <Progress value={phaseProgress} className="h-2" />
                      </div>
                    </div>
                  </div>
                  {index < phases.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Monthly Breakdown */}
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monthly">Monthly Breakdown</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          <TabsTrigger value="milestones">Key Milestones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="space-y-4">
          {monthlyBreakdown.map((month) => (
            <Card key={month.month}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {month.month}
                  </span>
                  <Badge className={phases[month.phase - 1]?.color}>
                    Phase {month.phase}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {month.weeks.map((week, index) => {
                    const weekId = `${month.month.replace(' ', '_').toLowerCase()}_week_${index + 1}`;
                    return (
                      <Card key={index} className="border-l-4 border-primary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-primary">Week {index + 1}: {week.title}</h4>
                            <Checkbox
                              checked={progress[weekId] || false}
                              onCheckedChange={() => toggleProgress(weekId)}
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Code2 className="h-4 w-4" />
                                DSA Topics:
                              </p>
                              <ul className="text-xs text-muted-foreground ml-5 list-disc">
                                {week.topics.map((topic, i) => (
                                  <li key={i}>{topic}</li>
                                ))}
                              </ul>
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {week.problems}
                              </Badge>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                Web Dev:
                              </p>
                              <p className="text-xs text-muted-foreground">{week.webDev}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium flex items-center gap-1">
                                <Brain className="h-4 w-4" />
                                Aptitude:
                              </p>
                              <p className="text-xs text-muted-foreground">{week.aptitude}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">July - December 2025</CardTitle>
                <p className="text-sm text-muted-foreground">DSA + Dev + Aptitude ONLY</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Weekdays (Mon-Fri)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-red-50 dark:bg-red-950 rounded">
                      <span>Morning (3.5h)</span>
                      <span className="font-medium">DSA (PRIORITY)</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <span>Afternoon (2h)</span>
                      <span className="font-medium">Web Development</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950 rounded">
                      <span>Evening (1h)</span>
                      <span className="font-medium">Aptitude</span>
                    </div>
                  </div>
                  <Badge className="mt-2">Total: 6.5 hours/day</Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Weekends</h4>
                  <div className="space-y-1 text-sm">
                    <p><strong>Saturday:</strong> DSA contests + Web projects</p>
                    <p><strong>Sunday:</strong> DSA revision + Aptitude tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">January - March 2026</CardTitle>
                <p className="text-sm text-muted-foreground">All Subjects Integration</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Weekdays (Mon-Fri)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-purple-50 dark:bg-purple-950 rounded">
                      <span>Morning (2h)</span>
                      <span className="font-medium">Core Subjects</span>
                    </div>
                    <div className="flex justify-between p-2 bg-orange-50 dark:bg-orange-950 rounded">
                      <span>Afternoon (2h)</span>
                      <span className="font-medium">System Design</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
                      <span>Evening (1.5h)</span>
                      <span className="font-medium">Web Projects</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-950 rounded">
                      <span>Night (1h)</span>
                      <span className="font-medium">DSA + Aptitude</span>
                    </div>
                  </div>
                  <Badge className="mt-2">Total: 6.5 hours/day</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="milestones" className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={milestone.id} className={milestone.major ? 'border-primary border-2' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.major ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {progress[milestone.id] ? 
                        <CheckCircle2 className="h-5 w-5" /> : 
                        <Circle className="h-5 w-5" />
                      }
                    </div>
                    <Checkbox
                      checked={progress[milestone.id] || false}
                      onCheckedChange={() => toggleProgress(milestone.id)}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${milestone.major ? 'text-primary' : ''}`}>
                        {milestone.date}
                      </h3>
                      {milestone.major && (
                        <Badge variant="default">MAJOR MILESTONE</Badge>
                      )}
                    </div>
                    <ul className="space-y-1">
                      {milestone.achievements.map((achievement, i) => {
                        const achievementId = `${milestone.id}_achievement_${i}`;
                        return (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <Checkbox
                              checked={progress[achievementId] || false}
                              onCheckedChange={() => toggleProgress(achievementId)}
                              className="h-3 w-3"
                            />
                            <span className={progress[achievementId] ? 'line-through' : ''}>{achievement}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Success Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Success Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">July - December 2025 (Focus Phase)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>DSA First Rule:</strong> Solve when mind is freshest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Parallel Learning:</strong> Web dev + DSA integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Daily Aptitude:</strong> Never skip, minimum 30 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Weekend Intensity:</strong> DSA marathons</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-primary">January - March 2026 (Integration Phase)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>DSA Maintenance:</strong> 2-3 problems daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Subject Rotation:</strong> Avoid burnout</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Mock Interviews:</strong> Intensive practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Portfolio Polish:</strong> Demonstrate skills</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyRoadmap;
