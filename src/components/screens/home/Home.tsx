import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loader from '@/components/loader/Loader';
import { homeData } from '@/components/screens/home/Home.data';
import checkAuth, { ERROR_CODE } from '@/utils/checkAuth';
import styles from './Home.module.scss';

const Home: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await checkAuth();
      if (result === ERROR_CODE.FAILURE) {
        setLoading(false);
      } else {
        router.push('/chat');
      }
    }
    fetchData();
  }, [router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.auth__buttons}>
          {homeData.map(item => (
            <Link className={styles.button} href={item.url} key={item.url}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
