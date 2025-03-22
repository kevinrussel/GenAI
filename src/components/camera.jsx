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
        const updatedImages = [imageSrc, ...prev];
        return updatedImages.slice(0, 9);
      });
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
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white py-10 relative">
      {/* CAMERA THAT FINALLY WORKS */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isMenuOpen ? "w-24 h-24 absolute top-4 right-4" : "w-full"
        }`}
        style={{
          top: isMenuOpen ? "auto" : "10rem",
          transform: isMenuOpen ? "translateY(0)" : "translateY(0)",
        }}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full ${
            isMenuOpen ? "h-24" : "h-[calc(100vh-10rem)]"
          } object-cover rounded-lg transition-all duration-500`}
        />
      </div>

      {/* DROP DOWN MENU  */}
      <div
        className={`transition-all duration-500 ${
          isMenuOpen ? "h-[70%]" : "h-20"
        } w-full bg-gray-800 p-4 rounded-t-xl absolute bottom-0 left-0`}
      >
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-full flex justify-between items-center text-white text-lg"
        >
          <span>Menu</span>
          <span className="text-xl">{isMenuOpen ? "↑" : "↓"}</span>
        </button>
        
        {/* DROP DOWN MENU CONTENT*/}
        {isMenuOpen && (
          <div className="mt-4 text-white">
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
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
