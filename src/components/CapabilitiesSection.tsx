import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import Icon from "@/components/ui/icon";

const CapabilitiesSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide(prev => Math.min(prev + 1, capabilities.length - 1));
    }
    if (touchStart - touchEnd < -75) {
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };
  
  const capabilities = [
    {
      iconUrl: "https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/9e482848-0f9c-41a3-bd27-ff5d5a201c65.jpg",
      title: "CoPilot — ИИ-ассистент",
      description: "Генерация текстов, анализ данных, автоматизация рутинных задач. ИИ помогает писать письма, создавать посты, обрабатывать запросы клиентов.",
      badge: "NEW",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/aaa41dd3-9007-4942-ba60-e2a8190df158.png",
      title: "CRM и продажи",
      description: "Управляйте воронкой продаж, автоматизируйте бизнес-процессы, анализируйте эффективность менеджеров.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/8e50949b-fffa-4dfa-b288-c4b23ed8f172.png",
      title: "Задачи и проекты",
      description: "Планируйте работу команды, отслеживайте дедлайны, управляйте проектами по методологии Agile и Kanban.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/3d674af2-eaa9-4b9d-be8c-ce6f4783435d.png",
      title: "Коммуникации",
      description: "Корпоративный чат, видеозвонки, рабочие группы, интеграция с почтой и соцсетями.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/f0f9b68e-ca9a-47d6-adb9-fb7789e0f51d.png",
      title: "Документы",
      description: "Облачное хранилище документов с совместным доступом, версионирование и история изменений.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/2d1e5244-9a6a-48ff-9927-cedb975c94ae.png",
      title: "Телефония",
      description: "Виртуальная АТС, звонки через интернет, запись разговоров и аналитика входящих/исходящих звонков.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/aaa41dd3-9007-4942-ba60-e2a8190df158.png",
      title: "Аналитика",
      description: "Мощные бизнес-аналитические отчеты, KPI сотрудников, анализ воронки продаж и эффективности рекламы.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/aaa41dd3-9007-4942-ba60-e2a8190df158.png",
      title: "Автоматизация с ИИ",
      description: "CoPilot автоматически заполняет CRM, анализирует звонки, создаёт отчёты и помогает принимать решения на основе данных.",
      badge: "AI",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      iconUrl: "https://cdn.poehali.dev/files/8e50949b-fffa-4dfa-b288-c4b23ed8f172.png",
      title: "Обработка обращений с ИИ",
      description: "ИИ-ассистент автоматически отвечает на типовые вопросы клиентов в чате, по email и в соцсетях, экономя время сотрудников.",
      badge: "AI",
      gradient: "from-violet-500 to-fuchsia-500"
    }
  ];

  return (
    <section ref={ref} id="capabilities" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1460px] mx-auto">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-4 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <Icon name="Sparkles" size={16} />
            <span>Powered by AI</span>
          </div>
          <h2 className={`font-heading font-bold text-3xl md:text-5xl mb-4 text-gray-900 ${isVisible ? 'animate-scroll-in' : 'opacity-0'}`}>
            Возможности сервиса
          </h2>
          <p className={`text-gray-600 text-base md:text-lg max-w-3xl mx-auto ${isVisible ? 'animate-scroll-in-delay-1' : 'opacity-0'}`}>
            Все инструменты для эффективного управления бизнесом в одной системе, усиленные искусственным интеллектом
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {capabilities.map((capability, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                    {capability.badge && (
                      <div className={`absolute top-4 right-4 bg-gradient-to-r ${capability.gradient} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                        {capability.badge}
                      </div>
                    )}
                    <div className="mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${capability.gradient} p-0.5`}>
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                          <img src={capability.iconUrl} alt={capability.title} className="w-10 h-10 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2 text-gray-900">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {capabilities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${isVisible ? 'animate-scroll-in-delay-2' : 'opacity-0'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              {capability.badge && (
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${capability.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                  {capability.badge}
                </div>
              )}
              <div className="mb-5 relative">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${capability.gradient} p-0.5 shadow-lg`}>
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <img src={capability.iconUrl} alt={capability.title} className="w-10 h-10 rounded-lg" />
                  </div>
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-gray-900 relative">
                {capability.title}
              </h3>
              <p className="text-gray-600 leading-relaxed relative">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;