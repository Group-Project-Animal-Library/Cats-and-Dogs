if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const errHandler = require('./middlewares/errHandler');
const PORT = 4664;
const router = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
    console.log(`This app is listening at PORT ${PORT}`);
})