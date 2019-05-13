const express = require('express');
const app = express();
const spotifyApi = require("../apiconfig/spotify")

var scopes = ['user-read-private', 'user-read-email']
var state = 'some-state-of-my-choice';

app.get('/authorize', (req,res)=> {
    var authorizeUrl = spotifyApi.createAuthorizeURL(scopes, state)
    res.render("spotify-login", {authorizeUrl})
})

module.exports = app