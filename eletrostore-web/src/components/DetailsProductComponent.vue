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
                <select class="form-control" v-model="id_category">
                  <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                    {{category.name}}
                  </option>
                </select>
            </fieldset>
            <fieldset class="form-group">
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="name" autofocus>
            </fieldset>
            <fieldset class="form-group">
                <label>Preço</label>
                <money v-bind="money" class="form-control" v-model="price"></money>
            </fieldset>
              <image-uploader
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="verbose"
                @input="setImage"
              ><label for="fileInput" slot="upload-label">
                  <figure>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path class="path1" d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"></path>
                    </svg>
                  </figure>
                  <span class="upload-caption">{{ hasImage ? "Alterar imagem" : "Adicionar imagem" }}</span>
                </label>
              </image-uploader>
            <button class="btn btn-success" type="submit">Salvar</button>
            <button class="btn" type="submit" @click.stop.prevent="returnProductList()">Voltar</button>
        </form>
        </div>
  </div>
</template>

<script>
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
import {Money} from 'v-money';
export default {
  name: "DetailsProductComponent",
  components: {Money},
  data() {
    return {
      name: "",
      id_category: 0,
      price: 0.00,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
      hasImage: false,
      image: null,
      errors: [],
      categories: []
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    refreshProductDetails() {
      CategoryService.retrieveAll()
      .then(response => {
        this.categories = response.data;
      });
      if(this.id > 0) {
        ProductService.retrieveById(this.id).then(res => {
          this.name = res.data.name;
          this.id_category = res.data.category.id;
          this.price = res.data.price;
          this.setImage({dataUrl: atob(res.data.image), info: null});//decode image
        });
      }
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if(!this.name) {
        this.errors.push("Entre com o valor no campo descrição");
      } else if(this.name.length < 5) {
        this.errors.push("O campo descrição deve conter mais de 5 caracteres!");
      }

      if(this.errors.length === 0) {
        console.log("image: " + this.image.dataUrl);
          
        if (this.id == 0) {
          ProductService.create({
              name: this.name,
              category: {id: this.id_category},
              price: this.price,
              image: btoa(this.image.dataUrl)//encode image
          })
          .then(() => {
              this.$router.push('/products');
          });
        } else {
          ProductService.update(this.id, {
              id: this.id,
              name: this.name,
              category: {id: this.id_category},
              price: this.price,
              image: btoa(this.image.dataUrl)//encode image
          })
          .then(() => {
              this.$router.push('/products');
          });
        }
      }
    },
    setImage: function(output) {
      console.log(output);
      this.hasImage = true;
      this.image = output;
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