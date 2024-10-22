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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';

const signupEmail = ref('');
const signupPassword = ref('');
const nickname = ref('');
const router = useRouter();

const isDisabled = computed(() => {
    return !signupEmail.value || !signupPassword.value || !nickname.value;
});

const signup = async () => {
    if (isDisabled.value) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
        const user = userCredential.user;

        console.log("회원가입 성공");
        alert("회원가입 성공");

        const database = getDatabase();
        const userRef = dbRef(database, 'users/' + user.uid);
        await set(userRef, {
            email: signupEmail.value,
            nickname: nickname.value
        });

        router.push('/login');
    } catch (error: any) {
        console.error("회원가입 실패: ", error.message);
    }
};
</script>
