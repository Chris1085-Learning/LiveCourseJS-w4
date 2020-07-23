new Vue({
  el: "#app",
  data: {
    loginUser: {
      email: "",
      password: "",
    },
    user: {
      token: "",
      uuid: "",
    },
  },
  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (this.user.token === "") {
      window.location = "login.html";
    }
  },
  methods: {
    login() {
      const api = `https://course-ec-api.hexschool.io/api/auth/login`;
      axios
        .post(api, this.loginUser)
        .then((res) => {
          const token = res.data.token;
          const expired = res.data.expired;
          this.user.uuid = res.data.uuid;

          document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
          window.location = "product.html";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
