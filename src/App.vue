<template>
  <div v-if="loading">
    <div class="sidebar">
      <Sidebar v-if="show" />
      <div class="content position-relative">
        <Header v-if="show"  />
        <RouterView :class="{'m-3':show}" />

        <div v-if="show"><Footer /></div>
      </div>
    </div>
  </div>
  <div v-else>
    <BContainer fluid>
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
    </BContainer>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const Header = defineAsyncComponent(() => import("@/components/common/Header.vue"));
const Sidebar = defineAsyncComponent(() => import("@/components/common/Sidebar.vue"));
const Footer = defineAsyncComponent(() => import("@/components/common/Footer.vue"));
const route = useRoute();

const show = computed(() => {
  // Show footer only on the dashboard route
  return (
    route.meta.requireAuth && route.name !== "Logout" && route.name !== "NotAuthorize"
  );
});

const loading = ref(false); // Initially set loading to true
// Simulate an asynchronous operation
setTimeout(() => {
  loading.value = true; // Set loading to false after a delay
}, 200);
</script>
<style scoped>
.sidebar {
  display: flex;
}

.sidebar .content {
  flex: 1 1 0;
}
</style>
