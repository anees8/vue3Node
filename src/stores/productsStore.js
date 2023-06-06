import { defineStore } from "pinia";
import axios from "axios";

import router from "../router/index.js";

export const useProductsStore = defineStore("productsStore", {
    state: () => ({
        products: [],
        product: {
            _id:"",
            name:"",
            description:"",
            price:"",
        },
        images:[],
        displayImage:[],
        sortKey: '',       // Current sorting key
        sortDirection: '' , // Current sorting direction
        search:"",
        namesearch:"",   
        descriptionsearch:"",   
        pricesearch:null,
        limit: 10,
        page: 1,
        rows: null,
        isBusy: false,
        modal: false,
        errors:null,
        options: [
            { value: 5, text: "5" },
            { value: 10, text: "10" },
            { value: 50, text: "50" },
            { value: 100, text: "100" },
        ],
       
      
    }),

    actions: {

        async getProducts(){
            
        this.isBusy = true;
        try {   
        let url = "products";
        if (this.limit) {
        url += `?limit=${this.limit}`;
        }
        if (this.page) {
        url += `&page=${this.page}`;
        }
        if (this.sortDirection) {
        url += `&sort=${this.sortDirection}`;
        }
        if(this.search){
        url += `&search=${this.search}`;
        }
        if(this.namesearch){
        url += `&namesearch=${this.namesearch}`;
        }
            if(this.descriptionsearch){
            url += `&descriptionsearch=${this.descriptionsearch}`;
            }
            if(this.pricesearch){
            url += `&pricesearch=${this.pricesearch}`;
            }

            

        
       
        const response = await axios.get(url);
   
        this.products = response.data.products;
       

        this.limit = response.data.limit;

        this.rows = response.data.totalRow;
        if(this.page>response.data.totalPages){
        this.page=this.page-1;
        this.getProducts();

        }else{
        this.page = response.data.currentPage;
        }    
        this.isBusy = false;
        } catch (error) {

            this.isBusy = false;
            this.errors=error.response;

            setTimeout(() => {
            this.errors = {};
            }, 5000);



            this.products= [];


        }

        },
        InputSearch(){
        this.page = 1;
        this.getProducts();
        },
        sortTable(key){
        if (this.sortKey === key && this.sortDirection !=="" ) {
        this.sortDirection = this.sortDirection === '-'+key ? key : "";
        } else {
        // Sort by the new key in ascending order
        this.sortKey = key;
        this.sortDirection = '-'+key;
        }
        this.getProducts();
        },
        setPerPage(value) {
        this.limit = value;
        this.page = 1;
        this.sortKey="";
        this.sortDirection ="";
        this.getProducts();
        },
        deleteProduct(id){
        Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Delete Permanently this Product : " + id,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No, cancel",
        }).then((result) => {
        if (result.isConfirmed) {
        let url = "products";
        axios
        .delete(url+'/'+id)
        .then((res) => {
        this.getProducts();
        Swal.fire(
        "Deleted!",
        "Product has been deleted.",
        "success"
        );
        }).catch((error) => {

            if (error.response) {
                if (error.response.status === 403) {
                router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
    
                this.errors = error.response.data.error;
    
    
                }
                }
    
                setTimeout(() => {
                this.errors = {};
                }, 5000);
        this.isBusy = false;

        });
        }
        });
        },
        async editProduct(id){
        try {

        let url = "products";

        const response = await axios.get(url+'/'+id);
            
        this.product =response.data.product;

        this.modal = !this.modal;
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
    
                this.errors = error.response.data.error;
    
    
                }
                }
    
                setTimeout(() => {
                this.errors = {};
                }, 5000);
        }
        },
        hideModel() {
        this.modal = !this.modal;
        this.getProducts();
        this.isBusy = false;
        this.product={
            _id:"",
            name:"",
            description:"",
            price:"",
        };
        this.images=[];
        this.displayImage=[];
        this.errors={};
        const fileInput = document.getElementById('inputGroupFile02');
        fileInput.value='';

        },
        async  updateProduct(){

        const formData = new FormData();
                
            let url = "products";

            formData.append("name", this.product.name);
            formData.append("price", this.product.price);
            formData.append("description",this.product.description);
                
            if(this.images){
            this.images.forEach((file, index) => {
            formData.append("images", file);
            });
            }


            if(this.product._id){
            // formData.append("_method", "put");
            try {
            const response = await axios.put(
            url + "/" + this.product._id,
            formData);
            this.hideModel();
            } catch (error) {
            if (error.response) {
            if (error.response.status === 403) {
            router.push({ name: "NotAuthorize" });
            } else if (error.response.status === 400) {
            this.errors = error.response.data.error;
            }
            }
            setTimeout(() => {
            this.errors = {};
            }, 10000);
            }
                }else{
                try {
                const response = await axios.post(url,formData);
                this.hideModel();

                } catch (error) {
                if (error.response) {
                if (error.response.status === 403) {
                router.push({ name: "NotAuthorize" });
                } else if (error.response.status === 400) {
                this.errors = error.response.data.error;
                }
                }
                setTimeout(() => {
                this.errors = {};
                }, 10000);
                }

                }

        },
        async exportExcel(){

            if(this.products.length>0){
            const columnsToExport = ['_id','name','price','description'];
            const dataToExport = this.products.map((product) => {
            return columnsToExport.map((column) => product[column]);
            });
            const header = columnsToExport.join(',');
            const csv = [header, ...dataToExport].join('\n');
            const blob= new Blob([csv],{type:"application/csv"})
            const url =URL.createObjectURL(blob);
            const a=document.createElement('a');
            a.download="products.csv";
            a.href=url;
            a.style.display='none';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            Swal.fire({
               
                icon: 'success',
                title: 'CSV File Downloaded SuccessFully',
                showConfirmButton: false,
                timer: 500
                })

            }else{
                Swal.fire({
               
                icon: 'error',
                title: 'No Records Found',
                showConfirmButton: false,
                timer: 1500
                })

            }
           

        },
        productImages(event){
            this.displayImage=[];
            this.images = Array.from(event.target.files);

            if(this.images){
            for (let i = 0; i < this.images.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
            this.displayImage.push({ url: reader.result });
            };
            reader.readAsDataURL(this.images[i]);
            }
            }else{
                this.displayImage=[];
            }
            
        
            
        },
        removeImage(index){
           
            this.images.splice(index, 1);
            this.displayImage.splice(index, 1);
            


        }
       
        
          

          
    },

    
});
