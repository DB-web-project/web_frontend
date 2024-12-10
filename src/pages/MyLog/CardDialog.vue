<template>
  <div class="dialog-backdrop">
    <div class="dialog">
      <!-- 左侧图片 -->
      <div class="dialog-left">
        <img :src="card.image" alt="Card Image" />
      </div>

      <!-- 右侧内容 -->
      <div class="dialog-right">
        <!-- 文案部分 -->
        <div class="dialog-text">
          <h2>{{ card.title }}</h2>
          <p>{{ card.description }}</p>
        </div>
        <hr class="divider" />

        <!-- 评论标题 -->
        <div class="comments-header">
          <h4>Comments</h4>
        </div>

        <!-- 评论区域 -->
        <div class="comments-section">
          <ul>
            <li v-for="(comment, index) in comments" :key="index">
              <!-- 用户头像和评论 -->
              <div class="comment-content">
                <div class="user-info">
                  <img :src="comment.avatar" alt="User Avatar" class="avatar" />
                  <span class="username">{{ comment.username }}</span>
                </div>
                <!-- 评论内容和操作 -->
                <div class="comment-details">
                  <span class="comment-text">{{ comment.text }}</span>
                  <div class="actions">
                    <div class="like" @click="toggleLike(index)">
                      <span :class="{ liked: comment.liked }">♥</span>
                      <span>{{ comment.likes }}</span>
                    </div>
                    <button
                        class="delete-button"
                        v-if="canDelete"
                        @click="deleteComment(index)"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- 评论输入框 -->
        <div class="comment-input">
          <input v-model="newComment" placeholder="Add a comment" />
          <button @click="addComment">Post</button>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <button class="close-button" @click="$emit('close-dialog')">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDialog",
  props: {
    card: Object, // 接收卡片数据
  },
  data() {
    return {
      comments: [],
      newComment: "",
      canDelete: true,
    };
  },

  mounted() {
    this.loadComments();
  },

  methods: {
    async loadComments() {
      try {
        // 1. 获取评论
        const response = await fetch(`http://47.93.172.156:8081/comment/find_by_post_id/${this.card.id}`);
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const commentsWithUserInfo = await Promise.all(
              data.map(async (comment) => {
                // 获取用户信息
                const userInfo = await this.getUserInfo(comment.publisher, comment.publisher_type);
                console.log(userInfo);

                // 检查点赞状态
                const liked = await this.checkLikeStatus(comment.id);
                console.log(liked)

                return {
                  text: comment.content,
                  likes: comment.likes,
                  liked:liked, // 设置点赞状态
                  username: userInfo.username,
                  avatar: userInfo.avatar,
                  id: comment.id
                };
              })
          );
          this.comments = commentsWithUserInfo;
        } else {
          console.error("Failed to fetch comments data");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },

// 检查点赞状态
    async checkLikeStatus(commentId) {
      try {
        const userId = JSON.parse(sessionStorage.getItem("id"));
        const response = await fetch(`http://47.93.172.156:8081/likes/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            comment_id: commentId,
            user_id: userId
          })
        });

        if (!response.ok) {
          console.error("Failed to fetch like status");
          return false; // 默认为未点赞
        }

        const data = await response.json();
        console.log(data.liked);
        if (data.liked === 0) {
          return false;
        }
        else {
          return true;
        }

      } catch (error) {
        console.error("Error checking like status:", error);
        return false; // 如果出错，也默认为未点赞
      }
    },

    async getUserInfo(userId,type) {
      try {
        // 2. 根据 userId 获取用户信息，分别查找用户、商家或管理员
        let userInfo = {};
        let Response = null
        if (type === "User") {
          Response = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        }
        else if (type === "Admin") {
          Response = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        }
        else {
          Response = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        }
        userInfo = await Response.json();
        // 尝试从用户接口获取信息
        // const userResponse = await fetch(`http://47.93.172.156:8081/user/find/${userId}`);
        // if (userResponse.ok) {
        //   userInfo = await userResponse.json();
        // } else {
        //   // 如果没有找到用户信息，尝试从商家接口获取
        //   const businessResponse = await fetch(`http://47.93.172.156:8081/business/find/${userId}`);
        //   if (businessResponse.ok) {
        //     userInfo = await businessResponse.json();
        //   } else {
        //     // 如果商家也没有，尝试从管理员接口获取
        //     const adminResponse = await fetch(`http://47.93.172.156:8081/admin/find/${userId}`);
        //     if (adminResponse.ok) {
        //       userInfo = await adminResponse.json();
        //     }
        //   }
        // }

        return {
          username: userInfo.name || "Unknown User",
          avatar: userInfo.avator || "https://via.placeholder.com/150",
        };
      } catch (error) {
        console.error("Error fetching user info:", error);
        return {
          username: "Unknown User",
          avatar: "https://via.placeholder.com/150",
        };
      }
    },

    addComment() {
      if (this.newComment.trim()) {
        const postId = this.card.id;  // 帖子ID
        const publisherId = JSON.parse(sessionStorage.getItem('id'));  // 发布者ID
        const publisherType = JSON.parse(sessionStorage.getItem('role'));  // 发布者类型
        const date = new Date().toISOString();  // 当前时间，格式化为ISO字符串
        const content = this.newComment;  // 评论内容
        const username = JSON.parse(sessionStorage.getItem('name'));  // 用户名
        const avatar = "https://img0.baidu.com/it/u=1613066704,908751205&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500";  // 随机头像
        console.log(postId)
        console.log(publisherId)
        console.log(publisherType)
        console.log(date)
        console.log(content)
        console.log(username)
        console.log(avatar)

        // 发送POST请求到后端
        fetch('http://47.93.172.156:8081/comment/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post_id: postId,
            publisher: publisherId,
            publisher_type: publisherType,
            date: date,
            content: content,
          }),
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              console.log(data.ok);
              this.comments.push({
                text: content,
                likes: 0,
                liked: false,
                username: username,
                avatar: avatar,
                id: data.id
              });
              this.newComment = "";  // 清空评论输入框
            })
            .catch((error) => {
              console.error('Error adding comment:', error);
            });
      }
    },


    deleteComment(index) {
      // 获取当前评论对象的 ID（假设评论对象中有一个 id 属性）
      const commentId = this.comments[index].id;
      console.log(commentId);
      console.log(this.comments[index]);

      // 调用后端删除接口
      fetch(`http://47.93.172.156:8081/comment/delete/${commentId}`, {
        method: 'DELETE',
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.comments.splice(index, 1);
          })
          .catch((error) => {
            console.error('Error deleting comment:', error);
          });
    },

    toggleLike(index) {
      const comment = this.comments[index];
      console.log(comment);
      console.log(comment.id);
      console.log(comment.likes);

      // 切换点赞状态
      comment.liked = !comment.liked;

      // 更新点赞数
      if (comment.liked) {
        comment.likes++;
        // 向后端发送点赞数据
        fetch('http://47.93.172.156:8081/comment/increase_likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment_id: comment.id,
            user_id: JSON.parse(sessionStorage.getItem('id'))
          }),
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              console.log('Likes updated successfully');
            })
            .catch((error) => {
              console.error('Error updating likes:', error);
            });
      } else {
        comment.likes--;
        // 向后端发送点赞数据
        fetch('http://47.93.172.156:8081/comment/cancel_likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment_id: comment.id,
            user_id: JSON.parse(sessionStorage.getItem('id'))
          }),
        })
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              console.log('Likes updated successfully');
            })
            .catch((error) => {
              console.error('Error updating likes:', error);
            });
      }

    }
  },
};
</script>

