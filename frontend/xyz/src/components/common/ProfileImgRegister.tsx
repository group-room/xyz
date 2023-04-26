'use client'

import React, { useState } from "react";
import Image from 'next/image'

interface Props {
  onSubmit: (formData: FormData) => void;
}

const ProfileImgRegister: React.FC<Props> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", file);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="profileImg-label" htmlFor="profileImg">프로필 이미지 추가</label>
      {previewUrl && <Image width={500} height={500} src={previewUrl} alt="Preview" />}
      <input className="profile-img-input hidden" id="profileImg" type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ProfileImgRegister;
