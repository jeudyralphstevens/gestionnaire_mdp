import React from 'react';
import { useAuth } from './context/AuthContext';
import { AuthPage } from './components/Auth/AuthPage';
import { FileUploader } from './components/FileUploader';
import { PasswordLog } from './components/PasswordLog';
import { generatePassword } from './utils/password';
import { Shield, LogOut } from 'lucide-react';
import { FileEntry } from './types';

function App() {
  const { isAuthenticated, user, logout } = useAuth();
  const [entries, setEntries] = React.useState<FileEntry[]>(() => {
    const savedEntries = localStorage.getItem(`entries_${user?.id}`);
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  React.useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`entries_${user.id}`, JSON.stringify(entries));
    }
  }, [entries, user?.id]);

  const handleFiles = React.useCallback((items: FileList) => {
    const newEntries: FileEntry[] = Array.from(items).map(file => ({
      name: file.name,
      path: file.webkitRelativePath || file.name,
      password: generatePassword(),
      timestamp: new Date().toLocaleString()
    }));

    setEntries(prev => [...prev, ...newEntries]);
  }, []);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <Shield className="w-12 h-12 text-blue-500 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestionnaire de Fichiers
              </h1>
              <p className="text-gray-600">
                Bienvenue, {user?.name}
              </p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </button>
        </div>

        <div className="space-y-8">
          <FileUploader onFilesSelected={handleFiles} />
          <PasswordLog entries={entries} />
        </div>
      </div>
    </div>
  );
}

export default App;