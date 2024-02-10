import { FC } from 'react';
import Link from 'next/link';
import { homeData } from '@/components/screens/home/Home.data';
import styles from './Home.module.scss';
import Meta from '@/utils/meta/Meta';

const Home: FC = () => {
  return (
    <Meta title='Authorization' description='Page for user registration or authorization'>
      <div className={styles.auth__buttons}>
        {homeData.map(item => (
          <Link className={styles.button} href={item.url} key={item.url}>
            {item.title}
          </Link>
        ))}
      </div>
    </Meta>
  );
};

export default Home;
