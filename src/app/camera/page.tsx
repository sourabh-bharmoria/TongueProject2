"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera, ArrowLeft, Circle, FlipHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const CameraPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isFrontCamera, setIsFrontCamera] = useState(false);
    const router = useRouter();

    const startCamera = async (facingMode: "user" | "environment") => {
        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            setIsCameraReady(false);

            const userStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode }
            });

            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;
                videoRef.current.onloadedmetadata = () => {
                    setIsCameraReady(true);
                };
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            try {
                const fallbackStream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });
                setStream(fallbackStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = fallbackStream;
                    videoRef.current.onloadedmetadata = () => {
                        setIsCameraReady(true);
                    };
                }
            } catch (fallbackError) {
            }
        }
    };

    useEffect(() => {
        startCamera("environment");
        return () => stopCamera();
    }, []);

    const toggleCamera = () => {
        const newMode = isFrontCamera ? "environment" : "user";
        setIsFrontCamera(!isFrontCamera);
        startCamera(newMode);
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (isFrontCamera) {
                context?.save();
                context?.translate(canvas.width, 0);
                context?.scale(-1, 1);
                context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                context?.restore();
            }

            const imageUrl = canvas.toDataURL("image/png");
            sessionStorage.setItem("capturedImage", imageUrl);
            router.push("/send-image");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen bg-gray-900 text-white p-4">
            {/* Header */}
            <header className="w-full flex justify-between items-center mb-4">
                <Link
                    href="/"
                    onClick={stopCamera}
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="hidden sm:inline">Back</span>
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
                    Tongue Scanner
                </h1>
                <motion.button
                    onClick={toggleCamera}
                    whileTap={{ scale: 0.9 }}
                    disabled={!isCameraReady}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="Switch Camera"
                >
                    <FlipHorizontal className="h-5 w-5" />
                </motion.button>
            </header>

            {/* Camera Feed */}
            <div className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden shadow-xl bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transition-opacity ${
                        isCameraReady ? "opacity-100" : "opacity-0"
                    } ${isFrontCamera ? "scale-x-[-1]" : ""}`}
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>

                {/* Loading State */}
                {!isCameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">
                            <Camera className="h-12 w-12" />
                            <p className="mt-2">Initializing camera...</p>
                        </div>
                    </div>
                )}

                {/* Alignment Guide */}
                <div className="absolute inset-0 m-auto border-4 border-white/50 rounded-xl w-[80%] h-[80%] pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/50"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/50"></div>
                </div>
            </div>

            {/* Instructions */}
            <p className="mt-4 text-gray-300 text-center max-w-md">
                Align your tongue within the frame and tap the button below to
                capture
            </p>

            {/* Capture Button */}
            <motion.button
                onClick={captureImage}
                whileTap={{ scale: 0.9 }}
                disabled={!isCameraReady}
                className={`mt-8 mb-4 p-4 rounded-full ${
                    isCameraReady
                        ? "bg-rose-600 hover:bg-rose-500"
                        : "bg-gray-600"
                } text-white shadow-lg transition-all`}
            >
                <Circle className="h-8 w-8" />
            </motion.button>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 mt-auto pt-4 text-center">
                Your image will be processed locally and never stored on our
                servers
            </p>
        </div>
    );
};

export default CameraPage;
