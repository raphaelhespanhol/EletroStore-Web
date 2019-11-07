<template>
    <div>
        <h1>Cadastro de Categorias</h1>
        <ListCategoryComponent></ListCategoryComponent>
    </div>
</template>

<script>
import ListCategoryComponent from "./ListCategoryComponent";
export default {
    name: "CategoryComponent",
    components: {
        ListCategoryComponent
    }
};
</script>

<style scoped>
</style>