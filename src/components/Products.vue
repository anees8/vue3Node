<template>
    <div>
      <b-modal
        v-model="modal"
        :title="product._id ? 'Update Product' : 'Add Product'"
        hide-header-close
        no-close-on-backdrop
      >
      <span v-if="errors && errors.error " class="text-danger">{{ errors.error }}</span>

            <b-form-group class="mb-2"  label="Product Name:">
            <b-input-group size="sm" >

            <b-form-input
            type="text"
            placeholder="Enter Product Name"
            name="name"
            :disabled="!isBusy ? false : true"
            v-model="product.name"
            :class="errors && errors.name ? 'is-invalid' : ''"
            ></b-form-input>
            </b-input-group>

            <span v-if="errors && errors.name" class="text-danger">{{ errors.name }}</span>
            </b-form-group>

            <b-form-group class="mb-2" label="Product Price:">
            <b-input-group size="sm">

            <b-form-input
            type="text"
            placeholder="Enter Price"
            name="price"
            :disabled="!isBusy ? false : true"
            v-model="product.price"
            :class="errors && errors.price ? 'is-invalid' : ''"
            ></b-form-input>
            </b-input-group>

            <span v-if="errors && errors.price" class="text-danger">{{ errors.price }}</span>
            </b-form-group>
            <b-form-group class="mb-2" label="Product Description:">
            <b-input-group size="sm">


     <b-form-textarea
      id="textarea"
      v-model="product.description"
      :disabled="!isBusy ? false : true"
      placeholder="Enter Description..."
      rows="3"
      :class="errors && errors.description ? 'is-invalid' : ''"
      max-rows="6"
    ></b-form-textarea>

            </b-input-group>

            <span v-if="errors && errors.description" class="text-danger">{{ errors.description }}</span>
            </b-form-group>



        <template #footer>
          <div>
            <button class="btn btn-outline-dark" @click="hideModel">Close</button>
          </div>
          <div>
            <button class="btn btn-outline-primary" @click="updateProduct">
              {{ product._id ? "Update Product" : "Add Product" }}
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
              @click="sortTable('price')"
              :class="{ active: sortKey === 'price' }"
            >
              Price
              <font-awesome-icon
                :icon="
                  sortDirection === 'price'
                    ? 'sort-up'
                    : sortDirection === '-price'
                    ? 'sort-down'
                    : 'sort'
                "
                class="me-2 text-success"
              />
            </th>
            <th
              scope="col"
              @click="sortTable('description')"
              :class="{ active: sortKey === 'description' }"
            >
              Description
              <font-awesome-icon
                :icon="
                  sortDirection === 'description'
                    ? 'sort-up'
                    : sortDirection === '-description'
                    ? 'sort-down'
                    : 'sort'
                "
                class="me-2 text-success"
              />
            </th>
            <th scope="col">Images</th>
           
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
                  v-model="pricesearch"
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
                  v-model="descriptionsearch"
                  placeholder="Description Search...."
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </div>
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="!isBusy && products.length !== 0">
          <tr v-for="(product, index) in products" :key="index">
            <td scope="row">{{ limit * page - limit + index + 1 }}</td>
  
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td> <b-img v-for="(image, index) in product.images" :key="index" center :src="image" width="30px"  Height="30px" alt="Center image"></b-img></td>
            <td>
  
  
              <b-button variant="secondary" class="me-2 " size="sm"   @click="editProduct(product._id)"><font-awesome-icon
                icon="user-pen"
               
              
              /></b-button> 
              <b-button   variant="danger"  size="sm"  @click="deleteProduct(product._id)"><font-awesome-icon
                icon="trash-can"
               
               
              /></b-button> 
            </td>
          </tr>
        </tbody>
  
        <tbody v-else-if="products.length === 0">
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
            <th scope="col">Images</th>
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
            v-on:click="getProducts"
            aria-controls="getProducts"
          ></b-pagination
        ></b-col>
      </b-row>
    </div>
    
  </template>
  <script setup>
  import { storeToRefs } from "pinia";
  import { useProductsStore } from "../stores/productsStore.js";
  
  const {
    products,
    product,
    page,
    errors,
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
    descriptionsearch,
    pricesearch 
  
   
  } = storeToRefs(useProductsStore());
  
  const {
    getProducts,
    setPerPage,
    deleteProduct,
    editProduct,
    hideModel,
    updateProduct,
    sortTable,
    InputSearch,
    exportExcel
  } = useProductsStore();
  
  getProducts();
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
  