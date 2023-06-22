import { ChangeEvent, useState } from "react";
import * as S from "./styleds";
import { collection, getFirestore, addDoc } from "firebase/firestore/lite";
import { app } from "../../../commons/firebase";

export default function BoardWriteUI() {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
  };

  // 다른 방식의 문서를 추가하는 방법이다!!
  //  useEffect(() => {
  // const board = firestore.collection("bucket");
  // board이라는 변수로 firestore의 collection인 board에 접근
  // bucket.doc("info").set({ writer: '성진', title: "반가워요" });
  // board 콜렉션의 info 문서에 {writer: '성진';, title: "반가워요"} 데이터 추가.
  // 새로 만들거나 덮어쓰기
  // });

  const onChangeWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value); // target은 현재 이벤트 발생의 위치에서 자식의 위치를 알려줌
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
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
      <button onClick={onClickSubmit}>등록하기</button>
    </S.Wrapper>
  );
}
