<template>
    <IonPage>
        <IonContent class="ion-padding" id="content">
            <HeaderComp></HeaderComp>
            <div id="post-detail">
                <h2 v-if="post">{{ post.title }}</h2>
                <p v-if="post"><strong>닉네임:</strong> {{ post.nickname }}</p>
                <p v-if="post"><strong>내용:</strong> {{ post.content }}</p>
                <IonButton @click="goBack" id="btn">뒤로가기</IonButton>
            </div>
            <FooterComp></FooterComp>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { database } from '@/firebase';
import { ref as dbRef, get } from "firebase/database";
import { IonContent, IonPage } from '@ionic/vue';
import HeaderComp from '@/components/header/HeaderComp.vue';
import FooterComp from '@/components/footer/FooterComp.vue';

// 게시물 데이터 정의
interface Post {
    idx: number;
    content: string;
    title: string;
    userId: string;
    nickname: string;
}

const post = ref<Post | null>(null);
const route = useRoute();
const router = useRouter();

const fetchPostDetail = async (postId: number) => {
    const postRef = dbRef(database, `posts/${postId}`);
    const snapshot = await get(postRef);

    if (snapshot.exists()) {
        const data = snapshot.val();
        post.value = {
            idx: data.idx,
            content: data.content,
            title: data.title,
            userId: data.userId,
            nickname: '' // 닉네임은 빈 문자열로 초기화
        };
        // 사용자의 닉네임 가져오기
        await fetchUserNickname(data.userId);
    } else {
        console.error("No data available");
    }
};

// 사용자의 닉네임을 가져오는 함수
const fetchUserNickname = async (userId: string) => {
    const userRef = dbRef(database, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        if (post.value) {
            post.value.nickname = userData.nickname || '익명'; // 닉네임이 없을 경우 '익명'으로 설정
        }
    } else {
        if (post.value) {
            post.value.nickname = '익명'; // 사용자 데이터가 없을 경우
        }
    }
};

onMounted(() => {
    const postId = Number(route.params.id); 
    fetchPostDetail(postId);
});

const goBack = () => {
    router.back(); // 이전 페이지로 돌아가기
}
</script>

<style>
#content {
    display: flex;
    flex-direction: column; /* 수직 방향으로 정렬 */
    height: 100%; /* 전체 높이를 사용 */
}

#post-detail {
    padding: 16px;
    flex: 1; /* 남은 공간을 차지하도록 설정 */
}

#btn {
    background-color: #929292;
    width: 200px;
    height: 120px;
    color: aliceblue;
    cursor: pointer;
}
</style>
