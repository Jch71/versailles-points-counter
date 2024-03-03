<template>
    <div class="tile-container" @click="focusInput()" :class="tile?.card && tile?.card.id ? 'has-card':''">
      <div @click="resetCard()" class="reset-button" v-if="tile?.card && tile?.card.id">
      </div>
        <input ref="inputCard" type="number" @change="updateTileCard()" v-model="cardId" :class="tile?.card && tile?.card.id ? 'bottom' : 'center'">
        <div @click="switchCard()" class="hide-button " :class="tile.card.hidden? 'hide': 'show'" v-if="tile?.card && tile?.card.id">
          
        </div>
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
  background-color: beige;
  flex-direction: column; /* Pour empiler les éléments verticalement */
  align-items: center; /* Pour aligner les éléments au centre horizontalement */
  justify-content: center; /* Pour aligner les éléments au centre verticalement */
  border-radius: 8px;
  position: relative;
  aspect-ratio: 63/86;

  input {
    z-index: 2;
    border-radius: 5px;
    border: none;
    width: 25px;
    width: 20px;
    &:focus{
      outline: none;
    }
    &.bottom {
      position: absolute;
      bottom: 6%;
      right:6%;
    }
  }

  .hide-button, .reset-button {
    position: absolute;
    top: 10px;
    cursor: pointer;
    appearance: none;
    color: white;
    border-radius: 5px;
    border: none;
    z-index: 2;
    height: 25px;
    width: 25px;
    background-size: 25px;
    background-position: center;
    box-shadow: 0px 17px 10px -10px rgba(0,0,0,0.4);
    cursor: pointer;
    transition: all ease-in-out 100ms;
    text-decoration: none;
    &:hover {
      cursor: pointer;
      box-shadow: 0px 37px 20px -15px rgba(0,0,0,0.2);
       transform: translate(0px, -2px);
    }
  }

  .hide-button{
    
    right: 10px;
    top: 18%;
    &.show {
      background-image: url('../assets/icons/Icon-hide.png');
    }
    &.hide {
      background-image: url('../assets/icons/Icon-show.png');
    }
  }

  
  .reset-button{
    background-image: url('../assets/icons/Icon-reset.png');
    right: 10px;
    top: 5%;
    border-radius: 50%;

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