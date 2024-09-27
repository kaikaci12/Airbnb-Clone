import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

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
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        onChange(response.data.url);
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        console.error("Upload Error: ", error);
        toast.error(error);
      }
    },
    [onChange]
  );

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/remove?url=${encodeURIComponent(value)}`);
      onChange(""); // Clear the image URL
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Remove Error: ", error);
      toast.error("Remove failed");
    }
  };

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center hover:cursor-pointer"
      >
        <TbPhotoPlus size={50} className="hover:cursor-pointer" />
        <div className="font-semibold text-lg">Click to upload</div>
      </label>
      {value && (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
          <Image
            alt="Uploaded Image"
            src={value}
            fill
            style={{ objectFit: "cover" }}
          />
          <button
            onClick={handleRemove}
            className="mt-2 p-2 bg-red-500 text-white rounded absolute -top-20 right-0 z-[10]"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
