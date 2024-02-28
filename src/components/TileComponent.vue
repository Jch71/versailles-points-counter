<template>
    <div class="tile-container" @click="focusInput()" :class="tile?.card && tile?.card.id ? 'has-card':''">
      <button @click="resetCard()" class="reset-button" v-if="tile?.card && tile?.card.id">
            Reset
        </button>
        <input ref="inputCard" type="number" @change="updateTileCard()" v-model="cardId" :class="tile?.card && tile?.card.id ? 'top' : 'center'">
        <button @click="switchCard()" class="hide-button" v-if="tile?.card && tile?.card.id">
          {{tile.card.hidden? 'Show': 'Hide'}}
        </button>
      <card-component :card="tile?.card"/>
    </div>
</template>

<script setup lang="ts">
import Tile from '@/model/Tile';
import {  ref, toRef } from 'vue';
import CardComponent from './CardComponent.vue';
import Card from '@/model/Card';
import cardsList from '@/assets/cardsList.json';
import Board from '@/model/Board';


const props = defineProps({
  tile: Tile,
  board: Board
})

const tile= toRef(props.tile);
const board= toRef(props.board);
const cardId = ref<number>();
const inputCard = ref<HTMLInputElement>();

function focusInput(){
  if(inputCard.value) {
    inputCard.value.focus();
  }
}
function updateTileCard() {
  let idExists: boolean=false;
  board.value?.getTableau().forEach(row => {
    row.forEach(element => {
      if(element.card?.id == cardId.value){
        cardId.value= undefined;
        idExists = true;
      }
    });
  });
  if(idExists) {
    alert('carte déja présente');
    return;
  }
  tile.value!.card =  cardsList.find((elem: any) => elem.id ==cardId.value) ? 
                new Card(cardsList.find((elem: any) => elem.id ==cardId.value)) : 
                undefined ;
  if(tile.value!.card == undefined){
    cardId.value= undefined;
    alert('carte inconnue');
    return;
  }
}

function switchCard() {
  if(tile.value?.card) {
    tile.value.card.hidden = !tile.value?.card?.hidden;
  }
}


function resetCard() {
  if(tile.value?.card) {
    tile.value.card = undefined;
    cardId.value = undefined;
    inputCard.value?.blur();
  }
}

</script>

<style type="scss">
.tile-container{

  padding : 3px;
  border: solid 1px grey;
  cursor: pointer;
  display: flex;
  flex-direction: column; /* Pour empiler les éléments verticalement */
  align-items: center; /* Pour aligner les éléments au centre horizontalement */
  justify-content: center; /* Pour aligner les éléments au centre verticalement */
  border-radius: 8px;
  position: relative;

  input {
    z-index: 2;
    border-radius: 5px;
    border: none;
    width: 50px;
    &:focus{
      outline: none;
    }
    &.top {
      position: absolute;
    top: 10px;
    }
  }

  .hide-button, .reset-button {
    position: absolute;
    top: 10px;
    z-index: 5;
    cursor: pointer;
    appearance: none;
    background: none;
    color: white;
    border-radius: 5px;
    border: none;
    z-index: 2;
  }

  .hide-button{
    right: 5px;
    &:hover {
      background-color: white;
      color: black;
    }

  }

  
  .reset-button{
    left: 5px;
    &:hover {
      background-color: white;
      color: black;
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