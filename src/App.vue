<template>
	<h1>{{ msg }}</h1>
	<TheHeader />
</template>

<script>
  import TheHeader from './components/TheHeader.vue';

  export default {
    components: {
      TheHeader
    },
    data() {
      return {
        msg: 'test vue',
      };
    },
  };
</script>
