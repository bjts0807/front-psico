<template>
    <HeaderComponent v-if="showHeader"/>
    <SidebarComponent v-if="showSidenav"/>
    <div class="pc-container">
      <div class="pc-content">
          <router-view />
      </div>
    </div>
    <FooterComponent v-show="showFooter"/>
</template>

<script>
import SidebarComponent from './views/partes/SidebarComponent';
import FooterComponent from './views/partes/FooterComponent';
import HeaderComponent from './views/partes/HeaderComponent';
import { mapState } from "vuex";
export default {
  name: 'App',
  components: {
    SidebarComponent,FooterComponent,HeaderComponent
  },
  async created() {
    await this.$store.dispatch("currentUser");
  },
  computed: {
    ...mapState([
      "showSidenav",
      "showHeader",
      "showFooter"
    ]),
    ...mapState(['is_logged', 'user']),
  },
}
</script>

