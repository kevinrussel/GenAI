import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages((prev) => [...prev.slice(-5), imageSrc]); 
      sendImage(imageSrc);
    }
  };

  const sendImage = async (image) => {
    try {
      const response = await fetch("na", {
        method: "POST",
        body: JSON.stringify({ image }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log("Image uploaded:", data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white py-10">
      <div className="border-4 border-blue-500 rounded-lg shadow-lg">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg w-96"
        />
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold">Last Captured Images</h2>
        <div className="grid grid-cols-3 gap-3 mt-3">
          {capturedImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Capture ${index}`}
              className="w-24 h-24 rounded-md border-2 border-gray-300 shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
