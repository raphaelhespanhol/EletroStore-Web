<template>
  <div class="container">
    <h3>Cadastro de Products</h3>
    <div v-if="message" class="alert alert-success">
      {{message}}
    </div>
    <div class="row">
        <button class="btn btn-success" v-on:click="newProductByClick()">Novo</button>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Data alteração</th>
            <th>Atualizar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" v-bind:key="product.id">
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.category.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.lastUpdate}}</td>
            <td><button class="btn btn-success" v-on:click="saveProductByClick(product.id)">Atualizar</button></td>
            <td><button class="btn btn-warning" v-on:click="deleteProductByClick(product.id)">Remover</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductService from '../services/ProductService';
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      message: null
    };
  },
  methods: {
    refreshProducts() {
      ProductService.retrieveAll()
        .then(response => {
          this.products = response.data;
        });
    },
    newProductByClick() {
      this.$router.push(`/products/0`);
    },
    saveProductByClick(id) {
      this.$router.push(`/products/${id}`);
    },
    deleteProductByClick(id) {
      ProductService.deleteById(id)
        .then(response => { 
          this.message = `Produto numero ${id} apagada com sucesso!`;
          this.refreshProducts();
      });
    }
  },
  created() {
    this.refreshProducts();
  }
};
</script>

<style></style>