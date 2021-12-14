const cookieparser = require('cookieparser')
const getCookie = function (req) {
  if (req && req.headers && req.headers.cookie) {
    return cookieparser.parse(req.headers.cookie)
  } else {
    return {smdToken: null, lang: null}
  }
}
export default getCookie
