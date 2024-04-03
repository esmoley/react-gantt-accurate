import React from "react"
import "./styles.css"
import { calcDayCompletion, createFormattedDateFromDate, createFormattedDateFromStr, dayDiff, getDayOfWeek, getDaysInMonth, monthDiff } from "../util/ganttUtils"
import { DaysOfWeekArrEn, DaysOfWeekArrRu, MonthsArrEn, MonthsArrRu } from "../util/consts"
import { Locale } from "../util/types"
type Task = {
		id: string
		name: string
		start: Date
		end: Date
		dependencies?: string[]
}
type GanntProps = {
		tasks:Task[],
		startMonth:Date,
		endMonth:Date
		locale?:Locale
}
const cellWidth = 30;
const cellHeight = 40;
const DateStringFormatWithMs = (date:Date) =>{
	let year = date.getFullYear()
	let month = (date.getMonth()+1).toString()
	if(month.length === 1) month = "0"+month
	let dayN = date.getDate().toString()

	let h = date.getHours().toString()
	if(h.length === 1) h = `0${h}`
	if(dayN.length === 1) dayN = "0"+dayN
	let min = date.getMinutes().toString()
	if(min.length === 1)min = "0"+min
	let sec = date.getSeconds().toString()
	if(sec.length === 1)sec = "0"+sec
	let ms = date.getMilliseconds().toString()
	while(ms.length<3) ms = `0${ms}`
	return year + "-" + month + "-" +  dayN + " " +
	h + ":" + min + ":" + sec + "."+ ms;
}
export const Gantt = ({tasks, locale, startMonth, endMonth}: GanntProps) =>{
	if(!locale)locale = "en"

	const daysOfWeekArr = locale === "en"? DaysOfWeekArrEn : DaysOfWeekArrRu
	const monthsArr = locale === "en"? MonthsArrEn : MonthsArrRu
	const monthsAmount = monthDiff(startMonth, endMonth) + 1;

	const MonthsRow = () => {
		let month = new Date(startMonth);
		const timePeriods = []
		for (let i = 0; i < monthsAmount; i++) {
			timePeriods.push(<div key={i} className="gantt-time-period day" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
				<span>
						{monthsArr[month.getMonth()] + " " + month.getFullYear()}
				</span>
			</div>)
			month.setMonth(month.getMonth() + 1);
		}
		return <>{timePeriods}</>
	}
	const DaysRow = () => {
		let month = new Date(startMonth);
		const res = []
		for (let i = 0; i < monthsAmount; i++) {
			// add days as children
			const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
			let days = []
			for (let i = 1; i <= numDays; i++) {
				days.push(<div key={i} className="gantt-time-period" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
					<span>{i}</span>
				</div>)
			}
			res.push(<div key={i} className="gantt-time-period" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
				{days}
			</div>)
			month.setMonth(month.getMonth() + 1);
		}
		return <>{res}</>
	}
	const DaysOfTheWeekRow = () => {
			let month = new Date(startMonth);
			const res = []
			for (let i = 0; i < monthsAmount; i++) {
				// add days of the week as children
				const currYear = month.getFullYear();
				const currMonth = month.getMonth() + 1;
				const numDays = getDaysInMonth(currYear, currMonth);
				const daysInMonthEls = []
				for (let i = 1; i <= numDays; i++) {
					const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, i - 1);
					daysInMonthEls.push(<div key={i} className = "gantt-time-period" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
							<span>
									{dayOfTheWeek}
							</span>
					</div>)
					}
				res.push(<div key={i} className="gantt-time-period" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
					{daysInMonthEls}
				</div>)
				month.setMonth(month.getMonth() + 1);
			}
			return res
	}
	const TaskDuration = ({task}:{task:Task}) =>{
		const days = dayDiff(task.start, task.end);
		const dayComplStart = calcDayCompletion(task.start)
		const dayComplStartWidth = cellWidth*dayComplStart
		const dayComplEnd = calcDayCompletion(task.end)
		return <><div className="tooltip" ><div className="taskDuration" id={task.id} style={{
			marginLeft:`${dayComplStartWidth}px`,
			width:`calc(${days-2 + (1-dayComplStart) + dayComplEnd} * 100%)`
			}}></div>
			<span className="tooltiptext" style={{marginTop: `${cellHeight}px`}}><p>{task.name}</p>
			<p>From:{DateStringFormatWithMs(task.start)}</p>
			<p>To:{DateStringFormatWithMs(task.end)}</p>
			</span>
		</div>
		</>
	}
	const Dependencies = () =>{
		return tasks.map(task=>
		task.dependencies&&
			<svg width="300" height="300" viewBox="0 0 300 300" style={{position: "absolute"}}>
				<line x1="0" y1="0" x2="200" y2="200" 
					style={{fill: "none", stroke: "grey", strokeWidth: "2px;"}}>
				</line>
			</svg>
		)
	}
	const TaskRowsTimePeriods = () => {    
		return <div className="gantt-time-period-cell-container" style={{gridTemplateColumns: `repeat(${monthsAmount}, 1fr)`}}>
			{tasks.map((task) => {
				let month = new Date(startMonth);
				let res = []
				const dateStr = createFormattedDateFromDate(task.start);
				for (let i = 0; i < monthsAmount; i++) {
					const currYear = month.getFullYear();
					const currMonth = month.getMonth() + 1;
	
					const numDays = getDaysInMonth(currYear, currMonth);
					const daysEls = []
					for (let i = 1; i <= numDays; i++) {
						const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, i - 1);

						// color weekend cells differently
						let style:React.CSSProperties = {}
						if(dayOfTheWeek === daysOfWeekArr[5] || dayOfTheWeek === daysOfWeekArr[6]){
							style.backgroundColor = "#f7f7f7"
						}
						// add task and date data attributes
						const formattedDate = createFormattedDateFromStr(
							currYear,
							currMonth,
							i
						)

						daysEls.push(<div key={i} className="gantt-time-period-cell" style={style} data-task={task.id} data-date={formattedDate}>
							{dateStr === formattedDate && <TaskDuration task={task} />}
						</div>)
					}
					res.push(<div key={i} className="gantt-time-period" style={{gridAutoColumns:`minmax(${cellWidth}px, 1fr)`, height:`${cellHeight}px`}}>
						{daysEls}
					</div>)

					month.setMonth(month.getMonth() + 1);
				}
				return <>{res}</>
			})}
			{/* <Dependencies/> */}
		</div>
	}
	
	// const TimeGrid = () =>{
	// 	return <svg></svg>
	// }
	return <div id="gantt-container" className="react-gantt-accurate">
		<div id="gantt-grid-container">
			<div id="gantt-grid-container__tasks">
			{tasks.map(task=>
				<div key={task.id}>
					<div className="gantt-task-row" style={{height:`${cellHeight}px`}}>
						{task.name}
					</div>
				</div>
			)}
			</div>
			<div id="gantt-grid-container__time" style={{gridTemplateColumns:`repeat(${monthsAmount}, 1fr)`}}>
				<MonthsRow/>
				<DaysRow/>
				<DaysOfTheWeekRow/>
				<TaskRowsTimePeriods/>
			</div>
			{/* <TimeGrid/> */}
		</div>
	</div>
}