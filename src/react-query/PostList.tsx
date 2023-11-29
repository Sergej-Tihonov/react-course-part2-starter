import React, {useState} from 'react';
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10
  const [page, setPage] = useState<number>(1)
  const [userId, setUserId] = useState<number | null>(null)
  const {data:posts, error, isLoading} = usePosts({userId, page, pageSize});

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId || ""}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="btn btn-primary my-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary my-3 ms-1"
      >
        Next
      </button>
    </>
  );
};

export default PostList;
