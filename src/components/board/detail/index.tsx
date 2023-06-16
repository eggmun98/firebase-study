import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { app } from "../../../commons/firebase";
import { Wrapper } from "./styleds";
import { useRouter } from "next/router";

export default function BoardDetailUI() {
  const [dataBoard, setDataBoard] = useState<DocumentData | undefined>();
  const router = useRouter().query.id;
  console.log(router);

  useEffect(() => {
    const fetchBoard = async () => {
      const board = doc(collection(getFirestore(app), "board"), `${router}`);
      // 초기화할 파이어베이스 객체, 참조할 컬렉션 이름, 그 문서의 가져올 아이디값
      const result = await getDoc(board);
      // getDoc를 사용하면 하나의 문서를 가져올 수 있음
      setDataBoard(result.data());
    };
    fetchBoard();
  }, []);
  return (
    <Wrapper>
      <div>작성자: {dataBoard?.writer} </div>
      <div>제목: {dataBoard?.title}</div>
      <div>내용: {dataBoard?.contents} </div>
    </Wrapper>
  );
}
