import React, { useState } from 'react';
import { Star, MapPin, Clock, Calendar, Menu, X, Send, User } from 'lucide-react';

const ConexaoBrennnand = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
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
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const events = [
    { title: 'Exposição de Cerâmica Contemporânea', date: '15 de Outubro', time: '14h às 18h' },
    { title: 'Visita Guiada com Curador', date: '20 de Outubro', time: '10h às 12h' },
    { title: 'Workshop: Arte em Cerâmica', date: '28 de Outubro', time: '15h às 17h' }
  ];

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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback enviado:', { ...formData, ratings });
    alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
  };

  const handleLogin = () => {
    console.log('Login:', loginData);
    alert('Funcionalidade de login será implementada no backend');
  };

  const HomePage = () => (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#006240] to-[#004d32]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <div className="inline-block border-2 border-[#f5f1e8] px-6 py-2 mb-6">
              <p className="text-[#f5f1e8] text-sm tracking-[0.3em] font-light uppercase">Museu a Céu Aberto</p>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl mb-4 text-[#f5f1e8] tracking-wide font-light leading-tight">
            CONEXÃO
          </h1>
          <h2 className="text-5xl md:text-7xl mb-12 text-[#f5f1e8] tracking-wider font-serif italic">
            Brennand
          </h2>
          <div className="w-24 h-px bg-[#f5f1e8] mx-auto mb-12 opacity-60"></div>
          <p className="text-xl md:text-2xl text-[#f5f1e8] font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-12">
            Onde a arte encontra o mar no coração do Recife
          </p>
          <button
            onClick={() => setCurrentPage('feedback')}
            className="border-2 border-[#f5f1e8] text-[#f5f1e8] px-10 py-4 hover:bg-[#f5f1e8] hover:text-[#006240] transition-all duration-500 tracking-widest text-sm uppercase font-light"
          >
            Compartilhe Sua Experiência
          </button>
        </div>
      </div>

      {/* Sobre Section */}
      <div className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="mb-8">
                <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Patrimônio Cultural</p>
                <div className="w-16 h-px bg-[#006240] mb-8"></div>
              </div>
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-8 leading-tight font-light">
                Francisco Brennand
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-light">
                O Parque das Esculturas Francisco Brennand é um dos mais importantes patrimônios culturais de Recife. Localizado no Cais de Santa Rita, o parque apresenta esculturas monumentais que dialogam com o mar e a cidade.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Mais do que um espaço de arte, é um convite à contemplação, onde cada obra conta uma história e revela a genialidade do mestre ceramista.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#006240] to-[#004d32] flex items-center justify-center">
                <p className="text-[#f5f1e8] text-xl font-light tracking-wide">
                  Foto Principal
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#006240] -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos */}
      <div className="py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Agenda Cultural</p>
            <div className="w-16 h-px bg-[#006240] mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl text-gray-900 font-light">
              Próximos Eventos
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="group border-2 border-gray-200 hover:border-[#006240] transition-all duration-500 bg-white"
              >
                <div className="aspect-video bg-gradient-to-br from-[#006240] to-[#004d32] flex items-center justify-center">
                  <Calendar className="w-16 h-16 text-[#f5f1e8] opacity-40" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-[#006240] mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm tracking-wide font-light">{event.date}</span>
                  </div>
                  <h3 className="text-xl text-gray-900 mb-4 font-light leading-snug">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-light">{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informações Práticas */}
      <div className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Planeje Sua Visita</p>
            <div className="w-16 h-px bg-[#006240] mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-5xl text-gray-900 font-light">
              Informações Úteis
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#006240] p-12 text-[#f5f1e8]">
              <Clock className="w-12 h-12 mb-8 opacity-70" />
              <h3 className="text-2xl mb-8 font-light tracking-wide">Horários</h3>
              <div className="space-y-4 text-base font-light">
                <div className="flex justify-between border-b border-[#f5f1e8] border-opacity-20 pb-3">
                  <span>Terça a Sexta</span>
                  <span>9h — 17h</span>
                </div>
                <div className="flex justify-between border-b border-[#f5f1e8] border-opacity-20 pb-3">
                  <span>Sábado e Domingo</span>
                  <span>10h — 16h</span>
                </div>
                <div className="flex justify-between">
                  <span>Segunda-feira</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-[#006240] bg-white overflow-hidden">
              <div className="p-6 border-b-2 border-[#006240]">
                <MapPin className="w-10 h-10 mb-3 text-[#006240]" />
                <h3 className="text-xl text-gray-900 font-light tracking-wide">Localização</h3>
              </div>
              <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-500 font-light text-sm">
                [Embed Google Maps]
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-gray-700 font-light">
                  Cais de Santa Rita, s/n<br />
                  Recife Antigo<br />
                  Recife — PE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-32 px-4 bg-[#006240]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-[#f5f1e8] mb-8 font-light leading-tight">
            Conte Sua História
          </h2>
          <div className="w-24 h-px bg-[#f5f1e8] mx-auto mb-12 opacity-60"></div>
          <p className="text-xl text-[#f5f1e8] mb-12 font-light opacity-90">
            Sua experiência nos ajuda a melhorar continuamente
          </p>
          <button
            onClick={() => setCurrentPage('feedback')}
            className="border-2 border-[#f5f1e8] text-[#f5f1e8] px-12 py-4 hover:bg-[#f5f1e8] hover:text-[#006240] transition-all duration-500 tracking-widest text-sm uppercase font-light"
          >
            Deixar Feedback
          </button>
        </div>
      </div>
    </div>
  );

  const FeedbackPage = () => (
    <div className="min-h-screen bg-[#f5f1e8] py-20">
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
            <div>
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
    </div>
  );

  const AdminPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
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
          
          <div>
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
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm tracking-wide font-light"
            >
              ← Voltar ao site
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation */}
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
                className="px-6 py-2 bg-[#006240] text-[#f5f1e8] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Início
              </a>
              <a
                href="/Users/bia/Documents/Codigos/Faculdade/3Periodo/Projeto/conexao-brennand/frontend/src/pages/feedback"
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
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

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'feedback' && <FeedbackPage />}
      {currentPage === 'admin' && <AdminPage />}

      {/* Footer */}
      {currentPage !== 'admin' && (
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
      )}
    </div>
  );
};

export default ConexaoBrennnand;