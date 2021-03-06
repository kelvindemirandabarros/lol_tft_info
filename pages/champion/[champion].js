import Head from 'next/head';
import * as yup from 'yup';

import mongo_client from '../../lib/mongodb';
import { all_champ_list, current_set } from '../../misc/champions_list';
// import styles from '../../styles/champ_page.module.css';

const mongodb_db = process.env.MONGODB_DB;

const champ_models = [ 'aatrox', 'akshan', 'aphelios', 'ashe', 'brand', 'diana' ];

export default function Champion ( props ) {
  const { error: errorMsg, champion } = props;

  const champ_nick = champion.name.toLowerCase().replace( /[ .']/, '' );

  const model_path = `/images/models/${ champ_nick }.png`;

  const icon_path = `/champ_icons/${ champ_nick }.png`;
  // console.log( 'Icon path:', icon_path );

  return (
    <div className='container'>
      <Head>
        <title>TFT Info - { champion.name }</title>
      </Head>

      { 
        ( errorMsg ) ?
        (
          <div className='main'>{ errorMsg }</div>
        )
        :
        (
          <div className='main'>
            <div className='submain'>
              <div className='img'>
                { 
                  ( champ_models.includes( champ_nick ) ) ?
                  (
                    <img
                      src={ model_path }
                      alt=''
                      className='champ-model'
                    />
                  )
                  :
                  (
                    <img
                      src={ icon_path }
                      alt={ `${ champion.name } (TFT)` }
                      className='champ-icon'
                    />
                  )
                }

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
                    <td>{ champion.cost }</td>
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
          padding: 0 0.5rem;
        }

        .main {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          margin: auto;
          margin-top: 50px;
          width: 50%;
          max-width: 700px;
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

        .champ-model {
          height: 250px;
          width: 200px;
        }

        .champ-icon {
          height: 100px;
          width: 100px;
        }

        .img img + span {
          font-size: 25px;
        }

        .stats {
          margin: 40px 0px;
        }

        @media ( max-width: 600px ) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps ( context  ) {
  // const url = context.params.champion;
  // const champ_nick = url.replace( '\/champion\/', '' );
  const champ_nick = context.params.champion;

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
        error: 'Esse campe??o n??o existe. Tente retornar para a p??gina principal e escolher o campe??o por l??.'
      }
    };
  }

  if ( !current_set.includes( champ_nick ) ) {
    return {
      props: {
        error: 'Esse campe??o n??o est?? no Set atual (5.5). Tente retornar para a p??gina principal e escolher o campe??o por l??.'
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
