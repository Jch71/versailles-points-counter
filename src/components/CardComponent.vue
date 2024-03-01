<template>
    <div class="card-container" v-if="card && !card.hidden">
        <img :src="`images/${card.id}.png`" alt="" class="card-image">
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
    border-radius: 10px;  
    
}

.card-container {
   background: #E5CD9C;

    border: solid 1px black;
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
    background-color: deepskyblue;
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
    position: absolute;
        transform: rotateZ(15deg);
    scale: 1.34;
    translate: 1px 3px;
}
</style>