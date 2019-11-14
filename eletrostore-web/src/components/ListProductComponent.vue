<template>
  <div class="container">
    <h3>Cadastro de Produtos</h3>
    <div v-if="message" class="alert alert-success">
      {{message}}
    </div>
    <div class="row">
      <div class="col-md-4">
        <label>Descrição</label>
        <input type="text" class="form-control" v-model="name" placeholder="Filtro por descrição" autofocus>
      </div>
      <div class="col-md-4">
        <label>Categoria</label>
        <select class="form-control" v-model="id_category">
          <option>Todos</option>
          <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
            {{category.name}}
          </option>
        </select>
      </div>
    </div>
    
    <div class="row">
        <div class="col-md-9">
          <button class="btn btn-primary mb-2" id="consultar" v-on:click="filterByClick()">Consultar</button>
        </div>
        <div class="col-md-1">
          <button class="btn btn-success" v-on:click="newProductByClick()">Novo</button>
        </div>
        <div class="col-md-2">
          <button class="btn btn-info" v-on:click="exportByClick()">Emitir Relatório</button>
        </div>
    </div>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Descrição</th>
            <th scope="col">Categoria</th>
            <th scope="col">Preço</th>
            <th scope="col">Data alteração</th>
            <th scope="col">Atualizar</th>
            <th scope="col">Remover</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.id">
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category.name}}</td>
            <td>R$ {{formatPrice(product.price)}}</td>
            <td>{{product.lastUpdate | formatDate}}</td>
            <td><button class="btn btn-success" v-on:click="saveProductByClick(product.id)">Atualizar</button></td>
            <td><button class="btn btn-warning" v-on:click="deleteProductByClick(product.id)">Remover</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategoryService from '../services/CategoryService';
import ProductService from '../services/ProductService';
export default {
  name: "ProductList",
  data() {
    return {
      name: "",
      id_category: "Todos",
      products: [],
      message: null,
      categories: []
    };
  },
  methods: {
    refreshProducts() {
      CategoryService.retrieveAll()
      .then(response => {
        this.categories = response.data;
      });
      ProductService.retrieveAll()
        .then(response => {
          this.products = response.data;
        });
    },
    newProductByClick() {
      this.$router.push(`/products/0`);
    },
    exportByClick() {
      console.log("Export result..");
    },
    saveProductByClick(id) {
      this.$router.push(`/products/${id}`);
    },
    deleteProductByClick(id) {
      ProductService.deleteById(id)
        .then(() => { 
          this.message = `Produto numero ${id} apagada com sucesso!`;
          this.refreshProducts();
      });
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
  created() {
    this.refreshProducts();
  }
};
</script>

<style></style>