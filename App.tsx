
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Star, 
  Zap, 
  Award, 
  Smile, 
  Rocket, 
  ShieldCheck, 
  ThumbsUp,
  Sparkles,
  RefreshCw,
  Quote,
  CheckCircle2,
  XCircle,
  Trophy,
  Users,
  Crown,
  Gift,
  ArrowLeft,
  Share2,
  Medal,
  Flame,
  Globe,
  Camera,
  Music,
  Bell,
  MessageCircle,
  Diamond
} from 'lucide-react';
import { getVilmaCompliment } from './services/geminiService';

// --- Types ---
interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: Question[] = [
  { id: 1, question: "Qual é o superpoder secreto da Vilma?", options: ["Invisibilidade", "Tornar qualquer dia incrível", "Teletransporte", "Fritar ovo com a mente"], correct: 1 },
  { id: 2, question: "O que acontece quando a Vilma entra em uma sala?", options: ["O Wi-Fi melhora", "As luzes piscam", "O nível de magnetismo sobe 200%", "As pessoas começam a se curvar diante da mais mais"], correct: 3 },
  { id: 3, question: "Qual o nível de paciência da Vilma?", options: ["Zero", "Normal", "Budista", "Infinito"], correct: 0 },
  { id: 4, question: "Se a Vilma fosse uma música, qual gênero ela seria?", options: ["Um rock clássico épico", "Um pop chiclete contagiante", "Um jazz relaxante", "Uma sinfonia de alegria"], correct: 0 },
  { id: 5, question: "Qual o principal ingrediente da 'Vibe da Vilma'?", options: ["Cafeína", "Otimismo puro", "Deboche saudável", "Todas as anteriores"], correct: 3 },
  { id: 6, question: "Qual o grau de confiabilidade da Vilma?", options: ["Mais que cofre de banco", "Duvidoso", "Depende do dia", "Normal"], correct: 0 },
  { id: 7, question: "Como a Vilma resolve um problema?", options: ["Chora", "Foge", "Se o problema for uma pessoa, ela manda a pessoa se lascar", "Ignora"], correct: 2 },
  { id: 8, question: "O que é impossível fazer perto da Vilma?", options: ["Ficar triste por muito tempo", "Dormir", "Falar sério", "Não dar risada"], correct: 3 },
  { id: 9, question: "Qual o status da Vilma no ranking mundial de amizade?", options: ["Top 100", "Top 10", "Acima de qualquer nível (Queen Bee)", "Iniciante"], correct: 2 },
  { id: 10, question: "Se a Vilma ganhasse um Oscar, em qual categoria seria?", options: ["Melhor Atriz", "Pessoa mais magnética, inteligente, bonita e perfeita", "Melhor Efeitos Especiais", "Melhor Roteiro Original"], correct: 1 }
];

// --- Sub-components (Main App) ---

