<template>
  <div id="container">
    <h2>게시글 목록</h2>
    <div id="post-list">
      <div 
        v-for="(post, index) in posts" 
        :key="post.idx" 
        class="post-item" 
        @click="goToPostDetail(post.idx)"
      >
        <strong>{{ post.title }}</strong>
        <span class="nickname">닉네임: {{ post.nickname }}</span> 
      </div>
    </div>
    <div id="post-input">
      <IonButton @click="addPost">글쓰기</IonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IonButton } from '@ionic/vue';
import { database } from '@/firebase';
import { ref as dbRef, onValue } from "firebase/database";
import router from '@/router';

// Post 타입 정의
interface Post {
  idx: number;
  content: string;
  title: string; 
  userId: string; 
  nickname: string; 
}

const posts = ref<Post[]>([]);

onMounted(() => {
  fetchPosts();
});

const addPost = () => {
  router.push('/createContent');
}

// 게시물 상세 페이지로 이동
const goToPostDetail = (postId: number) => {
  router.push(`/postDetail/${postId}`); // 상세 페이지로 이동
}

const fetchPosts = () => {
  const postsRef = dbRef(database, 'posts');

  onValue(postsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const postArray = Object.values(data).map((post: any) => ({
        idx: post.idx,
        content: post.content,
        title: post.title,
        userId: post.userId 
      }));

      // 사용자 정보를 가져와서 닉네임 추가
      fetchUserNicknames(postArray);
    } else {
      posts.value = [];
      console.log("No posts found.");
    }
  }, (error) => {
    console.error("Error fetching posts: ", error); 
  });
};

const fetchUserNicknames = (postArray: Omit<Post, 'nickname'>[]) => {
  const usersRef = dbRef(database, 'users');

  // 사용자 데이터 가져오기
  onValue(usersRef, (snapshot) => {
    const userData = snapshot.val();
    const userNicknames: { [key: string]: string } = {};

    if (userData) {
      for (const key in userData) {
        userNicknames[key] = userData[key].nickname;
      }
    }

    // 게시물에 닉네임 추가
    posts.value = postArray.map(post => ({
      ...post,
      nickname: userNicknames[post.userId] || '익명'
    }));

    console.log("Fetched posts with nicknames: ", posts.value); 
  }, (error) => {
    console.error("Error fetching users: ", error); 
  });
};
</script>

<style>
#container {
  padding: 16px;
}

#post-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  text-align: center;
}

.post-item {
  background-color: #f1f1f1;
  padding: 8px;
  margin: 4px 0;
  border-radius: 4px;
  display: flex; 
  justify-content: space-between; 
  cursor: pointer; 
}

.nickname {
  margin-left: auto; 
}
</style>
