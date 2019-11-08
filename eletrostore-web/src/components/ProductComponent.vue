<template>
    <div>
        <HomeApp></HomeApp>
        <ListProductComponent></ListProductComponent>
    </div>
</template>

<script>
import HomeApp from "./HomeApp";
import ListProductComponent from "./ListProductComponent";
export default {
    name: "ProductComponent",
    components: {
        HomeApp,
        ListProductComponent
    }
};
</script>

<style scoped>
</style>