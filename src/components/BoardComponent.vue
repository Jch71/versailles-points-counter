<template>
    <ModalComponent v-model:opened="modalOpened"/>
    <div class="board">
        
        <div class="cour-summary">
            <div class="title" @click="isOpened = !isOpened">
                <img src="../assets/bandeau-ma-cour.png" alt="">
            </div>
            <div class="summary" :class="isOpened?'opened':'' ">
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

            <div class="other">
                <span class="metier hommes-count">{{ board.getHommes() }} </span>
                <span class="metier femmes-count">{{ board.getFemmes() }} </span>
                <span class="metier eclairs-count">{{ board.getEclairs() }} </span>
            </div>

            


            </div>
            
        </div>

        <div class="main-board">

            <div class="score-header">
                <div class="info-button" @click="openInfoModal()">
                    
                </div>
                <div class="score">
                {{ board.getScore() }}
                </div>
                <div class="reset-button" @click="resetAll()"></div>
            </div> 

            <div class="row" v-for="(row, rowIndex) in board.getTableau()">
                <TileComponent v-for="(tile, colIndex) in row" :tile="tile" :board="(board as Board)" />
            </div>

            <div class="types fenelon" v-if="board.isPresent(43)">
                <div class="type erudits-count" :class="board.fenelonResource['erudit'] ? '':'inactive'" @click="addFenelonResource('erudit')"></div>
                <div class="type nobles-count" :class="board.fenelonResource['noble'] ? '':'inactive'" @click="toggleFenelonProperty('isNoble'); addFenelonResource('noble')"> </div>
                <div class="type poison-count" :class="board.fenelonResource['poison'] ? '':'inactive'" @click="toggleFenelonProperty('isPoison'); addFenelonResource('poison')"> </div>
                <div class="type favorite-count" :class="board.fenelonResource['favorite'] ? '':'inactive'" @click="toggleFenelonProperty('isFavorite'); addFenelonResource('favorite')"> </div>
                <div class="type millitaire-count" :class="board.fenelonResource['millitaire'] ? '':'inactive'" @click="toggleFenelonProperty('isMillitaire'); addFenelonResource('millitaire')"> </div>
                <div class="type hommes-detat-count" :class="board.fenelonResource['homme-detat'] ? '':'inactive'" @click="toggleFenelonProperty('isHommedEtat'); addFenelonResource('homme-detat')"></div>
                <div class="type clerge-count" :class="board.fenelonResource['clerge'] ? '':'inactive'" @click="addFenelonResource('clerge')"> </div>
            </div>

            
            <div class="boards-mod">
                <div class="mod jeton-moins-7 millitaire" @click="switchBonusMoins7()" :class="board.bonusMoins7 ? 'activated':'desactivated'">
                </div>
                <div class="mod jeton-moins-3 millitaire" @click="switchBonusMoins3()" :class="board.bonusMoins3 ? 'activated':'desactivated'">
                </div>
                <div class="mod jeton-3-pts millitaire" @click="switchBonus3()" :class="board.bonus3 ? 'activated':'desactivated'">
                </div>
                <div class="mod jeton-7-pts millitaire" @click="switchBonus7()" :class="board.bonus7 ? 'activated':'desactivated'">
                </div>
                
            </div>
            <div class="boards-mod">
                <div class="mod reynie" @click="switchReynie()" :class="board.reynieActivated ? 'activated':'desactivated'">
                </div>
                <div class="mod louis" @click="switchLouis()" :class="board.louisActivated ? 'activated':'desactivated'">
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
    import ModalComponent from './ModalComponent.vue';
