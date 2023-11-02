// connect to mongodb

import mongoose from 'mongoose';

const uri = 'mongodb://root:example@mongo:27017/mydatabase?authSource=admin';

mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


export { db };