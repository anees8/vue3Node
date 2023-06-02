<template>
  <div>
    <b-modal
      v-model="modal"
      :title="user._id ? 'Update User' : 'Add User'"
      hide-header-close
      no-close-on-backdrop
    >
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="user.name"
          type="text"
          placeholder="Enter your Name"
          required
        ></b-form-input>
      </b-form-group>

      <template #footer>
        <div>
          <button class="btn btn-outline-dark" @click="hideModel">Close</button>
        </div>
        <div>
          <button class="btn btn-outline-primary" @click="updateUser">
            {{ user._id ? "Update User" : "Add User" }}
          </button>
        </div>
      </template>
    </b-modal>
    <b-row>
      <b-col cols="12" md="6" lg="6" xl="3" class="mb-3 ms-auto">
        <b-row class="text-center">
         <b-col  cols="1" md="1"> 
          
          <b-button variant="success" size="sm"  @click="exportExcel"><font-awesome-icon
              icon="file-export"
          
            /></b-button>   </b-col>
          <b-col cols="2" md="3">
            <b-form-select
              v-if="rows > 5"
              v-model="limit"
              :options="options"
              size="sm"
              v-on:change="setPerPage"
              varient="dark"
            ></b-form-select>
          </b-col>
          <b-col cols="9" md="8">
            <div class="input-group input-group-sm mb-3">
              <!-- <span class="input-group-text" id="basic-addon1"><font-awesome-icon  icon="magnifying-glass" class="me-2"></font-awesome-icon></span> -->
              <input
                type="search"
                class="form-control"
                @input="InputSearch"
                v-model="search"
                placeholder="Search...."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <table class="table table-striped table-sm table-responsive table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th
            scope="col"
            @click="sortTable('name')"
            :class="{ active: sortKey === 'name' }"
          >
            Name
            <font-awesome-icon
              :icon="
                sortDirection === 'name'
                  ? 'sort-up'
                  : sortDirection === '-name'
                  ? 'sort-down'
                  : 'sort'
              "
              class="me-2 text-success"
            />
          </th>
          <th
            scope="col"
            @click="sortTable('email')"
            :class="{ active: sortKey === 'email' }"
          >
            Email
            <font-awesome-icon
              :icon="
                sortDirection === 'email'
                  ? 'sort-up'
                  : sortDirection === '-email'
                  ? 'sort-down'
                  : 'sort'
              "
              class="me-2 text-success"
            />
          </th>
          <th
            scope="col"
            @click="sortTable('role')"
            :class="{ active: sortKey === 'role' }"
          >
            Role
            <font-awesome-icon
              :icon="
                sortDirection === 'role'
                  ? 'sort-up'
                  : sortDirection === '-role'
                  ? 'sort-down'
                  : 'sort'
              "
              class="me-2 text-success"
            />
          </th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
        <tr>
          <th scope="col"></th>
          <th scope="col">
            <div class="input-group input-group-sm mb-3">
              <input
                type="search"
                class="form-control"
                @input="InputSearch"
                v-model="namesearch"
                placeholder="Name Search...."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </th>
          <th scope="col">
            <div class="input-group input-group-sm mb-3">
              <input
                type="search"
                class="form-control"
                @input="InputSearch"
                v-model="emailsearch"
                placeholder="Email Search...."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </th>
          <th scope="col">
            <div class="input-group input-group-sm mb-3">
              <b-form-select
                v-model="rolesearch"
                :options="roleOptions"
                size="sm"
                v-on:change="InputSearch"
                varient="dark"
              ></b-form-select>
            </div>
          </th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-if="!isBusy && users.length !== 0">
        <tr v-for="(user, index) in users" :key="index">
          <td scope="row">{{ limit * page - limit + index + 1 }}</td>

          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.profile ? user.profile.phone : "--" }}</td>
          <td>


            <b-button variant="secondary" class="me-2 " size="sm"   @click="editUser(user._id)"><font-awesome-icon
              icon="user-pen"
             
            
            /></b-button> 
            <b-button   variant="danger"  size="sm"  @click="deleteUser(user._id)"><font-awesome-icon
              icon="trash-can"
             
             
            /></b-button> 
          </td>
        </tr>
      </tbody>

      <tbody v-else-if="users.length === 0">
        <tr>
          <td colspan="6" class="text-center">
            <div>
              <span>No Records Found</span>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="text-center">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </tfoot>
    </table>
   
    <b-row>
      <b-col>
        <b-pagination
          class="float-end"
          v-model="page"
          :total-rows="rows"
          :per-page="limit"
          v-if="rows / limit > 1"
          v-on:click="getUsers"
          aria-controls="getUsers"
        ></b-pagination
      ></b-col>
    </b-row>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useUsersStore } from "../stores/usersStore.js";

const {
  users,
  user,
  page,
  rows,
  limit,
  isBusy,
  fields,
  options,
  modal,
  sortKey,
  sortDirection,
  search,
  namesearch,
  emailsearch,
  rolesearch,
  roleOptions,
} = storeToRefs(useUsersStore());

const {
  getUsers,
  setPerPage,
  deleteUser,
  editUser,
  hideModel,
  updateUser,
  sortTable,
  InputSearch,
  exportExcel
} = useUsersStore();

getUsers();
</script>
<style scoped>
.table-height {
  max-height: calc(100vh - 50px - 10rem);
  overflow: scroll;
  padding-right: 0.2rem;
}
.table-height::-webkit-scrollbar {
  display: none;
  /* Adjust the width as needed */
}
</style>
