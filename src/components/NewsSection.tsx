import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image?: string;
}

const NewsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        title: "Новые возможности CRM в 2024 году",
        description: "Обзор ключевых обновлений и функций, которые помогут автоматизировать ваш бизнес еще эффективнее.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png"
      },
      {
        title: "Интеграция с мессенджерами: полное руководство",
        description: "Как настроить автоматическую работу с клиентами через WhatsApp, Telegram и другие популярные мессенджеры.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/1b090d13-b2ec-475c-878e-365c87d5995b.png"
      },
      {
        title: "Автоматизация бизнес-процессов без программирования",
        description: "Создавайте сложные автоматизации с помощью визуального конструктора — быстро и без кода.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/2787cc67-c2c0-4231-879e-512d039dbb98.png"
      },
      {
        title: "Кейс: увеличение продаж на 40% за 3 месяца",
        description: "История успеха компании, которая внедрила CRM и автоматизировала отдел продаж.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png"
      },
      {
        title: "Управление проектами: лучшие практики 2024",
        description: "Советы по организации работы команды, планированию задач и контролю дедлайнов.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/1b090d13-b2ec-475c-878e-365c87d5995b.png"
      },
      {
        title: "Безопасность данных: что нужно знать каждому",
        description: "Как защитить информацию компании и клиентов при работе с облачными сервисами.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/2787cc67-c2c0-4231-879e-512d039dbb98.png"
      },
      {
        title: "Аналитика и отчеты: принимайте решения на основе данных",
        description: "Обзор инструментов бизнес-аналитики для мониторинга эффективности компании.",
        link: "https://www.bitrix24.ru/blogs/",
        pubDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        image: "https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png"
      }
    ];

    setNews(mockNews);
    setLoading(false);
  }, []);

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
      month: "long",
      year: "numeric"
    });
  };

  return (
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
          className={`text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto ${
            isVisible ? "animate-scroll-in-delay-1" : "opacity-0"
          }`}
        >
          Актуальные материалы о бизнес-автоматизации, CRM и digital-трансформации
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {news.slice(0, 7).map((item, index) => (
              <Card
                key={index}
                className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 ${
                  isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
                }`}
                onClick={() => window.open(item.link, "_blank")}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(item.pubDate)}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Читать далее</span>
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
