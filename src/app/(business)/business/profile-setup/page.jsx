"use client"
import { useUser } from "@clerk/nextjs";
import { addCompany } from "@/services/services";
import { useState } from "react";

export default function CompanyForm() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    industry: "",
    need: "",
    website: "",
    email: user.emailAddresses[0].emailAddress,
    id:user.id
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCompany(formData)
    console.log("Form Data Submitted:", formData);

    // You can send this data to Firebase or any backend here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Company Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block font-medium">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block font-medium">Industry:</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Need */}
        <div>
          <label className="block font-medium">What do you need?</label>
          <input
            type="text"
            name="need"
            value={formData.need}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Website Link */}
        <div>
          <label className="block font-medium">Website Link:</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

