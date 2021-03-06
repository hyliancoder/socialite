import { useMutation, useFlash } from '@redwoodjs/web';
import { Link, routes, navigate } from '@redwoodjs/router';

import { QUERY } from 'src/components/PostsCell';

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  );
};

const checkboxInputTag = (checked) => {
  return <input type='checkbox' checked={checked} disabled />;
};

const Post = ({ post }) => {
  const { addMessage } = useFlash();
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      navigate(routes.posts());
      addMessage('Post deleted.', { classes: 'rw-flash-success' });
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } });
    }
  };

  return (
    <>
      <div className='rw-segment'>
        <header className='rw-segment-header'>
          <h2 className='rw-heading rw-heading-secondary'>Post {post.id} Detail</h2>
        </header>
        <table className='rw-table'>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{post.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(post.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(post.updatedAt)}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{post.state}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{post.title}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{post.content}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>{post.image}</td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>{post.slug}</td>
            </tr>
            <tr>
              <th>Author id</th>
              <td>{post.authorId}</td>
            </tr>
            <tr>
              <th>Metadata</th>
              <td>{jsonDisplay(post.metadata)}</td>
            </tr>
            <tr>
              <th>Is featured</th>
              <td>{checkboxInputTag(post.isFeatured)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className='rw-button-group'>
        <Link to={routes.editPost({ id: post.id })} className='rw-button rw-button-blue'>
          Edit
        </Link>
        <a href='#' className='rw-button rw-button-red' onClick={() => onDeleteClick(post.id)}>
          Delete
        </a>
      </nav>
    </>
  );
};

export default Post;
