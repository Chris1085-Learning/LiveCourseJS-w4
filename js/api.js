// const { default: Axios } = require("axios");

const uuid = "017c2859-74ba-4b94-af09-246e50d8864f";
const token = "pzCKQorsn9wlBBC8XL7nKf73NA2KM5CrlJ0NDfC30ey6CujDk0cUnerzgeQU";
let apiPath = "https://course-ec-api.hexschool.io/";
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
