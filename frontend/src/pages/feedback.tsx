import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

const FeedbackPage = () => {
  const [ratings, setRatings] = useState({
    atendimento: 0,
    acessibilidade: 0,
    infraestrutura: 0,
    seguranca: 0,
    limpeza: 0
  });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    dataNascimento: '',
    sexo: '',
    comentario: ''
  });

  const StarRating = ({ category, rating, setRating }) => {
    return (
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-9 h-9 cursor-pointer transition-all duration-300 hover:scale-110 ${
              star <= rating ? 'fill-amber-600 text-amber-600' : 'text-gray-300 hover:text-amber-400'
            }`}
            onClick={() => setRating(category, star)}
          />
        ))}
      </div>
    );
  };

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback enviado:', { ...formData, ratings });
    alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
    // Aqui você pode adicionar a lógica para enviar ao backend
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Header */}
      <nav className="bg-[#f5f1e8] border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <a 
              href="/" 
              className="text-gray-900 text-xl md:text-2xl font-light tracking-wider hover:text-[#006240] transition-colors"
            >
              CONEXÃO BRENNAND
            </a>
            
            <div className="flex gap-1">
              <a
                href="/"
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Início
              </a>
              <a
                href="/feedback"
                className="px-6 py-2 bg-[#006240] text-[#f5f1e8] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Feedback
              </a>
              <a
                href="/Users/bia/Documents/Codigos/Faculdade/3Periodo/Projeto/conexao-brennand/frontend/src/pages/admin"
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Sua Opinião Importa</p>
              <div className="w-16 h-px bg-[#006240] mx-auto mb-8"></div>
              <h1 className="text-5xl md:text-6xl text-gray-900 mb-6 font-light">
                Feedback
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Compartilhe sua experiência conosco
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 p-12 md:p-16">
              {/* Dados Pessoais */}
              <div className="mb-12">
                <h2 className="text-2xl text-gray-900 mb-8 font-light">
                  Seus Dados
                </h2>
                <div className="w-12 h-px bg-[#006240] mb-8"></div>
                
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
              </div>

              {/* Avaliação da Visita */}
              <div className="mb-12">
                <h2 className="text-2xl text-gray-900 mb-8 font-light">
                  Avalie Sua Visita
                </h2>
                <div className="w-12 h-px bg-[#006240] mb-8"></div>

                <div className="space-y-8">
                  {[
                    { key: 'atendimento', label: 'Atendimento' },
                    { key: 'acessibilidade', label: 'Acessibilidade' },
                    { key: 'infraestrutura', label: 'Infraestrutura' },
                    { key: 'seguranca', label: 'Segurança' },
                    { key: 'limpeza', label: 'Limpeza' }
                  ].map((item) => (
                    <div key={item.key} className="border border-gray-200 p-6 hover:border-[#006240] transition-colors">
                      <label className="block text-gray-800 mb-4 text-sm tracking-wide font-light">{item.label}</label>
                      <StarRating
                        category={item.key}
                        rating={ratings[item.key]}
                        setRating={handleRatingChange}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comentários */}
              <div className="mb-10">
                <label className="block text-gray-700 mb-2 text-xs tracking-wider uppercase font-light">
                  Comentários Adicionais
                </label>
                <textarea
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Conte-nos mais sobre sua experiência no parque..."
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors resize-none text-base font-light"
                ></textarea>
              </div>

              {/* Botão de Envio */}
              <button
                onClick={handleSubmitFeedback}
                className="w-full bg-[#006240] text-[#f5f1e8] py-4 hover:bg-[#004d32] transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-light"
              >
                <Send className="w-5 h-5" />
                Enviar Feedback
              </button>
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

export default FeedbackPage;