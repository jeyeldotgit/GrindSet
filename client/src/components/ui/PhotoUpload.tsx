import { Upload, X } from "lucide-react";
import { useState } from "react";
import Button from "./Button";

type PhotoUploadProps = {
  onUpload?: (file: File) => void;
  currentPhotoUrl?: string;
  className?: string;
};

const PhotoUpload = ({
  onUpload,
  currentPhotoUrl,
  className = "",
}: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentPhotoUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Photo selected:", file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onUpload?.(file);
    }
  };

  const handleRemove = () => {
    console.log("Photo removed");
    setPreview(null);
  };

  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text font-semibold">Proof Photo</span>
      </label>
      {preview ? (
        <div className="relative w-full">
          <img
            src={preview}
            alt="Session proof"
            className="w-full h-64 object-cover rounded-lg border border-white/10"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost bg-base-100/80"
            aria-label="Remove photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-400 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default PhotoUpload;

