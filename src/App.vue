<template>
  <v-app>
  <transition name="fade">
    <router-view></router-view>
  </transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      //
    }
  }
}
</script>
