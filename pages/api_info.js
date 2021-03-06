import ContainerForGrid from '../components/ContainerForGrid';
import ChampionsGrid from '../components/ChampionsGrid';
import mongo_client from '../lib/mongodb';

const mongodb_db = process.env.MONGODB_DB;

export default function APIHome({ champions }) {
  return (
    <ContainerForGrid>
      <div className='main'>
        <div className='title-div'>
          <h1 className="title">Welcome to</h1> 
          <h1 className='title'>TeamFight Tactics Info - API</h1>
        </div>

        <div className='div-sub'>
          <p className='subtitle'>
            Choose a champion and the browser will open a new tab with a JSON Object with his/her status, or access - <span className='span-link'>tftinfo.vercel.app/api/champion/[champion]</span> - changing "[champion]" to a champion name in the <a href='#champions-list' className='champ-list'>list on the bottom of this page</a>.
          </p>
        </div>

        {/* <div className="grid">
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
        </div> */}

        <ChampionsGrid
          champions={ champions }
          main_link={ '/api' }
        />
        
        <span>Full champions list:</span>

        <code id='champions-list' className='code'>
          [ aatrox,
          akshan,
          aphelios,
          ashe,
          brand,
          diana,
          draven,
          fiddlesticks,
          galio,
          garen,
          gragas,
          gwen,
          hecarim,
          heimerdinger,
          irelia,
          ivern,
          jax,
          kalista,
          karma,
          kayle,
          kennen,
          khazix,
          kled,
          leesin,
          leona,
          lucian,
          lulu,
          lux,
          missfortune,
          nautilus,
          nidalee,
          nocturne,
          nunu,
          olaf,
          poppy,
          pyke,
          rakan,
          rell,
          riven,
          sejuani,
          senna,
          sett,
          soraka,
          syndra,
          teemo,
          thresh,
          tristana,
          udyr,
          varus,
          vayne,
          velkoz,
          viego,
          vladimir,
          volibear,
          yasuo,
          ziggs,
          zyra ]
        </code>
      </div>

      <style jsx>{`
        .main {
          width: 100%;
          height: 100%;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          padding: 15px;
        }
        
        .title-div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .title-div img {
          margin: 25px;
          width: 50px;
          height: 50px;
        }
        
        a.card {
          color: inherit;
          text-decoration: none;
        }

        a.card img {
          width: 100%;
        }
        
        .title a {
          color: var( --textcolor );
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

        .champ-list {
          color: var( --linkcolor );
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
          color: var( --textcolor );
          border-color: var( --textcolor );
        }

        a span {
          font-size: 0.75rem;
        }

        .code {
          margin: 0px 50px;
          text-align: center;
        }

        @media ( max-width: 600px ) {
          h1.title {
            font-size: 1.4rem;
          }

          .span-link {
            font-size: 16px;
          }

          a.card img {
            width: 60px;
            height: 60px;
          }

          .code {
            margin: 0px 20px 30px;
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
