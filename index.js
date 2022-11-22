const express = require('express');
const express_handlebars = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const connection = require('./database/connection'); 
const { request } = require('http');
const { response } = require('express');

const app = express();

//Template engine:
app.engine('handlebars', express_handlebars.engine());
app.set('view engine', 'handlebars');

//Public path for assets:
app.use(express.static('public'));

//Receive response from body:
app.use(express.urlencoded(
    {
        extended: true
    }
    ));
app.use(express.json());

//Session middleware:
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
);

// Flash messages:
app.use(flash());

//Configure session to reply:
app.use((request, response, next) => {

    if(request.session.userid){
        response.locals.session = request.session
    }

    next();
    
});

connection.sync()
    .then(() => {app.listen(3000)})
    .catch((error) => console.log(error));