// Vue.component(id, [definition]);

new Vue({
  el: "#app",
  data: {
    user: {
      email: "",
      password: "",
    },
  },
  methods: {
    login() {
      const api = `https://course-ec-api.hexschool.io/api/auth/login`;
      axios
        .post(api, this.user)
        .then((res) => {
          const token = res.data.token;
          const expired = res.data.expired;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
          console.log(document.cookie);

          window.location = "index.html";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
