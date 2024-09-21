import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "../Button";
import { IoMdCloseCircleOutline } from "react-icons/io";
interface Props {
  onChange: (file: File) => void;
  value?: string;
}

const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Only allow one file
      const file = acceptedFiles[0];
      if (file) {
        // Handle file upload
        onChange(file);
        toast.success("Image uploaded successfully");
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <input {...getInputProps()} />
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">Click to upload</div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            alt="Uploaded Image"
            src={value}
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            onClick={() => {
              onChange(null);
            }}
            className="absolute right-10  -top-10 flex items-center gap-2"
          >
            <Button label="Remove image" small />
            <IoMdCloseCircleOutline size={25} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
