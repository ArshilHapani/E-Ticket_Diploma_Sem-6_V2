import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';
import { IconButton, Tooltip } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState<number>(0);

  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
    router.events.on('routeChangeStart', () => {
      setProgress(30);
    });
    if (sessionStorage.getItem('admin') === null || sessionStorage.getItem('admin') === undefined) {
      router.push('/');
    }
  }, []);
  return (
    <>
      <LoadingBar
        color='#198acc'
        style={{ height: '4px' }}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      {
        router.pathname !== "/" &&
        <Tooltip title="home" placement="left" arrow >
          <IconButton color='success' className="fixed bottom-3 right-3" onClick={() => router.push('/HomePage')} >
            <AiOutlineHome />
          </IconButton>
        </Tooltip>
      }
      <Component {...pageProps} />
    </>
  );
}
