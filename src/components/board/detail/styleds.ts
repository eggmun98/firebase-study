import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    /* border: 1px solid #999;  */
    margin: 10px 100px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  > button {
    border: 1px solid #999;
    background-color: #fff;
    margin: 10px 100px;
  }
`;
