import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  telegram: string;
  contactMethod: string;
}

interface IntegrationFormStep1Props {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
}

const IntegrationFormStep1 = ({
  formData,
  handleInputChange,
}: IntegrationFormStep1Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Контактная информация</h3>

      <div>
        <Label htmlFor="companyName">
          Название компании <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
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
          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
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
          onChange={(e) => handleInputChange("telegram", e.target.value)}
          placeholder="@username"
        />
      </div>

      <div>
        <Label>Предпочтительный способ связи</Label>
        <Select
          value={formData.contactMethod}
          onValueChange={(value) => handleInputChange("contactMethod", value)}
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
  );
};

export default IntegrationFormStep1;
