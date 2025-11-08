import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface PricingCardProps {
  plan: {
    name: string;
    nameSmall?: string;
    priceMonth: string;
    priceYear: string;
    description: string;
    iconUrl: string;
    features: string[];
    isFree?: boolean;
    popular?: boolean;
  };
  index: number;
  billingPeriod: "month" | "year";
  isVisible: boolean;
  onSelectTariff: (tariffName: string) => void;
}

const PricingCard = ({ 
  plan, 
  index, 
  billingPeriod, 
  isVisible, 
  onSelectTariff 
}: PricingCardProps) => {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const [expandedMobile, setExpandedMobile] = useState<boolean>(false);

  const displayedFeaturesDesktop = hoveredCard
    ? plan.features
    : plan.features.slice(0, 5);
  const displayedFeaturesMobile = plan.features.slice(0, 5);
  const remainingFeaturesMobile = plan.features.slice(5);

  return (
    <Card
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
      className={`relative overflow-visible ${isVisible ? "animate-scroll-in-delay-2" : "opacity-0"} ${
        plan.popular
          ? "border-2 border-blue-300 bg-gradient-to-b from-blue-50 to-white shadow-xl"
          : "border border-gray-200 bg-white shadow-md"
      } md:hover:shadow-2xl transition-all duration-300 rounded-3xl ${
        hoveredCard ? "md:scale-110 md:z-10" : "scale-100"
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
          {plan.nameSmall && <span className="text-base font-normal">{plan.nameSmall}</span>}
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
          onClick={() => onSelectTariff(plan.name)}
          className={`w-full py-4 rounded-2xl font-semibold mb-8 text-sm uppercase tracking-wide ${
            plan.popular
              ? "bg-blue-100 hover:bg-blue-200 text-gray-800"
              : "bg-blue-50 hover:bg-blue-100 text-gray-800"
          }`}
        >
          Выбрать тариф
        </Button>

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
          {!hoveredCard && plan.features.length > 5 && (
            <li className="flex items-center gap-2 pt-2">
              <Icon name="Plus" size={16} className="text-blue-600" />
              <span className="text-sm text-blue-600 font-semibold">
                Ещё {plan.features.length - 5} возможностей
              </span>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <ul className="space-y-4">
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
            <div className="mt-4">
              <button
                onClick={() => setExpandedMobile(!expandedMobile)}
                className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-3"
              >
                <Icon 
                  name={expandedMobile ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
                {expandedMobile ? 'Скрыть' : `Ещё ${remainingFeaturesMobile.length} возможностей`}
              </button>
              
              {expandedMobile && (
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
};

export default PricingCard;
