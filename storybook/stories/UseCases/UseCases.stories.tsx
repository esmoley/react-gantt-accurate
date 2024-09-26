import React from 'react'
import { Gantt } from '../../../src'

export default {
  title: 'Use Cases',
  component: <></>,
  tags: ['autodocs'],
}

export const LongName = {
  render: () => {
    const rows = [
      {
        name: 'ExternalModule.dl_LoadingTests.Module : 213 : LongText.Write(); / UserLong / 11420',
        tasks: [
          {
            id: 'victim_16294',
            start: new Date('2024-06-27T19:32:15.373Z'),
            end: new Date('2024-06-27T19:32:20.389Z'),
            color: '#edbd00',
            tooltip: '\r\nModule.dl_LoadingTests.Module : 213 : LongText.Write();',
          },
        ],
      },
    ]
    return <Gantt rows={rows} theme='light' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}

export const LongTooltip = {
  render: () => {
    const rows = [
      {
        name: 'ExternalModule.dl_LoadingTests.Module : 213 : LongText.Write(); / UserLong / 11420',
        tasks: [
          {
            id: 'victim_16294',
            start: new Date('2024-06-27T19:32:15.373Z'),
            end: new Date('2024-06-27T19:32:20.389Z'),
            color: '#edbd00',
            tooltip: `Форма.Записать : Документ.ПоступлениеБезналичныхДенежныхСредств.Форма.ФормаДокумента
            Документ.ПоступлениеБезналичныхДенежныхСредств.МодульОбъекта : 471 : ПроведениеДокументов.ОбработкаПроведенияДокумента(ЭтотОбъект, Отказ);
            ОбщийМодуль.ПроведениеДокументов.Модуль : 217 : ПровестиДокумент(Документ, Отказ, ДопПараметры);
            ОбщийМодуль.ПроведениеДокументов.Модуль : 1548 : СформироватьЗаданияНаОтложенныеДвижения(Документ, МенеджерВременныхТаблиц);
            ОбщийМодуль.ПроведениеДокументов.Модуль : 1129 : ЗакрытиеМесяцаСервер.ОтразитьЗаданияКЗакрытиюМесяца(Документ, МенеджерВременныхТаблиц);
            ОбщийМодуль.ЗакрытиеМесяцаСервер.Модуль : 2968 : РегистрыСведений.ЗаданияКЗакрытиюМесяца.СоздатьЗаписиРегистраПоДаннымВыборки(Выборка);
            РегистрСведений.ЗаданияКЗакрытиюМесяца.МодульМенеджера : 153 : СоздатьЗаписьРегистра(СтруктураПолей.Месяц, СтруктураПолей.Документ, СтруктураПолей.Организация, СтруктураПолей.Операция, НомерЗадания);
            РегистрСведений.ЗаданияКЗакрытиюМесяца.МодульМенеджера : 106 : НаборЗаписей.Записать(Истина);`,
          },
        ],
      },
    ]
    return <Gantt rows={rows} theme='light' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}

export const DependencyLower = {
  render: () => {
    const rows = [
      {
        name: '>> Task 1',
        tasks: [
          {
            start: new Date('2024-07-16T10:46:47.893Z'),
            end: new Date('2024-07-16T10:47:07.955Z'),
            id: '1',
            tooltip: '>> Task 1',
            color: '#c6ffb3',
          },
          {
            start: new Date('2024-07-16T10:46:47.893Z'),
            end: new Date('2024-07-16T10:46:47.893Z'),
            id: '2',
            tooltip: '>> Task 1 / 2',
            color: '#fff0b3',
          },
        ],
      },
      {
        name: '>> Task 2',
        tasks: [
          {
            start: new Date('2024-07-16T10:46:46.455Z'),
            end: new Date('2024-07-16T10:47:08.127Z'),
            id: '3',
            tooltip: '>> Task 2',
            color: '#c6ffb3',
          },
        ],
      },
      {
        name: '>> Task 3',
        tasks: [
          {
            start: new Date('2024-07-16T10:46:47.049Z'),
            end: new Date('2024-07-16T10:47:08.002Z'),
            id: '4',
            tooltip: '>> Task 3',
            color: '#ff8533',
          },
        ],
      },
      {
        name: '>> Task 4',
        tasks: [
          {
            start: new Date('2024-07-16T10:46:47.955Z'),
            end: new Date('2024-07-16T10:47:07.955Z'),
            id: '5',
            tooltip: '>> Task 4',
            color: '#ff8533',
            dependencies: ['1'],
          },
        ],
      },
    ]
    return <Gantt rows={rows} theme='light' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}

export const SmallestTask = {
  render: () => {
    const rows = [
      {
        name: '>> Task 1',
        tasks: [
          {
            start: 0,
            end: 0,
            id: '1',
            tooltip: '>> Task 1',
          },
        ],
      },
    ]
    return <Gantt rows={rows} theme='light' viewMode='seconds' />
  },
  args: {},
  argTypes: {},
}
export const AdaptiveViewMode = {
  render: ({ rows }) => {
    const rowsArr = [
      {
        name: 'Milliseconds',
        tasks: [
          {
            start: 0,
            end: 19,
            id: '1',
            tooltip: 'Milliseconds',
          },
        ],
      },
      {
        name: 'Seconds',
        tasks: [
          {
            start: 0,
            end: 19000,
            id: '2',
            tooltip: 'Seconds',
          },
        ],
      },
      {
        name: 'Minutes',
        tasks: [
          {
            start: 0,
            end: 19000 * 60,
            id: '3',
            tooltip: 'Minutes',
          },
        ],
      },
      {
        name: 'Hours',
        tasks: [
          {
            start: 0,
            end: 19000 * 60 * 60,
            id: '4',
            tooltip: 'Hours',
          },
        ],
      },
      {
        name: 'Days',
        tasks: [
          {
            start: 0,
            end: 19000 * 60 * 60 * 24,
            id: '5',
            tooltip: 'Days',
          },
        ],
      },
    ]
    rowsArr.splice(rows)
    return <Gantt key={rows} rows={rowsArr} />
  },
  args: { rows: 1 },
  argTypes: { rows: { control: { type: 'range', min: 1, max: 5, step: 1 } } },
}
