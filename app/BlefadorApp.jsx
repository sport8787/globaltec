import React, { useState, useEffect } from 'react';
import { User, Lock, ChevronRight, ChevronLeft, Trophy, Activity, TrendingUp } from 'lucide-react';

const BlefadorApp = () => {
  const [screen, setScreen] = useState('login'); // login, game, ranking
  // --- AQUI ESTÁ O TRUQUE DE PERSONALIZAÇÃO ---
  const [user, setUser] = useState({ name: 'Pablo Marçal', email: '' });
  const [voted, setVoted] = useState(null);
  const [points, setPoints] = useState(1250);
  const [timeLeft, setTimeLeft] = useState(15);

  // Simulação de Timer
  useEffect(() => {
    if (screen === 'game' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [screen, timeLeft]);

  // --- COMPONENTES DE TELA ---

  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-8 animate-fade-in">
      <div className="mb-4">
        <div className="w-16 h-12 border-2 border-yellow-500 rounded mx-auto flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
          <span className="text-yellow-500 font-bold font-serif text-xl">7-2</span>
        </div>
        <h1 className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 tracking-widest font-bold">
          O BLEFADOR
        </h1>
        <p className="text-xs text-yellow-500/60 tracking-[0.3em] uppercase mt-1">Milionário</p>
      </div>

      <div className="w-full space-y-4">
        <p className="text-gray-400 text-sm mb-6">Conecte-se para participar do Ranking Coringa e concorrer a uma vaga no programa.</p>
        
        <div className="relative">
          <User className="absolute left-3 top-3 text-yellow-600 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Seu Nome de Jogador" 
            // --- CORREÇÃO AQUI: Adicionado value e onChange ---
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            className="w-full bg-gray-900/80 border border-yellow-900/50 rounded-lg py-3 pl-10 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-yellow-600 w-5 h-5" />
          <input 
            type="email" 
            placeholder="E-mail (Conta Betano/Blaze)" 
            // --- CORREÇÃO AQUI: Adicionado value e onChange ---
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            className="w-full bg-gray-900/80 border border-yellow-900/50 rounded-lg py-3 pl-10 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all"
          />
        </div>

        <button 
          onClick={() => setScreen('game')}
          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold py-4 rounded-lg text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 transition-transform duration-300"
        >
          Entrar no Jogo
        </button>
        
        <p className="text-xs text-gray-600 mt-4">Ao entrar, você aceita os termos de risco.</p>
      </div>
    </div>
  );

  const GameScreen = () => (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/40 border-b border-yellow-900/30 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          {/* Botão de voltar para a tela de login */}
          <button onClick={() => setScreen('login')} className="text-gray-400 hover:text-white mr-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-8 h-6 border border-yellow-500/50 rounded flex items-center justify-center">
            <span className="text-yellow-500 font-bold text-xs">7-2</span>
          </div>
          {/* Exibindo o nome do usuário aqui */}
          <span className="text-gray-300 text-sm font-medium truncate max-w-[100px]">{user.name || 'Jogador'}</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-full border border-yellow-900">
          <Trophy className="w-3 h-3 text-yellow-400" />
          <span className="text-yellow-400 font-mono text-sm">{points} pts</span>
        </div>
      </div>

      {/* Live Feed Area */}
      <div className="relative h-64 bg-gray-900 w-full overflow-hidden group">
        {/* Placeholder para vídeo/foto do participante */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
          AO VIVO
        </div>

        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
          <p className="text-yellow-500 text-xs uppercase tracking-wider mb-1">Rodada 8 • Pergunta de R$ 50.000</p>
          <h2 className="text-white text-lg font-medium leading-tight">"O Jogador disse que leu Dom Quixote em espanhol. Verdade ou Blefe?"</h2>
        </div>
      </div>

      {/* Betting Interface */}
      <div className="flex-1 p-5 flex flex-col justify-end space-y-4 bg-gradient-to-b from-black to-gray-900">
        
        {/* Timer Bar */}
        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-yellow-500 transition-all duration-1000 ease-linear" 
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Tempo Restante</span>
          <span className={`${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
        </div>

        {!voted ? (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setVoted('truth')}
              className="bg-gray-800 border border-green-900/50 hover:border-green-500 hover:bg-green-900/20 active:scale-95 transition-all p-4 rounded-xl flex flex-col items-center group"
            >
              <span className="text-green-500 font-bold text-xl mb-1 group-hover:scale-110 transition-transform">VERDADE</span>
              <span className="text-green-500/60 text-xs flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> Odds 1.8x</span>
            </button>

            <button 
              onClick={() => setVoted('bluff')}
              className="bg-gray-800 border border-red-900/50 hover:border-red-500 hover:bg-red-900/20 active:scale-95 transition-all p-4 rounded-xl flex flex-col items-center group"
            >
              <span className="text-red-500 font-bold text-xl mb-1 group-hover:scale-110 transition-transform">BLEFOU</span>
              <span className="text-red-500/60 text-xs flex items-center"><Activity className="w-3 h-3 mr-1"/> Odds 2.5x</span>
            </button>
          </div>
        ) : (
          <div className="bg-gray-800/80 border border-yellow-500/30 rounded-xl p-6 text-center animate-fade-in backdrop-blur">
            <div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-2">
              <Lock className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-white font-bold text-lg">Aposta Confirmada</h3>
            <p className="text-gray-400 text-sm mt-1">Aguarde a revelação do Especialista.</p>
            <div className="mt-4 w-full bg-gray-700 h-1 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-500 w-2/3 animate-pulse"></div>
            </div>
            <p className="text-xs text-yellow-500/60 mt-2 text-right">Potencial de Ganho: +150 pts</p>
          </div>
        )}

        {/* Estatísticas da Crowd */}
        <div className="flex items-center justify-center space-x-8 pt-2 opacity-60">
          <div className="text-center">
            <span className="block text-green-500 font-bold text-sm">32%</span>
            <span className="text-[10px] text-gray-400">Acreditam</span>
          </div>
          <div className="h-8 w-px bg-gray-700"></div>
          <div className="text-center">
            <span className="block text-red-500 font-bold text-sm">68%</span>
            <span className="text-[10px] text-gray-400">Duvidam</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bg-black border-t border-gray-800 p-4 flex justify-around items-center">
        <button className="text-yellow-500 flex flex-col items-center">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] mt-1">Ao Vivo</span>
        </button>
        <button className="text-gray-600 flex flex-col items-center hover:text-white transition-colors" onClick={() => setScreen('ranking')}>
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] mt-1">Ranking</span>
        </button>
      </div>
    </div>
  );

  const RankingScreen = () => (
    <div className="flex flex-col h-full bg-black p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => setScreen('game')} className="text-gray-400 hover:text-white mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-serif text-white font-bold">Ranking Coringa</h2>
        {/* Botão de voltar para a tela de login */}
        <button onClick={() => setScreen('login')} className="ml-auto text-gray-400 hover:text-white text-xs uppercase tracking-wider border border-gray-600 px-2 py-1 rounded">
          Sair
        </button>
      </div>

      <div className="bg-gradient-to-r from-yellow-900/40 to-black p-4 rounded-xl border border-yellow-500/30 mb-6 flex items-center justify-between">
        <div>
          <p className="text-yellow-500 text-xs uppercase tracking-wider mb-1">Sua Posição</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-white">45º</span>
            <span className="text-green-500 text-xs flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> Subindo</span>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-white font-bold text-lg">{points}</span>
          <span className="text-gray-500 text-xs">Pontos</span>
        </div>
      </div>

      <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={`flex items-center p-3 rounded-lg ${i === 1 ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-gray-900 border border-gray-800'}`}>
            <span className={`w-8 font-bold ${i === 1 ? 'text-yellow-500' : 'text-gray-500'}`}>{i}º</span>
            <div className="w-8 h-8 bg-gray-700 rounded-full mr-3 overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" />
            </div>
            <div className="flex-1">
              <p className="text-gray-300 text-sm font-medium">Usuário_{9920 + i}</p>
            </div>
            <span className="text-white text-sm font-bold">{2000 - (i * 50)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto h-[700px] bg-black text-white font-sans overflow-hidden shadow-2xl rounded-3xl border-[8px] border-gray-800 relative">
      {/* Simulation of Phone Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
      
      {/* Content */}
      <div className="h-full w-full pt-6">
        {screen === 'login' && <LoginScreen />}
        {screen === 'game' && <GameScreen />}
        {screen === 'ranking' && <RankingScreen />}
      </div>
    </div>
  );
};

export default BlefadorApp;