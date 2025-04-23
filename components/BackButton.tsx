import Link from "next/link";
import React from "react";

const BackButton = () => {
  return (
    <Link href="/" passHref>
      <button className="flex items-center text-blue-600 hover:underline mt-4">
        <span className="mr-2">&larr;</span> Back to Feed
      </button>
    </Link>
  );
};

export default BackButton;
