<template>
  <div class="home">

    <ul>
      <li
        v-for="item of msgList"
        :key="item.id"
      >
        <p>
          <span>{{ item.user }}</span>
          <span>{{ item.dateTime | dateFormat }}</span>
        </p>
        <p>说：{{ item.msg }}</p>
      </li>
    </ul>

    <input type="text" placeholder="请输入消息" v-model="msg" />
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script>

const ws = new WebSocket('ws://localhost:8090');

export default {
  name: 'socket',
  data () {
    return {
      msg: '',
      username: '',
      msgList: []
    }
  },
  created(){
      
  },
  mounted () {
    
    this.username = sessionStorage.getItem('username');

    if (!this.username) {
      this.$router.push('/login');
      return;
    }

    ws.addEventListener('open', this.handleWsOpen.bind(this), false);
    ws.addEventListener('close', this.handleWsClose.bind(this), false);
    ws.addEventListener('error', this.handleWsError.bind(this), false);
    ws.addEventListener('message', this.handleWsMessage.bind(this), false);
  },
  methods: {
    handleSendBtnClick () {
      const msg = this.msg;

      if (!msg.trim().length) {
        return;
      }

      ws.send(JSON.stringify({
        id: new Date().getTime(),
        user: this.username,
        dateTime: new Date().getTime(),
        msg: this.msg
      }));

      this.msg = '';
    },
    handleWsOpen (e) {
      console.log('FE: WebSocket open', e);
    },
    handleWsClose (e) {  
      console.log('FE: WebSocket close', e);
    },
    handleWsError (e) {  
      console.log('FE: WebSocket error', e);
    },
    handleWsMessage (e) {
        console.log(e.data)
        let msg = JSON.parse(e.data);
        this.msgList.push(msg);
    }
  }
}
</script>

<style lang="less" scoped>
    
</style>
