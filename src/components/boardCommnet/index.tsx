import { useEffect, useState } from "react";
import { Line, Wrapper } from "./styles";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";
import { app } from "../../commons/firebase";
import { useRouter } from "next/router";
import { query } from "firebase/database";

export default function BoardCommnetUI() {
  const [content, setContent] = useState("");
  const [commentData, setCommentData] = useState([]);
  const router = useRouter();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const comment = (id) =>
    collection(doc(getFirestore(app), "board", id), "comments");
  // board 컬렉션안에 comments 컬렉션을 참조하는 코드이다.

  const onClickCommentSubmit = async () => {
    await addDoc(comment(router.query.id), { content: content });
    // addDoc의 두번째 인자에는 객체형태로 보내야 한다.
    alert("댓글을 작성하였습니다.");
  };

  useEffect(() => {
    const fetchComment = async () => {
      if (router.query.id) {
        const comment = collection(
          doc(getFirestore(app), "board", router.query.id),
          "comments"
        );
        // 게시글 안에 댓글을 참조
        const result = await getDocs(comment);
        const comments = result.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // doc.data() 객체를 이용하여 필드 데이터만 저장

        setCommentData(comments);
      }
      console.log("resultData: ", commentData);
    };
    fetchComment();
  }, []);

  useEffect(() => {
    console.log("resultData: ", commentData);
  }, [commentData]);

  return (
    <Wrapper>
      <div>댓글 작성</div>
      <input onChange={onChangeContent}></input>
      <button onClick={onClickCommentSubmit}>댓글 작성</button>
      <Line></Line>
      <div>댓글 목록</div>
      {commentData.map((el) => (
        <>
          <div>{el.content}</div>
        </>
      ))}
    </Wrapper>
  );
}
