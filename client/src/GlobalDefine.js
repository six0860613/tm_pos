const ApiUrl = 'https://localhost:4000/';
//const ApiUrl = 'http://104.155.205.215:4000/';
// const ApiUrl = 'https://api.tiremaster-24h-services.com/';
const Api = {
  Tires: {
    SearchTires: `${ApiUrl}db/searchTires`,
    CreateTire: `${ApiUrl}db/createTire`,
    EditTire: `${ApiUrl}db/editTire`,
    DeleteTire: `${ApiUrl}db/deleteTire`,
    GetTireId: `${ApiUrl}db/getTireId`,
    GetTireById: `${ApiUrl}db/getTireById`,
    GetTireLocation: `${ApiUrl}db/getTireLocation`,
    UpdateTireLocation: `${ApiUrl}db/updateTireLocation`,
    CheckTireExist: `${ApiUrl}db/checkTireExist`,
    CreateRecord: `${ApiUrl}db/createRecord`,
    SearchRecords: `${ApiUrl}db/searchRecords`,
    GetRecords: `${ApiUrl}db/getRecords`,
    GetGraphByWidth: `${ApiUrl}db/getGraphByWidth`,
    GetStatistics: `${ApiUrl}db/getStatistics`,
  },
  Ticket: {
    GetUserInfo: `${ApiUrl}db/getUserInfo`,
  },
  User: {
    Check: `${ApiUrl}user/check/`,
    Logout: `${ApiUrl}user/logout/`,
  },
};

const AxiosConfig = {
  User: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  },
  General: {
    // withCredentials: true,
    headers: {},
  },
};

const SnackbarType = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
};

export { ApiUrl, Api, AxiosConfig, SnackbarType };
