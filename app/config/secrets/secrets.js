module.exports = {
  facebookAppId: process.env.FACEBOOK_APP_ID || "1860458620897454",
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET || "6525b5d5c375396668aa74938c0f08dd",
  googleAuth: {
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:3000/auth/google/callback'
  }
}
