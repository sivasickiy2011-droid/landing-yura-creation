import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import IntegrationModal from "@/components/IntegrationModal";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const IntegrationSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(10);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const integrationTypes = [
    {
      icon: "Database",
      title: "1С",
      description: "Интеграция с 1С для синхронизации данных и автоматизации учета"
    },
    {
      icon: "MessageCircle",
      title: "Мессенджеры",
      description: "WhatsApp, Telegram, Viber для связи с клиентами"
    },
    {
      icon: "Globe",
      title: "Сайты",
      description: "Интеграция форм и виджетов на ваш сайт"
    },
    {
      icon: "Smartphone",
      title: "Telegram App",
      description: "Разработка ботов и мини-приложений в Telegram"
    }
  ];

  const services = [
    {
      id: "audit",
      name: "Аудит текущих процессов",
      price: 25000,
      days: 3,
      description: "Анализ существующих бизнес-процессов и подготовка рекомендаций"
    },
    {
      id: "crm-setup",
      name: "Настройка CRM",
      price: 45000,
      days: 5,
      description: "Настройка воронок продаж, полей, автоматизации"
    },
    {
      id: "integration-1c",
      name: "Интеграция с 1С",
      price: 65000,
      days: 7,
      description: "Двусторонняя синхронизация товаров, заказов и контрагентов"
    },
    {
      id: "integration-messengers",
      name: "Подключение мессенджеров",
      price: 35000,
      days: 4,
      description: "WhatsApp, Telegram, Viber - приём обращений и чат-боты"
    },
    {
      id: "telephony",
      name: "IP-телефония",
      price: 40000,
      days: 3,
      description: "Интеграция АТС, запись звонков, статистика"
    },
    {
      id: "site-forms",
      name: "Формы захвата с сайта",
      price: 30000,
      days: 3,
      description: "CRM-формы, веб-виджеты, онлайн-чат"
    },
    {
      id: "automation",
      name: "Бизнес-процессы",
      price: 55000,
      days: 6,
      description: "Автоматизация рутинных операций через роботов и триггеры"
    },
    {
      id: "analytics",
      name: "Аналитика и отчёты",
      price: 35000,
      days: 4,
      description: "Дашборды, KPI, воронки продаж, BI-аналитика"
    },
    {
      id: "training",
      name: "Обучение сотрудников",
      price: 25000,
      days: 2,
      description: "Онлайн и офлайн обучение работе в системе"
    },
    {
      id: "support",
      name: "Техподдержка (3 мес)",
      price: 45000,
      days: 0,
      description: "Помощь в решении вопросов после запуска"
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const userSetupCost = users * 800;

  const calculateTotalCost = () => {
    const servicesCost = services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0);
    
    return servicesCost + userSetupCost;
  };

  const calculateTotalDays = () => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.days, 0);
  };

  const calculateWeeks = () => {
    const days = calculateTotalDays();
    return Math.ceil(days / 5);
  };

  return (
    <>
      <section
        ref={ref}
        id="integration"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-[1460px] mx-auto">
          <h2
            className={`font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-3 sm:mb-4 ${
              isVisible ? "animate-scroll-in" : "opacity-0"
            }`}
          >
            Внедрение и интеграции
          </h2>
          <p
            className={`text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto px-2 ${
              isVisible ? "animate-scroll-in-delay-1" : "opacity-0"
            }`}
          >
            Комплексное внедрение Bitrix24 под ключ. От аудита и настройки до обучения персонала и технической поддержки.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div
              className={`${
                isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
              }`}
            >
              <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-900">
                Типовые интеграции
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {integrationTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <Icon name={type.icon as any} size={20} className="sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">
                        {type.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                    <Icon name="CheckCircle2" size={20} className="sm:w-6 sm:h-6 text-green-600" />
                    Гарантии и поддержка
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <Icon name="Check" size={14} className="sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Соблюдение сроков внедрения по договору</span>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <Icon name="Check" size={14} className="sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Бесплатные доработки в течение гарантийного периода</span>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <Icon name="Check" size={14} className="sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Документация и видеоинструкции по работе</span>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <Icon name="Check" size={14} className="sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Техническая поддержка после запуска</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div
              className={`${
                isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
              }`}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 text-gray-900">
                    Калькулятор внедрения
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-6">
                    <p className="text-[10px] sm:text-xs text-amber-800 flex items-start gap-1.5 sm:gap-2">
                      <Icon name="Info" size={12} className="sm:w-3.5 sm:h-3.5 mt-0.5 flex-shrink-0" />
                      <span>
                        Указаны средние цены для ориентировочного расчёта. 
                        Для получения персонального коммерческого предложения заполните анкету.
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <label className="text-sm sm:text-base text-gray-700 font-medium">
                          Количество сотрудников
                        </label>
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">
                          {users}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={users}
                        onChange={(e) => setUsers(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        Настройка рабочих мест: {userSetupCost.toLocaleString()} ₽
                      </div>
                    </div>

                    <div className="border-t pt-3 sm:pt-4">
                      <Label className="font-medium text-sm sm:text-base text-gray-700 mb-2 sm:mb-3 block">
                        Выберите необходимые услуги:
                      </Label>
                      <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1 sm:pr-2">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors"
                          >
                            <Checkbox
                              id={service.id}
                              checked={selectedServices.includes(service.id)}
                              onCheckedChange={() => handleServiceToggle(service.id)}
                              className="mt-0.5 sm:mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <Label
                                htmlFor={service.id}
                                className="font-medium text-xs sm:text-sm cursor-pointer block"
                              >
                                {service.name}
                              </Label>
                              <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 leading-snug">
                                {service.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-[10px] sm:text-xs text-gray-500">
                                <span className="font-semibold text-blue-600">
                                  {service.price.toLocaleString()} ₽
                                </span>
                                {service.days > 0 && (
                                  <span className="flex items-center gap-0.5 sm:gap-1">
                                    <Icon name="Clock" size={10} className="sm:w-3 sm:h-3" />
                                    {service.days} дн.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-blue-300">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="text-gray-600">Выбрано услуг:</span>
                          <span className="font-semibold">
                            {selectedServices.length} из {services.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="text-gray-600">Срок внедрения:</span>
                          <span className="font-semibold">
                            {calculateWeeks()} недель ({calculateTotalDays()} дней)
                          </span>
                        </div>
                        <div className="border-t-2 border-gray-200 pt-2 sm:pt-3">
                          <div className="flex justify-between items-center mb-1.5 sm:mb-2 gap-2">
                            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                              Общая стоимость:
                            </span>
                            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                              {calculateTotalCost().toLocaleString()} ₽
                            </span>
                          </div>
                          {selectedServices.length > 0 && (
                            <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                              <Icon name="AlertCircle" size={10} className="sm:w-3 sm:h-3 flex-shrink-0" />
                              <span>Ориентировочная стоимость по среднему чеку</span>
                            </p>
                          )}
                        </div>
                        {selectedServices.length === 0 && (
                          <p className="text-[10px] sm:text-xs text-gray-500 text-center pt-2">
                            Выберите услуги для расчёта стоимости
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Button
                        onClick={() => setModalOpen(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 sm:py-5 md:py-6 rounded-full font-semibold shadow-lg text-sm sm:text-base md:text-lg"
                      >
                        Заполнить анкету на внедрение
                      </Button>
                      <p className="text-[10px] sm:text-xs text-center text-gray-500">
                        Получите индивидуальное КП с учётом вашей специфики
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div
            className={`bg-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center ${
              isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
            }`}
          >
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
              Бесплатная консультация по внедрению
            </h3>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Проанализируем ваши задачи, подберём оптимальный набор инструментов 
              и составим персональный план автоматизации бизнеса
            </p>
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-4 sm:py-5 md:py-6 rounded-full font-semibold shadow-lg text-sm sm:text-base md:text-lg"
            >
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      <IntegrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        calculatedCost={calculateTotalCost()}
        users={users}
        integrations={selectedServices.length}
      />
    </>
  );
};

export default IntegrationSection;