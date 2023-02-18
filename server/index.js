import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Social Media Server")
})




function startServer(){
    app.listen(process.env.PORT, () => {
        console.log('Listening to PORT', process.env.PORT);
    })
}
startServer();