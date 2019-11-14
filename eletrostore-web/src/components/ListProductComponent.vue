<template>
  <div class="container">
    <h3>Cadastro de Products</h3>
    <div v-if="message" class="alert alert-success">
      {{message}}
    </div>
    <div class="row">
        <button class="btn btn-success" v-on:click="newProductByClick()">Novo</button>
        <button class="btn btn-warning" v-on:click="exportByClick()">Emitir Relatório</button>
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
    exportByClick() {
      console.log("Export result..");
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