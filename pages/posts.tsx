import { posts } from "@/data/mockData";
import Link from "next/link";

const PostsPage = () => {
  return (
    <div>
      <h1>Post Feed</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Link href={`/profiles/${post.authorId}`}>View Author</Link>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
