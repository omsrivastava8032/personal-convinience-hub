
import React, { useEffect } from 'react';
import Auth from '@/components/Auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate('/learning');
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate('/learning');
            }
        });
        
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [navigate]);


    return (
        <div className="container mx-auto flex justify-center items-center h-full py-8">
            <Auth />
        </div>
    );
};

export default AuthPage;
