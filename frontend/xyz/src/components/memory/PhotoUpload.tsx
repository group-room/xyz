"use client";

import React, { useState } from "react";
import EXIF from "exif-js";

interface Photo {
  file: File;
  preview: string;
}

interface PhotoMetadata {
  location?: {
    latitude: number;
    longitude: number;
  };
}

const PhotoUpload = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [metadata, setMetadata] = useState<PhotoMetadata | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata(null);
    const selectedPhotos = event.target.files;
    if (selectedPhotos) {
      // Preview up to 10 selected photos
      const newPhotos: Photo[] = [];
      for (let i = 0; i < Math.min(selectedPhotos.length, 10); i++) {
        const photo = selectedPhotos[i];
        newPhotos.push({
          file: photo,
          preview: URL.createObjectURL(photo),
        });
      }
      setPhotos(newPhotos);

      const url = URL.createObjectURL(selectedPhotos[0]);
      console.log(url);
      for (const photo of selectedPhotos) {
        EXIF.getData(photo, function (this: any) {
          const lat = EXIF.getTag(this, "GPSLatitude");
          const latRef = EXIF.getTag(this, "GPSLatitudeRef");
          const long = EXIF.getTag(this, "GPSLongitude");
          const longRef = EXIF.getTag(this, "GPSLongitudeRef");
          console.log(lat, latRef, long, longRef);
          if (lat && latRef && long && longRef) {
            const latitude =
              (lat[0] + lat[1] / 60 + lat[2] / 3600) *
              (latRef === "N" ? 1 : -1);
            const longitude =
              (long[0] + long[1] / 60 + long[2] / 3600) *
              (longRef === "E" ? 1 : -1);
            setMetadata({ location: { latitude, longitude } });
            return;
          }
        });
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        multiple
      />
      {photos.map((photo) => (
        <img key={photo.preview} src={photo.preview} alt="Preview" />
      ))}
      {metadata && (
        <div>
          {metadata.location && (
            <p>
              Location: ({metadata.location.latitude},{" "}
              {metadata.location.longitude})
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
