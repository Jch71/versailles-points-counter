<template>
    <div class="board">

        <div class="cour-summary">
            <h2>Ma cour</h2>
            <div class="types">
                <span class="erudits-count">{{ board.getErudits() }} Erudit(s)</span>,
                <span class="nobles-count">{{ board.getNobles() }} Noble(s)</span>,
                <span class="poison-count">{{ board.getPoison() }} Poison(s)</span>,
                <span class="favorite-count">{{ board.getFavorite() }} Favorite(s)</span>,
                <span class="millitaire-count">{{ board.getMillitaire() }} Millitaire(s)</span>

            </div>

                        
            <div class="metiers">
                <span class="jardiniers-count">{{ board.getJardiniers() }} Jardinier(s)</span>,
                <span class="peintres-count">{{ board.getPeintres() }} Peintre(s)</span>,
                <span class="architectes-count">{{ board.getArchitectes() }} Architecte(s)</span>,
                <span class="ecrivains-count">{{ board.getEcrivains() }} Ecrivain(s)</span>,
                <span class="musiciens-count">{{ board.getMusiciens() }} Musiciens(s)</span>

            </div>
        </div>

        <div class="main-board">
            <div class="score">
                Score : {{ board.getScore() }}
            </div>

            <div class="row" v-for="(row, rowIndex) in board.getTableau()">
                <TileComponent v-for="(tile, colIndex) in row" :tile="tile" :board="(board as Board)" />
            </div>
        </div>


        <div class="boards-mod">
            <div class="mod" @click="switchReynie()" :class="board.reynieActivated ? 'activated':''">
                La Reynie
            </div>
        </div>       
    </div>


</template>

<script setup lang="ts">
    import {
        ref
    } from 'vue';
    import Board from '../model/Board';
    import TileComponent from './TileComponent.vue';

    const board = ref < Board > (new Board());

   function switchReynie() {
    board.value.reynieActivated = !board.value.reynieActivated;
   }

</script>

<style scoped>

    .cour-summary{
        width: 500px;
    }
    .board {
        display: flex;
        border: solid tomato;
        border-radius: 5px;
        text-align: center;
        flex-wrap: wrap;

        @media screen and (min-width: 1200px) {
            width: 1200px;
        }

        .main-board{
            width: 500px;
        }

        .row {
            display: grid;
            overflow: auto;
            position: relative;
            grid-template-columns: repeat(3, 1fr);
            margin: 10px;
            gap: 10px;
            height: 200px;
        }

        .types {
            .erudits-count {
                color: aqua;
            }

            .nobles-count {
                color: blueviolet;
            }

            .favorite-count {
                color: coral;
            }

            .millitaire-count {
                color: brown;
            }

            .poison-count {
                color: saddlebrown;
            }
        }
    }

    .boards-mod {
        display: flex;
        align-items: center;
        padding: 10px;
        .mod {
            width: 50px;
            height: 50px;
            border: solid 1px lightsalmon;
            cursor: pointer;
            border-radius: 5px;

            &.activated {
                background-color: lightsalmon;
                color: black;
            }
        }
    }
</style>