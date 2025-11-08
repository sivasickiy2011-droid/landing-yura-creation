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

interface FormData {
  integrationNeeds: string[];
  budget: string;
  timeline: string;
  mainGoals: string;
  description: string;
}

interface IntegrationFormStep3Props {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  handleIntegrationToggle: (integration: string) => void;
  integrationOptions: string[];
  calculatedCost: number;
  users: number;
  integrations: number;
}

const IntegrationFormStep3 = ({
  formData,
  handleInputChange,
  handleIntegrationToggle,
  integrationOptions,
  calculatedCost,
  users,
  integrations,
}: IntegrationFormStep3Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Детали внедрения</h3>

      <div>
        <Label>Необходимые интеграции</Label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {integrationOptions.map((integration) => (
            <div key={integration} className="flex items-center space-x-2">
              <Checkbox
                id={integration}
                checked={formData.integrationNeeds.includes(integration)}
                onCheckedChange={() => handleIntegrationToggle(integration)}
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
            <SelectItem value="100000-300000">100 000 - 300 000 ₽</SelectItem>
            <SelectItem value="300000+">Более 300 000 ₽</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Сроки внедрения</Label>
        <Select
          value={formData.timeline}
          onValueChange={(value) => handleInputChange("timeline", value)}
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
          onChange={(e) => handleInputChange("mainGoals", e.target.value)}
          placeholder="Автоматизация продаж, учет клиентов..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="description">Дополнительная информация</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
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
  );
};

export default IntegrationFormStep3;
