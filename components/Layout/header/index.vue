<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img src="/images/profile/user2.jpg" width="35" alt="Julia" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="250" elevation="10">
      <v-list class="pa-4" elevation="10" rounded="md">
        <!-- <v-list-item class="py-2  mb-2" v-for="(item, i) in userprofile" :key="i" :value="item" :title="item.title"
          :subtitle="item.desc" rounded="md">
        </v-list-item> -->
        <v-btn block color="primary" class="mt-4 py-4">Logout</v-btn>
      </v-list>
    </v-sheet>
  </v-menu>
   <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              v-bind="props"
            >
              Switch Dashboard
            </v-btn>
      </template>
      <v-sheet rounded="md" width="250" elevation="10">
      <v-list class="pa-4" elevation="10" rounded="md">
 
        <v-btn block color="primary" @click="switchDashboard()" class="mt-4 py-4"> Switch to Motor</v-btn>
      </v-list>
    </v-sheet>
    </v-menu> 
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter(); 
    const userprofile = ref([
      {
        title: "My Profile",
        desc: "Account Settings",
      },
      {
        title: "My Inbox",
        desc: "Messages & Emails",
      },
      {
        title: "My Tasks",
        desc: "To-do and Daily Tasks",
      },
    ]);
    const switchDashboard = () =>{
      router.push('/motor/thirdparty')
    }
    return{
      userprofile,
      router,
      switchDashboard
    }
  },
})
</script>

