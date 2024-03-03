<template>
    <div v-if="card" :class="card && !card.hidden ? 'card-container': 'hidden-card-container'">
        <img :src="`images/${card.id}.png`" alt="" class="card-image" :class="fullscreen ? 'fullscreen': ''" v-if="!card.hidden"
         @touchstart="startLongPress()" @touchend="endLongPress()">
    </div>
    
</template>

<script setup lang="ts">
import Card from '@/model/Card';
import {
        ref
    } from 'vue';

const props = defineProps({
  card: Card
})
let pressTimer: any;
let fullscreen = ref<boolean>(false);

function startLongPress() {
    pressTimer = setTimeout(() => {
    // Ouvrir l'image en plein écran ici
    fullscreen.value = true;
    }, 500); // Ajustez la durée selon vos besoins
}

function endLongPress() {
    fullscreen.value = false;
    clearTimeout(pressTimer);
}


</script>

<style>

.img {
    user-select: none !important;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    
}

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
    &.fullscreen {
        position: fixed;
        z-index: 15;
        top: 0;
        left: 0;
        border-radius: 6%;
    }
}
</style>