// const { default: Axios } = require("axios");

const uuid = '';
const token = '';
let apiPath = 'https://course-ec-api.hexschool.io/';
let sampleData = {};

Axios.defaults.headers.Authorization = `Bearer ${token}`;

function getData() {
  const api = `${apiPath}api/${uuid}/admin/ec/products`;
  Axios.get(api).then(function (res) {
    console.log(res);
  });
}

function postData() {
  const api = `${apiPath}api/${uuid}/admin/ec/product`;
  Axios.post(api, data).then(function (res) {
    console.log(res);
  });
}
