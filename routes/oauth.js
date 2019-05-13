const express = require('express');
const app = express();
const spotifyApi = require("../apiconfig/spotify")

app.get("/oauth", (req, res)=> {

    spotifyApi.authorizationCodeGrant(req.query.code)
        .then((authData)=> {
          // Set the access token on the API object to use it in later calls
          spotifyApi.setAccessToken(authData.body['access_token']);
          spotifyApi.setRefreshToken(authData.body['refresh_token']);
          spotifyApi.getMe()
            .then(function(data) {
                // use spotify to start a session
                req.session.user = {
                    username: data.body.id,
                    access_token: authData.body['access_token'],
                    profilePic: data.body.images[0].url
                }
                res.render("profile", {name: data.body.display_name, profilePic: data.body.images[0].url} )
            }, (err)=> {
                console.error(err);
            });
        },
        (err) =>{
          console.log('Something went wrong!', err);
          res.send(err)
        }
      );
})

module.exports = app