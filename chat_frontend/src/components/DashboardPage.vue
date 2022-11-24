  <template>
    <v-row class="no-gutters elevation-1" height="100%">
      <v-col
        cols="12" sm="3"
        class="flex-grow-1 flex-shrink-0"
        style="border-right: 1px solid #0000001f;"
      >
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
        >
        <v-navigation v-model="drawer" permanent>
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
          <!-- <v-divider></v-divider> -->

          <v-list dense nav
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
        </v-navigation>
      </v-responsive>
      </v-col>
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
        >
          <div class="d-flex flex-column fill-height">
            <v-card-text class="flex-shrink-1">
              <v-text-field
              v-model="messageForm.content"
              label="type_a_message"
              type="text"
              outlined
              append-outer-icon="send"
              @keyup.enter="send"
              @click:append-outer="messageForm"/>
            </v-card-text>
          </div>
        </v-responsive>
      </v-col>
  </v-row>
  </template>


<script>
import {getUserList} from '@/components/api'
// import { send } from 'process';
// import sendMessage from '@/components/SendMessage.vue'

  export default {
    components:{
        // sendMessage,
    },

    data () {
      return {
        activeChat: 1,
        drawer: true,
        users: [],
          name:'David Harris',
          right: null,
          messageForm: {
          content: "",
          me: true,
          created_at: "12"
        },
      }
    },
    methods: {
        async getAllUsers() {
            this.users = await getUserList();
            console.log("sdf",this.users);
        },
        send() {
          this.connection.onmessage = function(){
            this.messageForm.contents
            console.log("df",this.messageForm.contents)
          }
        }
    },
    mounted() {
        this.getAllUsers();
        console.log("sddd");
    },
    created() {
    const token = localStorage.getItem('chat_Token')
    console.log("token=>",token);
    this.connection = new WebSocket(`${"ws://localhost:8500/msg/"}?token=${token}`)
    console.log("sdfd",this.connection);
    // const _self = this;
    this.connection.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log("message=>", message.text);
    }
  }
  }
</script>