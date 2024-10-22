<template>
  <IonPage>
      <IonContent>
          <div>
              <HeaderComp></HeaderComp>
          </div>
          <div>
              제목<IonInput v-model="newPost.title" placeholder="제목을 입력하세요"></IonInput>
              내용<IonInput v-model="newPost.content" placeholder="내용을 입력하세요"></IonInput>
              <IonButton @click="addPost">완료</IonButton>
              <IonButton @click="back">뒤로가기</IonButton>
          </div>
          <div>
              <FooterComp></FooterComp>
          </div>
      </IonContent>
  </IonPage>
</template>

<script>
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/vue';
import { ref } from 'vue';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Firebase Authentication 가져오기
import HeaderComp from '@/components/header/HeaderComp.vue';
import FooterComp from '@/components/footer/FooterComp.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
      HeaderComp,
      FooterComp,
      IonPage,
      IonContent,
      IonInput,
      IonButton,
  },
  setup() {
      const newPost = ref({
          title: '',
          content: ''
      });

      const database = getDatabase();
      const router = useRouter();
      const auth = getAuth();

      const addPost = () => {
          if (newPost.value.title.trim() && newPost.value.content.trim()) {
              const postId = Date.now();
              const postRef = dbRef(database, 'posts/' + postId);

              const user = auth.currentUser; // 현재 로그인된 사용자 정보 가져오기

              const dataToSend = {
                  idx: postId,
                  content: newPost.value.content,
                  title: newPost.value.title,
                  userId: user ? user.uid : null,
              };

              set(postRef, dataToSend)
                  .then(() => {
                      console.log("Post added successfully");
                      newPost.value.content = '';
                      newPost.value.title = '';
                      alert("글 쓰기 완료");
                      router.push('/main');
                  })
                  .catch((error) => {
                      console.error("Error adding post: ", error);
                  });
          } else {
              alert("제목과 내용을 모두 입력하세요."); // 제목과 내용이 비어있을 때 경고 메시지
          }
      };

      const back = () => {
          router.go(-1); // 이전 페이지로 이동
      };

      return {
          newPost,
          addPost,
          back,
      };
  },
};
</script>
