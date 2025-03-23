import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const timestamp = new Date().toISOString();
      setCapturedImages((prev) => {
        const updatedImages = [{ image: imageSrc, timestamp }, ...prev];
        return updatedImages.slice(0, 9);
      });
      sendImage(imageSrc);
    }
  };

  const sendImage = async (image) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
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
    <div className="flex flex-col items-center justify-center w-full">
      {/* Camera Section */}
      <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden border border-purple-600 shadow-md">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`transition-all duration-500 w-full bg-[#1C1B2A] p-4 rounded-xl mt-6 border-t border-pink-500 ${
          isMenuOpen ? "h-auto" : "h-14"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-full flex justify-between items-center text-[#C084FC] text-sm font-medium"
        >
          <span>Captured Menu</span>
          <span className="text-base">{isMenuOpen ? "↑" : "↓"}</span>
        </button>

        {isMenuOpen && (
          <div className="mt-4">
            <h2 className="text-md font-semibold text-pink-400 mb-2">
              Last Captured Images
            </h2>
            <div className="grid grid-cols-3 gap-3 overflow-y-auto">
              {capturedImages.map((img, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={img.image}
                    alt={`Capture ${index}`}
                    className="w-24 h-24 rounded-md border-2 border-[#C084FC] shadow"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    {new Date(img.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
