import {
  initDate,
  changeDate
} from '../lib';
import {
  daysString,
  monthsString,
  daysAfterMonths,
  daysYfun
} from './calculates';

export const calculate = (
  principal,
  dateOpen,
  dateClosed,
  interest1,
  interest2,
  platez,
  plusperiod,
  prinplus
) => {
  dateOpen = changeDate(dateOpen);
  dateClosed = changeDate(dateClosed);
  const oneMinute = 60 * 1000;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  
  const days = Math.round(
    (dateClosed.getTime() - dateOpen.getTime()) / oneDay
  );
  const dni = daysString(days); // '', день, дня, дней  

  const DaysAfterMonths = daysAfterMonths(dateOpen, dateClosed, oneDay);
  let days1 = DaysAfterMonths.days1;
  const cf = DaysAfterMonths.cf;
  let dni1 = daysString(days1); // '', день, дня, дней  
  
  let months =
    (((dateClosed.getFullYear() - dateOpen.getFullYear()) * 12)
    + ((dateClosed.getMonth() + 1) - (dateOpen.getMonth() + 1))) - cf;  
  const mesyacyi = monthsString(months);// '',  месяц , месяца, месяцев
  
  const ili = ' или ';

  const srok = days > 0 ? (() => { 
    switch (true) {
      // case (days <= 0):
      //   return undefined;
      case (months === 0):
        return days + dni;      
      case (days1 === 0):
        return days + dni + ili + months + mesyacyi;       
      default: 
        return days + dni + ili + months + mesyacyi + days1 + dni1;
    }
  })() : undefined;

  let totalinterest1 = 0;
  let principal1 = principal;
  const dateY = new Date();
  const dateY1 = new Date();
  dateY.setTime(dateOpen.getTime());
  dateY1.setTime(dateOpen.getTime());
  let adjunction = 0; // пополнение в цикле
  let adjunctionAll = 0; // пополнение за весь срок 
  let daysY;
  let totalinterest2 = 0;
  const n = days1 !== '' || months === ''  ? 1 : 0;
 
  const table = [];
  table.n = []; // №
  table.date = []; // дата
  table.totalinterest1 = []; // начислено % 
  table.daysY = []; // дни 
  table.totalinterest2 = []; // начислено % итого
  table.principal1 = []; // общая сумма

  if (days > 0) {
    for (let i = 0; i < months + n; i++) {
        
      if (i < months) {

        daysY = daysYfun(dateY, dateY1, dateOpen, oneDay);

        if (plusperiod === 0) {
          adjunction = 0; // пополнение
        } else if (plusperiod === 1) {
          if (i > 0) {
            adjunction = prinplus;
          } else {
            adjunction = 0;
          }
        } else if (plusperiod === 2) {
          if ((i + 1) / 3 === Math.floor((i + 1) / 3)) {
            adjunction = prinplus;
          } else {
            adjunction = 0;
          }
        } else if (plusperiod === 3) {
          if ((i + 1) / 12 === Math.floor((i + 1) / 12)) {
            adjunction = prinplus;
          } else {
            adjunction = 0;
          }
        }        
        
        if (platez === 0) {
          // начислено процентов
          totalinterest1 = principal1 * interest1 * daysY;
                       
        } else if (platez === 1) {
          // начислено процентов
          totalinterest1 = (principal + adjunctionAll) * interest1 * daysY;            
        }
        dateY1.setTime(dateY.getTime());          
        adjunctionAll += adjunction; // пополнение за весь срок          
        // вклад + процент за последний месяц в цикле:
        principal1 = totalinterest1 + principal1 + adjunction; 
        table.date.push(initDate(dateY)); // дата
        table.daysY.push(daysY); // дни

      } else if (i === months || months === 0) {  

        if (platez === 0) {
          // начислено процентов
          totalinterest1 = principal1 * interest2 * days1;            
        } else if (platez === 1) {
          // начислено процентов
          totalinterest1 = (principal + adjunctionAll) * interest2 * days1;            
        }
        // вклад + процент за последний месяц в цикле:
        principal1 = totalinterest1 + principal1; 
        table.date.push(initDate(dateClosed)); // дата
        table.daysY.push(days1); // дни
      }         
               
      totalinterest2 += totalinterest1; // начислено процентов итого     
      table.n.push(i + 1); // №        
      table.totalinterest1.push(totalinterest1.toFixed(2));// начислено %     
      table.totalinterest2.push(totalinterest2.toFixed(2));// начислено % итого
      // вклад + процент за последний месяц в цикле:
      table.principal1.push(principal1.toFixed(2));        
    }
  }
  

  //месячная выручка (в среднем)
  const payment = (principal1 - principal - adjunctionAll) / months;  
  //Сумма выплаты всех начислений
  const principal2 = principal1 - principal - adjunctionAll; 

  return { days1, srok, payment, principal2, principal1, table };
};