const Navbar = ({ onOpenFanClub }: { onOpenFanClub: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
          <Heart size={24} fill="currentColor" />
        </div>
        <span className="text-2xl font-extrabold font-outfit tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          VILMA<span className="text-gray-900">VERO</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-semibold text-gray-600">
        <a href="#bio" className="hover:text-purple-600 transition-colors">A Lenda</a>
        <a href="#stats" className="hover:text-purple-600 transition-colors">Estatísticas</a>
        <a href="#quiz" className="hover:text-purple-600 transition-colors">Quiz</a>
        <a href="#generator" className="hover:text-purple-600 transition-colors">Oráculo</a>
        <button 
          onClick={onOpenFanClub}
          className="bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95 flex items-center gap-2"
        >
          <Crown size={18} /> Fã Clube
        </button>
      </div>
    </div>
  </nav>
);

const FanClubPage = ({ onClose }: { onClose: () => void }) => {
  const [membershipTier, setMembershipTier] = useState<'none' | 'basic' | 'diamond' | 'supreme'>('none');
  const [activeTab, setActiveTab] = useState<'feed' | 'perks'>('feed');
  const [challengeAccepted, setChallengeAccepted] = useState(false);

  const upgrade = (tier: any) => {
    setMembershipTier(tier);
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    audio.play().catch(() => {});
  };

  const handleChallenge = () => {
    setChallengeAccepted(true);
    alert('Desafio Aceito! Agora você tem 24 horas para ser 1% tão incrível quanto a Vilma. Boa sorte, você vai precisar!');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white">
      <div className="fixed top-0 left-0 right-0 z-[60] h-20 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-purple-400 hover:text-white transition-all font-bold">
            <ArrowLeft size={20} /> <span className="hidden sm:inline">SAIR DO MODO VIP</span>
          </button>
          
          <div className="flex items-center gap-4">
             {membershipTier !== 'none' && (
               <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs font-black uppercase tracking-widest text-white/70">
                   {membershipTier} MEMBER
                 </span>
               </div>
             )}
             <button onClick={() => alert('Notificações de Vilmices ativadas!')} className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
               <Bell size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-[60px] overflow-hidden bg-gradient-to-br from-purple-900/40 via-black to-pink-900/40 border border-white/10 p-12 md:p-24 mb-12 text-center group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] group-hover:bg-purple-600/30 transition-all duration-700"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl">
                  <Crown size={48} className="text-white -rotate-12" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-[10px] font-black uppercase">
                  Level 100
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black font-outfit mb-6 tracking-tight">
              VILMA<span className="text-purple-500 italic">DOM</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium">
              A rede social exclusiva onde o único algoritmo é a simpatia da Vilma. 
              {membershipTier === 'none' ? " Escolha seu destino e faça parte da história." : " Você agora é parte da elite global."}
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {membershipTier === 'none' ? (
                <>
                  <button onClick={() => upgrade('supreme')} className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center gap-3">
                    MEMBRO SUPREME <Diamond size={24} className="text-purple-600" />
                  </button>
                  <button onClick={() => upgrade('basic')} className="bg-white/5 border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                    Acesso Grátis
                  </button>
                </>
              ) : (
                <div className="inline-flex items-center gap-4 bg-green-500/10 border border-green-500/30 px-10 py-5 rounded-2xl animate-bounce">
                   <CheckCircle2 className="text-green-500" size={32} />
                   <span className="text-2xl font-black">ACESSO TOTAL LIBERADO</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { id: 'feed', icon: <Globe size={20} />, label: 'Vilma News' },
            { id: 'perks', icon: <Gift size={20} />, label: 'Mimos Exclusivos' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                activeTab === tab.id 
                ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20" 
                : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {[
                { 
                  tag: "EXCLUSIVO", 
                  title: "Vilma é flagrada dançando Just Dance com seu melhor amigo Davi", 
                  desc: "A performance foi tão épica que os sensores do jogo deram 'Perfect' em passos que nem existiam. Davi, o melhor amigo número 1, acompanhou a lenda em uma coreografia histórica.",
                  likes: "500k",
                  time: "Agora",
                  icon: <Star className="text-yellow-500" />
                },
                { 
                  tag: "EVENTO", 
                  title: "Abertura da 'Semana Mundial do Abraço da Vilma'", 
                  desc: "A ONU declarou feriado global após descobrir que a Vilma deu bom dia no grupo da família. O PIB mundial subiu 2%.",
                  likes: "2M",
                  time: "Há 2 horas",
                  icon: <Globe className="text-blue-400" />
                }
              ].map((news, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase">{news.tag}</span>
                    <span className="text-gray-500 text-sm">{news.time}</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 font-outfit leading-tight">{news.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">{news.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button onClick={() => alert('Amamos!')} className="flex items-center gap-2 text-pink-500 font-bold hover:scale-110 transition-transform">
                        <Heart size={20} fill="currentColor" /> {news.likes}
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 font-bold hover:text-white transition-colors">
                        <MessageCircle size={20} /> Comentar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <div className={`p-10 rounded-[40px] transition-all duration-500 ${challengeAccepted ? 'bg-green-600 text-white' : 'bg-gradient-to-br from-yellow-500 to-orange-600 text-black'}`}>
                <Trophy size={48} className="mb-6" />
                <h4 className="text-2xl font-black mb-2">{challengeAccepted ? 'Desafio Ativo!' : 'Desafio do Mês'}</h4>
                <p className="font-bold mb-6 opacity-80 leading-snug">
                  {challengeAccepted ? 'Você está em treinamento para atingir 1% do brilho da Vilma.' : 'Seja 1% tão legal quanto a Vilma hoje e ganhe uma insígnia de ouro.'}
                </p>
                <button 
                  disabled={challengeAccepted}
                  onClick={handleChallenge}
                  className={`w-full py-4 rounded-2xl font-black transition-all ${challengeAccepted ? 'bg-white/20 cursor-default' : 'bg-black text-white hover:bg-white hover:text-black'}`}>
                  {challengeAccepted ? 'EM PROGRESSO...' : 'ACEITAR DESAFIO'}
                </button>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
                <h4 className="text-xl font-black mb-6 flex items-center gap-2"><Music size={20} className="text-purple-400" /> Vilma's Playlist</h4>
                <div className="space-y-4">
                  {["Maluco beleza", "Posso até não te dar flores", "Regime Fechado"].map((m, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                          <Music size={16} />
                        </div>
                        <span className="font-bold text-gray-300">{m}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'perks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Cupons de Sorriso", status: "Liberado", desc: "Troque seus pontos de fã por um 'visto' da Vilma no seu story." },
              { title: "Vilmice Pro", status: "Novo", desc: "Tenha 10% do bom gosto dela em suas roupas por 24h." }
            ].map((perk, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex gap-8 items-start group hover:border-purple-500/50 transition-all">
                <div className="w-16 h-16 bg-purple-600/10 rounded-3xl flex items-center justify-center shrink-0 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  <Gift size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">{perk.title}</h3>
                    <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${perk.status === 'Liberado' ? 'bg-green-500 text-black' : 'bg-white/10 text-white/40'}`}>
                      {perk.status}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{perk.desc}</p>
                  <button onClick={() => alert('Resgatado com sucesso!')} className="mt-6 font-black text-xs text-purple-400 hover:text-purple-300 tracking-widest uppercase">Resgatar Agora —&gt;</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="py-20 border-t border-white/5 bg-black/50 text-center">
        <p className="text-gray-600 font-bold tracking-widest uppercase text-xs mb-4">VILMA SUPREME CLUB © 2025</p>
      </footer>
    </div>
  );
};

// --- App Sections ---

const Hero = ({ onOpenFanClub }: { onOpenFanClub: () => void }) => (
  <section id="bio" className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full font-bold text-sm mb-6 border border-purple-100">
          <Sparkles size={16} /> CERTIFICADA COMO A MAIS LEGAL DO BRASIL
        </div>
        <h1 className="text-6xl md:text-8xl font-black font-outfit leading-[1.1] mb-8">
          Quem é <br />
          <span className="text-purple-600 relative">
            Vilma?
            <div className="absolute -bottom-2 left-0 w-full h-3 bg-purple-200/50 -z-10 rounded-full"></div>
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
          Alguns dizem que ela é um mito. Outros dizem que é um fenômeno da natureza. 
          Nós sabemos a verdade: Vilma é a amiga que todo mundo queria ter, 
          mas só alguns privilegiados como você realmente conhecem.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <button 
            onClick={() => document.getElementById('quiz')?.scrollIntoView({behavior: 'smooth'})}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center gap-3 active:scale-95"
          >
            Fazer o Vilma-Quiz <Rocket size={20} />
          </button>
          <button 
            onClick={onOpenFanClub}
            className="bg-purple-100 text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-200 transition-all flex items-center gap-3 active:scale-95"
          >
            Acessar Fã Clube <Crown size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-[60px] relative animate-float shadow-inner overflow-hidden flex items-center justify-center border-4 border-white">
          <img 
            src="https://picsum.photos/seed/vilma-friend/600/600" 
            alt="Vibe da Vilma" 
            className="w-full h-full object-cover opacity-90 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
          <div className="absolute top-8 right-8 bg-white p-4 rounded-2xl shadow-2xl rotate-12">
            <Smile size={48} className="text-yellow-500" />
          </div>
          <div className="absolute bottom-12 left-8 bg-white p-4 rounded-2xl shadow-2xl -rotate-12">
            <Zap size={48} className="text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StatsGrid = () => {
  const stats = [
    { icon: <ShieldCheck className="text-green-500" />, label: 'Lealdade', value: '100%', desc: 'Sempre lá quando você precisa.' },
    { icon: <Star className="text-yellow-500" />, label: 'Brilho', value: '999%', desc: 'Ilumina qualquer ambiente.' },
    { icon: <Zap className="text-purple-500" />, label: 'Energia', value: 'Over 9000', desc: 'Não para nunca!' },
    { icon: <Award className="text-blue-500" />, label: 'Bom Gosto', value: 'Impecável', desc: 'Sabe o que é bom de verdade.' },
  ];

  return (
    <section id="stats" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-outfit mb-4">A Ciência Comprova</h2>
          <p className="text-gray-500 text-lg">Dados auditados pelo Instituto de Amizade Mundial.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 hover:border-purple-200 hover:bg-white hover:shadow-2xl hover:shadow-purple-100 transition-all group cursor-default">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl font-black font-outfit text-gray-900 mb-2">{stat.value}</div>
              <div className="font-bold text-gray-800 text-lg mb-1">{stat.label}</div>
              <div className="text-gray-500 leading-snug">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUIZ_QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <section id="quiz" className="py-24 bg-purple-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 border border-purple-100">
          <div className="text-center mb-10">
            <span className="text-purple-600 font-bold tracking-widest uppercase text-sm">Desafio de Amizade</span>
            <h2 className="text-4xl font-black font-outfit mt-2">Você conhece a Vilma?</h2>
          </div>

          {!showResult ? (
            <div>
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                  <span>QUESTÃO {currentQuestion + 1} DE {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 transition-all duration-500" 
                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-8 text-gray-800">{QUIZ_QUESTIONS[currentQuestion].question}</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedOption !== null}
                    className={`p-5 rounded-2xl text-left font-bold transition-all flex justify-between items-center border-2 ${
                      selectedOption === null 
                        ? "border-gray-100 hover:border-purple-600 hover:bg-purple-50 text-gray-700" 
                        : idx === QUIZ_QUESTIONS[currentQuestion].correct
                        ? "border-green-500 bg-green-50 text-green-700"
                        : selectedOption === idx
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-100 opacity-50 text-gray-400"
                    }`}
                  >
                    {option}
                    {selectedOption !== null && idx === QUIZ_QUESTIONS[currentQuestion].correct && <CheckCircle2 size={20} />}
                    {selectedOption === idx && idx !== QUIZ_QUESTIONS[currentQuestion].correct && <XCircle size={20} />}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
                <Trophy size={48} />
              </div>
              <h3 className="text-3xl font-black mb-4">Resultado Final: {score}/{QUIZ_QUESTIONS.length}</h3>
              <p className="text-gray-600 text-lg mb-10">
                {score === QUIZ_QUESTIONS.length 
                  ? "Incrível! Você é um PhD em Vilma-logia!" 
                  : score > 7 
                  ? "Muito bem! Você conhece os segredos da lenda."
                  : "Bom trabalho! Mas a Vilma sempre tem uma surpresa nova guardada."}
              </p>
              <button 
                onClick={resetQuiz}
                className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-xl active:scale-95"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Bill Gates", role: "Entusiasta de Talentos", text: "Eu tentei contratar a Vilma para a Microsoft, mas ela disse que estava muito ocupada sendo uma amiga incrível." },
    { name: "Beyoncé", role: "Queen B", text: "Eu me inspiro na energia da Vilma para os meus shows. Ela é a verdadeira diva." },
    { name: "O Universo", role: "Espaço-Tempo", text: "A expansão do cosmos é alimentada pela risada da Vilma. Factos." }
  ];

  return (
    <section id="testimonials" className="py-24 bg-purple-600 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-outfit text-white mb-4 italic">O Que Dizem Por Aí</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-xl p-10 rounded-[40px] border border-white/20 text-white hover:bg-white/20 transition-all cursor-default">
              <Quote className="text-purple-300 mb-6" size={40} />
              <p className="text-xl mb-8 font-medium leading-relaxed italic">"{r.text}"</p>
              <div>
                <div className="font-black text-lg">{r.name}</div>
                <div className="text-purple-200 text-sm font-semibold">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GeminiSection = () => {
  const [compliment, setCompliment] = useState<string>("Clique no botão para ver o que a IA pensa da Vilma...");
  const [loading, setLoading] = useState(false);

  const fetchNewCompliment = async () => {
    setLoading(true);
    const newOne = await getVilmaCompliment();
    setCompliment(newOne);
    setLoading(false);
  };

  return (
    <section id="generator" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl shadow-purple-200 border-8 border-purple-50">
          <div className="inline-block p-4 bg-purple-100 rounded-2xl text-purple-600 mb-8">
            <Sparkles size={48} />
          </div>
          <h2 className="text-4xl font-black font-outfit mb-6">Oráculo de IA da Vilma</h2>
          <p className="text-gray-500 mb-12 text-lg">Usamos inteligência artificial de última geração para processar quão incrível a Vilma é em tempo real.</p>
          
          <div className="min-h-[120px] flex items-center justify-center mb-12">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="animate-spin text-purple-600" size={40} />
                <span className="font-bold text-purple-600">Analisando Áureas...</span>
              </div>
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {compliment}
              </p>
            )}
          </div>

          <button 
            onClick={fetchNewCompliment}
            disabled={loading}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-purple-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 active:scale-95 overflow-hidden"
          >
            <span className="relative flex items-center gap-2 z-10">
              Gerar Novo Elogio Épico <ThumbsUp size={20} />
            </span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenFanClub }: { onOpenFanClub: () => void }) => (
  <footer className="py-12 bg-white border-t border-gray-100 text-center">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center gap-6">
        <div 
          className="flex items-center gap-2 grayscale opacity-50 cursor-pointer hover:grayscale-0 hover:opacity-100 transition-all"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
            <Heart size={16} fill="white" />
          </div>
          <span className="text-xl font-black font-outfit">VILMAVERO</span>
        </div>
        <p className="text-gray-400 text-sm">
          Este site é uma obra de ficção (exceto a parte da Vilma ser legal, isso é 100% real). <br />
          Feito com muito ❤️ para a melhor Vilma do mundo.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-400">
          <button onClick={() => alert('Compartilhando brilho...')} className="hover:text-purple-600 transition-colors">#VilmaTheBest</button>
          <button onClick={() => alert('Coolness Nível: Máximo')} className="hover:text-purple-600 transition-colors">#CoolnessOverload</button>
          <button onClick={() => alert('Troféu enviado!')} className="hover:text-purple-600 transition-colors">#BestFriendAwards</button>
          <button onClick={onOpenFanClub} className="text-purple-600 font-bold hover:underline">Entrar no Fã Clube Oficial</button>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [showFanClub, setShowFanClub] = useState(false);

  const handleCloseFanClub = () => {
    setShowFanClub(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showFanClub) {
    return <FanClubPage onClose={handleCloseFanClub} />;
  }

  return (
    <div className="min-h-screen selection:bg-purple-200 selection:text-purple-900">
      <Navbar onOpenFanClub={() => setShowFanClub(true)} />
      <main>
        <Hero onOpenFanClub={() => setShowFanClub(true)} />
        <StatsGrid />
        <QuizSection />
        <Testimonials />
        <GeminiSection />
      </main>
      <Footer onOpenFanClub={() => setShowFanClub(true)} />
    </div>
  );
};

export default App;
