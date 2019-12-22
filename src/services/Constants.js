const ipAdress = 'http://localhost:8080/';

const Const = {
  URLS: {
    BASE_URL: ipAdress,
    AUTH: {
      PHONE: ipAdress + 'requestCode',
      GET_TOKEN: ipAdress + 'getToken/'
    },
    UPDATES: ipAdress + 'updates',
    PROFILE: ipAdress + 'profile',
    SEND_MESSAGE: ipAdress + 'postMessage',
    SEND_LOCATION: ipAdress + 'location',
    NEW_FRIENDS: ipAdress + 'new-friends',
    SEND_SEEN: ipAdress + 'seen/',
    FAST_MATCH: ipAdress + 'fast-match',
    LIKE: ipAdress + 'like/',
    PASS: ipAdress + 'pass/'
  },
  LOCAL_CASH_VAR_NAME: "__TnDr__"
}

export default Const;
