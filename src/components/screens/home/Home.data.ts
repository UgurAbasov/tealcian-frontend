export interface IHomeData {
  url: string;
  title: string;
}

export const homeData: IHomeData[] = [
  {
    url: '/auth/sign',
    title: 'Sign Up',
  },
  {
    url: '/auth/login',
    title: 'Login',
  },
];
