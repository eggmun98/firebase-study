import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
  orderBy,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { app } from "../../../commons/firebase";
import { Wrapper } from "./styleds";
import { useRouter } from "next/router";
import { query } from "firebase/database";

export default function BoardListUI() {
  const [dataBoards, setDataBoards] = useState<DocumentData[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBoards = async () => {
      const board = collection(getFirestore(app), "board");
      const q = query(board, orderBy("time"));
      // 파이어베이스에서는 문서를 정렬하려면 orderBy 메서드를 사용해야 한다.
      const result = await getDocs(q); // getDoc가 새 문서를 추가하는 거라면 getDocs는 기존의 모든 문서를 가져온다
      const boards = result.docs.map((el) => ({
        id: el.id,
        ...el.data(),
      }));
      setDataBoards(boards);
      // data() 이 메소드는 파이어베이스에서 제공하는 메소드
      // 이 메소드는 DocumentSnapshot 객체에 호출되어서 문서의 필드 데이터만 가져올 수 있다.
      // 그래서 필터라는 메소드를 통해서 문서의 필드값만 가져오거다
    };
    fetchBoards();
  }, []);

  const onClickPageMove = (id: string) => () => {
    router.push(`/boards/board/${id}`);
  };

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const searchBarFn = async () => {
    const boards = await getDocs(collection(getFirestore(app), "board"));
    const searchBoard = boards.docs.filter((doc) => {
      const board = doc.data();
      console.log("qq", boards);

      return board.title.includes(keyword);
    });
    const result = searchBoard.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSearchData(result);
  };
  console.log("keyword: ", keyword);

  return (
    <Wrapper>
      {dataBoards.map((el) => (
        <div key={el.id} onClick={onClickPageMove(el.id)}>
          <div>작성자: {el.writer}</div>
          <div>제목: {el.title}</div>
          <div>내용: {el.contents}</div>
          <div>시간: {el.time}</div>
        </div>
      ))}

      <div>
        <div>검색 기능</div>
        <input onChange={onChangeKeyword}></input>
        <button onClick={searchBarFn}>검색</button>
      </div>
      {searchData.map((el) => (
        <div>
          <div>작성자: {el.writer}</div>
          <div>제목: {el.title}</div>
          <div>내용: {el.contents}</div>
          <div>시간: {el.time}</div>
        </div>
      ))}
    </Wrapper>
  );
}
