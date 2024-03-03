<template>
    <div class="board">

        <div class="cour-summary">
            <div class="title">

            </div>
            <div class="types">
                <div class="type erudits-count">{{ board.getErudits() }}</div>
                <div class="type nobles-count">{{ board.getNobles() }} </div>
                <div class="type poison-count">{{ board.getPoison() }} </div>
                <div class="type favorite-count">{{ board.getFavorite() }} </div>
                <div class="type millitaire-count">{{ board.getMillitaire() }} </div>
                <div class="type hommes-detat-count">{{ board.getHommedEtat() }}</div>
                <div class="type clerge-count">{{ board.getClerge() }} </div>
            </div>


            <div class="metiers">
                <span class="metier jardiniers-count">{{ board.getJardiniers() }} </span>
                <span class="metier peintres-count">{{ board.getPeintres() }} </span>
                <span class="metier architectes-count">{{ board.getArchitectes() }} </span>
                <span class="metier ecrivains-count">{{ board.getEcrivains() }} </span>
                <span class="metier musiciens-count">{{ board.getMusiciens() }} </span>

            </div>
        </div>

        <div class="main-board">

            <div class="score-header">
                <div class="score">
                {{ board.getScore() }}
                </div>
                <div class="reset-button" @click="resetAll()"></div>
            </div>
 

            <div class="row" v-for="(row, rowIndex) in board.getTableau()">
                <TileComponent v-for="(tile, colIndex) in row" :tile="tile" :board="(board as Board)" />
            </div>

            <div class="boards-mod">
                <div class="mod reynie" @click="switchReynie()" :class="board.reynieActivated ? 'activated':'desactivated'">
                </div>
                <div class="mod louis" @click="switchLouis()" :class="board.louisActivated ? 'activated':'desactivated'">
                </div>
                <div class="mod jeton-3-pts" @click="switchBonus3()" :class="board.bonus3 ? 'activated':'desactivated'">
                </div>
                <div class="mod jeton-7-pts" @click="switchBonus7()" :class="board.bonus7 ? 'activated':'desactivated'">
                </div>
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

    function switchLouis() {
        board.value.louisActivated = !board.value.louisActivated;
    }

    function resetAll() {
        board.value.reset();
    }
    
    function switchBonus3() {
        if(board.value.bonus7) {
            board.value.bonus7 = false;
        }
        board.value.bonus3 = !board.value.bonus3;
    }
    function switchBonus7() {
        if(board.value.bonus3) {
            board.value.bonus3 = false;
        }
        board.value.bonus7 = !board.value.bonus7;
    }

    
</script>

<style scoped>
    * {
        font-family: FogtwoNo5;
    }

    b {
        font-weight: bold;
    }

    .score-header{
        position: relative;
    }

    .score {
        background: url('../assets/icons/cercle-point-de-victroire.png');
        background-size: 60px;
        width: 100%;
        padding: 0.2em;
        text-align: center;
        background-repeat: no-repeat;
        height: 60px;
        background-position: center;
        color: #e1ca98;
        font-size: 2em;
        font-weight: bold;
    }

    .reset-button {
        position: absolute;
        top: 50%;
        height: 100%;
        width: 40px;
        background-image: url('../assets/icons/Icon-reset.png');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
        right: 0;
        transform: translate(0, -50%);
    }

    .cour-summary {
        justify-content: center;
        align-self: center;
        flex-grow: 1;
        min-width: 300px;
    }

    .board {
        display: flex;
        border-radius: 5px;
        text-align: center;
        flex-wrap: wrap;
        justify-content: space-around;

        @media screen and (min-width: 1200px) {
            width: 1200px;
        }

        .main-board {
            justify-content: center;
            width: 100%;
            max-width: 500px;
        }

        .row {
            display: grid;
            position: relative;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            width: 100%;
            max-width: 500px;
            margin: 5px auto;
        }

        .types {
            display: flex;
             justify-content: center;

            .type {
                height: 90px;
                width: 15%;
                max-width: 65px;
                background-repeat: no-repeat;
                background-position: bottom;
                background-size: 80%;
                font-family: FogtwoNo5;
                font-size: 2em;
            }

            .erudits-count {
                background-image: url('../assets/icons/erudit.png');

            }

            .nobles-count {
                background-image: url('../assets/icons/noblesse.png');
            }

            .favorite-count {
                background-image: url('../assets/icons/favorite.png');
            }

            .millitaire-count {
                background-image: url('../assets/icons/militaire.png');
            }

            .poison-count {
                background-image: url('../assets/icons/poison.png');
            }

            .hommes-detat-count {
                background-image: url('../assets/icons/homme-detat.png');
            }

            .clerge-count {
                background-image: url('../assets/icons/clerge.png');
            }
        }


        .metiers {
            margin-top: 1em;
            margin-bottom: 1em;
            display: flex;
            justify-content: center;

            .metier {
                height: 90px;
                width: 15%;
                max-width: 65px;
                background-repeat: no-repeat;
                background-position: bottom;
                background-size: 80%;
                font-family: FogtwoNo5;
                font-size: 2em;
            }

            .jardiniers-count {
                background-image: url('../assets/icons/jardinier.png');

            }

            .peintres-count {
                background-image: url('../assets/icons/peintre.png');
            }

            .architectes-count {
                background-image: url('../assets/icons/architecte.png');
            }

            .ecrivains-count {
                background-image: url('../assets/icons/ecrivains.png');
            }

            .musiciens-count {
                background-image: url('../assets/icons/compositeur.png');
            }

        }
    }

    .boards-mod {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;

        .mod {
            width: 60px;
            height: 60px;
            background-size: 100%;
            background-repeat: no-repeat;
            cursor: pointer;
            border-radius: 5px;
            padding: 5px;
            margin: 0 10px;

            &.reynie{
                background-image: url('../assets/icons/reynie.png');
                &.desactivated {
                    background-image: url('../assets/icons/reynie-nb.png');
                }
            }

            &.louis{
                background-image: url('../assets/icons/louis-II.png');
                &.desactivated {
                    background-image: url('../assets/icons/louis-II-nb.png');
                }
            }

            &.jeton-3-pts{
                background-image: url('../assets/icons/jeton-3-points.png');
                &.desactivated {
                     filter: grayscale(1);
                }
            }
            
            &.jeton-7-pts{
                background-image: url('../assets/icons/jeton-7-points.png');
                &.desactivated {
                     filter: grayscale(1);
                }
            }
        }
    }

    .title {
        width: 100%;
        background-image: url('../assets/bandeau-ma-cour.png');
        background-size: contain;
        min-height: 125px;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>