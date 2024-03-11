<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BoardComponent from './components/BoardComponent.vue';

const installPromptEvent = ref<any>();
const showInstallButton = ref<boolean>(true)

onMounted(() => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    showInstallButton.value = false;
  }
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
      Cliquez ici pour installer l'application
      <button @click="hideInstallButton($event)" class="close-button">
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
    border-radius: 8px;
    background-color: beige;
    height: 50px;
    border: solid 1px grey;
    color: var(--vt-c-text-light-1);
    margin: 5px;
    margin-top: 10px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;

    button.close-button{
      position:absolute;
      top: -10px;
      right: -10px;
      border: none;
      height: 30px;
      width: 30px;
      cursor: pointer;
      background: none;
      background-image: url('./assets/icons/Icon-reset-global.png');        
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

</style>