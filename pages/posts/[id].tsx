import { useRouter } from "next/router";
import Link from "next/link";
import { posts, users } from "@/data/mockData"
import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";

const PostDetail = () => {
  const { query } = useRouter();
  const { id } = query;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <p>Post not found!</p>;
  }

  const user = users.find((user) => user.id === post.authorId);
  
  if (!user) {
    return <p>User not found!</p>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600 mt-4">{post.body}</p>

      <div className="mt-4">
        <Link href={`/profiles/${user.id}`}>
          <span className="text-sm text-blue-600 hover:underline">Posted by {user.name}</span>
        </Link>
        <div className="flex items-center mt-2">
          <Avatar src={user.avatar} size={48} />
          <p className="ml-2">{user.name}</p>
        </div>
      </div>
    </div>
  );
};


export default PostDetail;
