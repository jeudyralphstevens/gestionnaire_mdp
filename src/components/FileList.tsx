import React from 'react';
import { FileEntry } from '../types';
import { FileText, Download, Key } from 'lucide-react';

interface FileListProps {
  files: FileEntry[];
  onDownloadLog: () => void;
  onDownloadFile: (file: FileEntry) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onDownloadLog, onDownloadFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold">Fichiers Chiffrés</h2>
          <button
            onClick={onDownloadLog}
            className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger le journal
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {files.map((file, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.fileName}</p>
                    <p className="text-sm text-gray-500">
                      Taille: {file.size} • Chiffré le {file.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Key className="w-4 h-4" />
                    <span className="font-mono">{file.password.slice(0, 8)}...</span>
                  </div>
                  <button
                    onClick={() => onDownloadFile(file)}
                    className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};