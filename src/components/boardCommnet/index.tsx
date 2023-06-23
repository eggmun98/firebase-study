import { useState } from "react";
import { Line, Wrapper } from "./styles";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore/lite";
import { app } from "../../commons/firebase";
import { useRouter } from "next/router";

export default function BoardCommnetUI() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const comment = (id) =>
    collection(doc(getFirestore(app), "board", id), "comments");
  // board 컬렉션안에 comments 컬렉션을 참조하는 코드이다.

  const onClickCommentSubmit = async () => {
    await addDoc(comment(router.query.id), { content });
    // addDoc의 두번째 인자에는 객체형태로 보내야 한다.
    alert("댓글을 작성하였습니다.");
  };

  return (
    <Wrapper>
      <div>댓글 작성</div>
      <input onChange={onChangeContent}></input>
      <button onClick={onClickCommentSubmit}>댓글 작성</button>
      <Line></Line>
      <div>댓글 목록</div>
    </Wrapper>
  );
}
