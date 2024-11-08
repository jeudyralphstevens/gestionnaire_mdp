import React, { useCallback } from 'react';
import { FileEntry } from '../types';
import { Download, FileText, Key, FolderTree } from 'lucide-react';

interface PasswordLogProps {
  entries: FileEntry[];
}

export const PasswordLog: React.FC<PasswordLogProps> = ({ entries }) => {
  const downloadLog = useCallback(() => {
    // Ajouter BOM pour Excel
    const BOM = '\uFEFF';
    
    const csvContent = BOM + [
      ['Nom du fichier', 'Chemin', 'Mot de passe', 'Date de génération'],
      ...entries.map(entry => [
        entry.name,
        entry.path,
        entry.password,
        entry.timestamp
      ])
    ].map(row => 
      // Échapper les champs qui contiennent des virgules ou des sauts de ligne
      row.map(field => {
        const stringField = String(field);
        if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
          return `"${stringField.replace(/"/g, '""')}"`;
        }
        return stringField;
      }).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `passwords_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">Journal des Mots de Passe</h2>
        <button
          onClick={downloadLog}
          className="flex items-center px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-50 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Télécharger le journal
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {entries.map((entry, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {entry.path.includes('/') ? (
                  <FolderTree className="w-5 h-5 text-green-500" />
                ) : (
                  <FileText className="w-5 h-5 text-blue-500" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{entry.name}</p>
                  <p className="text-sm text-gray-500">
                    {entry.path}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-gray-400" />
                <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                  {entry.password}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};