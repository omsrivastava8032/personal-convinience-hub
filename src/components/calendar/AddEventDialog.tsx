
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCreateGoogleCalendarEvent } from '@/hooks/useCreateGoogleCalendarEvent';
import { CalendarPlus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { CreateEventInput } from '@/services/googleCalendarService';

const eventSchema: z.ZodType<CreateEventInput> = z.object({
    summary: z.string().min(1, 'Summary is required.'),
    description: z.string().optional(),
    startDateTime: z.string().min(1, 'Start date and time are required.'),
    endDateTime: z.string().min(1, 'End date and time are required.'),
}).refine(data => {
    if(!data.startDateTime || !data.endDateTime) return true;
    return new Date(data.startDateTime) < new Date(data.endDateTime);
}, {
    message: 'End date must be after start date',
    path: ['endDateTime'],
});

export const AddEventDialog = ({ selectedDay }: { selectedDay?: Date }) => {
    const [open, setOpen] = React.useState(false);

    const { mutate, isPending } = useCreateGoogleCalendarEvent({
        onSuccess: () => {
            setOpen(false);
            form.reset();
        },
    });
    
    const getDefaultDateTime = (date: Date | undefined, hour: number) => {
        if (!date) return '';
        const d = new Date(date);
        d.setHours(hour, 0, 0, 0);
        return format(d, "yyyy-MM-dd'T'HH:mm");
    }

    const form = useForm<CreateEventInput>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            summary: '',
            description: '',
            startDateTime: getDefaultDateTime(selectedDay, 9),
            endDateTime: getDefaultDateTime(selectedDay, 10),
        }
    });

    React.useEffect(() => {
        if (selectedDay) {
            form.reset({
                summary: '',
                description: '',
                startDateTime: getDefaultDateTime(selectedDay, 9),
                endDateTime: getDefaultDateTime(selectedDay, 10),
            });
        }
    }, [selectedDay, form]);
    
    function onSubmit(values: CreateEventInput) {
        mutate(values);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <CalendarPlus className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new event to your Google Calendar.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Summary</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Team meeting" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Discuss quarterly results" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="startDateTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date and Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="endDateTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date and Time</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isPending ? 'Saving...' : 'Save Event'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
