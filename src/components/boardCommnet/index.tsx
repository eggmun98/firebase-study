import { useEffect, useState } from "react";
import { CommentWrapper, ContentWrapper, Line, Wrapper } from "./styles";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
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
    const time = new Intl.DateTimeFormat("ko", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());

    await addDoc(comment(router.query.id), { content: content, time });
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

        const q = query(comment, orderBy("time"));
        // 게시글 안에 댓글을 참조
        const result = await getDocs(q);
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

  // const onClickDelete = (id) => async () => {
  //   const comment = collection(
  //     doc(getFirestore(app), "board", router.query.id),
  //     "comments",
  //     id
  //   );

  //   await deleteDoc(comment);

  //   alert("댓글이 삭제되었습니다.");
  // };

  const onClickDelete = (id) => async () => {
    const commentDoc = doc(
      getFirestore(app),
      "board",
      router.query.id,
      "comments",
      id
    );

    await deleteDoc(commentDoc);

    alert("댓글이 삭제되었습니다.");
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <input onChange={onChangeContent}></input>
        <button onClick={onClickCommentSubmit}>댓글 작성</button>
      </ContentWrapper>
      <Line></Line>
      <div>댓글 목록</div>
      {commentData.map((el) => (
        <CommentWrapper>
          <div>{el.content}</div>
          <div>{el.time}</div>
          <div>
            <button onClick={onClickDelete(el.id)}>댓글 삭제</button>
            <button>댓글 수정</button>
          </div>
        </CommentWrapper>
      ))}
    </Wrapper>
  );
}
