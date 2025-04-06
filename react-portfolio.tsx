import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, ExternalLink, Folder, Mail, Linkedin, Twitter, Code, Menu, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Update header style when scrolled
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };
  
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-slate-900/95 shadow-lg backdrop-blur-sm' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold relative group" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <span className="text-teal-400">J</span>akub
            <span className="text-teal-400">.</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {[
                { id: 'about', label: 'O mnie', num: '01' },
                { id: 'skills', label: 'Umiejętności', num: '02' },
                { id: 'projects', label: 'Projekty', num: '03' },
                { id: 'contact', label: 'Kontakt', num: '04' }
              ].map(item => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`relative hover:text-teal-400 transition-colors duration-300 text-sm ${activeSection === item.id ? 'text-teal-400' : 'text-slate-300'}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  >
                    <span className="text-teal-400 mr-1 font-mono text-xs">{item.num}.</span>
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-400 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0'}`}></span>
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="/resume.pdf" 
                  className="px-4 py-2 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 text-sm"
                  target="_blank" 
                  rel="noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          
          <button className="md:hidden text-teal-400" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-screen w-3/4 bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-6 flex justify-end">
          <button className="text-teal-400" onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-6">
          <ul className="flex flex-col space-y-6">
            {[
              { id: 'home', label: 'Home', num: '00' },
              { id: 'about', label: 'O mnie', num: '01' },
              { id: 'skills', label: 'Umiejętności', num: '02' },
              { id: 'projects', label: 'Projekty', num: '03' },
              { id: 'contact', label: 'Kontakt', num: '04' }
            ].map(item => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className={`text-lg ${activeSection === item.id ? 'text-teal-400' : 'text-slate-300'}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                >
                  <span className="text-teal-400 mr-2 font-mono">{item.num}.</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <a 
                href="/resume.pdf" 
                className="px-4 py-2 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 inline-block"
                target="_blank" 
                rel="noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleMenu}
        ></div>
      )}
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <p className="text-teal-400 font-mono mb-6 animate-fadeIn">Cześć, nazywam się</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn animation-delay-200">
            Jakub Sromek.
          </h1>
          <h2 className="text-4xl md:text-7xl font-bold text-slate-400 mb-8 animate-fadeIn animation-delay-300">
            Tworzę rozwiązania dla web i blockchain.
          </h2>
          <p className="text-slate-400 max-w-xl mb-12 text-lg animate-fadeIn animation-delay-400">
            Jestem Full Stack Developerem specjalizującym się w tworzeniu wyjątkowych aplikacji webowych i blockchain. 
            Obecnie skupiam się na budowaniu innowacyjnych rozwiązań w zakresie DeFi oraz innych technologii blockchain.
          </p>
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 animate-fadeIn animation-delay-500"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          >
            Zobacz moje projekty <ArrowRight size={16} />
          </a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="flex items-center text-2xl md:text-3xl font-bold mb-16">
            <span className="text-teal-400 font-mono mr-2">01.</span>
            O mnie
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4 text-slate-400">
              <p>
                Witaj! Jestem Jakub, student informatyki z pasją do tworzenia aplikacji internetowych i rozwiązań blockchain. 
                Moja przygoda z programowaniem rozpoczęła się, gdy odkryłem fascynujący świat technologii, który łączy 
                kreatywność z rozwiązywaniem problemów.
              </p>
              <p>
                Specjalizuję się w tworzeniu aplikacji od frontendu po backend, wykorzystując wiedzę z zakresu administracji 
                systemami oraz sieci komputerowych. Szczególnie interesuje mnie technologia blockchain i jej zastosowania 
                w aplikacjach finansowych.
              </p>
              <p>
                Poza kodowaniem, stale rozwijam się w obszarze sieci komputerowych, gdzie zajmuję się konfiguracją 
                VPN, zapór sieciowych i systemów IDS/IPS. Ta wszechstronność pozwala mi tworzyć kompletne rozwiązania IT.
              </p>
              
              <p className="text-slate-200 mt-8">Oto kilka technologii, z którymi pracuję:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'JavaScript (React.js)',
                  'Python (Django)',
                  'Solidity',
                  'Node.js (Express)',
                  'MySQL',
                  'Docker',
                  'Web3.js / Ethers.js',
                  'Linux / Windows Server'
                ].map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-teal-400 mr-2">▹</span>
                    <span className="font-mono text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="relative w-full aspect-square rounded-md overflow-hidden">
                <img
                  src="/api/placeholder/300/300"
                  alt="Jakub Sromek"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-teal-400/20 hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="absolute -z-10 top-4 left-4 w-full h-full border-2 border-teal-400 rounded-md transition-all duration-300 group-hover:top-5 group-hover:left-5"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-800/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="flex items-center text-2xl md:text-3xl font-bold mb-16">
            <span className="text-teal-400 font-mono mr-2">02.</span>
            Umiejętności techniczne
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Języki programowania',
                skills: [
                  'JavaScript (Advanced)',
                  'Python (Intermediate)',
                  'Java (Intermediate)',
                  'Solidity (Intermediate)'
                ]
              },
              {
                title: 'Web Development',
                skills: [
                  'React.js',
                  'Django',
                  'Express.js',
                  'HTML5/CSS3',
                  'WebSockets'
                ]
              },
              {
                title: 'DevOps & Infrastructure',
                skills: [
                  'Docker',
                  'Linux',
                  'Windows Server',
                  'Google Cloud Platform'
                ]
              },
              {
                title: 'Blockchain',
                skills: [
                  'Smart Contract Development',
                  'Web3.js',
                  'Ethers.js',
                  'DeFi Applications'
                ]
              },
              {
                title: 'Bazy danych',
                skills: [
                  'MySQL (Advanced)',
                  'SQLite',
                  'Redis'
                ]
              },
              {
                title: 'Sieci',
                skills: [
                  'TCP/IP',
                  'VPN Configuration',
                  'Firewalls',
                  'IDS/IPS Implementation',
                  'Network Diagnostics'
                ]
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className="bg-slate-800 p-6 rounded-lg hover:translate-y-1 transition-transform duration-300 border border-slate-700 hover:border-teal-400/30"
              >
                <h3 className="text-xl font-semibold mb-4 text-teal-400">{category.title}</h3>
                <ul className="space-y-2 text-slate-400">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-teal-400 mr-2 pt-1">▹</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="flex items-center text-2xl md:text-3xl font-bold mb-16">
            <span className="text-teal-400 font-mono mr-2">03.</span>
            Moje projekty
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'DeFi Trading Platform',
                description: 'Zdecentralizowana platforma handlowa umożliwiająca wymianę tokenów bez pośredników, wykorzystująca smart kontrakty.',
                tech: ['React', 'Solidity', 'Web3.js', 'Ethereum']
              },
              {
                title: 'Network Monitoring System',
                description: 'System monitorowania sieci w czasie rzeczywistym z wykrywaniem włamań i powiadomieniami.',
                tech: ['Python', 'Django', 'WebSockets', 'Redis']
              },
              {
                title: 'Cloud Deployment Tool',
                description: 'Narzędzie automatyzujące proces wdrażania aplikacji w chmurze, wspierające CI/CD.',
                tech: ['Docker', 'Node.js', 'Google Cloud', 'Express.js']
              },
              {
                title: 'Crypto Portfolio Tracker',
                description: 'Aplikacja do śledzenia portfela kryptowalut z zaawansowaną analityką i powiadomieniami cenowymi.',
                tech: ['React', 'Express.js', 'MySQL', 'CoinGecko API']
              },
              {
                title: 'Smart Home System',
                description: 'System inteligentnego domu kontrolowany przez aplikację mobilną z zabezpieczeniami blockchain.',
                tech: ['IoT', 'React Native', 'Node.js', 'MQTT']
              },
              {
                title: 'NFT Marketplace',
                description: 'Platforma do handlu NFT z funkcjami tworzenia, sprzedaży i aukcji tokenów niewymiennych.',
                tech: ['React', 'Solidity', 'IPFS', 'Ethers.js']
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-slate-800 rounded-lg p-8 flex flex-col h-full border border-slate-700 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-between items-center mb-8">
                  <Folder className="text-teal-400" size={40} />
                  <div className="flex gap-4">
                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
                      <Github size={20} />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors duration-300">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-slate-200">{project.title}</h3>
                <p className="text-slate-400 mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono text-slate-400">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-2xl">
          <p className="text-teal-400 font-mono mb-4">04. Co dalej?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skontaktuj się ze mną</h2>
          <p className="text-slate-400 mb-12">
            Szukasz współpracy nad projektem, masz pytania lub po prostu chcesz się przywitać? 
            Nie wahaj się i napisz do mnie. Chętnie odpowiem na Twoją wiadomość!
          </p>
          <a 
            href="mailto:kuba.sromek10@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 text-lg"
          >
            <Mail size={20} /> Wyślij wiadomość
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-400">
        <div className="container mx-auto">
          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
              <Code size={20} />
            </a>
          </div>
          <p className="text-sm">
            Zaprojektowane i zbudowane przez <a href="#" className="text-teal-400 hover:underline">Jakuba Sromka</a>
          </p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} Wszelkie prawa zastrzeżone</p>
        </div>
      </footer>
      
      {/* Fixed side social links (visible on desktop) */}
      <div className="fixed left-6 bottom-0 hidden xl:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-slate-400">
        <a href="#" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
          <Github size={20} />
        </a>
        <a href="#" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
          <Linkedin size={20} />
        </a>
        <a href="#" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
          <Twitter size={20} />
        </a>
        <a href="#" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300">
          <Code size={20} />
        </a>
      </div>
      
      {/* Fixed email (visible on desktop) */}
      <div className="fixed right-6 bottom-0 hidden xl:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-slate-400">
        <a 
          href="mailto:kuba.sromek10@gmail.com" 
          className="text-slate-400 hover:text-teal-400 transition-colors duration-300 [writing-mode:vertical-rl] font-mono text-xs tracking-widest hover:-translate-y-1"
        >
          kuba.sromek10@gmail.com
        </a>
      </div>
      
      {/* Scroll To Top Button */}
      <button 
        className={`fixed right-6 bottom-6 bg-teal-400/10 text-teal-400 p-3 rounded-full hover:bg-teal-400/20 transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
      
      {/* Custom Cursor Effect */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
};

export default App;