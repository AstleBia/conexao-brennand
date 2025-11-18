import React, { useEffect, useState } from "react";

interface FeedbackDetalhado {
    nomeUsuario: string;
    sexo: string;
    cidade: string;
    idade: number;
    atendimento: number;
    acessibilidade: number;
    infra: number;
    seguranca: number;
    limpeza: number;
    comentario: string;
}

interface CategoriaRanking {
    categoria: string;
    media: number;
    quantidade: number;
    posicao: number;
}

interface AdminFeedbackDashboardProps {
    setCurrentPage: (page: string) => void;
    onLogout: () => void;
}

const AdminFeedbackDashboard = ({ setCurrentPage, onLogout }: AdminFeedbackDashboardProps) => {
    const [data, setData] = useState<FeedbackDetalhado[]>([]);
    const [mediaGeral, setMediaGeral] = useState<number | null>(null);
    const [ranking, setRanking] = useState<CategoriaRanking[]>([]);

    // Filtros
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");

    const loadData = async () => {
        let url = "http://localhost:8080/admin/feedbacks/detalhado";

        const params = [];
        if (gender) params.push(`gender=${gender}`);
        if (city) params.push(`city=${city}`);
        if (minAge) params.push(`minAge=${minAge}`);
        if (maxAge) params.push(`maxAge=${maxAge}`);

        if (params.length > 0) url += "?" + params.join("&");

        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.feedbacks || []);
            setMediaGeral(json.mediaGeral);
        } catch (err) {
            console.error("Erro ao buscar feedbacks:", err);
        }
    };

    const loadRanking = async () => {
        try {
            const response = await fetch("http://localhost:8080/admin/feedbacks/ranking");
            const data = await response.json();
            setRanking(data);
        } catch (err) {
            console.error("Erro ao buscar ranking:", err);
        }
    };

    useEffect(() => {
        loadData();
        loadRanking();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <nav className="bg-black bg-opacity-50 border-b border-gray-700">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="text-white text-xl md:text-2xl font-light tracking-wider">
                        CONEXÃO BRENNAND — ÁREA ADMINISTRATIVA
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-red-600 bg-opacity-80 hover:bg-red-700 text-white transition-all text-sm tracking-widest uppercase"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>

            {/* Conteúdo */}
            <div className="container mx-auto px-6 py-12">

                {/* Título */}
                <h1 className="text-4xl font-light tracking-wide mb-10 text-center">
                    Dashboard de Feedbacks
                </h1>

                {/* Filtros */}
                <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-gray-700 mb-10">
                    <h2 className="text-xl mb-4 font-light tracking-wide">Filtros</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <select
                            className="bg-black bg-opacity-40 p-3 rounded border border-gray-600"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>

                        <input
                            type="text"
                            className="bg-black bg-opacity-40 p-3 rounded border border-gray-600"
                            placeholder="Cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <input
                            type="number"
                            className="bg-black bg-opacity-40 p-3 rounded border border-gray-600"
                            placeholder="Idade mínima"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                        />

                        <input
                            type="number"
                            className="bg-black bg-opacity-40 p-3 rounded border border-gray-600"
                            placeholder="Idade máxima"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={loadData}
                        className="mt-6 w-full py-3 bg-gray-900 hover:bg-black transition-all uppercase tracking-widest font-light"
                    >
                        Aplicar Filtros
                    </button>
                </div>

                {/* Média geral */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-light">Média Geral</h2>
                    <p className="text-5xl font-light mt-3 text-amber-400">
                        {mediaGeral ? mediaGeral.toFixed(2) : "—"}
                    </p>
                </div>

                {/* Ranking de Categorias */}
                <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-gray-700 mb-10">
                    <h2 className="text-2xl font-light mb-6 text-center">Ranking de Categorias</h2>
                    <p className="text-center text-gray-400 mb-6">Da pior avaliação para a melhor</p>
                    
                    <div className="space-y-4">
                        {ranking.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">
                                Nenhum dado de ranking disponível
                            </div>
                        ) : (
                            ranking.map((item) => {
                                // Definir cores baseadas na posição
                                const getBarColor = (posicao: number) => {
                                    if (posicao === 1) return 'bg-red-600'; // Pior - vermelho
                                    if (posicao === 2) return 'bg-orange-600'; 
                                    if (posicao === 3) return 'bg-yellow-600';
                                    if (posicao === 4) return 'bg-blue-600';
                                    return 'bg-green-600'; // Melhor - verde
                                };

                                const getTextColor = (posicao: number) => {
                                    if (posicao === 1) return 'text-red-400';
                                    if (posicao === 2) return 'text-orange-400';
                                    if (posicao === 3) return 'text-yellow-400';
                                    if (posicao === 4) return 'text-blue-400';
                                    return 'text-green-400';
                                };

                                const getCategoryDisplayName = (categoria: string) => {
                                    const names: { [key: string]: string } = {
                                        'atendimento': 'Atendimento',
                                        'acessibilidade': 'Acessibilidade',
                                        'infra': 'Infraestrutura',
                                        'seguranca': 'Segurança',
                                        'limpeza': 'Limpeza'
                                    };
                                    return names[categoria] || categoria;
                                };

                                return (
                                    <div key={item.categoria} className="flex items-center gap-4">
                                        <div className={`w-8 text-center font-bold ${getTextColor(item.posicao)}`}>
                                            #{item.posicao}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium">{getCategoryDisplayName(item.categoria)}</span>
                                                <span className="text-sm text-gray-400">
                                                    {item.media.toFixed(2)} ({item.quantidade} avaliações)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-3">
                                                <div 
                                                    className={`${getBarColor(item.posicao)} h-3 rounded-full transition-all duration-500`}
                                                    style={{ width: `${(item.media / 5) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Tabela */}
                <div className="overflow-x-auto rounded-xl border border-gray-700">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800 text-gray-300">
                            <tr>
                                <th className="p-3">Nome</th>
                                <th className="p-3">Sexo</th>
                                <th className="p-3">Cidade</th>
                                <th className="p-3">Idade</th>
                                <th className="p-3">Atend.</th>
                                <th className="p-3">Acess.</th>
                                <th className="p-3">Infra</th>
                                <th className="p-3">Seg.</th>
                                <th className="p-3">Limpeza</th>
                                <th className="p-3">Comentário</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-6 text-gray-400">
                                        Nenhum feedback encontrado
                                    </td>
                                </tr>
                            ) : (
                                data.map((f, idx) => (
                                    <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800">
                                        <td className="p-3">{f.nomeUsuario}</td>
                                        <td className="p-3">{f.sexo}</td>
                                        <td className="p-3">{f.cidade}</td>
                                        <td className="p-3">{f.idade}</td>
                                        <td className="p-3">{f.atendimento}</td>
                                        <td className="p-3">{f.acessibilidade}</td>
                                        <td className="p-3">{f.infra}</td>
                                        <td className="p-3">{f.seguranca}</td>
                                        <td className="p-3">{f.limpeza}</td>
                                        <td className="p-3">{f.comentario || "—"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Footer */}
            <footer className="bg-black bg-opacity-50 text-gray-400 py-6 border-t border-gray-700 mt-20">
                <p className="text-center text-xs opacity-60 tracking-widest">
                    © 2025 Conexão Brennand — Área Administrativa
                </p>
            </footer>
        </div>
    );
};

export default AdminFeedbackDashboard;
