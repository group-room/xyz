"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";

interface ImageCapture {
  takePhoto(): Promise<Blob>;
}

declare var ImageCapture: {
  prototype: ImageCapture;
  new (track: MediaStreamTrack): ImageCapture;
};

const CameraCapture = () => {
  const [capturedPhoto, setCapturedPhoto] = useState<Blob | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const capturePicture = async (stream: MediaStream) => {
    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    const photoBlob = await imageCapture.takePhoto();

    const reader = new FileReader();
    reader.onloadend = () => {
      const photoDataUrl = reader.result as string;
      fetch(photoDataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setCapturedPhoto(blob); // Update the captured photo state to Blob
          setIsCaptured(true); // Set the captured flag
        });
    };
    reader.readAsDataURL(photoBlob);

    // Replace savePhoto with your actual function to save the photo
    // You may need to convert the photoBlob to a file or base64 data before saving

    // savePhoto(photoBlob);
  };

  const handleSavePhoto = () => {
    // Implement your logic to save the photo
    if (capturedPhoto) {
      // Implement your logic to save the photo
      savePhoto(capturedPhoto);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      capturePicture(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const savePhoto = async (photoBlob: Blob) => {
    // Implement your logic to save the photo here
    // For example, you can convert the blob to a base64 string:
    const reader = new FileReader();
    reader.onloadend = () => {
      const photoDataUrl = reader.result as string;
      // Call your save photo API or perform other operations with the photoDataUrl
      console.log("Saved photo:", photoDataUrl);
    };
    reader.readAsDataURL(photoBlob);
  };

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={startCamera}>Start Camera</button>
      {capturedPhoto && (
        <div>
          <img src={URL.createObjectURL(capturedPhoto)} alt="Captured" />
          <button onClick={handleSavePhoto}>Save Photo</button>{" "}
          {/* Button to save the photo */}
        </div>
      )}
      {/* Display the captured photo */}
    </div>
  );
};

export default CameraCapture;
