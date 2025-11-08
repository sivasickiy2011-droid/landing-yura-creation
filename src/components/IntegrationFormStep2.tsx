import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  industry: string;
  companySize: string;
  currentCrm: string;
  hasWebsite: boolean;
  website: string;
}

interface IntegrationFormStep2Props {
  formData: FormData;
  handleInputChange: (field: string, value: any) => void;
  industries: string[];
}

const IntegrationFormStep2 = ({
  formData,
  handleInputChange,
  industries,
}: IntegrationFormStep2Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">О вашей компании</h3>

      <div>
        <Label>
          Отрасль <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.industry}
          onValueChange={(value) => handleInputChange("industry", value)}
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
          onValueChange={(value) => handleInputChange("companySize", value)}
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
          onChange={(e) => handleInputChange("currentCrm", e.target.value)}
          placeholder="amoCRM, Битрикс24, Excel и т.д."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="hasWebsite"
          checked={formData.hasWebsite}
          onCheckedChange={(checked) => handleInputChange("hasWebsite", checked)}
        />
        <Label htmlFor="hasWebsite">У компании есть сайт</Label>
      </div>

      {formData.hasWebsite && (
        <div>
          <Label htmlFor="website">Адрес сайта</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://example.com"
          />
        </div>
      )}
    </div>
  );
};

export default IntegrationFormStep2;
