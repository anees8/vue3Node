<template>
    <div class="menu-item" :class="{ expanded: expanded }">
    <RouterLink
      v-if="name"
      class="nav-link text-dark"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      v-bind:title="label"
      v-on:click="toggleMenu()"
      v-bind:to="{ name: name }"
    >
      <div class="label d-flex align-items-center justify-content-between">
        <div>
          <font-awesome-icon class="me-4" v-if="icon && !smallMenu" :icon="icon" />
          <font-awesome-icon v-if="icon && smallMenu" :icon="icon" class="ms-2" />

          <span  :class="{ 'd-none': smallMenu }">{{ label }} </span>
        </div>
        <div v-if="data ? data.length > 0 : false" class="right">
          <font-awesome-icon
            class="ms-2"
            :class="{ 'fa-rotate-180 ': expanded }"
            icon="chevron-down"
          />
        </div>
      </div>
    </RouterLink>

    <li
      v-else
     
      class="nav-link text-dark"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      v-bind:title="label"
      v-on:click="toggleMenu()"
    >
      <div class="label d-flex align-items-center justify-content-between">
        <div>
          <font-awesome-icon class="me-4" v-if="icon && !smallMenu" :icon="icon" />
          <font-awesome-icon v-if="icon && smallMenu" :icon="icon" class="ms-2" />

          <span :class="{ 'd-none': smallMenu }">{{ label }} </span>
        </div>
        <div v-if="data ? data.length > 0 : false" class="right">
          <font-awesome-icon
            class="ms-2"
            :class="{ 'fa-rotate-180 ': expanded }"
            icon="chevron-down"
          />
        </div>
      </div>
    </li>
    <div
      v-show="showChildren"
      class="items-container"
      :class="{ 'small-menu': smallMenu }"
      ref="containerRef"
      :style="{ height: containerHeight }"
    >
      <menu-item
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :icon="item.icon"
        :name="item.name"
        :depth="depth + 0"
        :data="item.children"
        :smallMenu="smallMenu"
      ></menu-item>
    </div>
   
  </div>
</template>
<script setup>
import { ref ,nextTick  } from 'vue';



const props = defineProps({
    smallMenu: Boolean,
    label: String,
    icon: String,
    depth:Number,
    name:String,
    data:Array,
});

const expanded = ref(false);
const showChildren = ref(false);
const containerHeight = ref(0);
const containerRef = ref(null);


const toggleMenu = () => {
  expanded.value = !expanded.value;
  
  if (!showChildren.value) {
    showChildren.value = true;
    nextTick(() => {
      containerHeight.value = `${containerRef.value.scrollHeight}px`;
      containerHeight.value = 'fit-content';
      containerRef.value.style.overflow = 'visible';
    });
  } else {
    containerRef.value.style.overflow = 'hidden';
    containerHeight.value = `${containerRef.value.scrollHeight}px`;
    containerHeight.value = '0px';
    showChildren.value = false;
  }
};
   





</script>
<style scoped>
.menu-item {
	 position: relative;
	 width: 100%;
}
 .menu-item .router-link-exact-active > div {
	 background-color: #27374D;
	 cursor: pointer;
}
 .menu-item .router-link-exact-active .label {
	 color: #DDE6ED;
}
 .menu-item .router-link-exact-active .label font-awesome-icon {
	 color: #DDE6ED;
}
 .menu-item .label {
	 white-space: nowrap;
	 user-select: none;
	 height: 3rem;
	 padding: 0 1.25rem;
	 box-sizing: border-box;
	 color:#27374D;
}
 .menu-item .label font-awesome-icon {
	 padding-right: 0.2rem;
	 font-size: 1.5rem;
	 color: #27374D;
	 transition: all 0.3s ease;
}
 .menu-item .label font-awesome-icon.expand {
	 font-size: 1.5rem;
	 color: #27374D;
}
 .menu-item .label font-awesome-icon.expand.expanded {
	 transform: rotate(180deg);
}
 .menu-item .label:hover {
	 transition: all 0.5s ease;
	 background-color: #27374D;
	 color: #DDE6ED;
	 cursor: pointer;
}
 .menu-item .label:hover font-awesome-icon {
	 color: #DDE6ED;
}
 .menu-item .label.small-menu {
	 transition: all 0.5s ease;
	 width: fit-content;
}
 .menu-item .items-container {
	 transition: all 0.5s ease;
}
 .menu-item .items-container.small-menu {
	 transition: all 0.5s ease;
	 position: relative;
}
 .menu-item .items-container.small-menu .label {
	 width: 100%;
}
 
</style>