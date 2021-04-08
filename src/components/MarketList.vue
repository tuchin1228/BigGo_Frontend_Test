<template>
    <div class="market_list">
        <h4>共有{{ All_Market_Filter.length }}間商店</h4>
        <div class="market_container">
            <section v-for="item in All_Market_Filter" :key="item">
                <img
                    v-lazy="'https://biggo.com.tw' + API_Data[item].item.image"
                    :alt="API_Data[item].item.name"
                />
                <h3>{{ API_Data[item].item.name }}</h3>
            </section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
            <section></section>
        </div>
    </div>
</template>

<script>
export default {
  props: ['All_Market_Filter', 'API_Data'],
};
</script>

<style>
</style>
