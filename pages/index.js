import ContainerForGrid from '../components/ContainerForGrid';
import mongo_client from '../lib/mongodb';

const mongodb_db = process.env.MONGODB_DB;

export default function Home({ champions }) {

  // Cor para texto: #0070F3

  return (
    <ContainerForGrid>
      <div className='main'>
        <div className='title-div'>
          <h1 className="title">Welcome to</h1> 
          <h1 className='title'>TeamFight Tactics Info</h1>
        </div>

        <div className="div-sub">
          <p className='subtitle'>Choose a champion to see his/her status:</p>
        </div>

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

      <style jsx>{`
        .main {
          width: 100%;
          height: 100%;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          padding: 12px;
        }
        
        .title-div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        a.card {
          color: inherit;
          text-decoration: none;
        }

        a.card img {
          width: 100%;
        }
        
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.2rem;
          color: white;
          text-align: center;
        }
        
        .div-sub {
          margin: 20px 20px 0px;
        }
        
        .subtitle {
          text-align: center;
        }
        
        .grid {
          width: 100%;
          height: 100%;
          margin: 30px 0px;
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

        a.card span {
          font-size: 0.75rem;
        }

        @media (max-width: 600px) {
          h1.title {
            font-size: 1.7rem;
          }

          a.card img {
            width: 60px;
            height: 60px;
          }
        }       
      `}</style>
    </ContainerForGrid>
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
