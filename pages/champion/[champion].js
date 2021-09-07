import Head from 'next/head';
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
        <a
          href='/'
          style={{ fontSize: '30px' }}
        >&lt;- HOME</a>
      </div>

      {
        ( errorMsg ) ?
        (
          <div>{ errorMsg }</div>
        )
        :
        (
          <div className='main'>
            <div className='submain'>
              <div className='img'>
                <img alt={ `${ champion.name } (TFT)` } src={ icon_path }></img>
              
                <span>{ champion.name }</span>
              </div>

              <div className='ability'>
                <h3>Passive Ability</h3>
                <p>{ champion.passive }</p>
              </div>

              <div className='ability'>
                <h3>Active Ability</h3>
                <p>{ champion.ability }</p>
              </div>
            </div>

            <div className='stats'>
              <table>
                <tbody>
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
                    <td>Ability Power</td>
                    <td>{ champion.ability_power }</td>
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
                </tbody>
              </table>
            </div>
          </div>
        )
      }

      <style jsx>{`
        h3, p {
          text-align: center;
          margin: 0;
        }

        .container {
          display: flex;
          flex-direction: column;
          
          min-height: 100vh;
          padding: 0 0.5rem;
          background-image: linear-gradient(to bottom right, #0B2D36, #004455);
        }

        .backHome {
          position: absolute;
          top: 20px;
          left: 20px;
        }

        .main {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;

          margin-top: 130px;
          width: 50%;
        }

        .submain {
          align-items: center;
        }

        .img {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ability {
          margin-top: 30px;
        }

        .ability h3 + p {
          margin-top: 15px;
        }

        img {
          height: 100px;
          width: 100px;
        }

        img + span {
          font-size: 25px;
        }

        .stats {
          margin-top: 40px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps ( context,  ) {
  const url = context.req.url;
  const champ_nick = url.replace( '\/champion\/', '' );

  // console.log( 'Champ nick:', champ_nick );

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
  // console.log( '/champion/[champion]:', champion );

  return {
    props: {
      champion
    },
  };
}
