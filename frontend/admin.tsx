import React, { useState } from 'react';
import { User } from 'lucide-react';

const AdminPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log('Login:', loginData);
    alert('Funcionalidade de login será implementada no backend');
    // Aqui você pode adicionar a lógica de autenticação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <nav className="bg-black bg-opacity-50 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <a 
              href="/" 
              className="text-white text-xl md:text-2xl font-light tracking-wider hover:text-gray-300 transition-colors"
            >
              CONEXÃO BRENNAND
            </a>
            
            <div className="flex gap-1">
              <a
                href="/"
                className="px-6 py-2 text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Início
              </a>
              <a
                href="/feedback"
                className="px-6 py-2 text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Feedback
              </a>
              <a
                href="/admin"
                className="px-6 py-2 bg-white bg-opacity-10 text-white transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <div className="inline-block border-2 border-gray-600 p-4 mb-6">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-4xl text-white mb-3 font-light tracking-wider">Administração</h1>
            <p className="text-gray-400 font-light tracking-wide">Área Restrita</p>
          </div>

          <div className="bg-white border-2 border-gray-200 p-10">
            <h2 className="text-2xl text-gray-900 mb-8 text-center font-light">Login</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">
                  Usuário
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-base font-light"
                  placeholder="Digite seu usuário"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors text-base font-light"
                  placeholder="Digite sua senha"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gray-900 text-white py-4 hover:bg-black transition-all duration-500 text-sm tracking-widest uppercase font-light"
              >
                Entrar
              </button>
            </div>

            <div className="mt-8 text-center">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm tracking-wide font-light"
              >
                ← Voltar ao site
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-gray-400 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-light opacity-60 tracking-wider">
            © 2025 Conexão Brennand — Área Administrativa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;