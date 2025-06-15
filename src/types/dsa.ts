
export interface Problem {
  id: string;
  name: string;
  topic: string;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  notes: string;
  completedDate: string | null;
  starred: boolean;
}

export interface TopicStat {
  topic: string;
  total: number;
  completed: number;
  percentage: number;
}

export interface DifficultyStat {
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  total: number;
  completed: number;
  percentage: number;
}
