import React from 'react';
import Head from 'next/head';

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <Head>
        <title>TFT Info - Ooops</title>
      </Head>

      <h1>Ooops...</h1>
      <h2>We think you got lost.</h2>
      <img alt={ 'Sad Bee Emote' } src={ '/emotes/Bee_Sad.png' } />
      <p>Try to go back to <a href='/'>Home</a></p>
    </div>
  );
};

export default PageNotFound;
