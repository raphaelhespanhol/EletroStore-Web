<template>
    <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Cadastros" right>
            <b-dropdown-item href="/categories">Categoria</b-dropdown-item>
            <b-dropdown-item href="/products">Produto</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    </div>
</template>

<script>
export default {
    name: "HomeApp"
}
</script>

<style scoped>

</style>
