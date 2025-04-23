import Head from "next/head";
import { posts } from "@/data/mockData";
import PostList from "@/components/PostList";

export default function HomeFeed() {
  return (
    <>
      <Head>
        <title>Home Feed | Couchsurfing Local</title>
      </Head>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Home Feed</h1>
        <PostList posts={posts} />
      </main>
    </>
  );
}
