import React from "react";
import CameraCapture from "../../components/camera";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Camera Capture Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Live Camera Feed</h2>
        <CameraCapture />
      </div>
    </div>
  );
};

export default Dashboard;