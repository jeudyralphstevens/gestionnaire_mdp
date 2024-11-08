import React, { useCallback } from 'react';
import { Upload, FolderUp } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* File Upload */}
      <div
        className="p-8 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <Upload className="w-12 h-12 text-blue-500 mb-4" />
          <div className="text-center">
            <p className="text-lg font-medium text-blue-700">
              Glissez-déposez des fichiers
            </p>
            <p className="text-sm text-blue-500">
              ou cliquez pour sélectionner
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => e.target.files && onFilesSelected(e.target.files)}
          />
        </label>
      </div>

      {/* Folder Upload */}
      <div
        className="p-8 border-2 border-dashed border-green-300 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
      >
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <FolderUp className="w-12 h-12 text-green-500 mb-4" />
          <div className="text-center">
            <p className="text-lg font-medium text-green-700">
              Sélectionnez un dossier
            </p>
            <p className="text-sm text-green-500">
              et tous ses fichiers
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            webkitdirectory="true"
            directory=""
            multiple
            onChange={(e) => e.target.files && onFilesSelected(e.target.files)}
          />
        </label>
      </div>
    </div>
  );
};