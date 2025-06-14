
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';

export default function AvatarUpdater() {
  const [session, setSession] = useState<Session | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        getProfile(session);
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
       if (session) {
        getProfile(session);
      } else {
        setAvatarUrl(null);
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  function getAvatarPublicUrl(path: string) {
    if (!path) return null;
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  }

  async function getProfile(currentSession: Session) {
    if (!currentSession?.user) throw new Error('No user on the session!')

    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', currentSession.user.id)
        .single();

      if (error && status !== 406) {
        // It's okay if no profile is found, just means no avatar is set.
        if (status !== 406) throw error;
      }

      if (data?.avatar_url) {
        setAvatarUrl(getAvatarPublicUrl(data.avatar_url));
      } else {
        setAvatarUrl(null);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Error loading user avatar: ' + error.message);
      }
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!session?.user) throw new Error('No user on the session!')

    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}/${new Date().getTime()}.${fileExt}`;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', session.user.id)
        .single();
      
      if (profileData?.avatar_url) {
        const { error: removeError } = await supabase.storage.from('avatars').remove([profileData.avatar_url]);
        if(removeError) console.warn("Could not remove old avatar", removeError.message);
      }

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', session.user.id);
      
      if (updateError) {
        await supabase.storage.from('avatars').remove([filePath]);
        throw updateError;
      }
      
      setAvatarUrl(getAvatarPublicUrl(filePath));
      toast.success('Profile picture updated!');

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative">
      <Label htmlFor="avatar-upload" className="cursor-pointer group">
        <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-primary/20">
          <AvatarImage src={avatarUrl || ''} alt={'User Avatar'} />
          <AvatarFallback>
            <UserCircle className="w-full h-full text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {uploading ? (
            <Loader2 className="animate-spin text-white h-8 w-8" />
          ) : (
            <Camera className="text-white h-8 w-8" />
          )}
        </div>
      </Label>
      <Input 
        id="avatar-upload" 
        type="file" 
        className="hidden" 
        onChange={uploadAvatar} 
        disabled={uploading} 
        accept="image/*"
      />
    </div>
  );
}
