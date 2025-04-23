
import { users } from "@/data/mockData";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";

const Profiles = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <BackButton />
      <h1 className="text-3xl font-bold">User Profiles</h1>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {users.map((user) => (
          <Link href={`/profiles/${user.id}`} key={user.id}>
            <span className="flex flex-col items-center text-center">
              <Avatar src={user.avatar} size={72} />
              <p className="text-sm mt-2">{user.name}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
