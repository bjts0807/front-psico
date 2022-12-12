<template>
    <div class="app">
      <HeaderComponent />
    <SidebarComponent/>
    <div class="pc-container">
      <div class="pc-content">
          <router-view />
      </div>
    </div>
    <FooterComponent />
    </div>
</template>

<script>

import SidebarComponent from '../views/partes/SidebarComponent';
import FooterComponent from '../views/partes/FooterComponent';
import HeaderComponent from '../views/partes/HeaderComponent';
export default {
  name: 'AppLayout',
  components: {
    SidebarComponent,FooterComponent,HeaderComponent
  },
}

</script>

