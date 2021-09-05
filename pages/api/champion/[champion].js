import db from '../../lib/mongodb';

export default function Champion () {
  console.log( 'Context:', context.req.method );

  if ( context.req.method !== 'GET' ) {
    return res.status( 400 ).json({ msg: 'Requisição inválida.' });
  }

  
  
  return;
}
