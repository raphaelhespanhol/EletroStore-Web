<template>
    <div>
        <h3>Detalhes do Produto</h3>
        <div class="container">
        <form @submit="validateAndSubmit">
            <div v-if="errors.length">
              <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
            </div>
            <fieldset class="form-group">
                <label>Código</label>
                <input type="text" class="form-control" v-model="id" disabled>
            </fieldset>
            <fieldset class="form-group">
                <label>Categoria</label>
                <input type="text" class="form-control" v-model="id_category">
            </fieldset>
            <fieldset class="form-group">
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="name" autofocus>
            </fieldset>
            <fieldset class="form-group">
                <label>Preço</label>
                <input type="text" class="form-control" v-model="price">
            </fieldset>
              <image-uploader
                :debug="1"
                :maxWidth="512"
                :quality="0.7"
                :autoRotate=true
                outputFormat="verbose"
                :preview=false
                :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                :capture="false"
                accept="video/*,image/*"
                doNotResize="['gif', 'svg']"
                @input="setImage"
                @onUpload="startImageResize"
                @onComplete="endImageResize"
              >
                <label for="fileInput" slot="upload-label">
                  <figure>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                    </svg>
                  </figure>
                  <span class="upload-caption">{{ hasImage ? 'Replace' : 'Upload' }}</span>
                </label>
              </image-uploader>
            <button class="btn btn-success" type="submit">Salvar</button>
            <button class="btn" type="submit" @click.stop.prevent="returnProductList()">Voltar</button>
        </form>
        </div>
  </div>
</template>

<script>
import ProductService from '../services/ProductService';
export default {
  name: "DetailsProductComponent",
  data() {
    return {
      name: "",
      errors: []
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    refreshProductDetails() {
        if(this.id > 0) {
          ProductService.retrieveById(this.id).then(res => {
            this.name = res.data.name;
          });
        }
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if(!this.name) {
        this.errors.push("Entre com o valor no nome");
      } else if(this.name.length < 5) {
        this.errors.push("O campo nome deve conter mais de 5 caracter!");
      }

      if(this.errors.length === 0) {
        if (this.id == 0) {
          ProductService.create({
              name: this.name
          })
          .then(() => {
              this.$router.push('/products');
          });
        } else {
          ProductService.update(this.id, {
              id: this.id,
              name: this.name
          })
          .then(() => {
              this.$router.push('/products');
          });
        }
      }
    },
    returnProductList() {
      this.$router.push("/products");
    }

  },
  created() {
    this.refreshProductDetails();
  }
};
</script>

<style scoped>
</style>