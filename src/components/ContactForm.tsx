
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be at most 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // form.formState.isSubmitting is managed by react-hook-form, no need to set it manually
    console.log("Form submission started:", data);

    try {
      const { data: functionResponse, error: functionError } = await supabase.functions.invoke('send-contact-email', {
        body: data,
      });

      if (functionError) {
        console.error("Supabase function error:", functionError);
        toast({
          title: "Error Sending Message",
          description: `Failed to send message: ${functionError.message}. Please try again.`,
          variant: "destructive",
        });
      } else {
        console.log("Supabase function response:", functionResponse);
        toast({
          title: "Message Sent!",
          description: "Thank you for your message! I'll get back to you soon.",
          variant: "default",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error invoking Supabase function:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    // react-hook-form will automatically set isSubmitting to false after the async onSubmit handler completes or errors.
    // The form.trigger() call in the finally block is likely not needed for isSubmitting state,
    // but can be kept if other re-validation behavior is desired. For now, let's remove it to simplify.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;

