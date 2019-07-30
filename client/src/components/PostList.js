import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-around;
  padding: 11px 0;
  background: lightgrey;
`;

const PostList = props => {
  return (
    <ListWrapper>
      {props.posts.map(post => {
        return <PostCard post={post} />;
      })}
    </ListWrapper>
  );
};

export default PostList;
