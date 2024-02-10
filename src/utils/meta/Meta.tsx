import { ISeo } from '@/utils/meta/meta.interface';
import { FC } from 'react';

import Head from 'next/head';

// import logoImage from '@/assets/images/favicon.svg';
import { onlyText } from '@/utils/string/clearText';
import { siteName, titleMerge } from '@/shared/config/seo/seo.config';
import { usePathname } from 'next/navigation';

const Meta: FC<ISeo> = ({ title, description, image, children }) => {
  const currentUrl = usePathname();

  return (
    <>
      <Head>
        <title itemProp='headLine'>{titleMerge(title)}</title>
        {description ? (
          <>
            <meta itemProp='description' name='description' content={onlyText(description, 152)} />
            <link rel='canonical' href={currentUrl} />
            <meta property='og:locale' content='en' />
            <meta property='og:title' content={titleMerge(title)} />
            <meta property='og:url' content={currentUrl} />
            <meta property='og:image' content={image || 'logoImage'} />
            <meta property='og:site_name' content={siteName} />
            <meta property='og:description' content={onlyText(description, 197)} />
          </>
        ) : (
          <meta name='robots' content='noindex, nofollow' />
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
