<template>
    <div v-if="tile" class="tile-container" @click="focusInput()" :class="tile?.card && tile?.card.id ? 'has-card':''">
      <div @click="resetCard($event)" class="reset-button" v-if="tile?.card && tile?.card.id">
      </div>
        <input ref="inputCard" type="number" @change="updateTileCard($event)"  @keydown.enter="inputCard?.blur(); $event.preventDefault();" v-model="tile.inputValue" :class="tile?.card && tile?.card.id ? 'bottom' : 'center'" >
        <div @click="switchCard($event)" class="hide-button " :class="tile.card.hidden? 'hide': 'show'" v-if="tile?.card && tile?.card.id && tile?.card.id !== ' '">
        </div>
        <div @click="addEmptyCard($event)" class="hide-button show" v-if="!(tile?.card && tile?.card.id)">
        </div>

      <card-component :card="tile?.card"/>
      <div class="card-score" v-if="tile?.card && tile?.card.id && !tile?.card.hidden ">
          {{ tile?.card?.cardValue }}
         </div>
    </div>
  <ModalComponent v-model:opened="modalOpened" :small="true" :content="modalContent" />
</template>

<script setup lang="ts">
import Tile from '@/model/Tile';
import {  ref, toRef } from 'vue';
import CardComponent from './CardComponent.vue';
import Card from '@/model/Card';
import cardsList from '@/assets/cardsList.json';
import Board from '@/model/Board';
    import ModalComponent from './ModalComponent.vue';


const props = defineProps({
  tile: Tile,
  board: Board
})

const tile= toRef(props.tile);
const board= toRef(props.board);
const inputCard = ref<HTMLInputElement>();
const modalOpened = ref<boolean>(false);
const modalContent= ref<string>();

function focusInput(){
  if(inputCard.value) {
    inputCard.value.focus();
  }
}
function updateTileCard($event: any) {
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
    inputCard.value?.blur();
    modalOpened.value = true;
    modalContent.value = "<img src='images/deja-dans-la-cour.png'>";
    return;
  }
  tile.value!.card =  cardsList.find((elem: any) => elem.id == tile.value?.inputValue) ? 
                new Card(cardsList.find((elem: any) => elem.id ==tile.value?.inputValue)) : 
                undefined ;
                
    inputCard.value?.blur();
  $event.preventDefault();
    $event.stopPropagation();

  if(tile.value!.card == undefined && tile.value?.inputValue){
    tile.value.inputValue= undefined;
    inputCard.value?.blur();
    modalOpened.value = true;
    modalContent.value = "<img src='images/cette-carte-n_existe-pas.png'>";
    return;
  }
}

function switchCard($event: any) {
  inputCard.value?.blur();
  if(tile.value?.card) {
    tile.value.card.hidden = !tile.value?.card?.hidden;
  }
  $event.preventDefault();
  $event.stopPropagation();
}

function addEmptyCard(event: any) {
  inputCard.value?.blur();
  if(tile.value) { 
   let fakeCard = new Card({id:' '});
   fakeCard.hidden = true;
    tile.value.card = fakeCard;
  }
}

function resetCard($event: any) {
  if(tile.value?.card) {
    tile.value.card = undefined;
    tile.value.inputValue = undefined;
    inputCard.value?.blur();
  }
  $event.preventDefault();
  $event.stopPropagation();
}

</script>

<style type="scss">
.tile-container{
  cursor: pointer;
  display: flex;
  background-color: #e1ca98;
  flex-direction: column; /* Pour empiler les éléments verticalement */
  align-items: center; /* Pour aligner les éléments au centre horizontalement */
  justify-content: center; /* Pour aligner les éléments au centre verticalement */
  border-radius: 5px;
  position: relative;
  aspect-ratio: 63/88;

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
        max-height: 7%;
        width: 12%;
        position: absolute;
        bottom: 4%;
        right: 3px;
        border-radius: 2px;
    }
  }

  .hide-button, .reset-button {
    right: 1px;
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
    background-position: center;
    cursor: pointer;
    transition: all ease-in-out 100ms;
    text-decoration: none;
    &:hover {
      cursor: pointer; 
       transform: translate(0px, -2px);
    }
  }

  .card-score{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1em;
    width: 100%;
    height: 15%;
    background: url('../assets/icons/cercle-point-de-victroire.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    color:#e1ca98;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hide-button{
    
    top: 35%;
    &.show {
      background-image: url('../assets/icons/hide.png');
    }
    &.hide {
      background-image: url('../assets/icons/show.png');
    }
  }

  
  .reset-button{
    background-image: url('../assets/icons/reset.png');
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