import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import IntegrationModal from "@/components/IntegrationModal";

const IntegrationSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState(10);
  const [integrations, setIntegrations] = useState(2);

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

  const baseCost = 15000;
  const userCost = 500;
  const integrationCost = 8000;
  
  const calculateCost = () => {
    return baseCost + (users * userCost) + (integrations * integrationCost);
  };

  return (
    <>
      <section
        ref={ref}
        id="integration"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-[1460px] mx-auto">
          <h2
            className={`font-heading font-bold text-4xl md:text-5xl text-center mb-4 ${
              isVisible ? "animate-scroll-in" : "opacity-0"
            }`}
          >
            Внедрение и интеграции
          </h2>
          <p
            className={`text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto ${
              isVisible ? "animate-scroll-in-delay-1" : "opacity-0"
            }`}
          >
            Мы поможем настроить и интегрировать ваш Bitrix24 с любыми сервисами. 
            Полный цикл внедрения от анализа до обучения сотрудников.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div
              className={`${
                isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
              }`}
            >
              <h3 className="font-bold text-2xl mb-6 text-gray-900">
                Виды интеграций
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {integrationTypes.map((type, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Icon name={type.icon as any} size={24} className="text-blue-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-2 text-gray-900">
                        {type.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div
              className={`${
                isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
              }`}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="font-bold text-2xl mb-6 text-gray-900">
                    Калькулятор стоимости
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-gray-700 font-medium">
                          Количество пользователей
                        </label>
                        <span className="text-2xl font-bold text-blue-600">
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
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-gray-700 font-medium">
                          Количество интеграций
                        </label>
                        <span className="text-2xl font-bold text-blue-600">
                          {integrations}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={integrations}
                        onChange={(e) => setIntegrations(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="bg-white rounded-2xl p-6 mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Базовое внедрение</span>
                        <span className="font-semibold">
                          {baseCost.toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">
                          Настройка пользователей
                        </span>
                        <span className="font-semibold">
                          {(users * userCost).toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Интеграции</span>
                        <span className="font-semibold">
                          {(integrations * integrationCost).toLocaleString()} ₽
                        </span>
                      </div>
                      <div className="border-t-2 border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">
                            Итого:
                          </span>
                          <span className="text-3xl font-bold text-blue-600">
                            {calculateCost().toLocaleString()} ₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setModalOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-full font-semibold shadow-lg text-lg"
                    >
                      Заполнить анкету на внедрение
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div
            className={`bg-blue-600 rounded-3xl p-8 md:p-12 text-center ${
              isVisible ? "animate-scroll-in-delay-2" : "opacity-0"
            }`}
          >
            <h3 className="font-bold text-3xl md:text-4xl text-white mb-4">
              Готовы начать цифровую трансформацию?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Наши эксперты проведут бесплатный аудит ваших бизнес-процессов 
              и предложат оптимальное решение для автоматизации
            </p>
            <Button
              onClick={() => setModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 rounded-full font-semibold shadow-lg text-lg"
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </section>

      <IntegrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        calculatedCost={calculateCost()}
        users={users}
        integrations={integrations}
      />
    </>
  );
};

export default IntegrationSection;
