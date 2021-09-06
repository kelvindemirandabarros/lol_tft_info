import Head from 'next/head';
import Link from 'next/link';
import * as yup from 'yup';

import mongo_client from '../../lib/mongodb';
import { all_champ_list, current_set } from '../../misc/champions_list';
// import styles from '../../styles/champ_page.module.css';

const mongodb_db = process.env.MONGODB_DB;

export default function Champion ( props ) {
  const { error: errorMsg, champion } = props;

  const champ_nick = champion.name.toLowerCase().replace( /[ .']/, '' );
  const icon_path = `/champ_icons/${ champ_nick }.png`;
  // console.log( 'Icon path:', icon_path );

  // background top level => #131D20 // Um pouco escuro.
  // background top level => #0B2D36
  // background bottom level => #004455

  return (
    <div className='container'>
      <Head>
        <title>LoL TFT Info - { champion.name }</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className='backHome'>
        <Link href='/'>
          <a style={{ fontSize: '30px' }}>&lt;- HOME</a>
        </Link>
      </div>

      {
        ( errorMsg ) ?
        (
          <div>{ errorMsg }</div>
        )
        :
        (
          <div className='main'>
            <div>
              <img alt={ `${ champion.name } (TFT)` } src={ icon_path }></img>
              

              <h1>{ champion.name }</h1>

              <div>
                <h3>Passive Ability</h3>
                <span>{ champion.passive }</span>
              </div>

              <div>
                <h3>Active Ability</h3>
                <span>{ champion.ability }</span>
              </div>
            </div>

            <div className='stats'>
              <table>
                <tr>
                  <td>At Level</td>
                  <td>1 / 2 / 3</td>
                </tr>

                <tr>
                  <td>Cost</td>
                  <td>{ champion.cost } { ( champion.cost === 6 ) ? ( 'Health' ) : ( 'Gold' ) }</td>
                </tr>

                <tr>
                  <td>Classes</td>
                  <td>{ champion.classes.join( ', ' ) }</td>
                </tr>

                <tr>
                  <td>Health</td>
                  <td>{ champion.healths.join( ' / ' ) }</td>
                </tr>

                <tr>
                  <td>Total Mana</td>
                  <td>{ champion.mana }</td>
                </tr>

                <tr>
                  <td>Starting Mana</td>
                  <td>{ champion.starting_mana }</td>
                </tr>

                <tr>
                  <td>Attack Damage</td>
                  <td>{ champion.attack_damages.join( ' / ' ) }</td>
                </tr>

                <tr>
                  <td>Attack Speed</td>
                  <td>{ champion.attack_speed }</td>
                </tr>

                <tr>
                  <td>DPS</td>
                  <td>{ champion.dpses.join( ' / ' ) }</td>
                </tr>

                <tr>
                  <td>Attack Range</td>
                  <td>{ champion.attack_range }</td>
                </tr>

                <tr>
                  <td>Armor</td>
                  <td>{ champion.armor }</td>
                </tr>

                <tr>
                  <td>Magic Resist</td>
                  <td>{ champion.magic_resist }</td>
                </tr>
              </table>
            </div>
          </div>
        )
      }

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

        .backHome {
          position: absolute;
          top: 20px;
          left: 20px;
        }

        main {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 5rem 0;
        }

        .stats {
          margin-top: 40px;
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
          font-size: 4rem;
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
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
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

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
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
    </div>
  );
}

export async function getServerSideProps ( context,  ) {
  const url = context.req.url;
  const champ_nick = url.replace( '\/champion\/', '' );

  console.log( 'Champ nick:', champ_nick );

  const schema = yup.object().shape({
    champ_nick: yup.string().required(),
  });

  try {
    await schema.validate({ champ_nick, }, { abortEarly: false, });

  } catch ( error ) {
    return {
      props: {
        error
      }
    };
  }

  if ( !all_champ_list.includes( champ_nick ) ) {
    return {
      props: {
        error: 'Esse campeão não existe. Tente retornar para a página principal e escolher o campeão por lá.'
      }
    };
  }

  if ( !current_set.includes( champ_nick ) ) {
    return {
      props: {
        error: 'Esse campeão não está no Set atual (5.5). Tente retornar para a página principal e escolher o campeão por lá.'
      }
    };
  }

  const client = await mongo_client;
  const db = client.db( mongodb_db );
  const champions_collection = db.collection( 'champions' );
  const champion = await champions_collection.findOne({ nick: champ_nick }, {
    projection: { _id: false, nick: false }
  });
  console.log( '/champion/[champion]:', champion );

  // delete champion._id;
  // delete champion.nick;

  return {
    props: {
      champion
    },
  };
}
