import Head from 'next/head'
import { useRouter } from 'next/router'
import HomePage from './HomePage'
import SignIn from './SignIn';

export default function Home() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <Head>
        <title>E - Ticket | Admin</title>
        <meta name="description" content="Admin panel for Surat sitilink e-ticket" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon-dark.png" />
      </Head>
      <SignIn />

      {router.pathname === '/HomePage' && <HomePage />}
    </>
  )
}
