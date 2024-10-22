<template>
  <IonPage>
    <IonContent>
      <div id="container">
        <div id="header">
          <HeaderComp />
        </div>
        <div id="community-container">
          <CommunityComp />
        </div>
        <div id="footer">
          <FooterComp />
        </div>          
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import HeaderComp from '@/components/header/HeaderComp.vue';
import FooterComp from '@/components/footer/FooterComp.vue';
import CommunityComp from '@/components/community/CommunityComp.vue';

</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
}

#community-container {
  flex: 1; 
  display: flex;
  justify-content: center; 
  align-items: center; 
}

</style>