<style scoped>

* {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
/* 背景遮罩 */
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 弹窗主体 */
.dialog {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  width: 1000px;
  height: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-family: "Arial", "Helvetica", sans-serif;
  color: #333;
}

/* 左侧图片 */
.dialog-left {
  flex: 3;
}

.dialog-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* 右侧内容 */
.dialog-right {
  flex: 2;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

/* 文案部分 */
.dialog-text {
  margin-bottom: 15px;
}

.dialog-text h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
}

.dialog-text p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

/* 分割线 */
.divider {
  border: 0;
  height: 1px;
  background: #e0e0e0;
  margin: 10px 0;
}

/* 评论标题固定 */
.comments-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 5px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #444;
}

/* 评论区域 */
.comments-section {
  flex: 1;
  overflow-y: auto;
  max-height: 600px;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.comments-section::-webkit-scrollbar {
  display: none; /* Webkit 浏览器隐藏滚动条 */
}

.comments-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comments-section li {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

/* 用户信息容器 */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

/* 用户头像 */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
}

/* 用户名 */
.username {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

/* 评论内容和操作 */
.comment-content {
  display: flex;
  flex-direction: column;
}

/* 评论详情部分 */
.comment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.comment-text {
  font-size: 15px;
  line-height: 1.5;
  color: #555;
  flex: 1;
}

/* 点赞和删除按钮 */
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.like {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #999;
}

.like span {
  margin-left: 5px;
}

.like span.liked {
  color: red;
}

.delete-button {
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding: 0;
}

.delete-button:hover {
  color: #ff0000;
}

/* 评论输入框和按钮 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}

.comment-input input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.comment-input button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.comment-input button:hover {
  background: #0056b3;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}
</style>
