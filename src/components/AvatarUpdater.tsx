
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';

export default function AvatarUpdater() {
  const { session, avatarUrl, updateProfileAvatarInContext } = useAuth();
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    if (!session?.user) throw new Error('No user on the session!')

    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Enhanced File Validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxFileSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
        return;
      }

      if (file.size > maxFileSize) {
        toast.error('File is too large. Maximum size is 5MB.');
        return;
      }
      
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
      
      updateProfileAvatarInContext(filePath);
      toast.success('Profile picture updated!');

    } catch (error) {
      console.error("Avatar upload error:", error);
      // Sanitize error message
      toast.error("Failed to update profile picture. Please try again.");
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
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
}
