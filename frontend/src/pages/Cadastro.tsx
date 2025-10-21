import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface CadastroPageProps {
  setCurrentPage: (page: string) => void;
  onCadastroComplete: (usuario: any) => void;
}

const CadastroPage = ({ setCurrentPage, onCadastroComplete }: CadastroPageProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    dataNascimento: '',
    sexo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.cidade || !formData.dataNascimento || !formData.sexo) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          cidade: formData.cidade
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const usuario = await response.json();
      onCadastroComplete(usuario);
      setCurrentPage('feedback');
      
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Header */}
      <nav className="bg-[#f5f1e8] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-gray-900 text-xl md:text-2xl font-light tracking-wider hover:text-[#006240] transition-colors"
            >
              CONEXÃO BRENNAND
            </button>
            
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Início
              </button>
              <button
                onClick={() => setCurrentPage('cadastro')}
                className="px-6 py-2 bg-[#006240] text-[#f5f1e8] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Feedback
              </button>
              <button
                onClick={() => setCurrentPage('admin')}
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Primeiro Passo</p>
              <div className="w-16 h-px bg-[#006240] mx-auto mb-8"></div>
              <h1 className="text-5xl md:text-6xl text-gray-900 mb-6 font-light">
                Cadastro
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Para começar, precisamos conhecer você
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 p-12 md:p-16">
              <form onSubmit={handleSubmitCadastro}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">Nome Completo *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors text-base font-light"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors text-base font-light"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">Cidade *</label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors text-base font-light"
                        placeholder="Sua cidade"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">Data de Nascimento *</label>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors text-base font-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">Sexo *</label>
                    <select
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors text-base font-light"
                    >
                      <option value="">Selecione...</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="nao-informar">Prefiro não informar</option>
                    </select>
                  </div>
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-4 transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-light ${
                    isSubmitting 
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                      : 'bg-[#006240] text-[#f5f1e8] hover:bg-[#004d32]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      Cadastrar e Continuar
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#006240] text-[#f5f1e8] py-16 border-t-4 border-[#004d32]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl mb-4 font-light tracking-wider">CONEXÃO BRENNAND</h3>
          <div className="w-16 h-px bg-[#f5f1e8] mx-auto mb-8 opacity-40"></div>
          <p className="text-base mb-2 font-light opacity-90">
            Parque das Esculturas Francisco Brennand
          </p>
          <p className="text-sm mb-8 font-light opacity-70">
            Cais de Santa Rita — Recife Antigo, Recife — PE
          </p>
          <p className="text-xs font-light opacity-60 tracking-wider">
            © 2025 Conexão Brennand
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CadastroPage;