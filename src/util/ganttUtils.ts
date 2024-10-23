import {
  ADAPTIVE_COLUMNS_MAX,
  DAY_MS,
  DaysOfWeekArrEn,
  DaysOfWeekArrRu,
  HOUR_MS,
  MILLISECOND_MS,
  MINUTE_MS,
  NoDataTextEn,
  NoDataTextRu,
  SECOND_MS,
} from './consts'
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
export function getStartDate(lowestTaskStartDate: Date, viewMode: ViewModeType) {
  return viewMode === 'hours'
    ? new Date(
        lowestTaskStartDate.getFullYear(),
        lowestTaskStartDate.getMonth(),
        lowestTaskStartDate.getDate(),
        lowestTaskStartDate.getHours() - 1,
        0,
        0,
        0,
      )
    : viewMode === 'minutes'
    ? new Date(
        lowestTaskStartDate.getFullYear(),
        lowestTaskStartDate.getMonth(),
        lowestTaskStartDate.getDate(),
        lowestTaskStartDate.getHours(),
        lowestTaskStartDate.getMinutes() - 1,
        0,
        0,
      )
    : viewMode === 'seconds'
    ? new Date(
        lowestTaskStartDate.getFullYear(),
        lowestTaskStartDate.getMonth(),
        lowestTaskStartDate.getDate(),
        lowestTaskStartDate.getHours(),
        lowestTaskStartDate.getMinutes(),
        lowestTaskStartDate.getSeconds() - 1,
        0,
      )
    : viewMode === 'milliseconds'
    ? new Date(
        lowestTaskStartDate.getFullYear(),
        lowestTaskStartDate.getMonth(),
        lowestTaskStartDate.getDate(),
        lowestTaskStartDate.getHours(),
        lowestTaskStartDate.getMinutes(),
        lowestTaskStartDate.getSeconds(),
        lowestTaskStartDate.getMilliseconds() - 1,
      )
    : new Date(
        lowestTaskStartDate.getFullYear(),
        lowestTaskStartDate.getMonth(),
        lowestTaskStartDate.getDate() === 1 ? 0 : 1,
        0,
        0,
        0,
        0,
      )
}
export function getEndDate(highestTaskEndDate: Date, viewMode: ViewModeType) {
  return viewMode === 'hours'
    ? new Date(
        new Date(
          highestTaskEndDate.getFullYear(),
          highestTaskEndDate.getMonth(),
          highestTaskEndDate.getDate(),
          highestTaskEndDate.getHours() + 2,
          0,
          0,
          0,
        ).getTime() - 0.001,
      )
    : viewMode === 'minutes'
    ? new Date(
        new Date(
          highestTaskEndDate.getFullYear(),
          highestTaskEndDate.getMonth(),
          highestTaskEndDate.getDate(),
          highestTaskEndDate.getHours(),
          highestTaskEndDate.getMinutes() + 2,
          0,
          0,
        ).getTime() - 0.001,
      )
    : viewMode === 'seconds'
    ? new Date(
        new Date(
          highestTaskEndDate.getFullYear(),
          highestTaskEndDate.getMonth(),
          highestTaskEndDate.getDate(),
          highestTaskEndDate.getHours(),
          highestTaskEndDate.getMinutes(),
          highestTaskEndDate.getSeconds() + 2,
          0,
        ).getTime() - 0.001,
      )
    : viewMode === 'milliseconds'
    ? new Date(
        new Date(
          highestTaskEndDate.getFullYear(),
          highestTaskEndDate.getMonth(),
          highestTaskEndDate.getDate(),
          highestTaskEndDate.getHours(),
          highestTaskEndDate.getMinutes(),
          highestTaskEndDate.getSeconds(),
          highestTaskEndDate.getMilliseconds() + 2,
        ).getTime() - 0.001,
      )
    : new Date(highestTaskEndDate.getFullYear(), highestTaskEndDate.getMonth() + 1, 1, 0, 0, 0, 0)
}
export function getCellMs(viewMode: ViewModeType) {
  return viewMode === 'hours'
    ? HOUR_MS
    : viewMode === 'minutes'
    ? MINUTE_MS
    : viewMode === 'seconds'
    ? SECOND_MS
    : viewMode === 'milliseconds'
    ? MILLISECOND_MS
    : DAY_MS
}

export function calcViewMode(
  lowestTaskStartTs: number,
  highestTaskEndTs: number,
  viewMode: ViewModeType | 'auto',
  adaptiveColumnsMax: number = ADAPTIVE_COLUMNS_MAX,
): ViewModeType {
  if (viewMode && viewMode !== 'auto') return viewMode
  const diffTs = highestTaskEndTs - lowestTaskStartTs
  if (diffTs / MILLISECOND_MS < adaptiveColumnsMax) return 'milliseconds'
  if (diffTs / SECOND_MS < adaptiveColumnsMax) return 'seconds'
  if (diffTs / MINUTE_MS < adaptiveColumnsMax) return 'minutes'
  if (diffTs / HOUR_MS < adaptiveColumnsMax) return 'hours'
  return 'days'
}
