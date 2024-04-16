import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";

function Dropzone({
  className,
  onFilesChange,
}: {
  className: string;
  onFilesChange: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  // Call the callback function to pass files to the parent component
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  //Customizing the Dropzone settings
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 4,
  });

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file: any) => file.name !== name));
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }: any) => file.name !== name));
  };

  return (
    <form action="">
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>

      {/* Accepted files */}
      <h3 className="title text-sm font-semibold text-neutral-600 mt-10 border-b pb-3">
        Accepted Files
      </h3>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
        {files.map((file) => (
          <li key={file.name} className="relative h-32 rounded-md shadow-lg">
            <img
              src={(file as any).preview}
              alt={file.name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL((file as any).preview);
              }}
              className="h-full w-full object-contain rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
              onClick={() => removeFile(file.name)}
            >
              <XMarkIcon className="w-5 h-5 fill-black hover:fill-red-500 transition-colors" />
            </button>
            <p className="mt-2 text-neutral-500 text-[12px] font-medium">
              {file.name}
            </p>
          </li>
        ))}
      </ul>

      {/* Rejected Files */}
      <h3 className="title text-sm font-semibold text-neutral-600 mt-24 border-b pb-3">
        Rejected Files
      </h3>
      <ul className="mt-6 flex flex-col">
        {rejected.map(({ file, errors }: any) => (
          <li key={file.name} className="flex items-start justify-between">
            <div>
              <p className="mt-2 text-neutral-500 text-sm font-medium">
                {file.name}
              </p>
              <ul className="text-[12px] text-red-400">
                {errors.map((error: any) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-black transition-colors"
              onClick={() => removeRejected(file.name)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Dropzone;
