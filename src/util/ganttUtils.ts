import { DaysOfWeekArrEn, DaysOfWeekArrRu, NoDataTextEn, NoDataTextRu } from './consts'
import { Locale } from './types'

export function getDayOfWeek(day: Date, locale: Locale = 'en') {
  const daysOfTheWeekArr = locale === 'en' ? DaysOfWeekArrEn : DaysOfWeekArrRu
  const dayOfTheWeekIndex = day.getDay()
  return daysOfTheWeekArr[dayOfTheWeekIndex]
}
export function getNoDataText(locale: Locale) {
  switch (locale) {
    case 'ru':
      return NoDataTextRu
    default:
      return NoDataTextEn
  }
}
