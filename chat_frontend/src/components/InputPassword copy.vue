<template>
  <v-container
    class="fill-height pa-0 "
  >
    <v-row class="no-gutters elevation-4">
      <v-col
        cols="12" sm="3"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f;"
      >
        <v-responsive
          class="overflow-y-auto fill-height"
          height="900"
        >
          <v-list dense>
            <v-subheader>{{user_name}}</v-subheader>
            <v-list-item-group v-model="activeChat">
                <v-list-item                  
                  :value="index"
                  v-for="(item, index) in users" 
                  :key="item.id"
                >
                  <v-list-item-avatar color="grey lighten-1 white--text">
                    <v-icon>
                      mdi-account
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.username" />
                    <v-list-item-subtitle v-text="'hi'" />
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon :color="item.active ? 'deep-purple accent-4' : 'blue'">
                      mdi-arrow-right
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider
                  :key="`chatDivider${index}`"
                  class="my-0"
                />
            </v-list-item-group>
          </v-list>
        </v-responsive>
      </v-col>
      <v-col
        cols="auto"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
          height="900"
        >
          <v-card
            flat
            class="d-flex flex-column fill-height"
          >
            <v-card-title>
              john doe
            </v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <div v-for="(msg, i) in messages" :key="i">
                <div
                  :class="{ 'd-flex flex-row-reverse': msg.me }"
                  :key = i
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-hover
                        v-slot:default="{ hover }"
                      >
                        <v-chip
                          :color="msg.me ? 'primary' : ''"
                          dark
                          style="height:auto;white-space: normal;"
                          class="pa-4 mb-2"
                          v-on="on"
                        >
                          {{ msg.content }}
                          <sub
                            class="ml-2"
                            style="font-size: 0.5rem;"
                          >{{ msg.created_at }}</sub>
                          <v-icon
                            v-if="hover"
                            small
                          >
                            expand_more
                          </v-icon>
                        </v-chip>
                      </v-hover>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </v-card-text>
            <v-card-text class="flex-shrink-1">
                <v-text-field
                v-model="messageForm.content"
                label="type_a_message"
                type="text"
                no-details
                outlined
                append-icon="mdi-send"
                @keyup.enter="messages.push(messageForm)"
                @click:append="messages.push(messageForm)"
                hide-details
              />
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import {getUserList} from '@/components/api'
export default {
  
  data() {
    return {
      activeChat: 1,
    users: [],
    user_name: 'admin',
    // messages:[],
    parents: [
      {
          id: 1,
          title: "john doe",
          active: true
        },
        {
          id: 3,
          title: "scarlett",
          active: false
        },
        {
          id: 4,
          title: "scarlett",
          active: false
        },
        {
          id: 5,
          title: "scarlett",
          active: false
        },
        {
          id: 6,
          title: "scarlett",
          active: false
        },
        {
          id: 7,
          title: "scarlett",
          active: false
        },
        {
          id: 8,
          title: "scarlett",
          active: false
        },
        {
          id: 9,
          title: "scarlett",
          active: false
        },
        {
          id: 10,
          title: "scarlett",
          active: false
        },
        {
          id: 11,
          title: "scarlett",
          active: false
        },
        {
          id: 12,
          title: "scarlett",
          active: false
        },
        {
          id: 13,
          title: "scarlett",
          active: false
        },
        {
          id: 14,
          title: "scarlett",
          active: false
        }
      ],
      messages: [
        {
          content: "lorem ipsum",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: true,
          created_at: "11:11am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:12am"
        },
        {
          content: "dolor",
          me: false,
          created_at: "11:14am"
        }
      ],
      messageForm: {
        content: "",
        me: true,
        created_at: "11:11am"
      }
    }
  },
  methods: {
    async getAllUsers() {
            this.users = await getUserList();
            console.log("sdf",this.users);
        },
  },
  mounted() {
        this.getAllUsers();
        console.log("sddd");
    },
}
</script>