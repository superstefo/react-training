const ipAdress = 'http://localhost:8080/';

const Const = {
  URLS: {
    BASE_URL: ipAdress,
    AUTH: {
      PHONE: ipAdress + 'requestCode',
      GET_TOKEN: ipAdress + 'getToken/'
    },
    UPDATES: ipAdress + 'updates'
  }
}

export default Const;
