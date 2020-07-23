import pagination from "./pagination.js";
import modal from "./modal.js";
import delmodal from "./delModal.js";

Vue.component("pagination", pagination);
Vue.component("modal", modal);
Vue.component("delmodal", delmodal);

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
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${num}`;
      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((res) => {
        this.products = res.data.data; // 取得產品列表
        this.pagination = res.data.meta.pagination; // 取得分頁資訊
        // console.log(this.products);
        if (this.tempProduct.id) {
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
        }
        $("#productModal").modal("hide");
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

          this.isNew = true;
          $("#productModal").modal("show");
          break;
        case "edit":
          const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${item.id}`;

          // 加入loading Btn disabled class
          this.loadingBtn = item.id;

          axios.get(api).then((res) => {
            this.tempProduct = res.data.data;
            $("#productModal").modal("show");
            // 取消disabled class
            this.loadingBtn = "";
          });

          this.isNew = false;
          break;
        case "delete":
          // 深拷貝複製至tempProduct並刪除資料
          this.tempProduct = JSON.parse(JSON.stringify(item));
          $("#delProductModal").modal("show");
          break;
      }
    },
  },
});
