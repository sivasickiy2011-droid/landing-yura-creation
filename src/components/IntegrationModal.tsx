import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import IntegrationFormStep1 from "@/components/IntegrationFormStep1";
import IntegrationFormStep2 from "@/components/IntegrationFormStep2";
import IntegrationFormStep3 from "@/components/IntegrationFormStep3";

interface IntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calculatedCost: number;
  users: number;
  integrations: number;
}

const IntegrationModal = ({
  open,
  onOpenChange,
  calculatedCost,
  users,
  integrations,
}: IntegrationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    telegram: "",
    industry: "",
    companySize: "",
    currentCrm: "",
    integrationNeeds: [] as string[],
    budget: "",
    timeline: "",
    description: "",
    hasWebsite: false,
    website: "",
    mainGoals: "",
    contactMethod: "telegram",
  });

  const industries = [
    "Розничная торговля",
    "Оптовая торговля",
    "Производство",
    "IT и разработка",
    "Услуги и консалтинг",
    "Образование",
    "Медицина",
    "Недвижимость",
    "Финансы",
    "Другое",
  ];

  const integrationOptions = [
    "1С",
    "WhatsApp",
    "Telegram",
    "Viber",
    "Instagram",
    "Facebook",
    "Сайт",
    "Интернет-магазин",
    "Телефония",
    "Email-маркетинг",
    "Другое",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setFormData((prev) => {
      const needs = prev.integrationNeeds.includes(integration)
        ? prev.integrationNeeds.filter((i) => i !== integration)
        : [...prev.integrationNeeds, integration];
      return { ...prev, integrationNeeds: needs };
    });
  };

  const validateStep1 = () => {
    if (!formData.companyName || !formData.contactPerson) {
      toast({
        title: "Заполните обязательные поля",
        description: "Название компании и контактное лицо обязательны",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email && !formData.telegram) {
      toast({
        title: "Укажите способ связи",
        description: "Необходим email или Telegram для связи",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.industry || !formData.companySize) {
      toast({
        title: "Заполните обязательные поля",
        description: "Укажите отрасль и размер компании",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://functions.poehali.dev/c7e1adaa-c977-4f49-92b4-73e01ac10dbb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          calculatedCost,
          users,
          integrations,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Ошибка отправки");

      toast({
        title: "Анкета отправлена!",
        description:
          formData.contactMethod === "telegram"
            ? "Подтверждение отправлено в ваш Telegram"
            : "Подтверждение отправлено на вашу почту",
      });

      onOpenChange(false);
      setStep(1);
      setFormData({
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        telegram: "",
        industry: "",
        companySize: "",
        currentCrm: "",
        integrationNeeds: [],
        budget: "",
        timeline: "",
        description: "",
        hasWebsite: false,
        website: "",
        mainGoals: "",
        contactMethod: "telegram",
      });
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь с нами напрямую",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Анкета на внедрение Bitrix24
          </DialogTitle>
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <IntegrationFormStep1
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          {step === 2 && (
            <IntegrationFormStep2
              formData={formData}
              handleInputChange={handleInputChange}
              industries={industries}
            />
          )}

          {step === 3 && (
            <IntegrationFormStep3
              formData={formData}
              handleInputChange={handleInputChange}
              handleIntegrationToggle={handleIntegrationToggle}
              integrationOptions={integrationOptions}
              calculatedCost={calculatedCost}
              users={users}
              integrations={integrations}
            />
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} className="flex-1">
              Далее
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить анкету"
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationModal;
