import Head from 'next/head';

import '../styles/global.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>TFT Info</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />
      <Component { ...pageProps } />
    </div>
  );
}
