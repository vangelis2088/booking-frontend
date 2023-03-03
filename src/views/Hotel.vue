<template>
  <div class="container-fluid">
    <loader :active="loaderActive" message="Please wait 5 seconds" />
    <div v-if="display_list" class="row">
      <div class="col-md-12">
        <hotel-card v-on:addition="addHotel" 
                    v-on:edit="edit"
                    v-on:del="del" 
                    :data="hotels" 
                    />
      </div>
    </div>
    <div v-if="display_form" class="row">
      <div class="col-md-12">
        <hotel-form v-on:close="close" 
                    v-on:save="save" 
                    :data="hotels" 
                    :hotel="hotel" 
                    :action="actionForm"
                    />
      </div>
    </div>
  </div>
</template>

<script>
import HotelCard from "./components/HotelCard.vue";
import HotelForm from "./components/HotelForm.vue";
import Loader from "./components/Loader.vue";
import axios from "axios";

export default {
  name: "Hotel",
  components: {
    Loader,
    HotelCard,
    HotelForm
  },
  data() {
    return {
        display_list: false,
        display_form: false,
        hotels: [],
        hotel: {
            id: 0,
            name: "",
            desc: "",
            location: "",
            rooms: 0,
            owner: 0,
        },
        loaderActive: false,
        actionForm: '', 
        salary: {
            classIcon: "text-white fas fa-landmark",
            title: "Salary",
            desc: "Belong Interactive",
            price: "+$2000",
        },
        paypal: {
            classIcon: "text-white fab fa-paypal",
            title: "Paypal",
            desc: "Freelance Payment",
            price: "$455.00",
        },
    };
  },
  beforeCreate() {
    var token = localStorage.getItem('token');
    if (token) {
        console.log('Is Logged in');
    } else {
        this.$store.state.isLogged = false;
        this.$router.push({ name: 'Signin' })
    }
  },
  async created() {
    this.showLoader();
    await axios
        .get("/api/hotels/?user_id=1")
        .then((response) => {
            this.hotels = response.data;
            this.display_list = true;
        })
        .catch((err) => console.log(err.response));
      this.hideLoader();
  },
  methods: {
    showLoader() {
        this.loaderActive = true;
    },
    hideLoader() {
        this.loaderActive = false;
    },
    addHotel() {
        this.hotel.name = "";
        this.hotel.desc = "";
        this.hotel.location = "";
        this.hotel.rooms = 0;
        this.display_list = false;
        this.display_form = true;
        this.actionForm = 'add';
    },
    edit:function(str) {
        this.hotel.id = this.hotels[str].id;
        this.hotel.name = this.hotels[str].hotel_name;
        this.hotel.desc = this.hotels[str].hotel_description;
        this.hotel.location = this.hotels[str].location;
        this.hotel.rooms = this.hotels[str].total_rooms;
        this.actionForm = 'edit';
        this.display_form = true;
        this.display_list = false;
    },
    save(val) {
        if (this.hotels[0]['owner']) {
            val.owner = this.hotels[0]['owner'];
        } else {
            val.owner = 1;
        }
        val.rooms = parseInt(val.rooms);
    
        if (this.actionForm == 'add') {
            axios
                .post("/api/hotels/",{
                    hotel_name: val.hotel_name,
                    hotel_description: val.description,
                    location: val.location,
                    total_rooms: val.total_rooms,
                    owner: val.owner
                })
                .then((response) => {
                    val.id = response.data.id;
                    this.hotels.push(val);
                })
                .catch((err) => console.log(err.response));
        }
        else {
            let endpoint = '/api/hotels/'+val.id+'/';
            axios
                .put(endpoint,{
                    hotel_name: val.hotel_name,
                    hotel_description: val.description,
                    location: val.location,
                    total_rooms: val.total_rooms,
                    owner: val.owner
                })
                .then((response) => {
                    console.log(response);
                    let sobj = this.hotels.findIndex((obj => obj.id == val.id));
                    this.hotels[sobj].hotel_name = val.hotel_name;
                    this.hotels[sobj].hotel_description = val.description;
                    this.hotels[sobj].location = val.location;
                    this.hotels[sobj].total_rooms = val.total_rooms;
                })
                .catch((err) => console.log(err.response));
        }
        this.display_list = true;
    },
    del(val) {
        var tid = this.hotels[val].id;
        let endpoint = '/api/hotels/'+tid+'/';        
        axios
            .delete(endpoint)
            .then((response) => {
                console.log(response);
                this.hotels.splice(val,1);
            })
            .catch((err) => console.log(err.response));
        
    },
    close() {
        this.display_list = true;
        this.display_form = false;
    },
  },
};
</script>
