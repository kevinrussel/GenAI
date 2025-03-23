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
  
      sendImage(imageSrc, timestamp);
    }
  };

  const sendImage = async (image, timestamp) => {
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: JSON.stringify({ image, timestamp }),  
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
    <div className="flex flex-col items-center bg-gray-900 min-h-screen text-white relative">
      {/* CAMERA SECTION SMILE <3 */}
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

      {/* DROP MENU THINGY */}
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
          <span className="text-xl">{isMenuOpen ? "↑" : "↓"}</span>
          <span className="text-xl">{isMenuOpen ? "↓" : "↑"}</span>
        </button>

        {/* CONTENT INSIDE THE DROP MENU THINGY */}
        {isMenuOpen && (
          <div className="mt-4 text-white">
            <h2 className="text-lg font-semibold">Last Captured Images</h2>
            <div className="grid grid-cols-3 gap-3 mt-3">
            {capturedImages.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={img.image} 
                  alt={`Capture ${index}`}
                  className="w-24 h-24 rounded-md border-2 border-gray-300 shadow"
                />
                <p className="text-xs text-gray-300 mt-1">
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
