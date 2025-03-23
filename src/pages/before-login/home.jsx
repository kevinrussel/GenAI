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
        <div className="bg-black text-white">
            {/* Spline 3D Section */}
            <div className="flex justify-center items-center min-h-screen">
                <canvas ref={canvasRef} className="w-full h-full" id="canvas3d"></canvas>
            </div>

            {/* Who We Are Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
                    {/* Left: Image ADD SELFIE OF US HERE FOR THE FUN OF IT*/}
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <img
                            src="https://via.placeholder.com/500" 
                            alt="Who We Are"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    {/* Right: Text */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-bold text-[rgba(143,61,116,255)] mb-4">Who We Are</h2>
                        <p className="text-gray-300 text-lg">
                            As an aspiring set of developers we aim to use AI to help empower the empowering change of tomorrow
                            to help aid with human betterment. As a result we've created out product to cater towards minimizing
                            procrastination by catering hours of locking in with emotions during the sessions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto text-center px-6 md:px-12">
                    <h2 className="text-4xl font-bold text-white mb-10">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-[rgba(143,61,116,255)] p-6 rounded-lg shadow-lg">
                        <div className="w-32 flex justify-center items-center">
                            <img
                                src="/images/face.png"
                                alt="Feature 3"
                                className="rounded-lg mb-4"
                            />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Facial Recongnition</h3>
                            <p className="text-white">Description of feature one goes here.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-[rgba(143,61,116,255)] p-6 rounded-lg shadow-lg">
                        <div className="w-32 flex justify-center items-center">
                            <img
                                src="/images/timer.png"
                                alt="Feature 3"
                                className="rounded-lg mb-4"
                            />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Pomodoro Method</h3>
                            <p className="text-white">Description of feature two goes here.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-[rgba(143,61,116,255)] p-6 rounded-lg shadow-lg">
                            <div className="w-32 flex justify-center items-center">
                            <img
                                src="/images/checklist.png"
                                alt="Feature 3"
                                className="rounded-lg mb-4"
                            />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Feature Three</h3>
                            <p className="text-white">Description of feature three goes here.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
