<template>
  <div class="container-fluid">
    <div v-if="display_list" class="row">
      <div class="col-md-12">
        <hotel-card v-on:addition="addHotel" 
                    v-on:edit="edit" 
                    :data="hotels" 
                    />
      </div>
    </div>
    <div v-if="!display_list" class="row">
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
import axios from "axios";

export default {
  name: "Hotel",
  components: {
    HotelCard,
    HotelForm
  },
  data() {
    return {
        display_list: true,
        hotels: [],
        hotel: {
            id: 0,
            name: "",
            desc: "",
            location: "",
            rooms: 0,
            owner: 0,
        },
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
  created() {
    axios
        .get("http://127.0.0.1:8000/api/hotels/")
        .then((response) => {
            //console.log(response.data);
            this.hotels = response.data;
            console.log(this.hotels);
          //localStorage.setItem("token",response.data.key);
          //setAuthHeader(response.data.key);
          //this.$router.push({name:"Dashboard"});
        })
        .catch((err) => console.log(err.response));
  },
  methods: {
    addHotel() {
        this.hotel.name = "";
        this.hotel.desc = "";
        this.hotel.location = "";
        this.hotel.rooms = 0;
        this.display_list = false;
        this.actionForm = 'add';
    },
    edit:function(str) {
        this.hotel.id = this.hotels[str].id;
        this.hotel.name = this.hotels[str].hotel_name;
        this.hotel.desc = this.hotels[str].hotel_description;
        this.hotel.location = this.hotels[str].location;
        this.hotel.rooms = this.hotels[str].total_rooms;
        this.actionForm = 'edit';
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
                .post("http://127.0.0.1:8000/api/hotels/",{
                    hotel_name: val.hotel_name,
                    hotel_description: val.description,
                    location: val.location,
                    total_rooms: val.total_rooms,
                    owner: val.owner
                })
                .then((response) => {
                    console.log(response);
                    this.hotels.push(val);
                })
                .catch((err) => console.log(err.response));
        }
        else {
            let endpoint = 'http://127.0.0.1:8000/api/hotels/'+val.id+'/';
            console.log('will save edit for:'+val.id);
            console.log(val);
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
    close() {
        this.display_list = true;
    },
  },
};
</script>
