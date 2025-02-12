<script setup lang="ts">
    import {
        onMounted,
        ref
    } from 'vue';

    const installPromptEvent = ref < any > ();
    const showInstallButton = ref < boolean > (true)

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

    function hideInstallButton(event ? : Event): void {
        showInstallButton.value = false;
        event?.stopPropagation();
    }
</script>



<template>
    <header @click="installPWA" v-if="installPromptEvent && showInstallButton">
        Vous pouvez installer cette application directement sur votre appareil en cliquant ici. 
        <button @click="hideInstallButton($event)" class="close-button">
        </button>
    </header>
</template>


<style scoped>
    header {
        border-radius: 8px;
        background-color: #e1ca98;
        /* height: 50px; */
        padding: 5px;
        border: solid 3px black;
        color: var(--vt-c-text-light-1);
        margin: 5px;
        margin-top: 10px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        vertical-align: middle;

        button.close-button {
            position: absolute;
            top: -10px;
            right: -10px;
            border: none;
            height: 30px;
            width: 30px;
            cursor: pointer;
            background: none;
            background-image: url('../assets/icons/Icon-reset-global.png');
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
</style>