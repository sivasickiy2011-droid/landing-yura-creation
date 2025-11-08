import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import TariffModal from "@/components/TariffModal";

interface PriceData {
  tariffs: Array<{
    name: string;
    priceMonth: string;
    priceYear: string;
  }>;
  marketplace: {
    priceMonth: string;
    priceYear: string;
  };
}

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedMobileCard, setExpandedMobileCard] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState("");
  const [prices, setPrices] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/3c9a518f-7dbb-40b0-9319-25d60020adde', {
          cache: 'no-store'
        });
        const data = await response.json();
        
        if (data.success) {
          setPrices({
            tariffs: data.tariffs,
            marketplace: data.marketplace
          });
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPriceForPlan = (planName: string, period: 'month' | 'year') => {
    if (!prices) {
      const defaults: Record<string, {month: string, year: string}> = {
        'Бесплатный': {month: '0', year: '0'},
        'Базовый': {month: '2 490', year: '1 990'},
        'Стандартный': {month: '6 990', year: '5 990'},
        'Профессиональный': {month: '13 990', year: '11 990'}
      };
      return defaults[planName]?.[period] || '0';
    }
    
    const tariff = prices.tariffs.find(t => 
      t.name === planName || 
      (planName === 'ПРО' && t.name === 'Профессиональный')
    );
    
    if (!tariff) return '0';
    
    const price = period === 'month' ? tariff.priceMonth : tariff.priceYear;
    return price.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  };

  const plans = [
    {
      name: "Бесплатный",
      priceMonth: getPriceForPlan('Бесплатный', 'month'),
      priceYear: getPriceForPlan('Бесплатный', 'year'),
      description: "Для малых команд до 5 человек",
      iconUrl: "https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png",
      features: [
        "До 5 пользователей",
        "5 ГБ в облаке",
        "CRM: воронка продаж, компании, контакты",
        "Задачи и проекты: канбан, список, календарь",
        "Чаты, видеозвонки до 4 участников",
        "Диск и документы онлайн",
        "Лента новостей компании",
        "Календарь событий",
        "База знаний",
        "Мобильное приложение",
      ],
      isFree: true,
    },
    {
      name: "Базовый",
      priceMonth: getPriceForPlan('Базовый', 'month'),
      priceYear: getPriceForPlan('Базовый', 'year'),
      description: "Для небольших команд",
      iconUrl: "https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png",
      features: [
        "До 5 пользователей",
        "24 ГБ в облаке",
        "CRM + лидогенерация через формы",
        "Автоматизация продаж (роботы)",
        "Задачи и проекты с диаграммой Ганта",
        "Контакт-центр: email, телефония",
        "Конструктор сайтов и магазинов",
        "Видеозвонки до 24 участников",
        "Онлайн-документы и совместная работа",
        "CRM-аналитика и отчеты",
        "Интеграция с 1С",
        "Техподдержка 24/7",
      ],
    },
    {
      name: "Стандартный",
      priceMonth: getPriceForPlan('Стандартный', 'month'),
      priceYear: getPriceForPlan('Стандартный', 'year'),
      popular: true,
      description: "Для растущих команд",
      iconUrl: "https://cdn.poehali.dev/files/1b090d13-b2ec-475c-878e-365c87d5995b.png",
      features: [
        "До 50 пользователей",
        "100 ГБ в облаке",
        "CRM + автоматизация + аналитика BI",
        "Интернет-магазин с приёмом оплаты",
        "Маркетинг: рассылки, сегментация, триггеры",
        "Продажи через соцсети и мессенджеры",
        "HR и рекрутинг: вакансии, резюме",
        "Видеозвонки до 48 участников",
        "Бизнес-процессы и автоматизация",
        "Права доступа и роли",
        "Отчёты по сотрудникам",
        "Интеграция с сервисами",
        "Техподдержка с приоритетом",
      ],
    },
    {
      name: "ПРО",
      nameSmall: "фессиональный",
      priceMonth: getPriceForPlan('Профессиональный', 'month'),
      priceYear: getPriceForPlan('Профессиональный', 'year'),
      description: "Для больших команд",
      iconUrl: "https://cdn.poehali.dev/files/2787cc67-c2c0-4231-879e-512d039dbb98.png",
      features: [
        "До 100 пользователей",
        "1 ТБ в облаке",
        "Все возможности Стандартного",
        "Расширенная CRM-аналитика",
        "Скрипты продаж и контроль качества",
        "Бизнес-процессы любой сложности",
        "Продажи через мессенджеры (WhatsApp, Telegram)",
        "Видеозвонки до 102 участников",
        "Аналитика и BI-конструктор",
        "Администрирование и безопасность",
        "Управление структурой компании",
        "API и веб-хуки для интеграций",
        "Персональный менеджер поддержки",
      ],
    },
  ];

  return (
    <section
      ref={ref}
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-[1460px] mx-auto">
        <h2
          className={`font-heading font-bold text-4xl md:text-5xl text-center mb-4 ${isVisible ? "animate-scroll-in" : "opacity-0"}`}
        >
          Тарифы
        </h2>
        <p
          className={`text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto ${isVisible ? "animate-scroll-in-delay-1" : "opacity-0"}`}
        >
          Выберите оптимальный план для вашего бизнеса
        </p>

        <div
          className={`flex justify-center mb-12 ${isVisible ? "animate-scroll-in-delay-1" : "opacity-0"}`}
        >
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod("month")}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                billingPeriod === "month"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              На месяц
            </button>
            <button
              onClick={() => setBillingPeriod("year")}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                billingPeriod === "year"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span className="hidden sm:inline">На год</span>
              <span className="sm:hidden">Год</span>
              <span className="ml-1 sm:ml-2 text-xs bg-green-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto items-start">
          {plans.map((plan, index) => {
            const isHovered = hoveredCard === index;
            const isMobileExpanded = expandedMobileCard === index;
            const displayedFeaturesDesktop = isHovered
              ? plan.features
              : plan.features.slice(0, 5);
            const displayedFeaturesMobile = plan.features.slice(0, 5);
            const remainingFeaturesMobile = plan.features.slice(5);

            return (
              <Card
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative overflow-visible ${isVisible ? "animate-scroll-in-delay-2" : "opacity-0"} ${
                  plan.popular
                    ? "border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-xl"
                    : "border border-gray-200 bg-white shadow-md"
                } md:hover:shadow-2xl transition-all duration-300 rounded-3xl ${
                  isHovered ? "md:scale-110 md:z-10" : "scale-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Рекомендуем
                  </div>
                )}
                <CardContent className="p-8 pt-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 flex items-center justify-center">
                      <img src={plan.iconUrl} alt={plan.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-3xl mb-3 text-gray-900">
                    {plan.name}
                    {'nameSmall' in plan && <span className="text-base font-normal">{plan.nameSmall}</span>}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    {plan.isFree ? (
                      <>
                        <span className="text-5xl font-heading font-bold text-gray-900">
                          ₽0
                        </span>
                        <span className="text-gray-400 text-base ml-2">
                          /месяц
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl font-heading font-bold text-gray-900">
                          ₽
                          {billingPeriod === "month"
                            ? plan.priceMonth
                            : plan.priceYear}
                        </span>
                        <span className="text-gray-400 text-base ml-2">
                          /месяц
                        </span>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedTariff(plan.name);
                      setModalOpen(true);
                    }}
                    className={`w-full py-4 rounded-2xl font-semibold mb-8 text-sm uppercase tracking-wide ${
                      plan.popular
                        ? "bg-blue-100 hover:bg-blue-200 text-gray-800"
                        : "bg-blue-50 hover:bg-blue-100 text-gray-800"
                    }`}
                  >
                    Выбрать тариф
                  </Button>

                  {/* Desktop: показываем с hover-эффектом */}
                  <ul className="space-y-4 hidden md:block">
                    {displayedFeaturesDesktop.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {!isHovered && plan.features.length > 5 && (
                      <li className="flex items-center gap-2 pt-2">
                        <Icon
                          name="ChevronDown"
                          size={16}
                          className="text-gray-400"
                        />
                        <span className="text-xs text-gray-400 italic">
                          Ещё {plan.features.length - 5} возможностей
                        </span>
                      </li>
                    )}
                  </ul>

                  {/* Mobile: первые 5 + слайдер остальных */}
                  <div className="md:hidden">
                    <ul className="space-y-4 mb-4">
                      {displayedFeaturesMobile.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon name="Check" size={14} className="text-white" />
                          </div>
                          <span className="text-sm text-gray-600 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {remainingFeaturesMobile.length > 0 && (
                      <div>
                        <button
                          onClick={() => setExpandedMobileCard(isMobileExpanded ? null : index)}
                          className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-3"
                        >
                          <Icon 
                            name={isMobileExpanded ? "ChevronUp" : "ChevronDown"} 
                            size={16} 
                          />
                          {isMobileExpanded ? 'Скрыть' : `Ещё ${remainingFeaturesMobile.length} возможностей`}
                        </button>
                        
                        {isMobileExpanded && (
                          <ul className="space-y-4 animate-fade-in">
                            {remainingFeaturesMobile.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Icon name="Check" size={14} className="text-white" />
                                </div>
                                <span className="text-sm text-gray-600 leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Битрикс24 Маркетплейс */}
        <div className={`mt-16 ${isVisible ? "animate-scroll-in-delay-3" : "opacity-0"}`}>
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-3xl md:text-4xl mb-3 text-gray-900">
              Битрикс24 Маркетплейс
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Расширьте возможности вашего Битрикс24 готовыми решениями от проверенных разработчиков
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-2 border-purple-300 bg-gradient-to-br from-purple-50 via-white to-blue-50 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon name="ShoppingBag" size={32} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-2xl text-gray-900">
                        Подписка Маркетплейс
                      </h4>
                      <p className="text-sm text-purple-600 font-semibold">
                        Неограниченный доступ ко всем приложениям
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Check" size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">1000+ готовых приложений и интеграций</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Check" size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Без дополнительных платежей</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Check" size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Обновления и поддержка включены</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Check" size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Отраслевые решения и инструменты</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-200">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <Icon name="Sparkles" size={16} />
                      <span>Экономия до 80%</span>
                    </div>
                    
                    {loading ? (
                      <div className="flex justify-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-2">
                          <span className="text-5xl font-heading font-bold text-gray-900">
                            ₽{prices ? 
                              (billingPeriod === "month" ? 
                                prices.marketplace.priceMonth.replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : 
                                prices.marketplace.priceYear.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                              ) : 
                              (billingPeriod === "month" ? "2 990" : "2 490")
                            }
                          </span>
                          <span className="text-gray-400 text-base ml-2">
                            /месяц
                          </span>
                        </div>
                        {billingPeriod === "year" && (
                          <div className="text-sm text-green-600 font-semibold">
                            При оплате за год
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedTariff("Маркетплейс");
                      setModalOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 rounded-2xl font-semibold text-base shadow-lg"
                  >
                    Подключить Маркетплейс
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Подписка активируется дополнительно к основному тарифу
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h5 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-purple-600" />
                  Популярные категории приложений:
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: "Database", text: "1С и учёт" },
                    { icon: "MessageSquare", text: "Мессенджеры" },
                    { icon: "BarChart3", text: "Аналитика" },
                    { icon: "FileText", text: "Документы" },
                    { icon: "ShoppingCart", text: "E-commerce" },
                    { icon: "Phone", text: "Телефония" },
                    { icon: "Mail", text: "Email" },
                    { icon: "Zap", text: "Автоматизация" },
                  ].map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                      <Icon name={cat.icon as any} size={16} className="text-purple-600" />
                      <span className="text-sm text-gray-700">{cat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TariffModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tariffName={selectedTariff}
      />
    </section>
  );
};

export default PricingSection;