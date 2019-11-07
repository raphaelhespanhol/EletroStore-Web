<template>
  <div class="container">
    <h3>Todas as Categories</h3>
    <div v-if="message" class="alert alert-success">
      {{message}}
    </div>
    <div class="row">
        <button class="btn btn-success" v-on:click="newCategoryByClick()">Novo</button>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Data alteração</th>
            <th>Atualizar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" v-bind:key="category.id">
            <td>{{category.id}}</td>
            <td>{{category.name}}</td>
            <td>{{category.lastUpdate}}</td>
            <td><button class="btn btn-success" v-on:click="saveCategoryByClick(category.id)">Atualizar</button></td>
            <td><button class="btn btn-warning" v-on:click="deleteCategoryByClick(category.id)">Remover</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategoryService from '../services/CategoryService';
export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
      message: null
    };
  },
  methods: {
    refreshCategories() {
      CategoryService.retrieveAll()
        .then(response => {
          this.categories = response.data;
        });
    },
    newCategoryByClick() {
      this.$router.push(`/categories/-1`);
    },
    saveCategoryByClick(id) {
      this.$router.push(`/categories/${id}`);
    },
    deleteCategoryByClick(id) {
      CategoryService.deleteById(id)
        .then(response => { 
          this.message = `Categoria numero ${id} apagada com sucesso!`;
          this.refreshCategories();
      });
    }
  },
  created() {
    this.refreshCategories();
  }
};
</script>

<style></style>