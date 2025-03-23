import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages((prev) => {
        const timestamp = new Date().toISOString();
        const updatedImages = [{ imageSrc, timestamp }, ...prev];
        return updatedImages.slice(0, 100); // Store up to 100 images
      });
      sendImage(imageSrc);
    }
  };

  const sendImage = async (image) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: image,
          userId: "user_1",       // ✅ REQUIRED for backend
          sessionId: "session_1", // ✅ REQUIRED for backend
        }),
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
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white relative">
      {/* CAMERA SECTION */}
      <div
        className={`transition-all duration-500 ease-in-out relative ${
          isMenuOpen ? "h-[30vh]" : "h-full"
        } w-full flex items-start`}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${
            isMenuOpen ? "w-24 h-24 absolute top-2 right-2" : "w-full h-full"
          }`}
        >
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* DROP MENU */}
      <div
        className={`transition-all duration-500 w-full bg-gray-800 p-4 rounded-t-xl absolute bottom-0 left-0 ${
          isMenuOpen ? "h-[70%]" : "h-20"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-full flex justify-between items-center text-white text-lg"
        >
          <span>Menu</span>
          <span className="text-xl">{isMenuOpen ? "↓" : "↑"}</span>
        </button>

        {isMenuOpen && (
          <div className="mt-4 text-white">
            <h2 className="text-lg font-semibold mb-2">Last Captured Images</h2>
            <div className="grid grid-cols-10 gap-1 px-2 max-h-[50vh] overflow-y-auto">
              {capturedImages.map((img, index) => (
                <img
                  key={index}
                  src={img.imageSrc}
                  alt={`Capture ${index}`}
                  className="w-full aspect-square object-cover rounded-sm border border-gray-600 shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;

