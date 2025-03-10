"use client";
import { getFreelancers } from "@/services/services";
import React from "react";



export default function ProfilesPage() {
    const data = getFreelancers()
    const profiles = data.lancers

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Our Professionals</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="p-4 border rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">{profile.Name}</h3>
            <p className="text-gray-600">{profile.Skills}</p>
            <p className="text-sm text-gray-500">{profile.Experience}</p>
            <p className="text-sm text-gray-500">{profile.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
