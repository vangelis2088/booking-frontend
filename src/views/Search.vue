<template>
  <main>
    <div class="container-fluid">
      <div
        class="page-header min-height-300"
        style="
          background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        "
      >
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
      <div class="card shadow-lg mt-n6">
        <div class="card-body p-3">
          <div class="row gx-4">
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/location-1.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Paris</h5>
                <p class="mb-0 font-weight-bold text-sm">Notre Dame Cathedral</p>
              </div>
            </div>
            
            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/location-2.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">London</h5>
                <p class="mb-0 font-weight-bold text-sm">Natural History Museum</p>
              </div>
            </div>

            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/location-3.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">Berlin</h5>
                <p class="mb-0 font-weight-bold text-sm">Alexander Platz</p>
              </div>
            </div>

            <div class="col-auto">
              <div class="avatar avatar-xl position-relative">
                <img
                  src="../assets/img/location-4.jpg"
                  alt="profile_image"
                  class="shadow-sm w-100 border-radius-lg"
                />
              </div>
            </div>
            <div class="col-auto my-auto">
              <div class="h-100">
                <h5 class="mb-1">New York</h5>
                <p class="mb-0 font-weight-bold text-sm">Brooklyn Bridge</p>
              </div>
            </div>

            <div
              class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0"
            >
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid">
      <div v-if="display_search"  class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Find your next stay</p>
                <argon-button @click="search" color="success" size="sm" class="ms-auto"
                  >Search</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Search low prices on hotels, homes and much more</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Type location</label
                  >
                  <argon-input name="srch" type="search" placeholder="Search" value="" />
                </div>                
              </div>              
            </div>
          </div>
        </div>        
      </div>
      <div v-if="display_search_results" class="row">
        <div class="md-12">
          <hotel-search v-on:edit="edit" :data="hotels" />
        </div>
      </div>
      <div v-if="display_form" class="row">
        <room-form  v-on:book="book" :options="types" v-on:close="close"/>
      </div>
    </div>
  </main>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import HotelSearch from "./components/HotelSearch.vue";
import RoomForm from "./components/RoomForm.vue";
import axios from "axios";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "search",
  data() {
    return {
        hotels: [],
        showMenu: false,
        location: '',
        types: [],
        hotel_id: 0,
        display_search: true,
        display_search_results: false,
        display_form: false,
    };
  },
  methods: {
    async search() {
        let sr = document.getElementsByName('srch')[0].value;
        console.log('Will Search for location:'+sr);
        console.log('State is:'+this.$store.state.isLogged);
        await axios
            .get("/api/hotels/?location="+sr)
            .then((response) => {
            //console.log(response.data);
            this.hotels = response.data;
            console.log(this.hotels);
            //localStorage.setItem("token",response.data.key);
            //setAuthHeader(response.data.key);
            //this.$router.push({name:"Dashboard"});
            })
            .catch((err) => console.log(err.response));
        this.display_search_results = true;
    },
    async edit(val) {
        //console.log(this.hotels);
        //this.hotel_id = val;
        this.hotel_id = this.hotels[val].id;
        this.types.length = 0;
        var vm = this;
        await axios
            .get("/api/rooms/?hotel_id="+this.hotel_id)
            .then((response) => {
                console.log(response.data);
                response.data.forEach(function(item, index) {
                    if (index == 0) {
                        vm.types.push(item.room_type);
                        
                    }
                    else {
                        if (vm.types.indexOf(item.room_type) == -1) {
                            vm.types.push(item.room_type);
                        }
                    }
                });
            })
            .catch((err) => console.log(err.response));
        this.display_search = false;
        this.display_search_results = false;
        this.display_form = true;
    },
    book(room) {
      var token = "Token " + localStorage.getItem('token');
      var hid = this.hotel_id;
      
      axios
          .post("/api/bookings/",{
            rooms_count: room.no_rooms,
            date_in: room.date_in,
            date_out: room.date_out,
            //room_id: room.type,
            room_id: 3,
            hotel_id: hid,
            user_id: 1,
          }, {
            headers: {
              'Authorization': token
            }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err.response));
    },
    close() {
      this.display_search = true;
      this.display_search_results = false;
      this.display_form = false;
    }
  },

  components: { ArgonInput, ArgonButton, HotelSearch, RoomForm },

  beforeCreate() {
    var token = localStorage.getItem('token');
    if (token) {
        console.log('Is Logged in');
    } else {
        this.$store.state.isLogged = false;
        this.$router.push({ name: 'Signin' })
    }
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = false;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  }
};
</script>