import type Card from '@/model/Card';

    const board = ref < Board > (new Board());
    const modalOpened = ref<boolean> (false);
    const isOpened = ref<boolean> (true);
        
    

    function switchReynie() {
        board.value.reynieActivated = !board.value.reynieActivated;
    }

    function switchLouis() {
        board.value.louisActivated = !board.value.louisActivated;
    }

    function openInfoModal() {
        modalOpened.value = true;
    }

    function hideModal() {
        modalOpened.value = false;
    }

    function resetAll() {
        board.value.reset();
    }

    function addFenelonResource(type:string)  {
        board.value.fenelonResource[type] = !board.value.fenelonResource[type];
    }

    function toggleFenelonProperty(property: keyof Card) {
    let card = board.value.getCardById(43)!;
    switch (property) {
        case 'isNoble':
        case 'isPoison':
        case 'isMillitaire':
        case 'isFavorite':
        case 'isHommedEtat':
            card[property] = !card[property] as boolean;
            break;
        default:
            break;
    }
}

    
    
    function switchBonus3() {
        board.value.bonusMoins7 = false;
        if(board.value.bonus7) {
            board.value.bonus7 = false;
        }
        if(board.value.bonusMoins3) {
            board.value.bonusMoins3 = false;
        }
        board.value.bonus3 = !board.value.bonus3;
    }
    function switchBonus7() {
        board.value.bonusMoins3 = false;
        if(board.value.bonus3) {
            board.value.bonus3 = false;
        }
        if(board.value.bonusMoins7) {
            board.value.bonusMoins7 = false;
        }
        board.value.bonus7 = !board.value.bonus7;
    }

    function switchBonusMoins3() {
        board.value.bonus7 = false;
        if(board.value.bonusMoins7) {
            board.value.bonusMoins7 = false;
        }
        if(board.value.bonus3) {
            board.value.bonus3 = false;
        }
        board.value.bonusMoins3 = !board.value.bonusMoins3;
    }
    function switchBonusMoins7() {
        board.value.bonus3 = false;
        if(board.value.bonusMoins3) {
            board.value.bonusMoins3 = false;
        }
        if(board.value.bonus7) {
            board.value.bonus7 = false;
        }
        board.value.bonusMoins7 = !board.value.bonusMoins7;
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
        display: flex;
        justify-content: space-between;
        align-items: center;

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

        .reset-button, .info-button{
            height: 100%;
            width: 40px;
            min-height: 40px;
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            cursor: pointer;
        }

        .info-button {
            background-image: url('../assets/icons/Icon-info.png');
        }

        .reset-button {
            background-image: url('../assets/icons/Icon-reset-global.png');
        }


    }
 

    .cour-summary {
        justify-content: center;
        align-self: center;
        flex-grow: 1;
        max-width: 500px;
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
            gap: 4px;
            width: 100%;
            max-width: 500px;
            margin: 3px auto;
        }

        .summary {
            transition: all 0.3s ease-in-out;
            max-height: 0;
            overflow: hidden;
        }

        .summary.opened {
            max-height: 255px;
        }

        .types {
            display: flex;
             justify-content: center;

             &.fenelon {
                margin-bottom: 10px;
                margin-top: 5px;
                background-color: #e1ca98;
                border-radius: 8px;
                .type{
                background-position: center;
                    cursor: pointer;
                    height: 45px;
                    width: 12%;
                    &.inactive {
                        filter: grayscale(1);
                    }
                }
             }

            .type {
                height: 82px;
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


        .metiers, .other {
            display: flex;
            justify-content: center;

            .metier {
                height: 85px;
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

            .hommes-count {
                background-image: url('../assets/icons/genre-homme.png');
            }

            .femmes-count {
                background-image: url('../assets/icons/genre-femme.png');
            }

            .eclairs-count {
                background-image: url('../assets/icons/eclair.png');
            }

        }

        .other {
            margin-bottom: 0.5em;
        }
    }

    .boards-mod {
       
        &:first-child {
            margin-top: 10px;
        }
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        .mod {
            width: 60px;
            height: 40px;
            background-size: 100%;
            background-repeat: no-repeat;
            cursor: pointer;
            border-radius: 5px;
            padding: 5px;
            margin: 0 10px;
            outline:none;
            --webkit-tap-highlight-color: transparent;
            background-position: center;

            &.millitaire {
                width: 25% ;
            }

            &.reynie{
                background-image: url('../assets/icons/reynie.png');
                width: 100px;
                &.desactivated {
                     filter: grayscale(1);
                }
            }

            &.louis{
                background-image: url('../assets/icons/louis-II.png');
                width: 100px;
                &.desactivated {
                     filter: grayscale(1);
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
            &.jeton-moins-3{
                background-image: url('../assets/icons/jeton-moins-3.png');
                &.desactivated {
                     filter: grayscale(1);
                }
            }
            
            &.jeton-moins-7{
                background-image: url('../assets/icons/jeton-moins-7.png');
                &.desactivated {
                     filter: grayscale(1);
                }
            }
        }
    }

    .title {
        cursor: pointer;
        width: 100%;
        img{
            width: 100%;
        }
    }


    
</style>