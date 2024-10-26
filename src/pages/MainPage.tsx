import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  $numberInfoType,
  $randomNumberType,
  $userTypedMonth,
  $userTypedNumber,
  setNumberInfoType,
  setRandomNumberType,
  setUserTypedMonth,
  setUserTypedNumber,
} from "@/store";
import { useUnit } from "effector-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [numberInfoType, randomNumberType, userTypedNumber, userTypedMonth] =
    useUnit([
      $numberInfoType,
      $randomNumberType,
      $userTypedNumber,
      $userTypedMonth,
    ]);

  const canNavigate = useMemo(() => {
    return (!!numberInfoType && !!userTypedNumber) || !!randomNumberType;
  }, [numberInfoType, randomNumberType, userTypedNumber]);

  const goToAnswerPage = () => {
    if (canNavigate) {
      navigate("/answer");
    }
  };

  return (
    <main className="container mx-auto mt-10">
      <div>
        <h3 className="text-lg">
          Выберите какой тип информации о числе хотите вывести:
        </h3>
        <Select
          value={numberInfoType}
          onValueChange={setNumberInfoType}
          disabled={!!randomNumberType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Тип информации" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="math">Math</SelectItem>
            <SelectItem value="trivia">Trivia</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4">
        <h3 className="text-lg">Введите число:</h3>
        {numberInfoType === "date" && <p className="text-sm">Введите день</p>}
        <Input
          className="w-[180px]"
          type="number"
          value={userTypedNumber ?? ""}
          disabled={!!randomNumberType}
          onChange={(e) => {
            const newValue = e.target.value;
            setUserTypedNumber(newValue === "" ? null : +newValue);
          }}
        />
        {numberInfoType === "date" && (
          <>
            <p className="text-sm">Введите месяц</p>
            <Input
              className="w-[180px] mt-1"
              type="number"
              placeholder="Введите месяц"
              value={userTypedMonth ?? ""}
              disabled={!!randomNumberType}
              onChange={(e) => {
                const newValue = e.target.value;
                setUserTypedMonth(newValue === "" ? null : +newValue);
              }}
            />
          </>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg">
          Или выберите какую информацию хотите получить рандомно:
        </h3>
        <RadioGroup
          value={randomNumberType}
          onValueChange={setRandomNumberType}
        >
          <div className="flex items-center space-x-2 mt-2 cursor-pointer">
            <RadioGroupItem value="trivia" id="trivia" />
            <Label htmlFor="trivia" className="cursor-pointer">
              Random trivia
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-2 cursor-pointer">
            <RadioGroupItem value="year" id="year" />
            <Label htmlFor="year" className="cursor-pointer">
              Random year
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-2 cursor-pointer">
            <RadioGroupItem value="date" id="date" />
            <Label htmlFor="date" className="cursor-pointer">
              Random date
            </Label>
          </div>
          <div className="flex items-center space-x-2 mt-2 cursor-pointer">
            <RadioGroupItem value="math" id="math" />
            <Label htmlFor="math" className="cursor-pointer">
              Random math
            </Label>
          </div>
        </RadioGroup>
        {!!randomNumberType && (
          <Button
            className="bg-white border text-black h-auto py-0 mt-2 hover:bg-white"
            onClick={() => setRandomNumberType("")}
          >
            Убрать рандом
          </Button>
        )}
      </div>
      {!canNavigate && (
        <p className="mt-2 text-red-500">
          Вам нужно выбрать тип информации и ввести число или выбрать рандомную
          информацию
        </p>
      )}
      <Button
        onClick={goToAnswerPage}
        disabled={!canNavigate}
        className="mt-4 disabled:cursor-not-allowed"
      >
        Получить ответ
      </Button>
    </main>
  );
};

export default MainPage;
