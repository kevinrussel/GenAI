import React from "react";
import CameraCapture from "../../components/camera";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0D001A] text-white flex justify-center items-center px-4 pb-32 pt-28">
      <div className="bg-[#12021F] p-12 rounded-2xl w-full max-w-6xl min-h-[700px] shadow-2xl flex flex-col justify-start">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-purple-400">Dashboard</h1>
          <p className="text-base text-gray-300 mt-3">
            View your live camera feed and recent captures.
          </p>
        </div>

        {/* Camera Feed */}
        <CameraCapture />
      </div>
    </div>
  );
};

export default Dashboard;
