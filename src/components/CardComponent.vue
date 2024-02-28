<template>
    <div class="card-container" v-if="card && !card.hidden">
        <img :src="'https://robohash.org/'+card!.id+ '?set=set4'" alt="" class="card-image">
        <div class="id">
            {{ card!.id }}
        </div>
        <div class="name">
            {{ card!.name }}
        </div>
    </div>
    <div class="hidden-card-container" v-if="card && card.hidden">
        <div class="id">
            {{ card!.id }}
        </div>
    </div>
    
</template>

<script setup lang="ts">
import Card from '@/model/Card';

const props = defineProps({
  card: Card
})
</script>

<style>
.card-container, .hidden-card-container{
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.card-container {
   
    border: solid 1px lightgreen;
    .id{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0.8em;
        padding: 2px 5px;
        background: lightgreen;
        border-radius: 2px;
        color: black;
        z-index: 10;
    } 
    .name{
        z-index: 10;
        color: black;
        font-weight: 600;
    }
}

.hidden-card-container { 
    border: solid 1px deepskyblue;
    .id{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0.8em;
        padding: 2px 5px;
        background: deepskyblue;
        border-radius: 2px;
        color: black;
        z-index: 10;
    } 
}

.card-image{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
}
</style>