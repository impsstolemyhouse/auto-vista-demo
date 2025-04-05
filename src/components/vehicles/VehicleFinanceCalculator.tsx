
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

interface VehicleFinanceCalculatorProps {
  vehiclePrice: number;
}

const VehicleFinanceCalculator = ({ vehiclePrice }: VehicleFinanceCalculatorProps) => {
  const { translations } = useLanguage();
  const [price, setPrice] = useState(vehiclePrice);
  const [downPayment, setDownPayment] = useState(Math.round(vehiclePrice * 0.1));
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(4.9);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateLoan();
  }, [price, downPayment, loanTerm, interestRate]);

  const calculateLoan = () => {
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPaymentCalc =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    const totalPayment = monthlyPaymentCalc * loanTerm;
    const totalInterestCalc = totalPayment - loanAmount;

    setMonthlyPayment(isNaN(monthlyPaymentCalc) ? 0 : monthlyPaymentCalc);
    setTotalInterest(isNaN(totalInterestCalc) ? 0 : totalInterestCalc);
    setTotalCost(price + totalInterest);
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
    // Recalculate down payment to maintain the same percentage
    setDownPayment(Math.round(value * (downPayment / price)));
  };

  const handleDownPaymentChange = (value: number) => {
    if (value >= 0 && value <= price) {
      setDownPayment(value);
    }
  };

  const termOptions = [24, 36, 48, 60, 72, 84];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg">{translations.vehicle.calculator.title}</h3>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-sm">
              {translations.vehicle.calculator.price}
            </label>
            <span className="text-sm font-semibold">{formatCurrency(price)}</span>
          </div>
          <Slider
            value={[price]}
            min={1000}
            max={100000}
            step={500}
            onValueChange={(value) => handlePriceChange(value[0])}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-sm">
              {translations.vehicle.calculator.downPayment}
            </label>
            <span className="text-sm font-semibold">{formatCurrency(downPayment)}</span>
          </div>
          <Slider
            value={[downPayment]}
            min={0}
            max={price}
            step={500}
            onValueChange={(value) => handleDownPaymentChange(value[0])}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-sm">
              {translations.vehicle.calculator.term}
            </label>
            <span className="text-sm font-semibold">{loanTerm} months</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {termOptions.map((term) => (
              <Button
                key={term}
                type="button"
                variant={loanTerm === term ? "default" : "outline"}
                className={loanTerm === term ? "bg-dms-blue hover:bg-dms-blue-dark" : ""}
                onClick={() => setLoanTerm(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-sm">
              {translations.vehicle.calculator.rate}
            </label>
            <span className="text-sm font-semibold">{interestRate.toFixed(1)}%</span>
          </div>
          <div className="flex gap-2 items-center">
            <Slider
              value={[interestRate]}
              min={0.1}
              max={20}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
              className="flex-grow"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-16 text-right"
              min={0.1}
              max={20}
              step={0.1}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {translations.vehicle.calculator.monthlyPayment}
              </p>
              <p className="text-xl font-bold text-dms-blue">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {translations.vehicle.calculator.totalInterest}
              </p>
              <p className="text-xl font-bold">
                {formatCurrency(totalInterest)}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {translations.vehicle.calculator.totalCost}
              </p>
              <p className="text-xl font-bold">
                {formatCurrency(totalCost)}
              </p>
            </div>
          </div>
        </div>

        <Button
          className="w-full bg-dms-blue hover:bg-dms-blue-dark"
        >
          {translations.buttons.applyNow}
        </Button>
      </div>
    </div>
  );
};

export default VehicleFinanceCalculator;
