import { DaysOfWeekArrEn, DaysOfWeekArrRu, NoDataTextEn, NoDataTextRu } from './consts'
import { LocaleType } from './types'

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
