<template>

  <div class="card mt-5">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Accomodation List</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li v-for="(item, index) in data" :key="item.name" class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{item.hotel_name }}</h6>
            <span class="mb-2 text-xs">
              Hotel Location:
              <span class="text-dark font-weight-bold ms-sm-2">{{ item.location }}</span>
            </span>
            <span class="text-xs">
              Total Rooms:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ item.total_rooms }}</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
            <a @click="edit(index)" class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
              <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="card-footer pb-3">
        <argon-button @click="add_hotel" color="success" size="sm" class="ms-auto"
                  >Add Hotel</argon-button>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "hotel-card",
  props: {
    data: {
        type: Array,
        default: () => [],
        description: "List data"
      },
  },
  data() {
    return {
    }
  },
  methods: {
    edit(ind) {
        this.$emit('edit',ind);
    },
    add_hotel() {
        this.$emit('addition');
    }
  },
  components: { ArgonButton },
};
</script>
