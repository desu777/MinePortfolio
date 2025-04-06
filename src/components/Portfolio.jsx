import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, ExternalLink, Folder, Mail, Linkedin, Twitter, Code, Menu, X } from 'lucide-react';

const Portfolio = () => {
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
            <span className="text-teal-400">jks</span>portfolio<span className="text-teal-400">.xyz</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {[
                { id: 'about', label: 'About Me', num: '01' },
                { id: 'skills', label: 'Skills', num: '02' },
                { id: 'projects', label: 'Projects', num: '03' },
                { id: 'contact', label: 'Contact', num: '04' }
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
              { id: 'about', label: 'About Me', num: '01' },
              { id: 'skills', label: 'Skills', num: '02' },
              { id: 'projects', label: 'Projects', num: '03' },
              { id: 'contact', label: 'Contact', num: '04' }
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
          <p className="text-teal-400 font-mono mb-6 animate-fadeIn">Hi, my name is</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn animation-delay-200">
            Jakub Sromek.
          </h1>
          <h2 className="text-4xl md:text-7xl font-bold text-slate-400 mb-8 animate-fadeIn animation-delay-300">
            I build solutions for web and blockchain.
          </h2>
          <p className="text-slate-400 max-w-xl mb-12 text-lg animate-fadeIn animation-delay-400">
            I'm an Aspiring Full Stack Developer specializing in creating exceptional web and blockchain applications. 
            Currently, I'm focused on building innovative solutions in DeFi and other blockchain technologies, as well as recently working with AI model implementations.
          </p>
          <a 
            href="#projects" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 animate-fadeIn animation-delay-500"
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
          >
            Check out my projects <ArrowRight size={16} />
          </a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="flex items-center text-2xl md:text-3xl font-bold mb-16">
            <span className="text-teal-400 font-mono mr-2">01.</span>
            About Me
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-4 text-slate-400">
              <p>
                Hello! I'm Jakub, a computer science student based in Krakow with a passion for creating web applications and blockchain solutions. 
                My journey in programming began when I discovered the fascinating world of technology that combines 
                creativity with problem-solving.
              </p>
              <p>
                I specialize in developing applications from frontend to backend, using knowledge from system administration 
                and computer networks. I'm particularly interested in blockchain technology and its applications 
                in financial applications.
              </p>
              <p>
                Beyond coding, I continuously develop my skills in computer networking, where I work on configuring 
                VPNs, firewalls, and IDS/IPS systems. This versatility allows me to create comprehensive IT solutions.
              </p>
              
              <p className="text-slate-200 mt-8">Here are a few technologies I've been working with:</p>
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
              <div className="relative w-full aspect-square rounded-md overflow-hidden flex items-center justify-center bg-slate-800">
                <span className="text-8xl" role="img" aria-label="Landscape">🏞️</span>
                <div className="absolute inset-0 bg-teal-400/10 hover:bg-transparent transition-colors duration-300"></div>
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
            Technical Skills
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Programming Languages',
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
                  'WebSockets',
                  'RESTful APIs'
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
                title: 'AI & Machine Learning',
                skills: [
                  'Vector Databases',
                  'Function Calling',
                  'AI Integration',
                  'LLM Prompt Engineering',
                  'Intelligent Trading Systems',
                  'Portfolio Analysis AI'
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
                title: 'Databases',
                skills: [
                  'MySQL (Advanced)',
                  'SQLite',
                  'Redis',
                  'Vector Embeddings'
                ]
              },
              {
                title: 'Networking',
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
            My Projects
            <span className="ml-4 h-px bg-slate-700 flex-grow"></span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'StockStorm',
                description: 'Advanced cryptocurrency trading platform with automated grid trading bots, AI-powered portfolio management, and real-time market data using microservices architecture.',
                tech: ['Django', 'MySQL', 'Redis', 'WebSockets', 'Chart.js', 'Pinecone', 'Binance API'],
                github: 'https://github.com/desu777/stockstorm_v2',
                demo: 'https://stockstorm.xyz/'
              },
              {
                title: 'Zero Interaction Checker',
                description: 'Blockchain analytics tool that tracks user interactions with Zero contracts on Newton Network, featuring a leaderboard system ranking wallets by activity from over 30M transactions.',
                tech: ['React.js', 'Express.js', 'SQLite', 'Web3.js', 'REST API'],
                github: 'https://github.com/desu777/zer0dex_interactionchecker',
                demo: 'https://zer0checker.xyz/'
              },
              {
                title: 'Zero Contract Deployer',
                description: 'One-click ERC-20 token deployment tool for the Newton Network with random token name generator and MetaMask integration for seamless blockchain interactions.',
                tech: ['React.js', 'Ethers.js', 'Web3.js', 'Node.js'],
                github: 'https://github.com/desu777/zerdeployer',
                demo: 'https://zer0checker.xyz/deployer/'
              },
              {
                title: '$MAT Token',
                description: 'Custom cryptocurrency deployed on the 0G Newton Network with implemented liquidity pool between MAT and USDT tokens and constant product market maker mechanism.',
                tech: ['Solidity', 'React.js', 'Ethers.js', 'Web3.js', 'Node.js'],
                github: 'https://github.com/desu777/mat',
                demo: 'https://zer0checker.xyz/mat/'
              },
              {
                title: 'AI-Powered Trading Wallet',
                description: 'Intelligent wallet for crypto and traditional markets with vector database as second brain, automated trading capabilities, and portfolio performance analysis.',
                tech: ['Python', 'Django', 'Vector DB', 'Function Calling', 'AI Integration'],
                github: 'https://github.com/desu777/stockstorm_v2',
                demo: 'https://stockstorm.xyz/'
              },
              {
                title: 'Trading Bots System',
                description: 'Developed two fully operational trading bots based on enhanced grid strategy with real-time portfolio interaction tracking and automated execution.',
                tech: ['Python', 'Binance API', 'WebSockets', 'Technical Analysis'],
                github: 'https://github.com/desu777/stockstorm_v2',
                demo: 'https://stockstorm.xyz/'
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className="bg-slate-800 rounded-lg p-8 flex flex-col h-full border border-slate-700 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-between items-center mb-8">
                  <Folder className="text-teal-400" size={40} />
                  <div className="flex gap-4">
                    <a href={project.github} className="text-slate-400 hover:text-teal-400 transition-colors duration-300" target="_blank" rel="noreferrer">
                      <Github size={20} />
                    </a>
                    <a href={project.demo} className="text-slate-400 hover:text-teal-400 transition-colors duration-300" target="_blank" rel="noreferrer">
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
          <p className="text-teal-400 font-mono mb-4">04. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-slate-400 mb-12">
            Looking to collaborate on a project, have questions, or simply want to say hello? 
            Don't hesitate to reach out. I'll be happy to respond to your message!
          </p>
          <a 
            href="mailto:kuba.sromek10@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors duration-300 text-lg"
          >
            <Mail size={20} /> Send Message
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-6 text-center text-slate-400">
        <div className="container mx-auto">
          <div className="flex justify-center gap-8 mb-6">
            <a href="https://github.com/desu777" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/jakub-sromek-517180279/" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/nov3lolo" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
              <Twitter size={20} />
            </a>
            <a href="https://github.com/desu777" className="hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
              <Code size={20} />
            </a>
          </div>
          <p className="text-sm">
            Designed and built by <a href="https://github.com/desu777" className="text-teal-400 hover:underline" target="_blank" rel="noreferrer">Jakub Sromek</a>
          </p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </footer>
      
      {/* Fixed side social links (visible on desktop) */}
      <div className="fixed left-6 bottom-0 hidden xl:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-slate-400">
        <a href="https://github.com/desu777" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/jakub-sromek-517180279/" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
          <Linkedin size={20} />
        </a>
        <a href="https://x.com/nov3lolo" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
          <Twitter size={20} />
        </a>
        <a href="https://github.com/desu777" className="text-slate-400 hover:text-teal-400 hover:-translate-y-1 transition-all duration-300" target="_blank" rel="noreferrer">
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
    </div>
  );
};

export default Portfolio; 