<template>
  <div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {getBtmInfo} from '@/api/certification'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'Home',
  setup(){
    const store = useStore()
    console.log('-------store-------',store)
    getBtmInfo({}).then(res=>{
      console.log(res)
    })
  }
});
</script>
