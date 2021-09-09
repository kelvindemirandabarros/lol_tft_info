import Head from 'next/head';

import mongo_client from '../lib/mongodb';
import BackHome from '../components/BackHome';

const mongodb_db = process.env.MONGODB_DB;

export default function APIHome({ champions }) {

  // Cor para texto: #0070F3

  return (
    <div className="container">
      <Head>
        <title>TFT Info</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <BackHome />

      <div className='main'>
        <div className='title_div'>
          <h1 className="title">Welcome to TeamFight Tactics Info API</h1>

          <img src='favicon.png'></img>

          {/* <span className="title">Welcome to</span>
          <span className="title">TeamFight Tactics Info</span> */}
        </div>

        <p className='subtitle'>Choose a champion and the browser will open a new tab with a JSON Object with his/her informations.</p>

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
                    href={ `/api/champion/${ champ_nick }` }
                    target="_blank"
                    className="card"
                  >
                    <img
                      alt={ `${ champ.name } (TFT)` }
                      src={ icon_path }
                      className='champion'
                    ></img>

                    <span>{ champ.name }</span>
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* <style jsx>{`
        .container {
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(to bottom right, #0B2D36, #004455);
        }
      `}</style> */}

      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .main {
          width: 100%;
          height: 100%;
          padding: 20px;
        
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
        }
        
        .title_div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        
        .title_div img {
          margin: 25px;
          width: 50px;
          height: 50px;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }

        a img {
          width: 100%;
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
          font-size: 2.2rem;
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
          grid-template-columns: repeat( auto-fill, minmax( 85px, 100px ) );
          align-items: center;
          justify-content: center;
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

        a span {
          font-size: 0.75rem;
        }

        @media (max-width: 600px) {
          h1.title {
            font-size: 1.4rem;
          }

          .title_div img {
            margin: 10px;
            width: 35px;
            height: 35px;
          }
        }

        @media (max-width: 600px) {
          a img {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps ( context ) {
  const client = await mongo_client;
  const db = client.db( mongodb_db );
  const champions_collection = db.collection( 'champions' );
  const champs = await champions_collection.find( {}, { projection: { _id: 0, nick: 0 } } ).toArray();
  const champions = JSON.parse( JSON.stringify( champs ) );

  return {
    props: { champions },
  };
}
