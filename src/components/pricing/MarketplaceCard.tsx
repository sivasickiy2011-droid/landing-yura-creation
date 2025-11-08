import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface MarketplaceCardProps {
  billingPeriod: "month" | "year";
  loading: boolean;
  priceMonth: string;
  priceYear: string;
  isVisible: boolean;
  onSelectMarketplace: () => void;
}

const MarketplaceCard = ({
  billingPeriod,
  loading,
  priceMonth,
  priceYear,
  isVisible,
  onSelectMarketplace
}: MarketplaceCardProps) => {
  return (
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
                        ₽{billingPeriod === "month" ? priceMonth : priceYear}
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
                onClick={onSelectMarketplace}
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
  );
};

export default MarketplaceCard;
