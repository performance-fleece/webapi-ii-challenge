import React from 'react';
import styled from 'styled-components';

const PostWrapper = styled.div`
  border: 1px solid black;
  border-radius: 10pt;
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 220px;
  margin: 10px 0;
  background: white;
  justify-content: space-around;
`;

const PostCard = props => {
  return (
    <PostWrapper>
      <div>{props.post.title}</div>
      <div>{props.post.contents}</div>
    </PostWrapper>
  );
};

export default PostCard;
