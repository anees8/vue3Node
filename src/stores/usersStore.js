import { defineStore } from "pinia";
import axios from "axios";
import moment from "moment";
import router from "../router/index.js";

export const useUsersStore = defineStore("usersStore", {
    state: () => ({
        users: [],
        user: {},
        sortKey: '',       // Current sorting key
        sortDirection: '' , // Current sorting direction
        search:"",
        namesearch:"",
        emailsearch:"",
        rolesearch:"",
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
        roleOptions:[
            { value: "", text: "Please Select Role" },
            { value: "admin", text: "Admin" },
            { value: "user", text: "User" },
        ],
      
    }),

    actions: {

        async getUsers(){
        this.isBusy = true;
        try {
        let url = "users";
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
        if(this.emailsearch){
        url += `&emailsearch=${this.emailsearch}`;
        }
        if(this.rolesearch){
        url += `&rolesearch=${this.rolesearch}`;
        }
        const response = await axios.get(url);

        this.users = response.data.users;
       

        this.limit = response.data.limit;

        this.rows = response.data.totalRow;
        if(this.page>response.data.totalPages){
        this.page=this.page-1;
        this.getUsers();

        }else{
        this.page = response.data.currentPage;
        }    
        this.isBusy = false;
        } catch (error) {

        this.isBusy = false;
        this.errors=error.response;

        }

        },
        InputSearch(){
        this.page = 1;
        this.getUsers();
        },
        sortTable(key){
        if (this.sortKey === key && this.sortDirection !=="" ) {
        this.sortDirection = this.sortDirection === '-'+key ? key : "";
        } else {
        // Sort by the new key in ascending order
        this.sortKey = key;
        this.sortDirection = '-'+key;
        }
        this.getUsers();
        },
        setPerPage(value) {
        this.limit = value;
        this.page = 1;
        this.sortKey="";
        this.sortDirection ="";
        this.getUsers();
        },
        deleteUser(id){
        Swal.fire({
        title: "Are you sure?",
        text: "Do you want to Delete Permanently this User : " + id,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No, cancel",
        }).then((result) => {
        if (result.isConfirmed) {
        let url = "users";
        axios
        .delete(url+'/'+id)
        .then((res) => {
        this.getUsers();
        Swal.fire(
        "Deleted!",
        "User has been deleted.",
        "success"
        );
        }).catch((error) => {

        console.log(error);
        this.isBusy = false;

        });
        }
        });
        },
        async editUser(id){
        try {

        let url = "users";

        const response = await axios.get(url+'/'+id);
        this.user =response.data.user;

        this.modal = !this.modal;
        }
        catch (error) {
        console.log(error);
        }
        },
        hideModel() {
        this.modal = !this.modal;
        this.getUsers();
        this.isBusy = false;
        this.user={};
        },
        async  updateUser(){

        const formData = new FormData();


        let url = "users";
        if (this.user.name) {
        formData.append("name", this.user.name);
        }



        // formData.append("_method", "put");
        try {
        const response = await axios.put(
            url + "/" + this.user._id,
            formData);

        this.hideModel();
        } catch (error) {
        if (error.response) {
            if (error.response.status === 403) {
                router.push({ name: "NotAuthorize" });
            } else if (error.response.status === 400) {
                    this.errors = error.response.data.errors;
            }
        }
        this.loading = false;
        setTimeout(() => {
            this.errors = {};
        }, 5000);
        }

        },
        async exportExcel(){

            if(this.users.length>0){
            const columnsToExport = ['_id','name','email','role'];
            const dataToExport = this.users.map((user) => {
            return columnsToExport.map((column) => user[column]);
            });
            const header = columnsToExport.join(',');
            const csv = [header, ...dataToExport].join('\n');
            const blob= new Blob([csv],{type:"application/csv"})
            const url =URL.createObjectURL(blob);
            const a=document.createElement('a');
            a.download="Users.csv";
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
           

        }
        
          

          
    },
});
