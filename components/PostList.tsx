import Post from "@/components/Post";
import type { Post as PostType } from "@/data/types";

type PostListProps = {
  posts: PostType[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
