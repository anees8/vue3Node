<template>
  <div>
    <b-container fluid
      ><b-row class="d-flex align-items-center justify-content-center min-vh-100"
        ><b-col cols="12" md="6" lg="4" xl="3"
          >
         
          <b-card header="Login" header-class="h3 text-center" >
            <div>
          <span v-if="errors.error" class="d-flex align-items-center justify-content-center text-danger h6">{{ errors.error }}</span>
        </div>
           
            <b-form @submit.prevent="login">
              <b-input-group class="my-3" size="md">
                <template #prepend>
                  <b-input-group-text>
                    <font-awesome-icon icon="at"
                  /></b-input-group-text>
                </template>
                <b-form-input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  :disabled="!loading ? false : true"
                  v-model="user.email"
                  :class="errors.email ? 'is-invalid' : ''"
                ></b-form-input>
                <span v-if="errors.email" class="text-danger">{{ errors.email.message }}</span>
              </b-input-group>
              <b-input-group class="my-3" size="md">
                <template #prepend>
                  <b-input-group-text>
                    <font-awesome-icon icon="eye-slash"
                  /></b-input-group-text>
                </template>
                <b-form-input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  v-model="user.password"
                  :class="errors.password ? 'is-invalid' : ''"
                  :disabled="!loading ? false : true"
                ></b-form-input>
                <span v-if="errors.password" class="text-danger">{{
                  errors.password.message
                }}</span>
              </b-input-group>
              <div class="text-center">
              <b-button type="submit" variant="success" >
                <b-spinner class="me-1" v-if="loading" small></b-spinner>
                <span v-if="!loading">Login</span>
                <span v-if="loading">Login...</span>
                <font-awesome-icon v-if="!loading" class="ms-2" icon="right-to-bracket" />
              </b-button>
            </div>
            </b-form>
            <RouterLink class="nav-link text-primary text-center my-3" v-bind:to="{ name: 'Register' }">
                Don`t have an account? Create</RouterLink
              >
          </b-card> </b-col></b-row
    ></b-container>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/loginStore.js";
const { user, errors, loading } = storeToRefs(useLoginStore());
const { login } = useLoginStore();
</script>
