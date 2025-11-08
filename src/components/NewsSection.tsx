import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import NewsModal from "@/components/NewsModal";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  title: string;
  description: string;
  fullContent?: string;
  link: string;
  pubDate: string;
  image?: string;
  category?: string;
}

const NewsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Все");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/6b8ae2f1-ce10-4bd0-8d36-9d1b307284de', {
          cache: 'no-store'
        });
        const data = await response.json();
        
        if (data.success && data.items) {
          setNews(data.items);
        } else {
          setNews(getMockNews());
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(getMockNews());
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getMockNews = (): NewsItem[] => [
    {
      title: "Искусственный интеллект в CRM: автоматизация нового уровня",
      description: "Как AI-ассистенты помогают менеджерам закрывать больше сделок, прогнозировать поведение клиентов и автоматизировать рутинные задачи.",
      fullContent: `
        <h2>Революция в продажах</h2>
        <p>Искусственный интеллект меняет подход к работе с клиентами. Современные CRM-системы уже не просто хранилище данных, а умный помощник, который анализирует, подсказывает и предсказывает.</p>
        
        <h3>Основные возможности AI в CRM:</h3>
        <ul>
          <li><strong>Умный скоринг лидов</strong> — система автоматически оценивает вероятность закрытия сделки</li>
          <li><strong>Персонализация коммуникаций</strong> — подбор оптимального канала и времени для связи</li>
          <li><strong>Прогнозирование продаж</strong> — точные forecast на основе исторических данных</li>
          <li><strong>Автоматическое заполнение карточек</strong> — AI извлекает данные из писем и звонков</li>
        </ul>

        <p>Компании, внедрившие AI-инструменты в CRM, отмечают рост конверсии на 25-40% и сокращение времени на рутину на 60%.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 10, 7).toISOString(),
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      category: "Технологии"
    },
    {
      title: "Омниканальность: как объединить все каналы продаж",
      description: "Клиенты пишут в WhatsApp, звонят, заполняют формы на сайте. Как не потерять ни одного обращения и выстроить единую коммуникацию.",
      fullContent: `
        <h2>Единое пространство коммуникаций</h2>
        <p>В 2025 году клиенты ожидают мгновенных ответов в любом удобном канале. Telegram, WhatsApp, email, звонки — всё должно работать как единый механизм.</p>
        
        <h3>Преимущества омниканального подхода:</h3>
        <ul>
          <li>Клиент видит историю общения во всех каналах</li>
          <li>Менеджер отвечает из одного окна</li>
          <li>Автоматическое распределение обращений</li>
          <li>Единая база знаний и скрипты продаж</li>
        </ul>

        <blockquote>
          «После внедрения омниканальности наше время ответа сократилось с 2 часов до 5 минут. Конверсия в продажу выросла на 35%.» — Антон Петров, директор по продажам
        </blockquote>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 10, 5).toISOString(),
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
      category: "Продажи"
    },
    {
      title: "Бизнес-процессы без программиста: визуальный конструктор",
      description: "Создавайте сложные автоматизации методом drag-and-drop. Роботы, триггеры, условия — всё в визуальном редакторе.",
      fullContent: `
        <h2>No-code автоматизация</h2>
        <p>Времена, когда для настройки автоматизации нужен был программист, прошли. Современные платформы позволяют строить сложные сценарии визуально.</p>
        
        <h3>Что можно автоматизировать:</h3>
        <ul>
          <li>Обработка заявок с сайта</li>
          <li>Автоматическое создание задач</li>
          <li>Отправка документов на подпись</li>
          <li>Уведомления в мессенджеры</li>
          <li>Формирование отчётов</li>
        </ul>

        <p>В среднем компания экономит 15-20 часов в неделю на рутинных операциях после настройки автоматизации.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 10, 3).toISOString(),
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      category: "Автоматизация"
    },
    {
      title: "Мобильный офис: работа из любой точки мира",
      description: "Как организовать эффективную работу команды, когда сотрудники в разных городах и часовых поясах.",
      fullContent: `
        <h2>Распределённая команда — новая норма</h2>
        <p>Удалённая работа стала стандартом. Но как управлять командой, когда все в разных местах?</p>
        
        <h3>Инструменты для удалённой работы:</h3>
        <ul>
          <li>Видеоконференции и скриншеринг</li>
          <li>Общие задачи и календари</li>
          <li>Совместная работа над документами</li>
          <li>Учёт рабочего времени</li>
          <li>Корпоративный чат</li>
        </ul>

        <p>Правильные инструменты позволяют распределённой команде работать даже эффективнее офисной.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 10, 1).toISOString(),
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      category: "Управление"
    },
    {
      title: "Аналитика продаж: как принимать решения на основе данных",
      description: "Воронки, когорты, RFM-анализ — разбираем инструменты, которые помогают понять, что происходит с продажами.",
      fullContent: `
        <h2>Data-driven подход к продажам</h2>
        <p>Интуиция — хорошо, но данные — лучше. Современная аналитика показывает не только что произошло, но и почему.</p>
        
        <h3>Ключевые метрики:</h3>
        <ul>
          <li><strong>Конверсия по этапам</strong> — где теряются клиенты</li>
          <li><strong>Средний чек и LTV</strong> — сколько приносит клиент</li>
          <li><strong>Скорость сделки</strong> — как быстро закрываем</li>
          <li><strong>Эффективность менеджеров</strong> — кто лучший продавец</li>
        </ul>

        <p>Компании, использующие аналитику, увеличивают выручку на 20-30% без роста бюджета на маркетинг.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 9, 29).toISOString(),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      category: "Аналитика"
    },
    {
      title: "Безопасность данных: как защитить информацию клиентов",
      description: "GDPR, персональные данные, шифрование — что нужно знать о защите данных в облачных CRM-системах.",
      fullContent: `
        <h2>Безопасность превыше всего</h2>
        <p>Утечка данных клиентов может стоить компании репутации и миллионов рублей штрафов. Как защититься?</p>
        
        <h3>Основы безопасности:</h3>
        <ul>
          <li>Двухфакторная аутентификация для всех</li>
          <li>Шифрование данных при передаче и хранении</li>
          <li>Регулярные бэкапы</li>
          <li>Контроль прав доступа</li>
          <li>Аудит действий пользователей</li>
        </ul>

        <p>Современные облачные платформы обеспечивают уровень защиты, недоступный для локальных решений.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 9, 25).toISOString(),
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      category: "Безопасность"
    },
    {
      title: "Интеграция с 1С: синхронизация без головной боли",
      description: "Как настроить двустороннюю синхронизацию товаров, заказов и контрагентов между CRM и учётной системой.",
      fullContent: `
        <h2>CRM + 1С = идеальная пара</h2>
        <p>CRM для продаж, 1С для учёта. Но данные должны синхронизироваться автоматически, без ручного переноса.</p>
        
        <h3>Что синхронизируется:</h3>
        <ul>
          <li>Контрагенты и контактные лица</li>
          <li>Номенклатура и остатки товаров</li>
          <li>Заказы и счета</li>
          <li>Оплаты и отгрузки</li>
          <li>Акты и закрывающие документы</li>
        </ul>

        <p>Правильная интеграция экономит 10-15 часов в неделю на ручном переносе данных и исключает ошибки.</p>
      `,
      link: "https://www.bitrix24.ru/",
      pubDate: new Date(2025, 9, 21).toISOString(),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      category: "Интеграции"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    if (diffDays < 7) return `${diffDays} дней назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} недель назад`;
    
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long"
    });
  };

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNews(item);
    setModalOpen(true);
  };

  const categories = ["Все", ...Array.from(new Set(news.map(item => item.category).filter(Boolean)))] as string[];

  const filteredNews = activeCategory === "Все" 
    ? news 
    : news.filter(item => item.category === activeCategory);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "Технологии": return "Cpu";
      case "Продажи": return "TrendingUp";
      case "Автоматизация": return "Zap";
      case "Управление": return "Users";
      case "Аналитика": return "BarChart3";
      case "Безопасность": return "Shield";
      case "Интеграции": return "Network";
      default: return "FileText";
    }
  };

  const getCategoryFallbackImage = (category?: string) => {
    switch (category) {
      case "Технологии": return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80";
      case "Продажи": return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";
      case "Автоматизация": return "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80";
      case "Управление": return "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";
      case "Аналитика": return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
      case "Безопасность": return "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80";
      case "Интеграции": return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
      default: return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80";
    }
  };

  return (
    <>
      <section
        ref={ref}
        id="news"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-[1460px] mx-auto">
          <h2
            className={`font-heading font-bold text-4xl md:text-5xl text-center mb-4 ${
              isVisible ? "animate-scroll-in" : "opacity-0"
            }`}
          >
            Новости и статьи
          </h2>
          <p
            className={`text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto ${
              isVisible ? "animate-scroll-in-delay-1" : "opacity-0"
            }`}
          >
            Актуальные материалы о бизнес-автоматизации, CRM и digital-трансформации
          </p>

          <div
            className={`flex flex-wrap justify-center gap-2 mb-12 ${
              isVisible ? "animate-scroll-in-delay-1" : "opacity-0"
            }`}
          >
            {categories.map((category) => {
              const count = category === "Все" 
                ? news.length 
                : news.filter(item => item.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {category}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category
                      ? "bg-white/20"
                      : "bg-gray-200"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNews.slice(0, 7).map((item, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-white ${
                    isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
                  } ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                  onClick={() => handleNewsClick(item)}
                >
                  <div className={`relative overflow-hidden ${index === 0 ? "h-96" : "h-48"} bg-gradient-to-br from-blue-50 to-purple-50`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                    {item.category && (
                      <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 shadow-lg">
                        {item.category}
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 text-xs mb-2 opacity-90">
                        <Icon name="Calendar" size={14} />
                        <span>{formatDate(item.pubDate)}</span>
                      </div>
                      <h3 className={`font-bold mb-2 line-clamp-2 ${index === 0 ? "text-2xl" : "text-lg"}`}>
                        {item.title}
                      </h3>
                      {index === 0 && (
                        <p className="text-sm opacity-90 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {index !== 0 && (
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Читать далее</span>
                        <Icon 
                          name="ArrowRight" 
                          size={16} 
                          className="group-hover:translate-x-1 transition-transform" 
                        />
                      </div>
                    </CardContent>
                  )}
                  
                  {index === 0 && (
                    <div className="absolute bottom-6 right-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                        <span>Читать</span>
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        news={selectedNews}
      />
    </>
  );
};

export default NewsSection;