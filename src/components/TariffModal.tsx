import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { executeRecaptcha } from "@/utils/recaptcha";

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariffName: string;
  billingPeriod?: 'month' | 'year';
}

const TariffModal = ({ isOpen, onClose, tariffName, billingPeriod = 'month' }: TariffModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const recaptchaToken = await executeRecaptcha('submit_tariff_form');

      const periodText = billingPeriod === 'year' ? '12 месяцев' : '6 месяцев';
      const formPayload = {
        ...formData,
        tariff: tariffName,
        billingPeriod: periodText,
        recaptchaToken
      };

      // Send to Telegram
      const telegramResponse = await fetch('https://functions.poehali.dev/95830b61-9b82-45e6-b96c-bcb5ef3bbf7b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
      });

      // Send to Bitrix24
      const bitrixResponse = await fetch('https://functions.poehali.dev/fb7f05cf-e9c2-467c-af4d-e76a9081a605', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
      });

      if (telegramResponse.ok || bitrixResponse.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({ name: "", phone: "", email: "", company: "", message: "", consent: false });
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Icon name="X" size={24} className="text-gray-500" />
        </button>

        <div className="p-8">
          <h3 className="font-heading font-bold text-2xl mb-2 text-gray-900">
            Заявка на тариф: {tariffName}
          </h3>
          <p className="text-gray-600 mb-6">
            Заполните форму, и мы свяжемся с вами в ближайшее время
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              placeholder="ФИО *"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-gray-50 border-gray-200 rounded-2xl px-4 py-6"
            />

            <Input
              required
              type="tel"
              placeholder="Телефон *"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-gray-50 border-gray-200 rounded-2xl px-4 py-6"
            />

            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-gray-50 border-gray-200 rounded-2xl px-4 py-6"
            />

            <Input
              placeholder="Организация"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="bg-gray-50 border-gray-200 rounded-2xl px-4 py-6"
            />

            <Textarea
              placeholder="Комментарий"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="bg-gray-50 border-gray-200 rounded-2xl px-4 py-4 min-h-[100px] resize-none"
            />

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="modal-consent"
                checked={formData.consent}
                onCheckedChange={(checked) => handleChange("consent", checked as boolean)}
                className="mt-1"
                required
              />
              <label htmlFor="modal-consent" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                Я даю согласие на обработку персональных данных в соответствии с{' '}
                <a 
                  href="/privacy"
                  className="text-blue-600 hover:underline"
                >
                  Политикой конфиденциальности
                </a>
                {' '}(обязательно)
              </label>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-2">
                <Icon name="CheckCircle" size={20} />
                <span>Заявка успешно отправлена!</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 text-red-700 p-4 rounded-2xl flex items-center gap-2">
                <Icon name="AlertCircle" size={20} />
                <span>Ошибка отправки. Попробуйте позже.</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TariffModal;