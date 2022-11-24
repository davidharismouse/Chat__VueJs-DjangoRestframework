<template>
  <v-layout>
    <v-flex xs2 class="ml-3" >
      <v-card class="rounded mt-2 overflow-y-auto" :height="920">
        <v-card-title class="blue white--text py-3">Chat list</v-card-title>
        <v-list v-model="userselect">
          <v-subheader>{{user_id}}</v-subheader>
          <v-divider></v-divider>   
          <v-list-item-group v-model="selectedItem" color="primary">       
            <v-list-item v-for="user in users" :key="user.id" @click="activeChat(user.id)" :option="user.id" >            
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-title v-text="user.username" />
              <v-list-item-icon>
                <v-icon :color="user.active ? 'deep-purple accent-4' : 'blue'">
                  mdi-message-arrow-right
                </v-icon>
              </v-list-item-icon>            
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs10 class="ma-2 mx-3">
      <v-responsive
        v-if="activeChat"
        class="overflow-y-hidden fill-height"
        height="900"
      >
        <v-card
          flat
          class="d-flex flex-column fill-height"
          ref="form"
        >
          <v-card-title>
            <v-avatar><v-img src="https://cdn.vuetifyjs.com/images/john.png" alt="avatar"></v-img></v-avatar>
            <span>Aladin</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="flex-grow-1 overflow-y-auto">
            <div v-for="(msg, i) in messages" :key="i">
              <div v-if="msg.sender !== user_name">
                <span class="ml-2 mb-1"> <b> {{msg.sender}} </b> </span> <br>
                <span class="rounded green white--text px-4 py-1"> {{msg.text}}</span>
              </div>
              <v-layout v-else>
                <v-spacer></v-spacer>
                <span></span>
                <br>
                <span class="rounded primary lighten-3 black--text px-4 py-2"> {{msg.text}}</span>                           
              </v-layout>
            </div>
            <div id="bottomOfArea"></div>
          </v-card-text>
          <v-card-text class="flex-shrink-1">
              <v-text-field
                v-model="messageForm.content"
                label="type_a_message"
                type="text"
                outlined
                append-icon="mdi-send"
                @keyup.enter="sendMessage"
                @click:append="sendMessage"
                hide-details
              />
          </v-card-text>
        </v-card>
      </v-responsive>
    </v-flex>
  </v-layout>  
</template>
<script>
import axios from 'axios'
// import { createStore} from 'vuex'
import { getUserList} from '@/components/api'
// const store = createStore({
//   state() {
//     return {

//     }
//   }
// })
export default {
  
  data() {
    return {
      users: [],
      messages: [],
      selectedItem: '',
      userselect:'',
      active: '',
      user_name: localStorage.getItem('chat_username'),
      user_id: localStorage.getItem('caht_userid'),
      token: localStorage.getItem('chat_Token'),
      chatsocket: null,
      messageForm: {
        content: "",
        sender: this.user_id,
        created_at: "11:11am"
      }
    }
  },
  computed: {    
    form() {
      return {
        content: this.messageForm.content,
        sender: localStorage.getItem('chat_user'),
      }
    }
  },
  methods: {
        async getAllUsers() {
            this.users = await getUserList();
        },
        activeChat(user) {
          console.log('superuser->', user)
          this.messages = axios.get(
            'http://127.0.0.1:8500/api/messagelist/'+ user + '/' + this.user_id + '/'
            ).then(
              response => this.messages = response.data
              )
          console.log("response==", this.messages.sender);
        },
        chattoken () {
          return this.token
        },
        sendMessage() {
          const receiver = this.selectedItem + 1
          this.chatsocket.send(JSON.stringify({
            'message' : this.messageForm.content,
            'sender': this.user_id,
            'receiver': receiver
          })).then(this.messages.push(message))
          this.messageForm.content = ''         
        },
        receiveMessage(message) {
          console.log('data=====',message.fields)
          this.messages.push(message.fields)
          setTimeout(() => {document.getElementById("bottomOfArea").scrollIntoView({ block: 'end',  behavior: 'smooth' }) }, 0)

        }
  },
  mounted() {
        this.getAllUsers();
        this.activeChat();
    },
  created() {
    
    const token = localStorage.getItem('chat_token')
    this.chatsocket = new WebSocket(`${"ws://localhost:8500/msg/"}?token=${token}`)
    setTimeout(() => {document.getElementById("bottomOfArea").scrollIntoView({ block: 'end',  behavior: 'smooth' }) }, 0)
    this.chatsocket.onmessage = (event) => {
      let message = {
        fields : {
          text: JSON.parse(event.data).message,
          sender: JSON.parse(event.data).sender
        }
      }
      this.receiveMessage(message)
    }
    
  }
}
</script>
<style>
  .rounded { border-radius:15px;}
  .chat-box { overflow-y: scroll;}
  .input { position: absolute; 
    bottom: 10;
  }
</style>