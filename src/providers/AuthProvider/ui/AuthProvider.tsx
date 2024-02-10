import { AuthContext } from '@/providers/AuthProvider/lib/AuthContext';
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/localStorage/accessToken';
import { FC, ReactNode, useMemo, useState } from 'react';

interface IAuthProviderProps {
  children: ReactNode;
}

const initialState = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY());

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(!!initialState);

  const defaultProps = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth]
  );

  return <AuthContext.Provider value={defaultProps}>{children}</AuthContext.Provider>;
};
