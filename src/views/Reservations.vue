<template>
  <div class="py-4 container-fluid">
    <loader :active="loaderActive" message="Please wait 5 seconds" />
    <div v-if="display_table" class="mt-4 row">
      <div class="col-12">
        <reservations-table :booking="reservations" v-on:edit="edit"/>
      </div>
    </div>
    <div v-if="display_form" class="mt-4 row">
      <div class="col-12">
        <reservation-form :reservation="booking" v-on:save="save" v-on:close="close" />
      </div>
    </div>
  </div>
</template>

<script>
import ReservationsTable from "./components/ReservationsTable.vue";
import ReservationForm from "./components/ReservationForm.vue";
import Loader from "./components/Loader.vue";
import axios from "axios";

export default {
  name: "reservations",
  components: {
    Loader,
    ReservationsTable,
    ReservationForm
  },
  data() {
    return {
        reservations: [],
        booking: {
            id: 0,
            date_in: null,
            date_out: null,
            status: null,
            no_rooms: 1,
            hotel_id: 0,
            room_id: 0,
            user_id: 0,
        },
        display_table: false,
        display_form: false,
        loaderActive: false,
    };
  },
  methods: {
    showLoader() {
        this.loaderActive = true;
    },
    hideLoader() {
        this.loaderActive = false;
    },
    close() {
        this.display_form = false;
    },
    edit(val) {
        let sobj = this.reservations.findIndex((obj => obj.id == val));
        this.booking.id = this.reservations[sobj].id;
        this.booking.id = this.booking.id.toString();
        this.booking.date_in = this.reservations[sobj].date_in;
        this.booking.date_out = this.reservations[sobj].date_out;
        this.booking.status = this.reservations[sobj].status;
        this.booking.no_rooms = this.reservations[sobj].rooms_count;
        this.booking.no_rooms = this.booking.no_rooms.toString();
        this.booking.hotel_id = this.reservations[sobj].hotel_id;
        this.booking.hotel_id = this.booking.hotel_id.toString();
        this.booking.room_id = this.reservations[sobj].room_id;
        this.booking.room_id = this.booking.room_id.toString();
        this.booking.user_id = this.reservations[sobj].user_id;
        this.booking.user_id = this.booking.user_id.toString();
        this.display_form = true

    },
    save(obj) {
        console.log('Saving for object with id:'+ obj.id);
        console.log(obj);
        let token = "Token " + localStorage.getItem('token');
        let endpoint = "http://127.0.0.1:8000/api/bookings/"+obj.id+"/";

        axios
            .put(endpoint,{
                rooms_count: parseInt(obj.no_rooms),
                date_in: obj.date_in,
                date_out: obj.date_out,
                status: obj.status,
                room_id: parseInt(obj.room_id),
                hotel_id: parseInt(obj.hotel_id),
                user_id: parseInt(obj.user_id)
            },{
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => {
                console.log(response);
                let sobj = this.reservations.findIndex((elem => elem.id == obj.id));
                console.log('Index is:'+sobj);
                this.reservations[sobj].date_in = obj.date_in;
                this.reservations[sobj].date_out = obj.date_out;
                this.reservations[sobj].status = obj.status;
                this.reservations[sobj].rooms_count = obj.no_rooms;
                this.reservations[sobj].hotel_id = obj.hotel_id;
                this.reservations[sobj].room_id = obj.room_id;
                this.reservations[sobj].user_id = obj.user_id;
                this.display_form = false;
            })
            .catch((err) => console.log(err.response));
    },
  },
  
  beforeCreate() {
    console.log('Before Creation method');
    var token = localStorage.getItem('token');
    if (token) {
        console.log('Is Logged in');
    } else {
        this.$store.state.isLogged = false;
        this.$router.push({ name: 'Signin' })
    }
  },
  async created() {
    console.log('Creation method');
    this.showLoader();
    var token = "Token " + localStorage.getItem('token');
    //var ms = this;
    await axios
        .get("http://127.0.0.1:8000/api/bookings/?reservations=1",{
            headers: {
              'Authorization': token
            }
        })
        .then((response) => {
            this.reservations = response.data;
            this.display_table = true;
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('general error');
            }
        });
    console.log(this.reservations);
    this.hideLoader();
  },
  mounted() {
    console.log('Mounted method');
  }
};
</script>
