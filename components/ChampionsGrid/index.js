import React from 'react';

const ChampionsGrid = ( props ) => {
  const { champions } = props;
  const main_link = props.main_link || '';
  
  return (
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
              className="card"
            >
              <a
                href={ main_link + `/champion/${ champ_nick }` }
              >
                <img
                  alt={ `${ champ.name } (TFT)` }
                  src={ icon_path }
                  className='champion'
                />

                <div className='span-div'>
                  <span>{ champ.name }</span>
                </div>
              </a>
            </div>
          );
        })
      }

      <style jsx>{`
        .grid {
          width: 100%;
          height: 100%;
          margin: 30px 0px;
          display: grid;
          gap: 10px;
          grid-template-columns: repeat( auto-fill, minmax( 85px, 100px ) );
          grid-template-rows: max-content;
          align-items: center;
          justify-content: center;
        }

        .grid .card {
          height: 100%;
          color: white;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .grid .card:hover,
        .grid .card:focus,
        .grid .card:active {
          color: var( --textcolor );
          border-color: var( --textcolor );
        }

        .grid .card a {
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          height: 90%;
          align-items: center;
          justify-content: space-between;
          margin: 10px;
          text-align: center;
          text-decoration: none;
        }

        .grid .card a img {
          width: 75px;
        }

        .grid .card a .span-div {
          display: flex;
          height: 100%;
          align-items: center;
        }

        .grid .card a .span-div span {
          display: flex;
          flex: auto;
          justify-content: center;
        }

        .grid .card a span {
          font-size: 0.75rem;
        }

        @media (max-width: 600px) {
          .grid .card a {
            height: 85%;
          }

          .grid .card a img {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>


    // <div className='container-for-grid'>
    //   { children }

    //   <style jsx>{`
    //     .container-for-grid {
    //       width: 100%;
    //       height: 100%;
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       align-items: center;
    //       max-width: 1200px;
    //       margin: auto;
    //     }
    //   `}</style>
    // </div>
  );
};

export default ChampionsGrid;
