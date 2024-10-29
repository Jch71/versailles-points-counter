<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import PWAInstallComponent from './components/PWAInstallComponent.vue';


</script>

<template>
    <PWAInstallComponent/>
      <main>
        <router-view></router-view>
      </main>
    <FooterComponent/>
</template> 