const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes')
const requireAuth = require('./middlewear/authMiddlewear');
const handleRequests = require('./rabbit/handleRequests');
const {requirePersonImage, requireIconImage}  = require('./middlewear/imageMiddlewear');
const {logError} = require('./middlewear/loggerMiddlewear');
const logger = require('./log/logger');
const config = require('./config/config');

const app = express();
const port = config.app.port;

app.use(cors({
    origin: "*"
}));
app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded( {extended: true }));
app.use(bodyParser.json());                       
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(logError);
app.use(['/cust', '/airline', '/admin'], requireAuth);
app.post(['*/customers'], requirePersonImage);
app.post(['*/airlines'], requireIconImage)
app.put(['*/customers/:id'],  requirePersonImage);
app.put(['*/airlines/:id'], requireIconImage);


app.use(appRoutes);

handleRequests.initReuqests()
.then(
    module.exports =app.listen(port, () => logger.info(`Listening to port ${port}`))
);


