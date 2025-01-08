import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/ping',(_req, res) => {
    console.log('Ping request received');
    res.send('Pong');
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
