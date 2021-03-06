import { Link, routes } from '@redwoodjs/router';

import Posts from 'src/components/Posts';

export const QUERY = gql`
  query POSTS {
    posts {
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

export const Empty = () => {
  return (
    <div className='rw-text-center'>
      {'No posts yet. '}
      <Link to={routes.newPost()} className='rw-link'>
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Success = ({ posts }) => {
  return <Posts posts={posts} />;
};
