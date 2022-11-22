const express = require('express');
const express_handlebars = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const connection = require('./database/connection'); 

const app = express();



connection.sync()
    .then(() => {app.listen(3000)})
    .catch((error) => console.log(error));