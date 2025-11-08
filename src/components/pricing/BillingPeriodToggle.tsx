interface BillingPeriodToggleProps {
  billingPeriod: "month" | "year";
  onToggle: (period: "month" | "year") => void;
  isVisible: boolean;
}

const BillingPeriodToggle = ({ billingPeriod, onToggle, isVisible }: BillingPeriodToggleProps) => {
  return (
    <div
      className={`flex justify-center mb-12 ${isVisible ? "animate-scroll-in-delay-1" : "opacity-0"}`}
    >
      <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
        <button
          onClick={() => onToggle("month")}
          className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
            billingPeriod === "month"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          На месяц
        </button>
        <button
          onClick={() => onToggle("year")}
          className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
            billingPeriod === "year"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          <span className="hidden sm:inline">На год</span>
          <span className="sm:hidden">Год</span>
          <span className="ml-1 sm:ml-2 text-xs bg-green-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full">
            -20%
          </span>
        </button>
      </div>
    </div>
  );
};

export default BillingPeriodToggle;
