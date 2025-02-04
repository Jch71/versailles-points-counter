<template>
    <div class="modal-backdrop" v-if="opened">
        <div  class="modal-container" :class="small ? 'small' : 'big'" >
            <button @click="hideModal()" class="close-button"></button>
            <div class="modal-content" v-html="content">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';

const MODAL_EXPLAIN = "<img src='images/tuto/0.png'><img src='images/tuto/1.png'><img src='images/tuto/2.png'><img src='images/tuto/3.png'><img src='images/tuto/4.png'><img src='images/tuto/5.png'>"

const opened = defineModel('opened')
const props = defineProps({
  small: Boolean,
  content  : {
    type : String,
    default : MODAL_EXPLAIN
  }
});

function hideModal() {
    opened.value = false;
}


</script> 

<style>

.modal-backdrop{
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        background: black;
        background-color: rgba(0,0,0, .5);
        z-index: 3;
    }


.modal-container {
    max-width: 90vw;
    margin-top: 5vh;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 4;
    opacity: 1;
    border: solid 5px black;
    border-radius:10px;
    background-color: #e1ca98;
    color: var(--vt-c-text-light-1);
    text-align: center;
    padding: 1em;

    img {
        width: 100%;
    }

    .modal-content {
        height: 100%;
        overflow: auto;
    }

    &.big{
        height: 90vh;
        aspect-ratio: 63/88;
    }

    &.small {
        height: fit-content;
        margin-top: 10vh;
        padding: 0;
        .modal-content {
            display: flex;
            align-items: center;
            vertical-align: middle;
            img {
                max-width: 80vw;
            }
        }
    }
    button.close-button {
        position: absolute;
        top: -15px;
        right: -15px;
        border: none;
        z-index: 5;
        height: 40px;
        width: 40px;
        cursor: pointer;
        background: none;
        background-image: url('../assets/icons/Icon-reset-global.png');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
    }
</style>