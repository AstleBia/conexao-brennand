import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

interface FeedbackPageProps {
  setCurrentPage: (page: string) => void;
  usuario: any;
}

const FeedbackPage = ({ setCurrentPage, usuario }: FeedbackPageProps) => {
  const [ratings, setRatings] = useState({
    atendimento: 0,
    acessibilidade: 0,
    infraestrutura: 0,
    seguranca: 0,
    limpeza: 0
  });
  const [comentario, setComentario] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    if (isSubmitting) return;
    
    if (Object.values(ratings).some(rating => rating === 0)) {
      alert('Por favor, avalie todos os itens.');
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackResponse = await fetch('http://localhost:8080/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          atendimento: ratings.atendimento,
          acessibilidade: ratings.acessibilidade,
          infra: ratings.infraestrutura,
          seguranca: ratings.seguranca,
          limpeza: ratings.limpeza,
          comentario: comentario,
          usuarioId: usuario.id
        })
      });

      if (!feedbackResponse.ok) {
        throw new Error('Erro ao enviar feedback');
      }

      alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
      
      // Resetar formulário
      setComentario('');
      setRatings({
        atendimento: 0,
        acessibilidade: 0,
        infraestrutura: 0,
        seguranca: 0,
        limpeza: 0
      });
      setCurrentPage('home');

    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.');
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
            <a 
              href="/" 
              className="text-gray-900 text-xl md:text-2xl font-light tracking-wider hover:text-[#006240] transition-colors"
            >
              CONEXÃO BRENNAND
            </a>
            
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage('home')}
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
              >
                Início
              </button>
              <button
                onClick={() => setCurrentPage('cadastro')}
                className="px-6 py-2 text-gray-700 hover:text-[#006240] transition-all duration-300 text-sm tracking-widest uppercase font-light"
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#006240] text-xs tracking-[0.3em] uppercase font-light mb-4">Segundo Passo</p>
              <div className="w-16 h-px bg-[#006240] mx-auto mb-8"></div>
              <h1 className="text-5xl md:text-6xl text-gray-900 mb-6 font-light">
                Feedback
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Olá, {usuario?.nome}! Agora avalie sua visita
              </p>
            </div>
            
            <div className="bg-white border-2 border-gray-200 p-12 md:p-16">

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
                  value={comentario}
                  onChange={handleComentarioChange}
                  rows="6"
                  placeholder="Conte-nos mais sobre sua experiência no parque..."
                  className="w-full px-4 py-3 border border-gray-300 focus:border-[#006240] focus:outline-none transition-colors resize-none text-base font-light"
                ></textarea>
              </div>

              {/* Botão de Envio */}
              <button
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
                className={`w-full py-4 transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-light ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-[#006240] text-[#f5f1e8] hover:bg-[#004d32]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Feedback
                  </>
                )}
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