<template>
<div class="container-fluid">
<div class="row align-items-center justify-content-center vh-100">
<div class="col-12 col-md-3 p-5">
<div class="text-center">
<div class="d-flex mb-4 mt-2 align-items-center justify-content-center">
<div>
<div class="d-flex align-items-center">
<strong>Loading...</strong>
<b-spinner class="ml-auto"></b-spinner>
</div>
</div>
</div>
<div></div>
</div>
</div>
</div>
</div>
</template>
<script setup>
import { onMounted } from "vue";
import { useLoginStore } from "../stores/loginStore.js";
const { removeToken } = useLoginStore();
onMounted(() => {
  setTimeout(function () {
    removeToken();
  }, 500);
});

</script>
  

  