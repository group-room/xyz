"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyPhoto } from "@/app/api/myphoto";
import { KEYS } from "@/constants/queryKeys";

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
  const [isPreviewing, setIsPreviewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const queryClient = useQueryClient();
  const useCreateMyPhotoMutation = useMutation({
    mutationFn: (formData: FormData) => createMyPhoto(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.myroom);
    },
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePicture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setCapturedPhoto(blob);
            setIsPreviewing(true);
          }
        }, "image/jpeg");
      }
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
    setIsPreviewing(false);
  };

  const savePhoto = async (photoBlob: Blob) => {
    const formData = new FormData();
    formData.append("photoImage", photoBlob, "captured.jpg");

    useCreateMyPhotoMutation.mutate(formData, {
      onSuccess: () => {
        setIsCaptured(true);
        console.log("사진 전송 완료");
      },
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const photoDataUrl = reader.result as string;
      console.log("Saved photo:", photoDataUrl);
    };
    reader.readAsDataURL(photoBlob);
  };

  const handleSavePhoto = () => {
    // Implement your logic to save the photo
    if (capturedPhoto) {
      // Implement your logic to save the photo
      savePhoto(capturedPhoto);
    }
  };

  return (
    <div>
      <video ref={videoRef} />
      <button onClick={startCamera}>Start Camera</button>

      {!isPreviewing && (
        <button onClick={capturePicture}>Capture Picture</button>
      )}

      {isPreviewing && (
        <div>
          {capturedPhoto && (
            <img src={URL.createObjectURL(capturedPhoto)} alt="Captured" />
          )}
          <button onClick={handleSavePhoto}>Save Photo</button>
          <button onClick={retakePicture}>Retake Picture</button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
