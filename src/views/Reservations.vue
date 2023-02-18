<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12">
        <reservations-table :booking="reservations" v-on:edit="edit"/>
      </div>
    </div>
    <div v-if="display_form" class="mt-4 row">
      <div class="col-12">
        <reservation-form :reservation="booking" />
      </div>
    </div>
  </div>
</template>

<script>
import ReservationsTable from "./components/ReservationsTable.vue";
import ReservationForm from "./components/ReservationForm.vue";
import axios from "axios";

export default {
  name: "reservations",
  components: {
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
            no_rooms: 1,
            hotel_id: 0,
            user_id: 0,
        },
        display_form: false,
    };
  },
  methods: {
    edit(val) {
        console.log('edititng in main form for id:'+val);
        //console.log(this.reservations);
        let sobj = this.reservations.findIndex((obj => obj.id == val));
        //console.log('Index is:'+sobj);
        this.booking.id = this.reservations[sobj].id;
        this.booking.date_in = this.reservations[sobj].date_in;
        this.booking.date_out = this.reservations[sobj].date_out;
        this.booking.no_rooms = this.reservations[sobj].rooms_count;
        this.booking.hotel_id = this.reservations[sobj].hotel_id;
        this.booking.user_id = this.reservations[sobj].user_id;
        this.display_form = true

    }
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
  },
};
</script>
