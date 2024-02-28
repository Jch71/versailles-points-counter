<template>
    <div class="tile-container" @click="focusInput()">
        <input ref="inputCard" type="number" @change="updateTileCard()" v-model="cardId" :class="card && card.id ? 'top' : 'center'">
      <card-component :card="card"/>
    </div>
</template>

<script setup lang="ts">
import Tile from '@/model/Tile';
import {  ref, toRef } from 'vue';
import CardComponent from './CardComponent.vue';
import Card from '@/model/Card';
import cardsList from '@/assets/cardsList.json';


const props = defineProps({
  tile: Tile
})

const tile= toRef(props.tile);

const emit = defineEmits<{
  (e: 'tileChanged', tile: any): void
}>()

const cardId = ref<number>();
const card = ref<Card>(); 
  const inputCard = ref<HTMLInputElement>();

function focusInput(){
  if(inputCard.value) {
    inputCard.value.focus();
  }
}
function updateTileCard() {
  card.value = cardsList.find((elem: any) => elem.id ==cardId.value) ? 
                new Card(cardsList.find((elem: any) => elem.id ==cardId.value)) : 
                undefined ; 
  tile.value!.card = card.value;
  emit('tileChanged', tile.value);
}

</script>

<style type="scss">
.tile-container{
  padding : 3px;
  background: rgba(169,169,169,0.1);
  border: solid 1px grey;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* Pour empiler les éléments verticalement */
  align-items: center; /* Pour aligner les éléments au centre horizontalement */
  justify-content: center; /* Pour aligner les éléments au centre verticalement */
  border-radius: 8px;

  input {
    width: 50px;
    &.top {
      position: absolute;
    top: 10px;
    }
  }

    /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
    text-align: center;
  }

}
</style>