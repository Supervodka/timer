import { useState,useEffect } from 'react';
import  {getPadTime}  from "./helpers/getPadTime";
import './App.css';

function App() {
  const defaultTime = 5;//задаваемое время
  const [timeLeft, setTimeLeft] = useState(defaultTime);//остаток времени на таймере
  const [isCounting, setIsCounting] = useState(false);//Идёт ли отчёт таймера?
  const minutes = getPadTime( Math.floor(timeLeft/60));// минуты и заполнение при нобходимости
  const seconds = getPadTime(timeLeft-minutes*60);// секунды и заполнение при необходимости

useEffect(()=>{
const interval = setInterval(()=>{
  isCounting && //если isCounting == true то...
setTimeLeft((timeLeft)=> timeLeft>=1 ? timeLeft-1:0);//переписываем timeLeft через setTimeLeft,если timeLeft больше или равен единице то отнимаем единицу
},1000);//вызов функции setInterval через каждые 1000мс = 1с
if (timeLeft === 0) setIsCounting(false) //когда timeLeft достигает нуля устанавливаем setIsCounting в false, отчего isCounting более не меняется ,хук не срабатыват
                                         //и таймер не считает
return ()=>{
  clearInterval(interval) //скидывает интервал вызова функции снова до 1 секунды,иначе без интервала оно всё отработает одномоментно,скинет timeLeft,
}                         //переключит isCounting в false и закончит работу 
},[timeLeft,isCounting]);

  const handleStart =()=>{
    if (timeLeft === 0) setTimeLeft(defaultTime) //если остаток времени 0 то скинуть его в первоначальному значению 
    setIsCounting(true) //запуск отчёта
  };
  const handleStop =()=>{
    setIsCounting(false) //остановка отчёта
  };
  const handleReset =()=>{
    setIsCounting(false); //остановка таймера 
    setTimeLeft(defaultTime); //скид на дефолтное значение таймера 
  };
  return (
    <div className="App">
 <div className = "timer">
  <span>{minutes}</span>
  <span>:</span>
  <span>{seconds}</span>
 </div>
 <div className = "buttons">
  {isCounting ? <button onClick={handleStop}>Stop</button>
  : <button onClick={handleStart}>Start</button> }
  <button onClick={handleReset}>Reset</button>
 </div>
    </div>
   
  );
}

export default App;
