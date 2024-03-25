"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data } = useSession();

  const user = data?.user;

  return (
    <div>
      Profile
      {user ? (
        <h2>username: {user?.name}</h2>
      ) : (
        <h2>Client side user not signed in</h2>
      )}
    </div>
  );
};

export default Profile;
