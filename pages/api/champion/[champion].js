import * as Yup from 'yup';

import mongo_client from '../../../lib/mongodb';

const mongodb_db = process.env.MONGODB_DB;

export default async function Champion ( req, res ) {
  if ( req.method !== 'GET' ) {
    return res.status( 400 ).json({ error: 'Requisição inválida.' });
  }

  const champ_schema = Yup.object().shape({
    champ_nick: Yup.string()
      .required(),
  });

  const champ_nick = req.query.champion;
  
  try {
    await champ_schema.validate( { champ_nick }, {
      abortEarly: false,
    });
    
  } catch ( error ) {
    return res.status(400).json({ error: error.errors.join(', ') });
  }
  
  const client = await mongo_client;
  const db = client.db( mongodb_db );
  const champions_collection = db.collection( 'champions' );
  const champion = await champions_collection.findOne({ nick: champ_nick }, {
    projection: { _id: false, nick: false }
  });
  
  return res.json( champion );
}
