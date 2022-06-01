import { createSelector } from 'reselect';
import { DateTime } from 'luxon';
import { strings } from '../../locales/i18n';
import { initDate, number } from '.';
import { daysString, monthsString, daysAfterMonths } from './calculates';

const getPrincipal = state => Number(number(state.depo.principal));
const dateOpen = state => new Date(state.depo.dateOpen);
const dateClosed = state => new Date(state.depo.dateClosed);
const getInterest1 = state => Number(number(state.depo.interest1)) / 365 / 100;
const getInterest2 = state => Number(number(state.depo.interest2)) / 365 / 100;
const getPlatez = state => state.depo.platez;
const getPlusperiod = state => state.depo.plusperiod;
const getPrinplus = state => Number(number(state.depo.prinplus));
const getRadio = state => state.depo.radio;
const getTaxCheck = state => state.depo.taxCheck;
const getTaxRate = state => state.depo.taxRate;
const getCountry = state => state.settings.country;
const getLanguage = state => state.settings.language;

export default createSelector(
  [
    getPrincipal,
    dateOpen,
    dateClosed,
    getInterest1,
    getInterest2,
    getPlatez,
    getPlusperiod,
    getPrinplus,
    getRadio,
    getTaxCheck,
    getTaxRate,
    getCountry,
    getLanguage,
  ],
  (
    principal: number,
    dOpen: Date,
    dClosed: Date,
    interest1: number,
    interest2: number,
    platez: number,
    plusperiod: number,
    prinplus: number,
    radio: number,
    taxCheck: number,
    taxRate: number,
    country: number,
    language: number
  ) => {
    // const dOpen: Date = changeDate(dateOpen);
    // const dClosed: Date = changeDate(dateClosed);
    const oneMinute = 60 * 1000;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const taxForRF = taxRate === 0 ? 0.35 : 0.3;
    // Ставка налога на процентные доходы по вкладам для лиц,
    // являющихся налоговыми резидентами Российской Федерации
    // и получающих такие доходы, составляет 35%;
    // для нерезидентов (фактически находящихся на территории Российской
    // Федерации менее 183 дней в календарном году) — 30%.
    const interestLimit = radio === 2 ? (8 + 5) / 365 / 100 : 9 / 365 / 100;

    const days = Math.round((dClosed.getTime() - dOpen.getTime()) / oneDay);
    const dni: string = daysString(days); // '', день, дня, дней
    const DaysAfterMonths: { days1: number, cf: number } = daysAfterMonths(
      dOpen,
      dClosed
    );
    const { days1, cf } = DaysAfterMonths;
    const dni1: string = daysString(days1); // '', день, дня, дней

    const months =
      (dClosed.getFullYear() - dOpen.getFullYear()) * 12 +
      (dClosed.getMonth() + 1 - (dOpen.getMonth() + 1)) -
      cf;
    const mesyacyi: string = monthsString(months); // '',  месяц , месяца, месяцев

    const ili: string = strings('result.srok.ili');

    const srok = (() => {
      switch (language !== undefined) {
        case days <= 0:
          return undefined;
        case months === 0:
          return `${days} ${dni}`;
        case days1 === 0:
          return `${days} ${dni} ${ili} ${months} ${mesyacyi}`;
        default:
          return `${days} ${dni}  ${ili} ${months} ${mesyacyi} ${days1} ${dni1}`;
      }
    })();

    let totalinterest1 = 0;
    let tax = 0;
    let principal1 = principal;
    // const dateY = new Date();
    // const dateY1 = new Date();
    // dateY.setTime(dOpen.getTime());
    // dateY1.setTime(dOpen.getTime());
    let adjunction = 0; // пополнение в цикле
    let adjunctionAll = 0; // пополнение за весь срок
    let daysY: number;
    let totalinterest2 = 0;
    const payments = days1 !== 0 || months === 0 ? months + 1 : months;

    const table: {
      n: number[],
      date: string[],
      totalinterest1: number[],
      daysY: number[],
      totalinterest2: number[],
      principal1: number[],
    } = {
      n: [], // №
      date: [], // дата
      totalinterest1: [], // начислено %
      daysY: [], // дни
      totalinterest2: [], // начислено % итого
      principal1: [], // общая сумма
    };

    if (days > 0) {
      for (let i = 0; i < payments; i++) {
        if (i < months) {
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
          const endDate = DateTime.fromJSDate(dOpen).plus({ months: i + 1 });
          const startDate = DateTime.fromJSDate(dOpen).plus({ months: i });
          daysY = endDate.diff(startDate, ['days']).as('days');
          // dateY.setMonth(dateY1.getMonth() + 1);
          // daysY = Math.round((dateY.getTime() - dateY1.getTime()) / oneDay);
          if (platez === 0) {
            // начислено процентов
            totalinterest1 = principal1 * interest1 * daysY;
          } else if (platez === 1) {
            // начислено процентов
            totalinterest1 = (principal + adjunctionAll) * interest1 * daysY;
          }
          if (taxCheck === 0) {
            if (country === 2) {
              // налог Украина
              tax += 0.195 * totalinterest1;
              totalinterest1 -= 0.195 * totalinterest1;
            } else if (country === 0 && interest1 > interestLimit) {
              // налог Россия
              tax +=
                ((interest1 - interestLimit) / interest1) *
                totalinterest1 *
                taxForRF;
              totalinterest1 -=
                ((interest1 - interestLimit) / interest1) *
                totalinterest1 *
                taxForRF;
            }
          }
          // dateY1.setTime(dateY.getTime());
          adjunctionAll += adjunction; // пополнение за весь срок
          // вклад + процент за последний месяц в цикле:
          principal1 = totalinterest1 + principal1 + adjunction;
          // table.date.push(initDate(dateY)); // дата
          table.date.push(initDate(endDate.toJSDate())); // дата
          table.daysY.push(daysY); // дни
        } else if (i === months || months === 0) {
          if (platez === 0) {
            // начислено процентов
            totalinterest1 = principal1 * interest2 * days1;
          } else if (platez === 1) {
            // начислено процентов
            totalinterest1 = (principal + adjunctionAll) * interest2 * days1;
          }
          if (taxCheck === 0) {
            if (country === 2) {
              // налог Украина
              tax += 0.195 * totalinterest1;
              totalinterest1 -= 0.195 * totalinterest1;
            } else if (country === 0 && interest2 > interestLimit) {
              // налог Россия
              tax +=
                ((interest2 - interestLimit) / interest2) *
                totalinterest1 *
                taxForRF;
              totalinterest1 -=
                ((interest2 - interestLimit) / interest2) *
                totalinterest1 *
                taxForRF;
            }
          }
          // вклад + процент за последний месяц в цикле:
          principal1 = totalinterest1 + principal1;
          table.date.push(initDate(dClosed)); // дата
          table.daysY.push(days1); // дни
        }
        totalinterest2 += totalinterest1; // начислено процентов итого
        table.n.push(i + 1); // №
        table.totalinterest1.push(totalinterest1); // начислено %
        table.totalinterest2.push(totalinterest2); // начислено % итого
        // вклад + процент за последний месяц в цикле:
        table.principal1.push(principal1);
      }
    }

    // месячная выручка (в среднем)
    // const payment = (principal1 - principal - adjunctionAll) / months;

    // Начисленные проценты
    const principal2 = principal1 - principal - adjunctionAll;

    return {
      days1,
      srok,
      principal2,
      principal1,
      tax,
      adjunctionAll,
      table,
    };
  }
);
