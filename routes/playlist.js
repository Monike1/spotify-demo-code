const express = require('express');
const app = express();
const spotifyApi = require("../apiconfig/spotify")

app.get("/playlist", (req, res, next)=> {
    spotifyApi.setAccessToken(req.session.user.access_token)
    spotifyApi.getUserPlaylists()
        .then((playlist)=> {
            res.render("playlist", {playlists: playlist.body.items})
        })
        .catch((err)=> {
            next(err)
        })
})

module.exports = app