<template>
    <IonPage>
        <IonContent id="login-content">
            <div id="login-container">
                <h2>로그인</h2>
                <IonInput v-model="email" type="email" placeholder="이메일을 입력하세요" class="input-field"></IonInput>
                <IonInput v-model="password" type="password" placeholder="비밀번호를 입력하세요" class="input-field"></IonInput>
                <IonButton @click="login">로그인</IonButton>
                <IonButton @click="signUp">회원가입</IonButton>
            </div>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonInput, IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();


const login = async () => {
    const API_BASE_URL = 'http://localhost:8080';
    const loginCredentials = {
        email: email.value,
        pwd: password.value
    }
    // 아이디와 비밀번호 입력 검증
    if (!email.value || !password.value) {
        alert("이메일과 비밀번호를 입력하세요."); // 경고 메시지
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginCredentials)
        });

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        console.log("로그인 성공");
        router.push('/main');
    } catch (error: any) {
        console.error("로그인 실패: ", error.message);
        alert("로그인 실패: " + error.message); // 로그인 실패 시 경고 메시지
    }
};
// 회원가입 페이지로 이동
const signUp = () => {
    router.push('/signUp');
}
</script>

<style>
#login-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #2985ee;
    /* 배경색 파란색 */
}

#login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-field {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
}

h2 {
    margin: 20px 0;
}
</style>
