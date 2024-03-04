<template>
    <div v-if="card" :class="card && !card.hidden ? 'card-container': 'hidden-card-container'">
        <img :src="`images/${card.id}.png`" alt="" class="card-image" :class="fullscreen ? 'fullscreen': ''" v-if="!card.hidden"
         @touchstart="startLongPress()" @touchend="endLongPress()" @contextmenu.prevent>
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
    disableScroll();
    fullscreen.value = true;
    }, 500); // Ajustez la durée selon vos besoins
}

function endLongPress() {
    fullscreen.value = false;
    enableScroll();
    clearTimeout(pressTimer);
}

var keys: any = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e: any) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e: any) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, {passive: false}); // modern desktop
  window.addEventListener('touchmove', preventDefault, {passive: false}); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, false); 
  window.removeEventListener('touchmove', preventDefault, false);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


</script>

<style>

.img {
    user-select: none !important;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    outline:none;
    --webkit-tap-highlight-color: transparent;
    
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
    transition: all 0.3s;
    &.fullscreen {
        position: fixed;
        z-index: 15;
        top: 0;
        left: 0;
        border-radius: 6%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>