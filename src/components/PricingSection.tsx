import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import TariffModal from "@/components/TariffModal";
import BillingPeriodToggle from "@/components/pricing/BillingPeriodToggle";
import PricingCard from "@/components/pricing/PricingCard";

interface PriceData {
  tariffs: Array<{
    name: string;
    priceMonth: string;
    priceYear: string;
    marketplaceMonth: string;
    marketplaceYear: string;
  }>;
  marketplace: {
    note?: string;
  };
}

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");
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

  const getPriceForPlan = (planName: string, period: 'month' | 'year', priceType: 'tariff' | 'marketplace' = 'tariff') => {
    if (!prices) {
      const defaults: Record<string, {month: string, year: string, marketMonth: string, marketYear: string}> = {
        'Бесплатный': {month: '0', year: '0', marketMonth: '0', marketYear: '0'},
        'Базовый': {month: '2 490', year: '1 990', marketMonth: '1 990', marketYear: '1 590'},
        'Стандартный': {month: '6 990', year: '5 990', marketMonth: '2 490', marketYear: '1 990'},
        'Профессиональный': {month: '13 990', year: '11 990', marketMonth: '2 990', marketYear: '2 490'}
      };
      if (priceType === 'marketplace') {
        return defaults[planName]?.[period === 'month' ? 'marketMonth' : 'marketYear'] || '0';
      }
      return defaults[planName]?.[period] || '0';
    }
    
    const tariff = prices.tariffs.find(t => 
      t.name === planName || 
      (planName === 'ПРО' && t.name === 'Профессиональный')
    );
    
    if (!tariff) return '0';
    
    let price: string;
    if (priceType === 'marketplace') {
      price = period === 'month' ? tariff.marketplaceMonth : tariff.marketplaceYear;
    } else {
      price = period === 'month' ? tariff.priceMonth : tariff.priceYear;
    }
    return price.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  };

  const plans = [
    {
      name: "Бесплатный",
      priceMonth: getPriceForPlan('Бесплатный', 'month'),
      priceYear: getPriceForPlan('Бесплатный', 'year'),
      marketplaceMonth: getPriceForPlan('Бесплатный', 'month', 'marketplace'),
      marketplaceYear: getPriceForPlan('Бесплатный', 'year', 'marketplace'),
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
      marketplaceMonth: getPriceForPlan('Базовый', 'month', 'marketplace'),
      marketplaceYear: getPriceForPlan('Базовый', 'year', 'marketplace'),
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
      marketplaceMonth: getPriceForPlan('Стандартный', 'month', 'marketplace'),
      marketplaceYear: getPriceForPlan('Стандартный', 'year', 'marketplace'),
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
      marketplaceMonth: getPriceForPlan('Профессиональный', 'month', 'marketplace'),
      marketplaceYear: getPriceForPlan('Профессиональный', 'year', 'marketplace'),
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

  const handleSelectTariff = (tariffName: string) => {
    setSelectedTariff(tariffName);
    setModalOpen(true);
  };

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

        <BillingPeriodToggle
          billingPeriod={billingPeriod}
          onToggle={setBillingPeriod}
          isVisible={isVisible}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto items-start">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              billingPeriod={billingPeriod}
              isVisible={isVisible}
              onSelectTariff={handleSelectTariff}
            />
          ))}
        </div>

        <div className={`mt-12 text-center ${isVisible ? "animate-scroll-in-delay-3" : "opacity-0"}`}>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-purple-600">Маркетплейс</span> — дополнительная подписка для доступа к 1000+ приложениям
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Цена зависит от выбранного тарифа • Бесплатные тарифы без подписки Маркетплейс
          </p>
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