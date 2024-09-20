import { DaysOfWeekArrEn, DaysOfWeekArrRu, NoDataTextEn, NoDataTextRu } from './consts'
import { LocaleType, ViewModeType } from './types'

export function getDayOfWeek(day: Date, locale: LocaleType = 'en') {
  const daysOfTheWeekArr = locale === 'en' ? DaysOfWeekArrEn : DaysOfWeekArrRu
  const dayOfTheWeekIndex = day.getDay()
  return daysOfTheWeekArr[dayOfTheWeekIndex]
}
export function getNoDataText(locale: LocaleType) {
  switch (locale) {
    case 'ru':
      return NoDataTextRu
    default:
      return NoDataTextEn
  }
}
export function getViewModeSelectOptions(locale: LocaleType): {
  [K in ViewModeType]: string
} {
  switch (locale) {
    case 'ru':
      return {
        days: 'Дни',
        hours: 'Часы',
        minutes: 'Минуты',
        seconds: 'Секунды',
        milliseconds: 'Миллисекунды',
      }
    default:
      return {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        milliseconds: 'Milliseconds',
      }
  }
}
