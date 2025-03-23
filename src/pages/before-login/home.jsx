import React, { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

export default function Homepage() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load("https://prod.spline.design/35prxuKktTQdbLRE/scene.splinecode").then(()=>{
                app.setZoom(5);
            });
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <canvas ref={canvasRef} className="w-full h-full" id="canvas3d"></canvas>
        </div>
    );
}
