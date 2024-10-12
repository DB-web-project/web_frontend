<template>
  <div class="chat-app">
    <div class="contacts-list">
      <h2>联系人</h2>
      <ul>
        <li v-for="contact in contacts" :key="contact.id" @click="selectContact(contact)">
          {{ contact.name }}
        </li>
      </ul>
    </div>
    <div class="chat-window" v-if="selectedContact">
      <div class="header">
        <h3>{{ selectedContact.name }}</h3>
      </div>
      <div class="messages-list">
        <div v-for="message in messages" :key="message.id" class="message-item" :class="{ 'sent': message.isSent, 'received': !message.isSent }">
          <div class="message-content">
            <strong>{{ message.sender }}:</strong>
            <p>{{ message.content }}</p>
          </div>
          <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ],
      selectedContact: null,
      messages: [],
    };
  },
  methods: {
    selectContact(contact) {
      this.selectedContact = contact;
      this.loadMessages(contact.id);
    },
    loadMessages(contactId) {
      // 示例数据，以 contactId 匹配加载消息
      const conversationMap = {
        1: [
          { id: 1, sender: 'Alice', content: '你好！', timestamp: '2024-10-01T12:00:00Z', isSent: false },
          { id: 2, sender: '我', content: '你好，Alice！', timestamp: '2024-10-01T12:01:00Z', isSent: true },
        ],
        2: [
          { id: 3, sender: 'Bob', content: '你在做什么？', timestamp: '2024-10-02T14:30:00Z', isSent: false },
          { id: 4, sender: '我', content: '准备去健身。', timestamp: '2024-10-02T14:31:00Z', isSent: true },
        ],
        3: [
          { id: 5, sender: 'Charlie', content: '明天见！', timestamp: '2024-10-03T16:15:00Z', isSent: false },
        ],
      };
      this.messages = conversationMap[contactId] || [];
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
}

.contacts-list {
  width: 30%;
  background-color: #f7f7f7;
  border-right: 1px solid #e0e0e0;
  padding: 10px;
  overflow-y: auto;
}

.contacts-list h2 {
  margin: 0 0 10px;
}

.contacts-list ul {
  list-style-type: none;
  padding: 0;
}

.contacts-list li {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.contacts-list li:hover {
  background-color: #e0e0e0;
}

.chat-window {
  width: 70%;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 10px;
  background-color: #007aff;
  color: white;
  text-align: center;
}

.messages-list {
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.message-item {
  margin-bottom: 15px;
  position: relative;
  clear: both;
}

.message-content {
  display: inline-block;
  padding: 10px;
  border-radius: 18px;
  max-width: 75%;
}

.sent {
  text-align: right;
}

.sent .message-content {
  background-color: #007aff;
  color: white;
  margin-left: auto;
}

.received .message-content {
  background-color: #e5e5ea;
  color: black;
  margin-right: auto;
}

.timestamp {
  font-size: 0.8em;
  color: gray;
  position: absolute;
  bottom: -15px;
  right: 10px;
}
</style>