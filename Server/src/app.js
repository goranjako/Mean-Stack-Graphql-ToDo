
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import  compression from 'compression';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passportManager from './config/passport';
import setRoutes from './routes';
const app = express();
dotenv.config();
//mongoose setup
let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
}
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbURI)
  .then(db => {
    console.log('Connected to MongoDB');
  });
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passportManager.initialize());
// enable cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
// routes setup
setRoutes(app);
// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});
// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}..!!`));

export default app;
