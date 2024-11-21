<template>
  <div class="list-container">    
    <button class="back-button" @click="goBack">
      <span class="arrow">←</span> Retour
    </button>
    <h1>Liste des Cartes</h1>
    
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher par nom, id"
      class="search-bar"
    />
    <div class="filter-buttons">
      <div class="types">
        <div class="type erudits" :class="{ selected: selectedType.includes('isErudit') }" @click="filterByType('isErudit')"></div>
        <div class="type nobles" :class="{ selected: selectedType.includes('isNoble') }" @click="filterByType('isNoble')"></div>
        <div class="type poison" :class="{ selected: selectedType.includes('isPoison') }" @click="filterByType('isPoison')"></div>
        <div class="type favorite" :class="{ selected: selectedType.includes('isFavorite') }" @click="filterByType('isFavorite')"></div>
        <div class="type millitaire" :class="{ selected: selectedType.includes('isMillitaire') }" @click="filterByType('isMillitaire')"></div>
        <div class="type hommes-detat" :class="{ selected: selectedType.includes('isHommedEtat') }" @click="filterByType('isHommedEtat')"></div>
        <div class="type clerge" :class="{ selected: selectedType.includes('isClerge') }" @click="filterByType('isClerge')"></div>
      </div>
      
      <div class="metiers">
        <span class="metier jardiniers" :class="{ selected: selectedType.includes('isJardinier') }" @click="filterByType('isJardinier')"></span>
        <span class="metier peintres" :class="{ selected: selectedType.includes('isPeintre') }" @click="filterByType('isPeintre')"></span>
        <span class="metier architectes" :class="{ selected: selectedType.includes('isArchitecte') }" @click="filterByType('isArchitecte')"></span>
        <span class="metier ecrivains" :class="{ selected: selectedType.includes('isEcrivain') }" @click="filterByType('isEcrivain')"></span>
        <span class="metier musiciens" :class="{ selected: selectedType.includes('isMusicien') }" @click="filterByType('isMusicien')"></span>
        <span class="metier sculpteurs" :class="{ selected: selectedType.includes('isSculpteur') }" @click="filterByType('isSculpteur')"></span>
      </div>
      
      <div class="other">
        <span class="metier hommes" :class="{ selected: selectedType.includes('isHomme') }" @click="filterByType('isHomme')"></span>
        <span class="metier femmes" :class="{ selected: selectedType.includes('isFemme') }" @click="filterByType('isFemme')"></span>
        <span class="metier eclairs" :class="{ selected: selectedType.includes('hasEffect') }" @click="filterByType('hasEffect')"></span>
      </div>

      <div class="other">
        <span class="metier reset" @click="clearFilters()"></span>
      </div>

      <div class="cards-number">
       <span class="number"> {{ filteredCards.length }}</span> carte(s) correspondante(s).
      </div>
    </div>
    
    <transition-group name="card-list-transition" tag="div" class="cards-list">
      <div :key="card.id" v-for="card in filteredCards" class="card-item">
        <card-component :card="card" :in-list="true"/>
        <div class="card-score" v-if="card">
          {{ card?.value }}
         </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import cardsList from '@/assets/cardsList.json';
import { onMounted, ref, computed } from 'vue';
import Card from '@/model/Card';
import { useRouter } from 'vue-router';

export default {
  components: {
    CardComponent,
  },
  setup() {
    const router = useRouter();

const goBack = () => {
  // Scroller en haut de la page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Naviguer vers la route "/"
  router.push('/');
};


    const searchQuery = ref("");
    const selectedType = ref<string[]>([]); // Utiliser un tableau pour les types sélectionnés
    const cards = ref<Card[]>([]); 
    
    const filteredCards = computed(() => {
  return cards.value.filter((card: Card) => {
    const matchesSearch = (card.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) && card.id < 100) || card.id == searchQuery.value || false;

    // Vérifie que la carte correspond à tous les types sélectionnés
    const matchesType = selectedType.value.length === 0 || selectedType.value.every(type => card[type as keyof Card]);

    return matchesSearch && matchesType;
  });
});
    
    const filterByType = (type: string) => {
      const index = selectedType.value.indexOf(type);
      if (index === -1) {
        selectedType.value.push(type); // Ajouter le type s'il n'est pas déjà présent
      } else {
        selectedType.value.splice(index, 1); // Retirer le type s'il est déjà présent
      }
    };
    
    const clearFilters = () => {
      selectedType.value = [];
      searchQuery.value = ""; // Réinitialiser aussi la requête de recherche
    };
    
    onMounted(() => {
      cardsList.forEach((obj)=> {
        cards.value.push(new Card(obj));
      });
    });
    
    return {
      goBack,
      searchQuery,
      selectedType,
      filteredCards,
      filterByType,
      clearFilters,
    };
  },
};
</script>

<style lang="scss">

.list-container {
  min-width: 1280px;
  text-align: center;
}

.cards-list {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de revenir à la ligne si l'espace est insuffisant */
  padding: 0;
  gap: 10px;
  .card-item {
    position: relative;
    flex: 1 1 calc(20% - 20px); /* Chaque carte prend 1/3 de la largeur moins l'espace entre les cartes */
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 1em;
    .card-container {
      height: 300px; /* Par exemple, fixe la hauteur à 300px */
      overflow: hidden;
      background: none;
      .card-image {
        height: 100%;
        object-fit: contain; /* L'image remplira le conteneur sans distorsion */
        aspect-ratio: 63/88;    
      }
      
    }
  }
}


