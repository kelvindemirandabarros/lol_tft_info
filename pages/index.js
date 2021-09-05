import Head from 'next/head';
import Link from 'next/link';

import mongo_client from '../lib/mongodb';

const mongodb_db = process.env.MONGODB_DB;

export default function Home({ champions }) {

  // Cor para texto: #0070F3

  return (
    <div className="container">
      <Head>
        <title>LoL TFT Info</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <div className='title_div'>
          <h1 className="title">Welcome to TeamFight Tactics Info</h1>

          <img src='favicon.png' height='50px'></img>
        </div>

        {/* { () ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )} */}

        {/* <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p> */}

        <div className="grid">
          {
            champions.map( champ => {
              const champ_nick = champ.name
                .replace( /\&[ \w]+/g, '' )
                .toLowerCase()
                .replace( /[ .']/g, '' );
              const icon_path = `/champ_icons/${ champ_nick }.png`;

              return (
                <Link href={ `/champion/${ champ_nick }` } key={ champ.nick }>
                  <a className="card" key={ champ.nick }>
                    <img
                      alt={ `${ champ.name } (TFT)` }
                      src={ icon_path }
                      height='90px'
                      width='90px'
                    ></img>

                    <span>{ champ.name }</span>
                  </a>
                </Link>
              );
            })
          }
        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(to bottom right, #0B2D36, #004455);
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title_div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        
        .title_div img {
          margin: 25px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          color: white;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat( 6, 1fr );
          gap: 2px;

          max-width: 800px;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: white;
          margin: .2rem;
          padding: .5rem;
          text-decoration: none;

          
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps ( context ) {
  const client = await mongo_client;
  const db = client.db( mongodb_db );
  const champions_collection = db.collection( 'champions' );
  const champs = await champions_collection.find( {}, { projection: { _id: 0, nick: 0 } } ).toArray();
  const champions = JSON.parse( JSON.stringify( champs ) );

  return {
    props: { champions },
  }
}
