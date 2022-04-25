<script>
import InputArea from '@/components/InputArea.vue'
import PostBox from '@/components/PostBox.vue';

export default {
  components: {
    InputArea,
    PostBox
  },
  setup() {
    
  }
}

</script>

<template>
  <main>
    <InputArea />
    <PostBox />
    <Toast />    
  </main>
</template>

<style lang="scss">  

</style>