@media (max-width: 1024px) {
  .list-container {
    min-width: 800px;
  }
  .cards-list .card-item {
    flex: 1 1 calc(33% - 20px); /* Sur les écrans plus petits, chaque carte prend 50% de la largeur */
  }
}

@media (max-width: 768px) {
  .list-container {
    min-width: 100vw;
  }
  .cards-list .card-item {
    flex: 1 1 calc(100% - 20px); /* Sur les petits écrans, chaque carte prend 100% de la largeur */
  }
}

.card-list-transition-enter-active, .card-list-transition-leave-active {
  transition: all 0.5s ease;
}

.card-list-transition-enter-from {
  opacity: 0;
  transform: translateY(20px); /* L'élément vient d'en bas */
}

.card-list-transition-enter-to {
  opacity: 1;
  transform: translateY(0); /* L'élément revient à sa position */
}

.card-list-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.card-list-transition-leave-to {
  opacity: 0;
  transform: translateY(20px); /* L'élément descend quand il disparaît */
}


.list-container{
  

.types {
  display: flex;
  justify-content: center;
  
  &.fenelon {
    margin: 5px 0;
    background-color: #e1ca98;
    border-radius: 8px;
    .type{
      background-position: center;
      height: 45px;
      width: 12%;
      &.inactive {
        filter: grayscale(1);
      }
    }
  }
  
  .type {
    cursor: pointer;
    height: 52px;
    width: 15%;
    max-width: 52px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    font-family: FogtwoNo5;
    font-size: 2em;
  }

  .selected{
      border: solid 2px var(--color-text);
      box-shadow: 0 2px 5px var(--color-text); /* Ombre douce */
      border-radius: 50%;
  }
  
  .erudits {
    background-image: url('../assets/icons/icon-erudit.png');
  }
  
  .nobles {
    background-image: url('../assets/icons/icon-noble.png');
  }
  
  .favorite {
    background-image: url('../assets/icons/icon-favorite.png');
  }
  
  .millitaire {
    background-image: url('../assets/icons/icon-militaire.png');
  }
  
  .poison {
    background-image: url('../assets/icons/icon-poison.png');
  }
  
  .hommes-detat {
    background-image: url('../assets/icons/icon-homme-detat.png');
  }
  
  .clerge {
    background-image: url('../assets/icons/icon-clerge.png');
  }
}


.metiers, .other {
  display: flex;
  justify-content: center;
  .metier {
    height: 55px;
    cursor: pointer;
    width: 15%;
    max-width: 55px;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    font-family: FogtwoNo5;
    font-size: 2em;
  }
 
  .selected{
      border: solid 2px var(--color-text);
      box-shadow: 0 2px 5px var(--color-text); /* Ombre douce */
      border-radius: 50%;
  }
  
  .jardiniers {
    background-image: url('../assets/icons/jardinier.png');
    
  }
  
  .peintres {
    background-image: url('../assets/icons/peintre.png');
  }
  
  .architectes {
    background-image: url('../assets/icons/architecte.png');
  }
  
  .ecrivains {
    background-image: url('../assets/icons/ecrivains.png');
  }
  
  .musiciens {
    background-image: url('../assets/icons/compositeur.png');
  }
  
  .sculpteurs {
    background-image: url('../assets/icons/sculpteur.png');
  }
  
  .hommes {
    background-image: url('../assets/icons/genre-homme.png');
  }
  
  .femmes {
    background-image: url('../assets/icons/genre-femme.png');
  }
  
  .eclairs {
    background-image: url('../assets/icons/eclair.png');
  }

  .reset {
    background-image: url('../assets/icons/Icon-reset-global.png');
  }
  
}

.other {
  margin-bottom: 0.5em;
}

.search-bar {
  width: 100%; /* Prend toute la largeur disponible */
  max-width: 400px; /* Limite la largeur maximale */
  padding: 10px 15px; /* Espacement interne */
  border: 1px solid #ccc; /* Bordure légère */
  border-radius: 25px; /* Coins arrondis */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre douce */
  font-size: 16px; /* Taille de la police */
  transition: all 0.3s ease; /* Transition pour les effets au survol */
  margin-bottom: 20px;
  
  /* Styles de focus */
  &:focus {
    outline: none; /* Supprime le contour par défaut */
    border-color: #e1ca98; /* Change la couleur de la bordure au focus */
    box-shadow: 0 0 5px #e1ca98; /* Ombre au focus */
  }

  /* Styles pour le texte */
  &::placeholder {
    color: #aaa; /* Couleur du texte de l'espace réservé */
    opacity: 1; /* Opacité */
    transition: color 0.3s ease; /* Transition de couleur pour l'espace réservé */
  }

  /* Couleur du texte de l'espace réservé au focus */
  &:focus::placeholder {
    color: transparent; /* Cache le texte de l'espace réservé au focus */
  }
}

}

.back-button {
  background-color: #e1ca98; /* Couleur de fond */
  color: var(--vt-c-text-light-1); /* Couleur du texte */
  border: none; /* Pas de bordure */
  border-radius: 5px; /* Coins arrondis */
  padding: 10px 20px; /* Espace interne */
  font-size: 16px; /* Taille de police */
  cursor: pointer; /* Curseur en forme de main au survol */
  display: flex; /* Pour aligner l'icône et le texte */
  align-items: center; /* Alignement vertical */
  margin: 10px; /* Marge autour du bouton */
}

.back-button .arrow {
  margin-right: 8px; /* Espacement entre l'icône et le texte */
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
    font-family: FogtwoNo5;
  }

.cards-number{
  margin-bottom: 10px;
  .number {
    font-size: 1.5em;
    font-weight: bold
  }
}
</style>
