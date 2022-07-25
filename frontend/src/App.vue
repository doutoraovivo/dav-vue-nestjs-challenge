<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
  beforeMount() {
    document.body.querySelector('#globalLoader').remove();
  }
};
</script>

