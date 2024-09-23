import { useCallback } from "react";

import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";

const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        toast.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(data.url);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload Error: ", error);
        toast.error("Upload failed");
      }
    },
    [onChange]
  );

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="flex flex-col items-center">
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
      </label>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            alt="Uploaded Image"
            src={value}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
