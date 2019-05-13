var SpotifyWebApi = require('spotify-web-api-node');
var config = require("./config")
const config = require("./config.json")

var clientId = 'bb1711f7940641d3a1d062fbbe6c78de',
    clientSecret = 'fb6c908cc8954e4380cecb56a7993b95';

var spotifyApi = new SpotifyWebApi({
  clientId : config.clientId,
  clientSecret : config.clientSecret,
  redirectUri: "http://localhost:3000/oauth"
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


module.exports = spotifyApi