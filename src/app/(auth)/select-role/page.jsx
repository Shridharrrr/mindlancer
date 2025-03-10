"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addCompany } from "@/services/services";
import { useUser, useClerk } from "@clerk/nextjs";

export default function SelectRolePage() {
  const [role, setRole] = useState(null);
  const { user } = useUser();
  const { user: clerkUser } = useClerk();
  const router = useRouter();

  const handleRoleSelection = async (selectedRole) => {
    if (!user) return;

    setRole(selectedRole);

    // 1️⃣ Store role in Firebase
    await addCompany({
      email: user.emailAddresses[0].emailAddress,
      id: user.id,
      role: selectedRole, // Store the role in Firebase
    });

    // 2️⃣ Update Clerk's metadata with the role
    await clerkUser.update({
      publicMetadata: {
        role: selectedRole,
      },
    });

    // 3️⃣ Redirect user
    router.push(selectedRole === "freelancer" ? "/lancer/profile-setup" : "/business/profile-setup");
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-4">Are you a Business or a Freelancer?</h2>
      <button
        onClick={() => handleRoleSelection("business")}
        className="p-3 bg-blue-600 text-white rounded-md m-2"
      >
        I am a Business
      </button>
      <button
        onClick={() => handleRoleSelection("freelancer")}
        className="p-3 bg-green-600 text-white rounded-md m-2"
      >
        I am a Freelancer
      </button>
    </div>
  );
}
