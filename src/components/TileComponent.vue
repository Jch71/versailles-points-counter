<template>
    <div v-if="tile" class="tile-container" @click="focusInput()" :class="tile?.card && tile?.card.id ? 'has-card':''">
      <div @click="resetCard()" class="reset-button" v-if="tile?.card && tile?.card.id">
      </div>
        <input ref="inputCard" type="number" @change="updateTileCard()" v-model="tile.inputValue" :class="tile?.card && tile?.card.id ? 'bottom' : 'center'">
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
      if(tile.value?.inputValue && element.card?.id == tile.value?.inputValue){
        tile.value.inputValue= undefined;
        idExists = true;
      }
    });
  });
  if(idExists) {
    alert('carte déja présente');
    return;
  }
  tile.value!.card =  cardsList.find((elem: any) => elem.id == tile.value?.inputValue) ? 
                new Card(cardsList.find((elem: any) => elem.id ==tile.value?.inputValue)) : 
                undefined ;
  if(tile.value!.card == undefined && tile.value?.inputValue){
    tile.value.inputValue= undefined;
    alert('carte inconnue');
    return;
  }
}

function switchCard() {
  inputCard.value?.blur();
  if(tile.value?.card) {
    tile.value.card.hidden = !tile.value?.card?.hidden;
  }
}


function resetCard() {
  if(tile.value?.card) {
    tile.value.card = undefined;
    tile.value.inputValue = undefined;
    inputCard.value?.blur();
  }
}

</script>

<style type="scss">
.tile-container{

  padding : 3px;
  cursor: pointer;
  display: flex;
  background-color: #e1ca98;
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
    width: 2.5em;
    font-family: FogtwoNo5;
    font-weight: bold;
    &:focus{
      outline: none;
    }
    &.bottom {
     width: 1.2em;
      position: absolute;
      bottom: 4%;
      right:5%;
    }
  }

  .hide-button, .reset-button {
    right: 8px;
    position: absolute;
    cursor: pointer;
    appearance: none;
    color: white;
    border-radius: 5px;
    border: none;
    z-index: 2;
    height: 30px;
    width: 30px;
    max-height: 17%;
    max-width: 17%;
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 50%;
    background-position: center;
    cursor: pointer;
    transition: all ease-in-out 100ms;
    text-decoration: none;
    &:hover {
      cursor: pointer; 
       transform: translate(0px, -2px);
    }
  }

  .hide-button{
    
    top: 35%;
    &.show {
      background-image: url('../assets/icons/Icon-hide.png');
    }
    &.hide {
      background-image: url('../assets/icons/Icon-show.png');
    }
  }

  
  .reset-button{
    background-image: url('../assets/icons/Icon-reset.png');
    top: 13%;
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