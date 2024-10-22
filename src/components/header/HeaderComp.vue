<template>
    <IonHeader>
        <IonToolbar>
            <div id="header-inner">
                <div id="title-container">
                    <p>게시판</p>
                </div>
                <IonButton slot="end" @click="logout">로그아웃</IonButton>
            </div>
        </IonToolbar>
    </IonHeader>
</template>

<script setup lang="ts">
import { IonButton, IonHeader, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth'; // Firebase Auth 가져오기

// router 인스턴스를 가져옵니다.
const router = useRouter();

// logout 함수를 정의합니다.
const logout = async () => {
    const auth = getAuth(); // Firebase Auth 인스턴스 가져오기
    try {
        await signOut(auth); // Firebase에서 로그아웃
        console.log("로그아웃 성공");
        alert("로그아웃되었습니다.")
        router.push('/login'); // 로그인 페이지로 리다이렉트
    } catch (error) {
        console.error("로그아웃 실패: ", error);
    }
}
</script>

<style>
#header-inner {
    display: flex;
    justify-content: space-between; 
    align-items: center;
    padding: 0 16px; 
    width: 100%; 
}

#title-container {
    flex: 1;
    display: flex;
    justify-content: center;
    background-color: white;
}

#header-inner p {
    font-size: 20px;
    font-weight: bold; 
    font-family: Arial;
    color: #2985ee;
}
</style>
