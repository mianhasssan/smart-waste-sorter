import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, XCircle } from 'lucide-react';

interface CameraFeedProps {
  onCapture: (base64Image: string) => void;
  onError: (error: string) => void;
}

export const CameraFeed: React.FC<CameraFeedProps> = ({ onCapture, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 }, // Increased ideal resolution for desktop
          height: { ideal: 1080 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setPermissionDenied(false);
    } catch (err) {
      console.error("Camera access error:", err);
      setPermissionDenied(true);
      onError("Camera access denied or unavailable.");
    }
  }, [onError]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // High quality jpeg for better analysis
        const imageBase64 = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageBase64);
      }
    }
  };

  if (permissionDenied) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-900">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Camera Unavailable</h3>
        <p className="text-slate-400">Please enable camera permissions or use the upload button.</p>
        <button 
          onClick={startCamera}
          className="mt-6 px-6 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-500 transition-colors"
        >
          Retry Camera
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 lg:p-10">
        <div className="bg-black/50 backdrop-blur-md rounded-lg p-2 px-4 text-center self-center mt-4 lg:mt-6">
           <p className="text-white font-medium text-sm lg:text-base tracking-wider">ALIGN ITEM IN CENTER</p>
        </div>

        {/* Framing Guide */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 border-2 border-white/30 rounded-2xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-4 border-l-4 border-yellow-400 -mt-1 -ml-1 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-4 border-r-4 border-yellow-400 -mt-1 -mr-1 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-4 border-l-4 border-yellow-400 -mb-1 -ml-1 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-4 border-r-4 border-yellow-400 -mb-1 -mr-1 rounded-br-lg"></div>
        </div>

        <div className="pointer-events-auto self-center mb-8 lg:mb-12">
          <button
            onClick={handleCapture}
            className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full border-4 border-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.5)] active:scale-95 transition-transform flex items-center justify-center group"
            aria-label="Capture Photo"
          >
             <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-200 rounded-full group-hover:bg-blue-50 transition-colors"></div>
             <Camera className="w-8 h-8 lg:w-10 lg:h-10 text-slate-800 absolute" />
          </button>
        </div>
      </div>
    </div>
  );
};