<template>
    <IonPage>
        <IonContent>
            <h2>회원가입</h2>
            <IonInput v-model="signupEmail" type="email" placeholder="이메일을 입력하세요"></IonInput>
            <IonInput v-model="signupPassword" type="password" placeholder="비밀번호를 입력하세요"></IonInput>
            <IonInput v-model="nickname" placeholder="닉네임을 입력하세요"></IonInput>
            <IonButton @click="signup" :disabled="isDisabled">회원가입</IonButton>
        </IonContent>
    </IonPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonButton, IonInput, IonPage, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

const signupEmail = ref('');
const signupPassword = ref('');
const nickname = ref('');
const router = useRouter();

const isDisabled = computed(() => {
    return !signupEmail.value || !signupPassword.value || !nickname.value;
});

const signup = async () => {
    const API_BASE_URL = 'http://localhost:8080';
    const signupCredentials = {
        email: signupEmail.value,
        pwd: signupPassword.value,
        nickname: nickname.value
    }
    if (isDisabled.value) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupCredentials)
        })
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        console.log("회원가입 성공");
        alert("회원가입 성공");
        router.push('/login');
    } catch (error: any) {
        console.error("회원가입 실패: ", error.message);
        alert("회원가입 실패: " + error.message);
    }
};
</script>
