<template>
  <div id="container">
    <h2>게시글 목록</h2>
    <div id="post-list">
      <div v-for="(post, index) in posts" :key="post.postidx" class="post-item" @click="goToPostDetail(post.postidx)">
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
import { ref, reactive, onMounted, nextTick } from 'vue';
import { IonButton } from '@ionic/vue';
import router from '@/router';

// 타입 정의
interface Post {
  postidx: number;
  content: string;
  title: string;
  userid: number;
  nickname: string;
}

let posts = ref<Post[]>([]);
// const posts = ref([]);


// 전체 post 가져오기
const fetchPosts = async () => {
  const API_BASE_URL = 'http://localhost:8080';
  try {
    const response = await fetch(`${API_BASE_URL}/posts`
    );
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }
    const data = await response.json();
    posts.value = data;
    console.log(posts);
  } catch (error: any) {
    console.error('데이터 패치 실패: ', error.message);
    alert("데이터를 가져오지 못했습니다: " + error.message);
  }
  await nextTick();
}
// 게시물 생성 페이지로 이동
const addPost = () => {
  router.push('/createContent');
}
// 게시물 상세 페이지로 이동
const goToPostDetail = (postidx: number) => {
  router.push(`/postDetail/${postidx}`); // 상세 페이지로 이동
}

onMounted(fetchPosts);
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
