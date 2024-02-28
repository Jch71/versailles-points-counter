<template>
    <div class="card-container" v-if="card">
        <div class="id">
            {{ card!.id }}
        </div>
        <div class="name">
            {{ card!.name }}
        </div>
    </div>
    
</template>

<script setup lang="ts">
import Card from '@/model/Card';

const props = defineProps({
  card: Card
})
</script>

<style>
.card-container {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px lightgreen;
    border-radius: 5px;
    .id{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 0.8em;
        padding: 2px 5px;
        background: lightgreen;
        border-radius: 2px;
        color: black;
    } 
}
</style>