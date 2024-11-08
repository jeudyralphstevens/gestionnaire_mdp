import React, { useState, useCallback } from 'react';
import { Lock, FileText, Upload } from 'lucide-react';
import { decryptData } from '../utils/encryption';
import * as XLSX from 'xlsx';

export const DecryptionTool: React.FC = () => {
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const decryptFile = useCallback(async () => {
    if (!file || !password) {
      setError('Veuillez sélectionner un fichier et entrer le mot de passe');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const fileContent = await file.text();
      const decryptedContent = decryptData(fileContent, password);
      const jsonData = JSON.parse(decryptedContent);

      // Convertir les données JSON en workbook Excel
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(jsonData);
      XLSX.utils.book_append_sheet(wb, ws, 'Feuille1');

      // Générer et télécharger le fichier Excel
      const originalName = file.name.replace('.encrypted', '');
      XLSX.writeFile(wb, originalName);

      setFile(null);
      setPassword('');
    } catch (err) {
      setError('Erreur de déchiffrement. Vérifiez le mot de passe.');
    } finally {
      setIsProcessing(false);
    }
  }, [file, password]);

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">Déchiffrement de Fichiers</h2>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
          <label className="cursor-pointer block">
            <input
              type="file"
              className="hidden"
              accept=".encrypted"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm text-gray-600">
              {file ? (
                <span className="text-blue-500 flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  {file.name}
                </span>
              ) : (
                "Sélectionnez le fichier .encrypted à déchiffrer"
              )}
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe de déchiffrement
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez le mot de passe du fichier"
            disabled={isProcessing}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          onClick={decryptFile}
          disabled={!file || !password || isProcessing}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Déchiffrement en cours...' : 'Déchiffrer le fichier'}
        </button>
      </div>
    </div>
  );
};