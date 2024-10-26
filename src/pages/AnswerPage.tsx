import { fetchNumberInfoFx } from "@/api/getNumberInfo.api";
import { Skeleton } from "@/components/ui/skeleton";
import {
  $numberInfo,
  $numberInfoError,
  $numberInfoType,
  $randomNumberType,
  $userTypedMonth,
  $userTypedNumber,
} from "@/store";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AnswerPage = () => {
  const [
    numberInfoType,
    randomNumberType,
    userTypedNumber,
    userTypedMonth,
    numberInfo,
    isLoading,
    errorMsg,
  ] = useUnit([
    $numberInfoType,
    $randomNumberType,
    $userTypedNumber,
    $userTypedMonth,
    $numberInfo,
    fetchNumberInfoFx.pending,
    $numberInfoError,
  ]);
  useEffect(() => {
    const data = {
      numberInfoType,
      randomNumberType,
      userTypedNumber,
      userTypedMonth,
    };
    fetchNumberInfoFx(data);
  }, [numberInfoType, randomNumberType, userTypedNumber, userTypedMonth]);

  const userChoiceText = () => {
    if (randomNumberType) {
      return `Вы выбрали рандомный тип: ${randomNumberType}`;
    } else if (numberInfoType && userTypedNumber !== null) {
      if (numberInfoType === "date") {
        return `Вы выбрали тип: ${numberInfoType}, день: ${userTypedNumber}, месяц: ${userTypedMonth}`;
      }
      return `Вы выбрали тип: ${numberInfoType}, число: ${userTypedNumber}`;
    }
    return "Выбор не сделан";
  };

  return (
    <main className="container mx-auto mt-10">
      <Link to={"/"} className="border p-2 rounded-md">
        Вернуться назад
      </Link>
      <div className="mt-5">
        <p>{userChoiceText()}</p>
        {isLoading ? (
          <Skeleton className="w-[300px] h-5 bg-gray-400" />
        ) : (
          <h2 className="mt-2">{numberInfo}</h2>
        )}
        {errorMsg && (
          <p className="mt-4 text-red-500">Ошибка: {errorMsg}</p>
        )}
      </div>
    </main>
  );
};

export default AnswerPage;
