"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/firebase"; // Import Firestore config
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  const { user } = useUser();
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleRoleSelection = async (selectedRole) => {
    if (!user) return;

    setRole(selectedRole);

    // 2️⃣ Store role in Firebase
    await setDoc(doc(db, "users", user.id), {
      email: user.emailAddresses[0].emailAddress,
      role: selectedRole,
      createdAt: new Date(),
    });

    // 3️⃣ Redirect user
        router.push(`/${role}/profile-setup`)
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-4">Are you a Business or a Freelancer?</h2>
      <button onClick={() => 
        handleRoleSelection("business")
        } className="p-3 bg-blue-600 text-white rounded-md m-2">
        I am a Business
      </button>
      <button onClick={() => handleRoleSelection("freelancer")} className="p-3 bg-green-600 text-white rounded-md m-2">
        I am a Freelancer
      </button>
    </div>
  );
}
