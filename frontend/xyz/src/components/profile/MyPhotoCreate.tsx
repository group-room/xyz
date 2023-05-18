"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyPhoto } from "@/app/api/myphoto";
import { KEYS } from "@/constants/queryKeys";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import Btn from "../common/Btn";

interface ImageCapture {
  takePhoto(): Promise<Blob>;
}

declare var ImageCapture: {
  prototype: ImageCapture;
  new (track: MediaStreamTrack): ImageCapture;
};

const MyPhotoCreate = () => {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const userSeq = state.auth.userInfo?.userSeq;
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
        router.push(`/profile/${userSeq}/myphoto/edit`);
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
      <div className="flex gap-5 items-center justify-center">
        <Btn btnFunc={startCamera} bgColor="pink" text="촬영시작" />

        {!isPreviewing && (
          <Btn btnFunc={capturePicture} bgColor="pink" text="찰칵" />
        )}
      </div>

      {isPreviewing && (
        <div>
          {capturedPhoto && (
            <img src={URL.createObjectURL(capturedPhoto)} alt="Captured" />
          )}
          <div className="flex gap-5 items-center justify-center">
            <Btn btnFunc={handleSavePhoto} bgColor="pink" text="저장하기" />
            <Btn btnFunc={retakePicture} bgColor="pink" text="재촬영!" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPhotoCreate;
