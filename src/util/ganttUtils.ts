import { DaySize, DaysOfWeekArrEn, DaysOfWeekArrRu } from './consts'
import { Locale } from './types'

export function monthDiff(firstMonth: Date, lastMonth: Date) {
  let months: number
  months = (lastMonth.getFullYear() - firstMonth.getFullYear()) * 12
  months -= firstMonth.getMonth()
  months += lastMonth.getMonth()
  return months <= 0 ? 0 : months
}

export function dayDiff(startDate: Date, endDate: Date) {
  const difference = endDate.getTime() - startDate.getTime()
  const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1
  return days
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}
export function getDayOfWeek(day: Date, locale: Locale = 'en') {
  const daysOfTheWeekArr = locale === 'en' ? DaysOfWeekArrEn : DaysOfWeekArrRu
  const dayOfTheWeekIndex = day.getDay()
  return daysOfTheWeekArr[dayOfTheWeekIndex]
}

export function createFormattedDateFromStr(year: number, month: number, day: number) {
  let monthStr = month.toString()
  let dayStr = day.toString()

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`
  }
  return `${year}-${monthStr}-${dayStr}`
}

export function createFormattedDateFromDate(date: Date) {
  let monthStr = (date.getMonth() + 1).toString()
  let dayStr = date.getDate().toString()

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`
  }
  return `${date.getFullYear()}-${monthStr}-${dayStr}`
}

export function calcDayCompletion(date: Date) {
  const dateStart = new Date(date)
  dateStart.setHours(0, 0, 0, 0)
  const dayDiff = date.getTime() - dateStart.getTime()
  return dayDiff / DaySize
}
