import express, { type Errback, type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import testRoute from './routes/test';
import resultRoute from './routes/result';
import { logger } from './middlewares';

const app = express();
const PORT = process.env.PORT || "3000"

app.use(express.json());
app.use(cors());

app.use(logger);

app.get('/health', (req, res) => {
  res.json({
    msg: "This is health check point"
  })
})

app.use('/test', testRoute);
app.use('/result', resultRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: 'Internal Server Error'
    }
  });
});

app.listen(PORT, () => {
  console.log("App started listening at port : ", PORT)
})