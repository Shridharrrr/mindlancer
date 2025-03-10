import React from 'react';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    bio: 'Software Developer, Tech Enthusiast, Coffee Lover',
    location: 'New York, USA',
    contact: 'john.doe@example.com',
    profilePic: 'https://via.placeholder.com/150',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-gray-600 italic">{user.bio}</p>
      </div>

      {/* Profile Details */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
        <p className="mt-2 text-lg text-gray-700"><strong>Location:</strong> {user.location}</p>
        <p className="mt-2 text-lg text-gray-700">
          <strong>Email:</strong> <a href={`mailto:${user.contact}`} className="text-blue-500">{user.contact}</a>
        </p>
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Find me on</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href={user.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href={user.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={user.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
