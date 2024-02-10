import { FC, ReactNode } from 'react';

import { AuthProvider } from '@/providers/AuthProvider/ui/AuthProvider';

interface IMainProviderProps {
  children: ReactNode;
}

const MainProvider: FC<IMainProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default MainProvider;
