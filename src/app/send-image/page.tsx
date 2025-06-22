"use client"
import { LoaderButton } from "@/components/MultiStepLoader";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Camera,
  ScanEye,
  X,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// API base URL - change this to match your FastAPI server
const API_BASE_URL = "http://172.18.43.232:8000";

export default function TongueAnalyzer() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageURL(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handleCameraCapture = () => {
    setIsCameraOpen(true);
    setResults(null);
    setError(null);
    
    // Clear previous image
    setImage(null);
    setImageURL(null);
    
    // Start camera after component updates
    setTimeout(startCamera, 100);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera access denied or not available");
      setIsCameraOpen(false);
    }
  };

  const takePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        setImage(blob);
        setImageURL(URL.createObjectURL(blob));
        setIsCameraOpen(false);
        
        // Stop the camera stream
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }, "image/jpeg", 0.95);
    }
  };

  const closeCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const clearImage = () => {
    setImage(null);
    setImageURL(null);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeTongue = async () => {
    if (!image) {
      setError("Please upload or capture an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", image);
      formData.append("conf", "0.001");
      formData.append("iou", "0.99");
      
      // Call the API for complete analysis
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(`Failed to analyze image: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreSeverity = (score) => {
    if (score < 3.5) return "low";
    if (score < 7) return "medium";
    return "high";
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tongue Image Analysis</h1>
      
      {/* Image Input Section */}
      <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors"
          >
            <UploadCloud size={20} />
            Upload Image
          </button>
          
          <button
            onClick={handleCameraCapture}
            className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-md transition-colors"
          >
            <Camera size={20} />
            Take Photo
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        <AnimatePresence>
          {isCameraOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-lg mx-auto mb-4"
            >
              <div className="rounded-lg overflow-hidden bg-black relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full"
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={takePicture}
                    className="bg-white rounded-full p-3 shadow-lg"
                  >
                    <Camera size={24} className="text-blue-600" />
                  </button>
                  
                  <button
                    onClick={closeCamera}
                    className="bg-white rounded-full p-3 shadow-lg"
                  >
                    <X size={24} className="text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {imageURL && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full max-w-lg mx-auto mb-4"
            >
              <div className="rounded-lg overflow-hidden relative">
                <Image
                  src={imageURL}
                  alt="Tongue image"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
                
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                >
                  <X size={18} className="text-red-600" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {image && (
          <div className="flex justify-center mt-4">
            <LoaderButton
              onClick={analyzeTongue}
              isLoading={isLoading}
              loadingText="Analyzing..."
              icon={<ScanEye size={18} />}
            >
              Analyze Tongue
            </LoaderButton>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
      </div>
      
      {/* Results Section */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          {/* Crack Detection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">🔍 Crack Detection</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {Object.entries(results.crack.class_scores).map(([className, score]) => (
                <div key={className} className="flex justify-between mb-2">
                  <span>{className}:</span>
                  <span className="font-medium">{score.toFixed(3)}</span>
                </div>
              ))}
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Crack Score:</span>
                  <span className={`font-bold ${
                    getScoreSeverity(results.crack.total_crack_score) === "low" 
                      ? "text-green-600" 
                      : getScoreSeverity(results.crack.total_crack_score) === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                    {results.crack.total_crack_score.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Fungi Detection */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">🧪 Fungi Detection</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {Object.entries(results.fungi.class_scores).map(([className, score]) => (
                <div key={className} className="flex justify-between mb-2">
                  <span>{className}:</span>
                  <span className="font-medium">{score.toFixed(3)}</span>
                </div>
              ))}
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Weighted Average Fungi Score:</span>
                  <span className={`font-bold ${
                    getScoreSeverity(results.fungi.weighted_average_score) === "low" 
                      ? "text-green-600" 
                      : getScoreSeverity(results.fungi.weighted_average_score) === "medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                    {results.fungi.weighted_average_score.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* NCF Detection */}
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Normal/Crescent/Fissure</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              {results.ncf.predicted_class ? (
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>
                    Predicted Class: <span className="font-bold">{results.ncf.predicted_class}</span> 
                    <span className="ml-2 text-gray-600">({results.ncf.confidence.toFixed(2)})</span>
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <XCircle size={20} />
                  <span>No class detected</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={clearImage}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
            >
              Analyze Another Image
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}