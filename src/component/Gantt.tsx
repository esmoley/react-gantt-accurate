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
const leftPadding = 15;
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
	const DaysRow = ({y}:{y:number}) => {
		let month = new Date(startMonth);
		const res = []
		let curX = leftPadding
		for (let i = 0; i < monthsAmount; i++) {
			// add days as children
			const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
			let days = []
			for (let j = 1; j <= numDays; j++) {
				days.push(<text key={j} y={y} x={curX} className="days-row">{j}</text>)
				curX+=cellWidth
			}
			res.push(days)
			month.setMonth(month.getMonth() + 1);
		}
		return <g>{res}</g>
	}
	const DaysOfTheWeekRow = ({y}:{y:number}) => {
			let month = new Date(startMonth);
			const res = []
			let curX = leftPadding
			for (let i = 0; i < monthsAmount; i++) {
				// add days of the week as children
				const currYear = month.getFullYear();
				const currMonth = month.getMonth() + 1;
				const numDays = getDaysInMonth(currYear, currMonth);
				const daysInMonthEls = []
				for (let i = 1; i <= numDays; i++) {
					const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, i - 1, locale);
					daysInMonthEls.push(<text key={i} y={y} x={curX} className="days-row" >
						{dayOfTheWeek}
					</text>)
					curX+=cellWidth
				}
				res.push(daysInMonthEls)
				month.setMonth(month.getMonth() + 1);
			}
			return <g>{res}</g>
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
	const TaskRowsTimePeriods = ({y}:{y:number}) => {
		return <g>
			{tasks.map((task, taskIndex) => {
				let month = new Date(startMonth);
				const dateStr = createFormattedDateFromDate(task.start);
				for (let i = 0; i < monthsAmount; i++) {
					const currYear = month.getFullYear();
					const currMonth = month.getMonth() + 1;
	
					const numDays = getDaysInMonth(currYear, currMonth);
					for (let j = 0; j < numDays; j++) {
						// add task and date data attributes
						const formattedDate = createFormattedDateFromStr(
							currYear,
							currMonth,
							j
						)
						if(dateStr === formattedDate){
							
							const days = dayDiff(task.start, task.end);
							const dayComplStart = calcDayCompletion(task.start)
							const dayComplStartWidth = cellWidth*dayComplStart
							const dayComplEnd = calcDayCompletion(task.end)
							return <rect
								key={`${task.id}_${i}_${j}`}
								className="task-rect"
								x={(i+1)*j*cellWidth-cellWidth+dayComplStartWidth}
								y={y+taskIndex*cellHeight+5}
								width={(days-2 + (1-dayComplStart) + dayComplEnd) * cellWidth}
								height={cellHeight-10}
								ry={3}
								rx={3}
							/>
						}
					}

					month.setMonth(month.getMonth() + 1);
				}
				return null;
			})}
			{/* <Dependencies/> */}
		</g>
	}
	const RowLines = ({y, width, spaceY, amount}: {y:number, width:number, spaceY:number, amount:number}) =>{
		const res = []
		for(let i=0;i<amount;i++){
			res.push(<line key={i} x={0} y1={y+spaceY*i} x2={width} y2={y+spaceY*i}/>)
		}
		return <g className="cell-line">{res}</g>
	}
	const ColumnLines = ({x, y, height, spaceX, amount}: {x:number, y:number, height:number, spaceX:number, amount:number}) =>{
		const res = []
		for(let i=0;i<amount;i++){
			res.push(<line key={i} x1={i*spaceX+x} y1={y} x2={i*spaceX+x} y2={height}/>)
		}
		return <g className="cell-line">{res}</g>
	}
	const Cells = ({y}:{y:number})=>{
		const res = []
		let month = new Date(startMonth);
		let curX = 0
		for (let i = 0; i < monthsAmount; i++) {
			const currYear = month.getFullYear();
			const currMonth = month.getMonth() + 1;
			const numDays = getDaysInMonth(currYear, currMonth);
			for (let j = 0; j < numDays; j++) {
				const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, j);
				for(let z=0;z<tasks.length;z++){
					if(dayOfTheWeek === "S"){
						res.push(<rect key={`${i}_${j}_${z}`} x={curX} y={z*cellHeight+y} width={cellWidth} height={cellHeight} fill="#f5f5f5"></rect>)
					}else{
						res.push(<rect key={`${i}_${j}_${z}`} x={curX} y={z*cellHeight+y} width={cellWidth} height={cellHeight} fill="#fff"></rect>)
					}
				}
				curX+=cellWidth
			}
			month.setMonth(month.getMonth() + 1);
		}
		// for(let i=0;i<columns;i++){
		// 	for(let j=0;j<rows;j++){
		// 		res.push(<rect x={i*cellWidth} y={j*cellHeight+y} width={cellWidth} height={cellHeight}></rect>)
		// 	}
		// }
		return <g>{res}</g>
	}
	const TimeGrid = () =>{
		let month = new Date(startMonth);
		let totalDays = 0
		for (let i = 0; i < monthsAmount; i++) {
			const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
			totalDays+=numDays
			month.setMonth(month.getMonth() + 1);
		}
		const timeLineWidth = cellWidth * totalDays
		const timeGridHeight = cellHeight * tasks.length + 10
		return <div style={{overflowX: "scroll"}}>
			<svg width={timeLineWidth+leftPadding/2} height={timeGridHeight+cellHeight}>
				<DaysRow y={cellHeight/2}/>
				<DaysOfTheWeekRow y={cellHeight}/>
				<Cells y={cellHeight+10}/>
				<RowLines y={cellHeight+10} amount={tasks.length+1} spaceY={cellHeight} width={timeLineWidth+leftPadding}/>
				<ColumnLines x={0} y={cellHeight+10} amount={totalDays+1} spaceX={cellWidth} height={timeGridHeight+cellHeight}/>
				<TaskRowsTimePeriods y={cellHeight+10}/>
			</svg>
		</div>
	}
	return <div id="gantt-container" className="react-gantt-accurate">
		<div id="gantt-grid-container">
			<div id="gantt-grid-container__tasks" style={{marginTop:`${cellHeight+10}px`}}>
			{tasks.map(task=>
				<div key={task.id}>
					<div className="gantt-task-row" style={{height:`${cellHeight}px`}}>
						{task.name}
					</div>
				</div>
			)}
			</div>
			<TimeGrid/>
		</div>
	</div>
}