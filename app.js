const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes')
const { requireAuth, reuqireCors } = require('./middlewear/authMiddlewear');
const handleRequests = require('./rabbit/handleRequests');
const { requirePersonImage, requireIconImage } = require('./middlewear/imageMiddlewear');
const { logError } = require('./middlewear/loggerMiddlewear');
const logger = require('./log/logger');
const config = require('./config/config');

const app = express();
const port = config.app.port;

//app.use(cors());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', "https://localhost:3000");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     next();
// });

app.use(logError);
//app.use('/', reuqireCors);
app.use(['/cust', '/airline', '/admin'], requireAuth);
app.post(['*/customers'], requirePersonImage);
app.post(['*/administrators'], requirePersonImage);
//app.post(['*/airlines'], requireIconImage)
app.put(['*/customers/:id'], requirePersonImage);
app.put(['*/administrators/:id'], requirePersonImage);
//app.put(['*/airlines/:id'], requireIconImage);


app.use(appRoutes);

handleRequests.initReuqests()
    .then(() => {
        app.listen(port, () => logger.info(`Listening to port ${port}`));
        //module.exports =app.listen(port, () => logger.info(`Listening to port ${port}`))
        // const server = app.listen(port, () => logger.info(`Listening to port ${port}`));

        // server.setTimeout(config.app.timeout, (socket) => {
        //     console.log('timeout');
        //     socket.destroy();
        // });


    });
   


