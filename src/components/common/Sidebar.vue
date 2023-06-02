<template>
  <aside class="bg-light" :class="{ 'small-menu': smallMenu }">
    <div
      @click="smallMenu = !smallMenu"
      class="logo d-flex justify-content-between align-items-center "
    >
    

      <div class="d-flex ">

        <span class="placeholder col-12 "  style="height:3rem;width:3rem"></span>
        <span class="placeholder col-12 ms-2" :class="{ 'd-none': smallMenu }" style="height:3rem;width:150px"></span>
      </div>
     
      <div>
        <font-awesome-icon
          class="text-dark ms-1"
          icon="chevron-left"
          :class="{ 'fa-rotate-180 ': smallMenu }"
        />
      </div>
    </div>

    <hr class="m-0" />
    <div class="menu-items">    <MenuItem
      v-for="(item, index) in menuTree"
      :key="index"
      :label="item.label"
      :icon="item.icon"
      :name="item.name"
      :depth="0"
      :Permissions="item.Permissions"
      :data="item.children"
      :smallMenu="smallMenu"
    ></MenuItem>
  </div>
  <hr class="p-0 m-0"/>
  <RouterLink
 
    class="footer-link  nav-link text-dark"
    title="Logout"
   to="/logout"
  >
  <div class="label d-flex align-items-center justify-content-between">
    <div>
      
          <font-awesome-icon class="me-4" v-if="!smallMenu" icon="right-to-bracket" />
          <font-awesome-icon v-if="smallMenu" icon="right-to-bracket" class="ms-2" />

          <span  :class="{ 'd-none': smallMenu }">Logout</span>
        </div>
  
  </div>
    
  </RouterLink>
   




  </aside>
</template>
<script setup>
import { onMounted } from "vue";
import MenuItem from "./Menu/MenuItem.vue";
import { ref } from "vue";


let smallMenu = ref(true);

const menuTree = [
  {
    label: "Dashboard",
    icon: "gauge",
    name: "Dashboard",
  },
  {
    label: "Users",
    icon: "users",
    name: "Users",
  },
  {
    label: "Products",
    icon: "cart-shopping",
    name: "Products",
  },
  
  // {
  //   label: "Home",
  //   icon: "gauge",
  //   children: [
  //     {
  //       label: "Employee",
  //       icon: "gauge",
  //       name: "Employee",
  //     },
  //   ],
  // },
  


];
</script>
<style  scoped>
aside {
	 min-height: 100vh;
   max-height: 100vh;
  
	 width: 16rem;
	 transition: all 0.3s ease;
}
 aside .logo {
	 height: 5rem;
	 padding: 1rem;
}
 aside.small-menu {
	 transition: all 0.3s ease;
	 overflow: inherit;
	 width: 5rem;
}
 aside.small-menu .logo {
	 width: 5rem;
	 height: 5rem;
}
footer{
    min-height: 49px;
  
}
.menu-items{
  min-height: calc(100vh - 50px - 5rem);
  max-height: calc(100vh - 50px - 5rem);
  overflow-y: auto;
  
  
}
.menu-items::-webkit-scrollbar {
  width: 3px; /* Adjust the width as needed */
}

.menu-items::-webkit-scrollbar-track {
  background-color: #dad7d7; /* or any desired color */
}

.menu-items::-webkit-scrollbar-thumb {
  background-color: #888; /* or any desired color */
  border-radius: 2px; /* Adjust the radius as needed */
}

.menu-items::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* or any desired color */
}


.router-link-exact-active > div {
	 background-color: #27374D;
	 cursor: pointer;
}
.router-link-exact-active .label {
	 color: #DDE6ED;
}
.router-link-exact-active .label font-awesome-icon {
	 color: #DDE6ED;
}
.label {
	 white-space: nowrap;
	 user-select: none;
	 height: 3rem;
	 padding: 0 1.25rem;
	 box-sizing: border-box;
	 color:#27374D;
}
.label font-awesome-icon {
	 padding-right: 0.2rem;
	 font-size: 1.5rem;
	 color: #27374D;
	 transition: all 0.3s ease;
}
.label font-awesome-icon.expand {
	 font-size: 1.5rem;
	 color: #27374D;
}
.label font-awesome-icon.expand.expanded {
	 transform: rotate(180deg);
}
.label:hover {
	 transition: all 0.5s ease;
	 background-color: #27374D;
	 color: #DDE6ED;
	 cursor: pointer;
}
.label:hover font-awesome-icon {
	 color: #DDE6ED;
}
.label.small-menu {
	 transition: all 0.5s ease;
	 width: fit-content;
}
.items-container {
	 transition: all 0.5s ease;
}
.items-container.small-menu {
	 transition: all 0.5s ease;
	 position: relative;
}
.items-container.small-menu .label {
	 width: 100%;
}
 
</style>
