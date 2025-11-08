import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

const problems = [
  { image: "https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/07a1bd15-a200-4dfc-bb98-3687be1ee208.jpg", text: "Команда разбросана по разным мессенджерам" },
  { image: "https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/ded6d909-377a-44b4-b6b9-67b38de97a18.jpg", text: "Заявки теряются и не обрабатываются вовремя" },
  { image: "https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/ad1e308a-8cc9-460b-abb8-7e9ed645a98b.jpg", text: "Документы хранятся в хаосе" },
  { image: "https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/8926f216-54fe-460a-9877-883a017bcbc3.jpg", text: "Продажи проваливаются из-за плохой CRM" }
];

const solutions = [
  { icon: "Zap", text: "Единое рабочее пространство", color: "text-blue-600" },
  { icon: "Target", text: "Автоматизация бизнес-процессов", color: "text-green-600" },
  { icon: "BarChart3", text: "Рост продаж до 30%", color: "text-purple-600" },
  { icon: "Shield", text: "Полный контроль над бизнесом", color: "text-orange-600" }
];

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  const [currentProblem, setCurrentProblem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % problems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none hidden md:block">
        <div className="absolute top-32 left-[5%] bg-white p-3 rounded-2xl shadow-lg animate-float">
          <Icon name="Facebook" size={32} className="text-blue-600" />
        </div>
        <div className="absolute top-48 right-[8%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-1000">
          <Icon name="Instagram" size={32} className="text-pink-600" />
        </div>
        <div className="absolute top-[60%] left-[10%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-2000">
          <Icon name="MessageCircle" size={32} className="text-green-600" />
        </div>
        <div className="absolute top-[35%] right-[15%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-3000">
          <Icon name="Mail" size={32} className="text-red-600" />
        </div>
        <div className="absolute bottom-32 left-[15%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-4000">
          <Icon name="BarChart3" size={32} className="text-purple-600" />
        </div>
        <div className="absolute top-[45%] left-[8%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-1500">
          <Icon name="TrendingUp" size={32} className="text-green-600" />
        </div>
        <div className="absolute bottom-40 right-[12%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-2500">
          <Icon name="LineChart" size={32} className="text-blue-600" />
        </div>
        <div className="absolute top-[55%] right-[5%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-3500">
          <Icon name="Phone" size={32} className="text-orange-600" />
        </div>
        <div className="absolute top-[25%] left-[20%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-500">
          <Icon name="Youtube" size={32} className="text-red-600" />
        </div>
        <div className="absolute bottom-[25%] right-[20%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-4500">
          <Icon name="Linkedin" size={32} className="text-blue-700" />
        </div>
        <div className="absolute top-[70%] right-[25%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-2000">
          <Icon name="Send" size={32} className="text-blue-500" />
        </div>
        <div className="absolute bottom-[35%] left-[25%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-3000">
          <Icon name="Twitter" size={32} className="text-sky-500" />
        </div>
        <div className="absolute top-[20%] right-[5%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-1000">
          <Icon name="PieChart" size={32} className="text-orange-600" />
        </div>
        <div className="absolute bottom-[15%] left-[8%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-4000">
          <Icon name="Calendar" size={32} className="text-indigo-600" />
        </div>
        <div className="absolute top-[38%] left-[3%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-2500">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="#FF6B00"/>
            <text x="16" y="22" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial">1C</text>
          </svg>
        </div>
        <div className="absolute bottom-[45%] right-[8%] bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg animate-float animation-delay-3500">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="4" fill="white"/>
            <circle cx="22" cy="10" r="4" fill="white"/>
            <circle cx="16" cy="22" r="4" fill="white"/>
            <path d="M10 10 L22 10 L16 22 Z" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <div className="absolute top-[68%] left-[5%] bg-white p-3 rounded-2xl shadow-lg animate-float animation-delay-500">
          <Icon name="Gauge" size={32} className="text-yellow-600" />
        </div>
      </div>

      <div className="max-w-[1460px] mx-auto relative z-10 w-full">
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-xs md:text-sm mb-4">
            <Icon name="Award" size={16} />
            <span>15 миллионов компаний выбрали Битрикс24</span>
          </div>
        </div>

        <h1 className="font-heading font-bold text-4xl md:text-7xl text-center mb-6 md:mb-8 animate-scale-in leading-tight">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Битрикс24</span>
          {" "}
          <span className="text-gray-900">+</span>
          {" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CoPilot AI</span>
          <br />
          <span className="text-gray-900">Ваш бизнес под контролем</span>
        </h1>

        <p className="text-center text-gray-600 text-lg md:text-2xl max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in font-medium">
          Корпоративный портал, CRM и ИИ-помощник для автоматизации продаж и управления командой
        </p>

        <div className="mb-12 md:mb-16 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Знакомые проблемы?</h3>
          </div>
          
          <div className="relative h-48 md:h-40 mb-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 transition-all duration-700 ${
                  index === currentProblem 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="flex-shrink-0">
                  <img 
                    src={problem.image} 
                    alt={problem.text}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <p className="text-base md:text-xl font-semibold text-gray-800 text-center md:text-left max-w-md">
                  {problem.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce">
              Битрикс24 решает это!
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white p-2 rounded-lg shadow-md ${solution.color}`}>
                  <Icon name={solution.icon as any} size={20} />
                </div>
                <p className="font-semibold text-gray-800 text-sm md:text-base">{solution.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 md:mb-16 animate-fade-in">
          <Button 
            onClick={() => scrollToSection("pricing")}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all group"
          >
            НАЧАТЬ РАБОТУ
            <Icon name="Rocket" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("capabilities")}
            className="w-full md:w-auto border-2 border-gray-900 text-gray-900 px-8 py-6 rounded-full font-bold text-lg hover:bg-gray-900 hover:text-white transition-all"
          >
            СМОТРЕТЬ ВОЗМОЖНОСТИ
          </Button>
        </div>

        <div className="text-center">
          <p className="text-gray-500 font-medium text-sm mb-6">
            Нам доверяют ведущие компании России
          </p>
          <div className="hidden md:flex md:flex-wrap items-center justify-center gap-12 opacity-60">
            <img src="https://cdn.poehali.dev/files/3e7b1363-d0d1-4f12-9644-94da7a9ea465.png" alt="Forbes" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn.poehali.dev/files/922771ca-9697-401c-91c1-ed264b71b559.png" alt="PC" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn.poehali.dev/files/ca20920e-4234-4e3d-ac24-344f6b285b1d.png" alt="Лайфхакер" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn.poehali.dev/files/d531be2e-5a7f-4cc2-869a-7b698164a5bd.png" alt="ITworld" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>

          <div className="md:hidden relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              <img src="https://cdn.poehali.dev/files/3e7b1363-d0d1-4f12-9644-94da7a9ea465.png" alt="Forbes" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/922771ca-9697-401c-91c1-ed264b71b559.png" alt="PC" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/ca20920e-4234-4e3d-ac24-344f6b285b1d.png" alt="Лайфхакер" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/d531be2e-5a7f-4cc2-869a-7b698164a5bd.png" alt="ITworld" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/3e7b1363-d0d1-4f12-9644-94da7a9ea465.png" alt="Forbes" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/922771ca-9697-401c-91c1-ed264b71b559.png" alt="PC" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/ca20920e-4234-4e3d-ac24-344f6b285b1d.png" alt="Лайфхакер" className="h-6 object-contain grayscale opacity-60" />
              <img src="https://cdn.poehali.dev/files/d531be2e-5a7f-4cc2-869a-7b698164a5bd.png" alt="ITworld" className="h-6 object-contain grayscale opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;