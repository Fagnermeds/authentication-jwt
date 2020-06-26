import express, { json } from 'express';
import mongoose from 'mongoose';

import routes from './routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/test', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  },
);

app.use(json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀️ Server started...');
});