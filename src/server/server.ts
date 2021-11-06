import * as express from 'express';
import apiRouter from './routes';
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(express.static('public'));
app.use(apiRouter);

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
