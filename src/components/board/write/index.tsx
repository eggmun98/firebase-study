import { ChangeEvent, useState } from "react";
import * as S from "./styleds";
import {
  collection,
  getFirestore,
  addDoc,
  Firestore,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { app } from "../../../commons/firebase";
import { useRouter } from "next/router";

export default function BoardWriteUI(props) {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const router = useRouter();
  const onClickSubmit = async () => {
    const board = collection(getFirestore(app), "board");
    // collection은 특정 컬렉션에 대한 참조를 생성하는 역할을 한다.
    // 그리고 getFirestore 함수를 통해 파이어베이스 앱 인스턴스 객체를 가져온다
    // 즉 apa 변수는 initializeApp(firebaseConfig) 이 함수를 통해 파이어베이스를 초기화하여
    // 파이어베이스 프로젝트 구성 정보가 담겨져 있다.
    // 즉 그정보를 app 변수에 담겨져 있고 getFirestore은 새로운 인스턴스 객체를 생성해서 가져오는 역활
    await addDoc(board, { writer, title, contents }); //
    // getDoc는 컬렉션에 새로운 문서를 추가하는 작업을 수행한다.
    // 왼쪽 매개변수 자리에는 참조할 컬렉션을 말하는 거다.
    // 오른쪽은 추가할 문서의 데이터를 담는다.
    alert("게시글 등록에 성공하였습니다.");
    router.push(`/boards/board/${router.query.id}`);
  };

  // 다른 방식의 문서를 추가하는 방법이다!!
  //  useEffect(() => {
  // const board = firestore.collection("bucket");
  // board이라는 변수로 firestore의 collection인 board에 접근
  // bucket.doc("info").set({ writer: '성진', title: "반가워요" });
  // board 콜렉션의 info 문서에 {writer: '성진';, title: "반가워요"} 데이터 추가.
  // 새로 만들거나 덮어쓰기
  // });

  const onClickEdit = async () => {
    const board = doc(
      collection(getFirestore(app), "board"),
      `${router.query.id}`
    );
    // 문서의 참조를 가져오기 위해 doc() 함수를 이용해야 한다.
    // 첫번째 인자에는 컬렉션의 참조를 전달하고, 두번째 인자에는 수정할 문서의 id를 전달해야 한다.
    await updateDoc(board, { writer, title, contents });
    // updateDoc() 함수는 파이어베이스에서 문서를 업데이트할 때 사용하는 함수이다.
    // 첫 번째 인자에는 수정할 문서의 참조를 전달하고, 두번째 인자에는 수정할 데이터가 담긴 객체를 전달해야 한다.
    alert("게시글을 수정하였습니다.");
    router.push(`/boards/board/${router.query.id}`);
  };

  const onChangeWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value); // target은 현재 이벤트 발생의 위치에서 자식의 위치를 알려줌
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  const onClickPageMove = () => {
    router.push(`/boards/board/${router.query.id}`);
  };

  return (
    <S.Wrapper>
      <div>
        작성자: <input onChange={onChangeWrite}></input>
      </div>
      <div>
        제목: <input onChange={onChangeTitle}></input>
      </div>
      <div>
        내용: <input onChange={onChangeContents}></input>
      </div>
      <button onClick={props.isEdit ? onClickEdit : onClickSubmit}>
        {props.isEdit ? "수정하기" : "등록하기"}
      </button>
      <button onClick={onClickPageMove}>뒤로가기</button>
    </S.Wrapper>
  );
}
