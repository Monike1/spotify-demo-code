const express = require('express');
const app = express();
const hbs = require('hbs');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
require("./apiconfig/spotify")
app.use(cookieParser())

mongoose.connect('mongodb://localhost/imdb', {useNewUrlParser: true})
    .then((response)=> {
        console.log("connected to mongo")
    })
    .catch((err)=> {
        console.log("no mongo today: ", err)
    })

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));

app.use("/", require("./routes/index"))
app.use("/", require("./routes/authorize"))
app.use("/", require("./routes/oauth"))
app.use("/", authenticate, require("./routes/artists"))
app.use("/", authenticate, require("./routes/playlist"))

function authenticate(req, res, next) {
    if(!req.session.user) throw new Error("Unauthenticated")
    else next()
}

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(403).send('Page not found ', err.message )
})  


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));