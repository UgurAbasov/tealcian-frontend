import { AuthContext } from '@/providers/AuthProvider/lib/AuthContext';
import { useContext } from 'react';

export const useAuth = useContext(AuthContext);
