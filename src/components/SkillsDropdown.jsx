import { useState } from "react";

export default function SkillsDropdown({ skillsOptions, formData, setFormData }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSkillChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill) // Remove skill
        : [...prev.skills, skill], // Add skill
    }));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">Skills</label>
      
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full border rounded p-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {formData.skills.length > 0 ? formData.skills.join(", ") : "Select skills"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow-lg z-10">
          <ul className="max-h-40 overflow-y-auto p-2 space-y-2">
            {skillsOptions.map((skill) => (
              <li key={skill} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
