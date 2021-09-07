import Head from 'next/head';

import mongo_client from '../lib/mongodb';

const mongodb_db = process.env.MONGODB_DB;

export default function Home({ champions }) {

  // Cor para texto: #0070F3

  return (
    <div className="container">
      <Head>
        <title>TFT Info</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='main'>
        <div className='title_div'>
          <h1 className="title">Welcome to TeamFight Tactics Info</h1>


          <img src='favicon.png' height='50px'></img>

          {/* <span className="title">Welcome to</span>
          <span className="title">TeamFight Tactics Info</span> */}
        </div>

        <h2 className='subtitle'>
          About the API,&nbsp;
          <a
            href=''
            style={{
              color: '#00ccff',
              textDecoration: 'underline'
            }}
          >click here</a>
        </h2>

        <div className="grid">
          {
            champions.map( ( champ, index ) => {
              const champ_nick = champ.name
                .replace( /\&[ \w]+/g, '' )
                .toLowerCase()
                .replace( /[ .']/g, '' );
              const icon_path = `/champ_icons/${ champ_nick }.png`;

              return (
                <div 
                  key={ index + champ_nick }
                >
                  <a
                    href={ `/champion/${ champ_nick }` }
                    className="card"
                  >
                    <img
                      alt={ `${ champ.name } (TFT)` }
                      src={ icon_path }
                      height='90px'
                      width='90px'
                    ></img>

                    <span>{ champ.name }</span>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(to bottom right, #0B2D36, #004455);
        }

        .main {
          width: 100%;
          height: 100%;
          padding: 20px;

          display: flex;
          flex: 1;
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
          text-align: center;
        }

        .subtitle {
          margin-top: 10px;
        }

        .grid {
          width: 100%;
          height: 100%;
          margin-top: 25px;
          display: grid;
          gap: 2px;
          grid-template-columns: repeat( auto-fill, minmax( 100px, 150px ) );
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
