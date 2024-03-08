<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BoardComponent from './components/BoardComponent.vue';

const installPromptEvent = ref<any>();
const showInstallButton = ref<boolean>(true)

onMounted(() => {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installPromptEvent.value = event;
      });
    });

    function installPWA(): any {
      if (installPromptEvent.value) {
        installPromptEvent.value.prompt();

        installPromptEvent.value.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('L\'utilisateur a accepté l\'installation');
          } else {
            console.log('L\'utilisateur a refusé l\'installation');
          }
          hideInstallButton();
          // Réinitialise l'événement pour éviter de le montrer à nouveau
          installPromptEvent.value = null;
        });
      }
    };

    function hideInstallButton(event?: Event):void {
      showInstallButton.value = false;
      event?.stopPropagation();
    }

</script>

<template>
  <header @click="installPWA" v-if="installPromptEvent && showInstallButton">
      Installer l'application
      <button @click="hideInstallButton($event)">
        Non
      </button>
  </header>
  <main>
    <BoardComponent/>
  </main>
  <footer>
    © 2024 
    <a href="https://www.chevre-edition.com/" target="_blank">Chèvre Edition</a> - <a href="mailto:blandinleo@gmail.com">Signaler un problème</a>
  </footer>

  
</template>

<style scoped>
  header {
    text-align: center;
    height: 30px;
    border: solid 1px grey;
    margin: 5px;
    cursor: pointer;
  }

</style>
