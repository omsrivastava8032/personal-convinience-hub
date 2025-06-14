
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Loader2, ExternalLink } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';

type Topic = {
    id: string;
    category: string;
    topic_name: string;
    problem_url: string | null;
    order: number;
};

type UserProgress = {
    id: string;
    user_id: string;
    topic_id: string;
    is_completed: boolean;
};

interface TopicWithCompletion extends Topic {
    is_completed: boolean;
}

const fetchDsaTopics = async (): Promise<Topic[]> => {
    const { data, error } = await supabase.from('dsa_topics').select('*').order('order', { ascending: true });
    if (error) throw new Error(error.message);
    return data;
};

const fetchUserProgress = async (userId: string): Promise<UserProgress[]> => {
    const { data, error } = await supabase.from('user_dsa_progress').select('*').eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
};

const DsaSheetTracker: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            // Invalidate progress query on auth change to refetch data
            if (_event === "SIGNED_IN" || _event === "SIGNED_OUT") {
                queryClient.invalidateQueries({ queryKey: ['user_dsa_progress'] });
            }
        });
        return () => subscription.unsubscribe();
    }, [queryClient]);

    const userId = session?.user?.id;

    const { data: topics, isLoading: isLoadingTopics } = useQuery({
        queryKey: ['dsa_topics'],
        queryFn: fetchDsaTopics,
    });

    const { data: userProgress, isLoading: isLoadingProgress } = useQuery({
        queryKey: ['user_dsa_progress', userId],
        queryFn: () => fetchUserProgress(userId!),
        enabled: !!userId,
    });

    const updateProgressMutation = useMutation({
        mutationFn: async ({ topicId, isCompleted }: { topicId: string, isCompleted: boolean }) => {
            if (!userId) throw new Error("User not logged in");
            const { error } = await supabase.from('user_dsa_progress').upsert({
                user_id: userId,
                topic_id: topicId,
                is_completed: isCompleted,
            }, { onConflict: 'user_id, topic_id' });
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_dsa_progress', userId] });
        },
    });

    if (!session) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Track Your DSA Progress</CardTitle>
                    <CardDescription>Log in or create an account to save and track your progress on the DSA sheet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link to="/auth">Login to Get Started</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }
    
    if (isLoadingTopics || (userId && isLoadingProgress)) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const progressMap = new Map(userProgress?.map(p => [p.topic_id, p.is_completed]));
    
    const allTopicsWithCompletion: TopicWithCompletion[] = topics?.map(topic => ({
        ...topic,
        is_completed: progressMap.get(topic.id) || false,
    })) || [];

    const completedCount = allTopicsWithCompletion.filter(t => t.is_completed).length;
    const totalCount = allTopicsWithCompletion.length;
    const overallProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    const filteredTopics = searchTerm
        ? allTopicsWithCompletion.filter(topic =>
            topic.topic_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allTopicsWithCompletion;
    
    const groupedTopics = filteredTopics.reduce((acc, topic) => {
        (acc[topic.category] = acc[topic.category] || []).push(topic);
        return acc;
    }, {} as Record<string, TopicWithCompletion[]>);

    const handleCheckboxChange = (topicId: string, checked: boolean) => {
        updateProgressMutation.mutate({ topicId, isCompleted: checked });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>
                        You've completed {completedCount} out of {totalCount} topics. Keep going!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={overallProgress} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2 text-right">
                        {Math.round(overallProgress)}% Complete
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Input
                    type="text"
                    placeholder="Search for a problem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
                <Accordion type="multiple" className="w-full space-y-4">
                    {Object.entries(groupedTopics).map(([category, topicsInCategory]) => {
                        const allTopicsInCategory = allTopicsWithCompletion.filter(t => t.category === category);
                        const categoryCompletedCount = allTopicsInCategory.filter(t => t.is_completed).length;
                        const categoryTotalCount = allTopicsInCategory.length;
                        const categoryProgress = categoryTotalCount > 0 ? (categoryCompletedCount / categoryTotalCount) * 100 : 0;

                        return (
                            <AccordionItem value={category} key={category} className="border-none">
                                 <Card>
                                    <AccordionTrigger className="p-6 hover:no-underline text-left">
                                        <div className="w-full">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold">{category}</h3>
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    {categoryCompletedCount} / {categoryTotalCount}
                                                </span>
                                            </div>
                                            <Progress value={categoryProgress} className="mt-2" />
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        <div className="space-y-2 pt-4 border-t">
                                            {topicsInCategory.map(topic => (
                                                <div key={topic.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
                                                    <div className="flex items-center gap-4">
                                                         <Checkbox
                                                            id={topic.id}
                                                            checked={topic.is_completed}
                                                            onCheckedChange={(checked) => handleCheckboxChange(topic.id, Boolean(checked))}
                                                            disabled={updateProgressMutation.isPending}
                                                        />
                                                        <Label htmlFor={topic.id} className="text-base font-normal cursor-pointer">{topic.topic_name}</Label>
                                                    </div>
                                                    {topic.problem_url && (
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <a href={topic.problem_url} target="_blank" rel="noopener noreferrer" aria-label={`Open problem for ${topic.topic_name}`}>
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
                {Object.keys(groupedTopics).length === 0 && searchTerm && (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            No problems found for "{searchTerm}".
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default DsaSheetTracker;
