import { MongoClient } from 'mongodb';

if ( !process.env.MONGODB_URI ) {
  throw new Error( 'Please add your Mongo URI to .env.local' );
}

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

try {
  client = new MongoClient( uri );
  clientPromise = client.connect();

} catch ( error ) {
  console.log( 'Erro ao criar promise do MongoDB Cliente.', error );
}

export default clientPromise; // Exporting Client Promise.
