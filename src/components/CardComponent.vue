<template>
    <div v-if="card" :class="card && !card.hidden ? 'card-container': 'hidden-card-container'">
        <img :src="`images/${card.id}.png`" alt="" class="card-image" v-if="!card.hidden">
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
}

.hidden-card-container { 
    background:  url('/images/00.png');
    background-size: cover;
}

.card-image{
    width: 100%;
    position: absolute;
    border-radius: 5px;
}
</style>