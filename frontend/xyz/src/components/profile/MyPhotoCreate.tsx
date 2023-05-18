"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyPhoto } from "@/app/api/myphoto";
import { KEYS } from "@/constants/queryKeys";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import Btn from "../common/Btn";
import MyPhotoEdit from "./MyPhotoEdit";

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
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [isPhotoEdit, setIsPhotoEdit] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const queryClient = useQueryClient();
  const useCreateMyPhotoMutation = useMutation({
    mutationFn: (formData: FormData) => createMyPhoto(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(KEYS.myroom);
    },
  });

  const startCamera = async () => {
    if (!isImageCaptured) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
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
    setIsImageCaptured(false);
    startCamera();
  };

  const savePhoto = async (photoBlob: Blob) => {
    const formData = new FormData();
    formData.append("photoImage", photoBlob, "captured.jpg");

    useCreateMyPhotoMutation.mutate(formData, {
      onSuccess: () => {
        setIsCaptured(true);
        console.log("사진 전송 완료");
        // router.push(`/profile/${userSeq}/myphoto/edit`);
        setIsPhotoEdit(true);
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
    if (capturedPhoto) {
      savePhoto(capturedPhoto);
      setIsImageCaptured(true);
    }
  };
  console.log(isPreviewing, "isPreviewing");
  if (isPhotoEdit === false) {
    return (
      <div>
        {!isPreviewing && !isImageCaptured && (
          <>
            {videoRef && (
              <div className="pt-5">
                <video ref={videoRef} />
              </div>
            )}
            <div className="flex gap-10 items-center justify-center pt-8">
              <Btn
                btnFunc={startCamera}
                bgColor="pink"
                text="촬영"
                className="text-xl py-2 px-4"
              />
              <Btn
                btnFunc={capturePicture}
                bgColor="pink"
                text="찰칵"
                className="text-xl py-2 px-4"
              />
            </div>
          </>
        )}

        {isPreviewing && (
          <div>
            {capturedPhoto && (
              <div className="pt-5">
                <img src={URL.createObjectURL(capturedPhoto)} alt="Captured" />
              </div>
            )}
            <div className="flex gap-10 items-center justify-center pt-8">
              <Btn
                btnFunc={handleSavePhoto}
                bgColor="pink"
                text="꾸미기"
                className="text-xl py-2 px-4"
              />
              <Btn
                btnFunc={retakePicture}
                bgColor="pink"
                text="재촬영!"
                className="text-xl py-2 px-4"
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <MyPhotoEdit userSeq={userSeq!} />{" "}
      </div>
    );
  }
};

export default MyPhotoCreate;
