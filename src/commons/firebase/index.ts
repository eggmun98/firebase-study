// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB4en7IbRPqDWgeRYSZ3TXemzBJCLIYHUI", // 파이어베이스 프로젝트의 api키
  authDomain: "fir-study-9ff19.firebaseapp.com", // 파이어베이스 인증 도메인. 사용자 인증을 처리할 때 사용
  projectId: "fir-study-9ff19", // 파이어베이스 프로젝트의 고유 식별자
  storageBucket: "fir-study-9ff19.appspot.com", // 파이어베이스 스토리지 버킷의 경로 // 파일 및 미디어 저장소로 사용
  messagingSenderId: "735589317290", // 파이어베이스 클라우드 메시징을 위한 발신자 식별자
  appId: "1:735589317290:web:094a321dc31b69b7146ed3", // 파이어베이스 앱의 고유 식별자
  measurementId: "G-XKK0BTCFZG", // 파이어베이스 애널리틱스 위한 측정 id
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // 파이어베이스를 초기화 하는 함수
// firebaseConfig는 파이어베이스 프로젝트의 구성 정보를 담겨져 있다.
// initializeApp 함수를 호출하여 firebaseConfig를 사용하여 파이어베이스 앱을 초기화를 한다
// 그리고 그 구성정보들을 app 변수에 담는다.
// const analytics = getAnalytics(app);
