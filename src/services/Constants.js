let ipAdress = 'http://localhost:8484/';

const Const = {
  URLS: {
    BASE_URL: ipAdress,
    AUTH: {
      PHONE: ipAdress + 'requestCode',
      GET_TOKEN: ipAdress + 'getToken/'
    },
    UPDATES: ipAdress + 'updates',
    PROFILE: ipAdress + 'profile',
    USER: ipAdress + 'user/',
    MATCH: ipAdress +  'user/matches/',
    SEND_MESSAGE: ipAdress + 'postMessage',
    SEND_LOCATION: ipAdress + 'location',
    NEW_FRIENDS: ipAdress + 'new-friends',
    SEND_SEEN: ipAdress + 'seen/',
    FAST_MATCH: ipAdress + 'fast-match',
    LIKE: ipAdress + 'like/',
    PASS: ipAdress + 'pass/',


    //// storage api:
    STORAGE: ipAdress + 'storage/',
    STORAGE_TOKEN: ipAdress + 'storage/token/',
    STORAGE_BOOKMARKS: ipAdress + 'storage/bookmarks/',
    STORAGE_SETTINGS: ipAdress + 'storage/settings/'
  },
  UPDATE_POLL_INTERVAL: 20000,
  LOCAL_CASH_VAR_NAME: '__TnDr__',
  AUTH_HEADER_NAME: 'X-Auth-Token',
  PHONE_HEADER_NAME: 'phone-number',
  VERSION: '1.15'
}

export default Const;
