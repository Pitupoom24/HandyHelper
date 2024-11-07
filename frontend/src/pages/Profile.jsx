import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RolePicker = ({ handleRoleSelect, updating }) => (
  <div className="mx-auto mt-16 py-4 grid max-w-lg grid-cols-1 items-center gap-10 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
    {[
      {
        id: "handyman",
        name: "Handyman",
        description:
          "Offer your skills and expertise to those in need of help with their projects.",
        features: [
          "Create a professional profile",
          "Set your rates and availability",
          "Gain customer reviews and ratings",
          "Easy-to-use booking system",
        ],
        action: () => handleRoleSelect("handyman"),
      },
      {
        id: "requester",
        name: "Requester",
        description:
          "Easily find skilled handymen for any of your repair or project needs.",
        features: [
          "Browse skilled professionals",
          "Read handyman reviews",
          "Simple booking process",
          "Transparent pricing options",
        ],
        action: () => handleRoleSelect("requester"),
      },
    ].map((role, idx) => (
      <div
        key={role.id}
        className={classNames(
          "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
          idx === 0 ? "bg-indigo-100" : "bg-white/60 sm:mx-8 lg:mx-0"
        )}
      >
        <h3 className="text-indigo-600 text-base/7 font-semibold">
          {role.name}
        </h3>
        <p className="mt-4 text-gray-900 text-lg font-medium">
          {role.description}
        </p>
        <ul
          role="list"
          className="mt-8 space-y-3 text-gray-600 text-sm/6 sm:mt-10"
        >
          {role.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon
                aria-hidden="true"
                className="text-indigo-600 h-6 w-5 flex-none"
              />
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={role.action}
          disabled={updating}
          className={classNames(
            "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold",
            role.id === "handyman"
              ? "bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500"
              : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            updating && "opacity-50 cursor-not-allowed"
          )}
        >
          {updating ? "Updating..." : `Sign up as a ${role.name}`}
        </button>
      </div>
    ))}
  </div>
);

RolePicker.propTypes = {
  handleRoleSelect: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
};

const ProfileDisplay = ({ user, onEdit }) => (
  <div className="mx-auto mt-16 max-w-4xl">
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8">
      <h1 className="text-4xl text-indigo-600 font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Username</h3>
          <p className="mt-1 text-sm text-gray-900">{user.username}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Email</h3>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">First Name</h3>
          <p className="mt-1 text-sm text-gray-900">{user.first_name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Last Name</h3>
          <p className="mt-1 text-sm text-gray-900">{user.last_name}</p>
        </div>
        <div className="sm:col-span-2">
          <h3 className="text-sm font-medium text-gray-700">Location</h3>
          <p className="mt-1 text-sm text-gray-900">{user.location}</p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Edit Profile
      </button>
    </div>
  </div>
);

ProfileDisplay.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ProfileEditor = ({
  user,
  handleChange,
  handleProfileSubmit,
  handleCancel,
  updating,
  error,
}) => (
  <div className="mx-auto mt-16 max-w-4xl">
    <form onSubmit={handleProfileSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg p-8 space-y-8">
      <h1 className="text-4xl text-indigo-600 font-bold mb-6">Edit Your Profile</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              disabled
              className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="location"
              id="location"
              value={user.location}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updating}
          className={classNames(
            "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            updating && "opacity-50 cursor-not-allowed"
          )}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  </div>
);

ProfileEditor.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProfileSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    location: "",
    is_handyman: -1, // -1 indicates role not selected
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        // console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleRoleSelect = async (role) => {
    setUpdating(true);
    try {
      const updatedUser = {
        ...user,
        is_handyman: role === "handyman" ? 1 : 0,
      };
      await axios.put("http://127.0.0.1:8000/api/profile/", updatedUser, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setUser(updatedUser);
      setUpdating(false);
    } catch (error) {
      setError("Failed to update role");
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put("http://127.0.0.1:8000/api/user/", user, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated successfully");
      setEditMode(false);
      setUpdating(false);
    } catch (error) {
      setError("Failed to update profile");
      setUpdating(false);
    }
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setError("");
  };

  if (loading) {
    return (
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error && !editMode) {
    return (
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {loading ? (
        <div>Loading...</div>
      ) : editMode ? (
        <ProfileEditor
          user={user}
          handleChange={handleChange}
          handleProfileSubmit={handleProfileSubmit}
          handleCancel={handleCancelEdit}
          updating={updating}
          error={error}
        />
      ) : (
        <>
          <RolePicker handleRoleSelect={handleRoleSelect} updating={updating} />
          <ProfileDisplay user={user} onEdit={() => setEditMode(true)} />
        </>
      )}
    </div>
  );
  
};

export default Profile;
