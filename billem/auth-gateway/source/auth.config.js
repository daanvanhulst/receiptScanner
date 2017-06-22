// config/auth.js

module.exports = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {session: false}
};
// expose our config directly to our application using module.exports
//module.exports = {
//    'facebookAuth' : {
//        'clientID'      : '1562751687352897', // your App ID
//        'clientSecret'  : 'b2c452445fe50620b06f9a95b359ee51', // your App Secret
//        'callbackURL'   : 'https://better-bookmarker.com/auth/facebook/callback'
//    },
//
//    'twitterAuth' : {
//        'consumerKey'       : 'your-consumer-key-here',
//        'consumerSecret'    : 'your-client-secret-here',
//       'callbackURL'       : 'https://better-bookmarker.com/auth/twitter/callback'
//    },
//
//    'googleAuth' : {
//        'clientID'      : 'your-secret-clientID-here',
//        'clientSecret'  : 'your-client-secret-here',
//        'callbackURL'   : 'https://better-bookmarker.com/auth/google/callback'
//    }
//
//};