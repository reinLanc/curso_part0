import express from 'express';
import cors from 'cors';
const app = express();
import diaryRouter from './routes/diaries';
app.use(express.json());

const PORT = 3000;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors({
  origin: 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});