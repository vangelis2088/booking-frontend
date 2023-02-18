<template>
  <main>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Book your room</p>
                <argon-button @click="book" color="success" size="sm" class="ms-auto"
                  >Make Booking</argon-button
                >
                <argon-button @click="close" variant="gradient" color="light" size="sm" class="ms-3"
                  >Close</argon-button
                >
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Room Information</p>
              <div class="row">
                <div class="col-md-8">
                  <label for="example-text-input" class="form-control-label"
                    >Room Type</label
                  >
                    <select v-model="booking.type" class="form-select" aria-label="Default select example">
                        <option v-for="(item, index) in options"
                                :value="item"
                                :key="index"
                                :selected="index === 0">{{item}}
                        </option>
                    </select>
                </div>
                <div class="col-md-3" style="display:none;">
                  <label for="example-text-input" class="form-control-label"
                    >Price</label
                  >
                  <argon-input :value="hotel.id" name="hid" placeholder="Id" type="text"  />
                </div>
                
                <div class="col-md-6">
                  <label for="startDate" class="form-control-label"
                    >Date in</label
                  >
                  <input id="startDate" class="form-control" type="date" v-model="booking.date_in" />
                </div>
                <div class="col-md-6">
                  <label for="endDate" class="form-control-label"
                    >Date out</label
                  >
                  <input id="endDate" class="form-control" type="date" v-model="booking.date_out" />
                </div>
                
              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Additional Information</p>
              <div class="row">
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Number of Rooms to Book</label
                  >
                  <argon-input v-model="booking.no_rooms" name="hloc" placeholder="1" type="number" />
                </div>              
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Number of Adults</label
                  >
                  <argon-input v-model="booking.no_adults" name="hloc" placeholder="2" type="number" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label"
                    >Number of Children</label
                  >
                  <argon-input v-model="booking.no_child" name="hroom" placeholder="0" type="number" />
                </div>
              </div>   
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "room-form",
    props: {
      hotel: {
        type: Object,
        default: () => {
          return {};
        }
      },
      action: {
        type: String,
      },
      options: {
        type: Array,
      }
    },
    data() {
        return {
            booking: {
              type: 0,
              date_in: null,
              date_out: null,
              no_rooms: 1,
              no_adults: 2,
              no_child: 0,
            }
        };
    },
    methods: {
        book() {
            this.$emit('book', this.booking);
        },
        close() {
           this.$emit('close'); 
        }
    },
    components: { ArgonInput, ArgonButton },
};

</script>
