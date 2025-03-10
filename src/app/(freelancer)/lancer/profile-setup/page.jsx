"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { db, storage } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SkillsDropdown from "@/components/SkillsDropdown";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
    const { user } = useUser();
    const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    skills: [],
    experience: "",
    portfolio: "",
    certificate: null,
  });

  const skillsOptions = [
    "JavaScript",
    "Next.js",
    "Firebase",
    "React",
    "Tailwind CSS",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      skills: Array.from(e.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error("No file provided for upload.");
      return "";
    }
  
    try {
      const fileRef = ref(storage, `certificates/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let certificateURL = "";
    if (formData.certificate) {
      certificateURL = await handleFileUpload(formData.certificate);
    }

    await addDoc(collection(db, "Freelancers"), {
      fullName: formData.fullName,
      title: formData.title,
      skills: formData.skills,
      experience: formData.experience,
      portfolio: formData.portfolio,
      certificateURL,
      email: user.emailAddresses[0].emailAddress,
     id:user.id
    });

    alert("Profile saved successfully!");
    router.push('/')
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Profile Setup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Professional Title
            </label>
            <input
              name="title"
              placeholder="Your professional title"
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <SkillsDropdown skillsOptions={skillsOptions} formData={formData} setFormData={setFormData} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Experience
            </label>
            <textarea
              name="experience"
              placeholder="Briefly describe your work experience"
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Portfolio Link
            </label>
            <input
              name="portfolio"
              placeholder="https://yourportfolio.com"
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Certificate
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  certificate: e.target.files[0],
                }))
              }
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
