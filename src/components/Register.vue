<template>
  <div>
    <b-container fluid
      ><b-row class="d-flex align-items-center justify-content-center min-vh-100"
        ><b-col cols="12" md="6" lg="4" xl="3"
          ><b-card header="Register" header-class="h3 text-center">
            <span v-if="errors.error" class="text-danger ms-5">{{ errors.error }}</span>
            <b-form @submit.prevent="register">
              <b-form-group class="mb-4">
                <b-input-group size="md">
                  <template #prepend>
                    <b-input-group-text>
                      <font-awesome-icon icon="user"
                    /></b-input-group-text>
                  </template>
                  <b-form-input
                    type="text"
                    placeholder="Enter Username"
                    name="name"
                    :disabled="!loading ? false : true"
                    v-model="registeruser.name"
                    :class="errors.name ? 'is-invalid' : ''"
                  ></b-form-input>
                </b-input-group>

                <span v-if="errors.name" class="text-danger ms-5">{{ errors.name }}</span>
              </b-form-group>
              <b-form-group class="mb-4">
                <b-input-group size="md">
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
                    v-model="registeruser.email"
                    :class="errors.email ? 'is-invalid' : ''"
                  ></b-form-input>
                </b-input-group>

                <span v-if="errors.email" class="text-danger ms-5">{{
                  errors.email
                }}</span>
              </b-form-group>
              <b-form-group class="mb-4">
                <b-input-group size="md">
                  <template #prepend>
                    <b-input-group-text>
                      <font-awesome-icon icon="phone"
                    /></b-input-group-text>
                  </template>
                  <b-form-input
                    type="number"
                    placeholder="Enter Phone"
                    name="phone"
                    v-model="registeruser.phone"
                    :class="errors.phone ? 'is-invalid' : ''"
                    :disabled="!loading ? false : true"
                  ></b-form-input>
                </b-input-group>

                <span v-if="errors.phone" class="text-danger ms-5">{{
                  errors.phone
                }}</span>
              </b-form-group>
              <b-form-group class="mb-4">
                <b-input-group size="md">
                  <template #prepend>
                    <b-input-group-text>
                      <font-awesome-icon icon="eye-slash"
                    /></b-input-group-text>
                  </template>
                  <b-form-input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    v-model="registeruser.password"
                    :class="errors.password ? 'is-invalid' : ''"
                    :disabled="!loading ? false : true"
                  ></b-form-input>
                </b-input-group>
                <span v-if="errors.password" class="text-danger ms-5">{{
                  errors.password
                }}</span>
              </b-form-group>
              <div class="text-center">
                <b-button type="submit" variant="success">
                  <b-spinner class="me-1" v-if="loading" small></b-spinner>
                  <span v-if="!loading">Register</span>
                  <span v-if="loading">Register...</span>
                  <font-awesome-icon
                    v-if="!loading"
                    class="ms-2"
                    icon="right-to-bracket"
                  />
                </b-button>
              </div>
            </b-form>
            <RouterLink
              class="nav-link text-primary text-center my-3"
              v-bind:to="{ name: 'Login' }"
            >
              Already have an account? Sign in</RouterLink
            >
          </b-card>
        </b-col></b-row
      ></b-container
    >
  </div>
  
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/loginStore.js";
const { registeruser, errors, loading } = storeToRefs(useLoginStore());
const { register } = useLoginStore();
</script>
