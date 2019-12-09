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
    SEND_MESSAGE: ipAdress + 'postMessage'
  }
}

export default Const;
