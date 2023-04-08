import Head from 'next/head';
import { useRouter } from 'next/router';
import HomePage from './HomePage';
import SignIn from './SignIn';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>E - Ticket | Admin</title>
        <meta name="description" content="Admin panel for Surat sitilink e-ticket" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg" href="/svg/logo-black.svg" />
      </Head>
      <SignIn />

      {router.pathname === '/HomePage' && <HomePage />}
    </>
  );
}
