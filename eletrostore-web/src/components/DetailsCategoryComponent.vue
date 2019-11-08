<template>
    <div>
        <h3>Detalhes da Categoria</h3>
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
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="name" autofocus>
            </fieldset>
            <button class="btn btn-success" type="submit">Salvar</button>
            <button class="btn" type="submit" @click.stop.prevent="returnCategoryList()">Voltar</button>
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
        if(this.id > 0) {
          CategoryService.retrieveById(this.id).then(res => {
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
          CategoryService.create({
              name: this.name
          })
          .then(() => {
              this.$router.push('/categories');
          });
        } else {
          CategoryService.update(this.id, {
              id: this.id,
              name: this.name
          })
          .then(() => {
              this.$router.push('/categories');
          });
        }
      }
    },
    returnCategoryList() {
      this.$router.push("/categories");
    }

  },
  created() {
    this.refreshCategoryDetails();
  }
};
</script>

<style scoped>
</style>