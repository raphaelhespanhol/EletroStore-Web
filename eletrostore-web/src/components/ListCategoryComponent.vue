<template>
  <div class="container">
    <h3>All Categories</h3>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Last Update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Computadores</td>
            <td>01/01/2019</td>
            <td>Remover</td>
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
      APP_NAME: "EletroStore/api"
    };
  },
  methods: {
    refreshCategories() {
      CategoryService.retrieveAll()
        .then(response => {
          console.log(response.data);
        });
    }
  },
  created() {
    this.refreshCategories();
  }
};
</script>

<style>
</style>