
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Download, UploadCloud, FileText } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type Resume = {
  id: string;
  file_name: string;
  description: string | null;
  created_at: string;
  storage_path: string;
};

const ResumeVault: React.FC = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const { data: resumes, isLoading, error } = useQuery<Resume[]>({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, description }: { file: File, description: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated.");

      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from('resumes').insert({
        user_id: user.id,
        file_name: file.name,
        storage_path: filePath,
        description,
      });

      if (dbError) {
        await supabase.storage.from('resumes').remove([filePath]);
        throw dbError;
      }
    },
    onSuccess: () => {
      toast.success('Resume uploaded successfully!');
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      setFile(null);
      setDescription('');
      if (document.getElementById('resume-file')) {
        (document.getElementById('resume-file') as HTMLInputElement).value = '';
      }
    },
    onError: (err: any) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (resume: Resume) => {
      const { error: storageError } = await supabase.storage
        .from('resumes')
        .remove([resume.storage_path]);
      
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resume.id);

      if (dbError) throw dbError;
    },
    onSuccess: (_, deletedResume) => {
      toast.success(`"${deletedResume.file_name}" deleted.`);
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (err: any) => {
      toast.error(`Deletion failed: ${err.message}`);
    },
  });
  
  const handleDownload = async (resume: Resume) => {
    try {
      toast.info(`Preparing download for "${resume.file_name}"...`);
      const { data, error } = await supabase.storage
        .from('resumes')
        .createSignedUrl(resume.storage_path, 60);

      if (error) throw error;
      window.open(data.signedUrl, '_blank');
    } catch (err: any) {
      toast.error(`Download failed: ${err.message}`);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.warning('Please select a file to upload.');
      return;
    }
    uploadMutation.mutate({ file, description });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Resume</CardTitle>
          <CardDescription>Upload a new PDF resume. Max file size: 5MB.</CardDescription>
        </CardHeader>
        <form onSubmit={handleUpload}>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="resume-file">Resume File (PDF only)</Label>
              <Input
                id="resume-file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                disabled={uploadMutation.isPending}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                type="text"
                placeholder="e.g., Tailored for frontend roles"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploadMutation.isPending}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={uploadMutation.isPending}>
              {uploadMutation.isPending ? 'Uploading...' : 'Upload Resume'}
              <UploadCloud className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Resumes</CardTitle>
          <CardDescription>All your uploaded resumes are listed here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                 <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Skeleton className="h-8 w-8" />
                       <Skeleton className="h-8 w-8" />
                    </div>
                 </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-4">You need to be logged in to see your resumes.</p>
          ) : resumes && resumes.length > 0 ? (
            <ul className="space-y-3">
              {resumes.map((resume) => (
                <li key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold truncate" title={resume.file_name}>{resume.file_name}</p>
                      <p className="text-sm text-muted-foreground truncate" title={resume.description || `Uploaded on ${new Date(resume.created_at).toLocaleDateString()}`}>
                        {resume.description || `Uploaded on ${new Date(resume.created_at).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(resume)}>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(resume)} disabled={deleteMutation.isPending && deleteMutation.variables?.id === resume.id}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-4">You haven't uploaded any resumes yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeVault;
