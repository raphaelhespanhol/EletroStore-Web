<template>
    <div>
        <h3>Detalhes da Categoria</h3>
        <div class="container">
        <form>
            <fieldset class="form-group">
                <label>Código</label>
                <input type="text" class="form-control" v-model="id" disabled>
            </fieldset>
            <fieldset class="form-group">
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="name">
            </fieldset>
            <button class="btn btn-success" type="submit">Salvar</button>
            <button class="btn" type="submit">Voltar</button>
        </form>
        </div>
  </div>
</template>

<script>
import CategoryService from '../services/CategoryService';
export default {
  name: "DetailsCategoryComponent",
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
    refreshCategoryDetails() {
        CategoryService.retrieveById(this.id).then(res => {
          this.name = res.data.name;
        });
    },
  },
  created() {
    this.refreshCategoryDetails();
  }
};
</script>

<style scoped>
</style>