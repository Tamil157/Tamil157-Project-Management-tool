import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, UploadCloud, CheckCircle, UserCircle, Trash2 } from "lucide-react";

const Settings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [role, setRole] = useState("Administrator");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("GMT+5:30");

  // Success Messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 2000); // Auto-hide after 2 sec
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showSuccess("Invalid file type. Please upload an image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    showSuccess("Profile image removed successfully!");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-2">Customize your profile and preferences.</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <motion.div 
            className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-center mb-4 flex items-center justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle className="w-5 h-5 mr-2" /> {successMessage}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Profile Settings */}
          <Card className="p-6 shadow-lg rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-6 h-6 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Profile Settings</h2>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center">
                  {profileImage ? (
                    <motion.img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  ) : (
                    <UserCircle className="w-24 h-24 text-gray-400" />
                  )}
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex items-center text-sm text-blue-600 mt-2">
                    <UploadCloud className="w-4 h-4 mr-1" /> Upload Image
                  </div>
                </label>
                {profileImage && (
                  <button 
                    className="text-red-500 text-sm mt-2 flex items-center"
                    onClick={handleRemoveImage}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove Image
                  </button>
                )}
              </div>

              {/* Editable Fields */}
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <Input value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg" />
                </div>
              </div>

              <div className="pt-4 w-full">
                <motion.button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => showSuccess("Profile updated successfully!")}
                >
                  Save Changes
                </motion.button>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="p-6 shadow-lg rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="w-6 h-6 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white shadow-sm"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white shadow-sm"
                >
                  <option>GMT-5:00 (New York)</option>
                  <option>GMT+1:00 (London)</option>
                  <option>GMT+5:30 (India)</option>
                  <option>GMT+8:00 (China)</option>
                  <option>GMT+9:00 (Japan)</option>
                </select>
              </div>

              <div className="pt-4 w-full">
                <motion.button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => showSuccess("Preferences saved successfully!")}
                >
                  Save Preferences
                </motion.button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
