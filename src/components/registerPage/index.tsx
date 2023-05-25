import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../commons/firebase";

export default function RegisterUI() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Firebase를 사용하여 회원가입 처리
    const app = initializeApp(firebaseConfig); // 파이어베이스 초기화
    const auth = getAuth(app); // 파이어베이스 로그인 관련 메소드 가져오기

    const { email, password } = data;
    await createUserWithEmailAndPassword(auth, email, password);

    alert("회원가입 하였습니다.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        이메일: <input {...register("email")} />
        비밀번호: <input type="password" {...register("password")} />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
