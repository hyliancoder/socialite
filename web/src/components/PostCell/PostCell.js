import Post from 'src/components/Post';

export const QUERY = gql`
  query FIND_POST_BY_ID($id: Int!) {
    post: post(id: $id) {
      id
      createdAt
      updatedAt
      state
      title
      content
      image
      slug
      authorId
      metadata
      isFeatured
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Post not found</div>;

export const Success = ({ post }) => {
  return <Post post={post} />;
};
