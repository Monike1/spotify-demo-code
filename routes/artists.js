const express = require("express")
const app = express()
const spotifyApi = require("../apiconfig/spotify")

app.get('/artists', (req,res, next)=> {
    
    spotifyWebApi.searchArtists("Drake")
    .then(data => {
        res.render("artists", {artists: data.body.artists.items})
    })
    .catch(err => {
        next(err)
    })

})

module.exports = app