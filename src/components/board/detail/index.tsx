import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { app } from "../../../commons/firebase";
import { ButtonWrapper, Wrapper } from "./styleds";
import { useRouter } from "next/router";
import BoardCommnetUI from "../../boardCommnet";

export default function BoardDetailUI() {
  const [dataBoard, setDataBoard] = useState<DocumentData | undefined>();
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    // 상세 데이터 가져오는 함수
    const fetchBoard = async () => {
      const board = doc(
        collection(getFirestore(app), "board"),
        `${router.query.id}`
      );
      // 초기화할 파이어베이스 객체, 참조할 컬렉션 이름, 그 문서의 가져올 아이디값
      const result = await getDoc(board);
      // getDoc를 사용하면 하나의 문서를 가져올 수 있음
      setDataBoard(result.data());
    };
    fetchBoard();
  }, []);

  // 게시글 삭제 함수
  const onClickDelete = async () => {
    await deleteDoc(
      doc(collection(getFirestore(app), "board"), `${router.query.id}`)
    );

    alert("삭제하였습니다.");

    onClickPageMove02();
  };

  const onClickPageMove = () => {
    router.push(`/boards/board/${router.query.id}/edit`);
  };

  const onClickPageMove02 = () => {
    router.push(`/boards/`);
  };

  return (
    <Wrapper>
      <div>작성자: {dataBoard?.writer} </div>
      <div>제목: {dataBoard?.title}</div>
      <div>내용: {dataBoard?.contents} </div>
      <div>시간: {dataBoard?.time}</div>
      <ButtonWrapper>
        <button onClick={onClickPageMove}>수정하기</button>
        <button onClick={onClickDelete}>삭제하기</button>
        <button onClick={onClickPageMove02}>목록가기</button>
      </ButtonWrapper>
      <BoardCommnetUI></BoardCommnetUI>
    </Wrapper>
  );
}
