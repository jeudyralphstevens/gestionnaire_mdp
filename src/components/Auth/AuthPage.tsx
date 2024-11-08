import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Shield } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <Shield className="w-16 h-16 text-blue-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">
          Gestionnaire de Fichiers Sécurisé
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Gérez vos fichiers en toute sécurité
        </p>
      </div>

      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setIsLogin(true)} />
      )}
    </div>
  );
};