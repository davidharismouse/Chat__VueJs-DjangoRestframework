<template>
        <v-navigation-drawer class="fill-height" v-model="drawer" permanent :mini-variant.sync="mini">
        <v-list-item class="px-2">
            <v-badge
                bordered
                bottom
                color="deep-purple accent-4"
                dot
                offset-x="10"
                offset-y="10"
            >
            <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>
           
            </v-badge>
        <v-list-item-title>John Leider</v-list-item-title>
        <v-btn
                icon
                @click.stop="mini = !mini"
                >
                <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
        </v-list-item>
        <v-divider></v-divider>

        <v-list
            dense
            nav
            class="overflow-auto"
        >
            <v-list-item
            v-for="item in users"
            :key="item.id"
            link
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>        
</template>
<script>
import {getUserList} from '@/components/api'

  export default {
  

    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        drawer: true,
        users: [],
        name:'David Harris',
        right: null,
      }
    },
    methods: {
        async getAllUsers() {
            this.users = await getUserList();
            console.log("sdf",this.users);
        }
    },
    mounted() {
        this.getAllUsers();
        console.log("sddd");
    }
  }
</script>