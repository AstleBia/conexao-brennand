import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage = ({ setCurrentPage }: HomePageProps) => {
  const events = [
    { title: 'Exposição de Cerâmica Contemporânea', date: '15 de Outubro', time: '14h às 18h' },
    { title: 'Visita Guiada com Curador', date: '20 de Outubro', time: '10h às 12h' },
    { title: 'Workshop: Arte em Cerâmica', date: '28 de Outubro', time: '15h às 17h' }
  ];

  return (
      <div className="min-h-screen bg-[#f5f1e8]">
        {/* Navigation */}
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
                    className="px-6 py-2 bg-[#006240] text-[#f5f1e8] transition-all duration-300 text-sm tracking-widest uppercase font-light"
                >
                  Início
                </button>
                <button
                    onClick={() => setCurrentPage('feedback')}
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

export default HomePage;