<template>
    <div class="board">
        <div class="score">
          Score : {{ board.getScore() }}
        </div>
        <div class="types">
          Ma cour : 
          <span class="erudits-count">{{ board.getErudits() }} Erudits</span>,
          <span class="nobles-count">{{ board.getNobles() }} Nobles</span>
          
        </div>
        <div class="row" v-for="(row, rowIndex) in board.getTableau()" >
            <TileComponent v-for="(tile, colIndex) in row"  
            :tile="tile" :board="board"/>
        </div>        
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Board from '../model/Board';
import TileComponent from './TileComponent.vue';

const board = ref<Board>(new Board());


</script>

<style scoped>

    .board {
        border:solid tomato;
        text-align: center;
        @media screen and (min-width: 500px) {
                
                width: 500px;  
                }
        .row{
            display: grid;      
            overflow: auto;
            position: relative;
            grid-template-columns: repeat(3, 1fr);
            margin: 10px;
            gap: 10px;
            height: 200px;
        }

        .types {
            .erudits-count{
                color: aqua;
            }
            .nobles-count{
                color: blueviolet;
            }
        }
    }
</style>