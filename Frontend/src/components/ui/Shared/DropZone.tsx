import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropZone() {
  const [images, setImages] = useState<File[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false); // Reset dragging over state
    const files = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <div>
      <div
        className={`border border-gray-300 border-dashed p-10 rounded-md ${
          isDraggingOver ? "bg-gray-100" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          multiple
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-center w-full block text-gray-400 hover:text-secondary"
        >
          Drag and drop your images here or click here to upload
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative rounded-md overflow-hidden w-20 h-20"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-0.5 right-0.5 text-white p-0.5 rounded-full hover:bg-red-500 hover:text-white transition-colors ease-in-out duration-200"
              onClick={() => handleDelete(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.707a1 1 0 10-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropZone;
