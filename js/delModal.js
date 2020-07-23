export default {
  template: `
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                  <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                  取消
                </button>
                <button type="button" class="btn btn-danger" @click="delProduct">
                  確認刪除
                </button>
              </div>
            </div>
          </div>`,
  data() {
    return {
      // tempProduct: {}
    };
  },
  methods: {
    delProduct() {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(api).then((res) => {
        // 將delete事件傳出到product.html 前內後外
        this.$emit("delete");
        $("#delProductModal").modal("hide");
      });
    },
  },
  props: ["tempProduct", "user"],
};
