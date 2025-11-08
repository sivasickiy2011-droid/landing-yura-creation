import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

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
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Контактная информация</h3>

              <div>
                <Label htmlFor="companyName">
                  Название компании <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  placeholder="ООО «Ваша компания»"
                />
              </div>

              <div>
                <Label htmlFor="contactPerson">
                  Контактное лицо <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    handleInputChange("contactPerson", e.target.value)
                  }
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+7 (900) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Email {!formData.telegram && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@company.ru"
                />
              </div>

              <div>
                <Label htmlFor="telegram">
                  Telegram {!formData.email && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id="telegram"
                  value={formData.telegram}
                  onChange={(e) =>
                    handleInputChange("telegram", e.target.value)
                  }
                  placeholder="@username"
                />
              </div>

              <div>
                <Label>Предпочтительный способ связи</Label>
                <Select
                  value={formData.contactMethod}
                  onValueChange={(value) =>
                    handleInputChange("contactMethod", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Телефон</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">О вашей компании</h3>

              <div>
                <Label>
                  Отрасль <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    handleInputChange("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отрасль" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  Размер компании <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) =>
                    handleInputChange("companySize", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Количество сотрудников" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 сотрудников</SelectItem>
                    <SelectItem value="11-50">11-50 сотрудников</SelectItem>
                    <SelectItem value="51-100">51-100 сотрудников</SelectItem>
                    <SelectItem value="101-500">101-500 сотрудников</SelectItem>
                    <SelectItem value="500+">500+ сотрудников</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentCrm">Текущая CRM (если есть)</Label>
                <Input
                  id="currentCrm"
                  value={formData.currentCrm}
                  onChange={(e) =>
                    handleInputChange("currentCrm", e.target.value)
                  }
                  placeholder="amoCRM, Битрикс24, Excel и т.д."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasWebsite"
                  checked={formData.hasWebsite}
                  onCheckedChange={(checked) =>
                    handleInputChange("hasWebsite", checked)
                  }
                />
                <Label htmlFor="hasWebsite">У компании есть сайт</Label>
              </div>

              {formData.hasWebsite && (
                <div>
                  <Label htmlFor="website">Адрес сайта</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://example.com"
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Детали внедрения</h3>

              <div>
                <Label>Необходимые интеграции</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {integrationOptions.map((integration) => (
                    <div key={integration} className="flex items-center space-x-2">
                      <Checkbox
                        id={integration}
                        checked={formData.integrationNeeds.includes(
                          integration
                        )}
                        onCheckedChange={() =>
                          handleIntegrationToggle(integration)
                        }
                      />
                      <Label htmlFor={integration} className="font-normal">
                        {integration}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Планируемый бюджет</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите диапазон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">До 50 000 ₽</SelectItem>
                    <SelectItem value="50000-100000">50 000 - 100 000 ₽</SelectItem>
                    <SelectItem value="100000-300000">
                      100 000 - 300 000 ₽
                    </SelectItem>
                    <SelectItem value="300000+">Более 300 000 ₽</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Сроки внедрения</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) =>
                    handleInputChange("timeline", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Когда планируете начать?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Срочно (в течение недели)</SelectItem>
                    <SelectItem value="month">В течение месяца</SelectItem>
                    <SelectItem value="quarter">В течение квартала</SelectItem>
                    <SelectItem value="planning">Планируем, сроки гибкие</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mainGoals">Основные цели внедрения</Label>
                <Textarea
                  id="mainGoals"
                  value={formData.mainGoals}
                  onChange={(e) =>
                    handleInputChange("mainGoals", e.target.value)
                  }
                  placeholder="Автоматизация продаж, учет клиентов..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="description">
                  Дополнительная информация
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Расскажите подробнее о ваших задачах и пожеланиях..."
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Расчетная стоимость:</h4>
                <p className="text-3xl font-bold text-blue-600">
                  {calculatedCost.toLocaleString()} ₽
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {users} пользователей • {integrations} интеграции
                </p>
              </div>
            </div>
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