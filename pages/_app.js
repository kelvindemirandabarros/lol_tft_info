import '../styles/global.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
