<template>
  <div id="container">
    <CategoryComponent />
  </div>
</template>

<script>
import CategoryComponent from './components/CategoryComponent.vue'

export default {
  name: 'app',
  components: {
    CategoryComponent
  }
}
</script>

<style>
@import url(https://unpkg.com/bootstrap@4.1.0/dist/css/bootstrap.min.css)
</style>