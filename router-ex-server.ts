import express, { Express } from 'express';
import birds from './birds';

const app = express();
const port = 8001;

app.use('/birds', birds);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
