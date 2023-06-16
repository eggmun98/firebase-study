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
      const board = doc(collection(getFirestore(app), "board"), router);
      const result = await getDoc(board);
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
