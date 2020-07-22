import pagination from "./pagination.js";
import modal from "./modal.js";

Vue.component("pagination", pagination);
Vue.component("modal", modal);

new Vue({
  el: "#app",
  data: {
    products: [],
    pagination: {},
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
    isNew: "",
    loadingBtn: "",
  },
  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (this.user.token === "") {
      window.location = "login.html";
    }
    this.getProducts();
  },
  methods: {
    getProducts(num = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?pages=${num}`;
      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((res) => {
        this.products = res.data.data; // 取得產品列表
        this.pagination = res.data.meta.pagination; // 取得分頁資訊

        console.log(this.pagination);
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
          const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${item.id}`;
          this.loadingBtn = item.id;

          axios.get(api).then((res) => {
            console.log(res);
            this.tempProduct = res.data.data;
            $("#productModal").modal("show");
            this.loadingBtn = "";
          });
          this.tempProduct.isNew = false;
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
