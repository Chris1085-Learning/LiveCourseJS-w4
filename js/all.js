new Vue({
  el: "#app",
  data: {
    products: [],
    tempProduct: {
      options: {
        comments: [
          {
            rate: "",
            comment: "",
            user: "",
          },
        ],
      },
    },
    loginUser: {
      email: "",
      password: "",
    },
    user: {
      token: "",
      uuid: "017c2859-74ba-4b94-af09-246e50d8864f",
    },
  },
  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (this.user.token === "") {
      window.location = "login.html";
    }
    // this.getProducts();
  },
  methods: {
    login() {
      console.log(this.loginUser);
      const api = `https://course-ec-api.hexschool.io/api/auth/login`;
      axios
        .post(api, this.loginUser)
        .then((res) => {
          const token = res.data.token;
          const expired = res.data.expired;
          this.user.uuid = res.data.uuid;

          document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
          window.location = "index.html";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProducts() {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((res) => {
        console.log(res);
        this.products = response.data.data; // 取得產品列表
        // this.pagination = response.data.meta.pagination; // 取得分頁資訊
      });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case "new":
          this.tempProduct = {
            options: {
              comments: [
                {
                  rate: "",
                  comment: "",
                  user: "",
                },
              ],
            },
          };

          this.tempProduct.isNew = true;
          $("#productModal").modal("show");
          break;
        case "edit":
          this.tempProduct = JSON.parse(JSON.stringify(item));
          this.tempProduct.isNew = false;
          $("#productModal").modal("show");
          break;
        case "delete":
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $("#delProductModal").modal("show");
          break;
        case "review":
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $("#reviewProductModal").modal("show");
          break;
      }
    },
    updateProduct() {
      const vm = this;
      if (vm.tempProduct.isNew) {
        const id = new Date().getTime();
        vm.tempProduct.id = id;
        vm.products.push(vm.tempProduct);
      } else {
        const id = vm.tempProduct.id;
        vm.products.forEach((product, i) => {
          if (product.id === id) {
            vm.$set(vm.products, i, vm.tempProduct);
          }
        });
      }
      // vm.tempProduct = {};

      $("#productModal").modal("hide");
    },
    delProduct() {
      const vm = this;
      const id = vm.tempProduct.id;

      vm.products.forEach((product, i) => {
        if (product.id === id) {
          vm.products.splice(i, 1);
        }
      });

      vm.tempProduct = {
        options: {
          comments: [
            {
              rate: "",
              comment: "",
              user: "",
            },
          ],
        },
      };
      $("#delProductModal").modal("hide");
    },
  },
});
