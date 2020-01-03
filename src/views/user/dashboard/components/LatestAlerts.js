/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, Button, useTheme } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {},
	chartContainer: {
		height: 400,
		position: 'relative'
	},
	actions: {
		justifyContent: 'flex-end'
	}
}))

const LatestAlerts = props => {
	const { className, alerts, ...rest } = props

	const classes = useStyles()
	const theme = useTheme()

	const getWeekDays = () => {
		let weekDays = []
		const startOfWeek = moment().startOf('week')

		Array(7).fill().map((each, i) => weekDays.push(moment(startOfWeek).add(i, 'days')))

		const labels = []
		weekDays.forEach(weekday => {
			labels.push(moment(weekday).format('DD MMM'))
		})

		return labels
	}

	const data = {
		labels: getWeekDays(),
		datasets: [
			{
				label: 'This year',
				backgroundColor: theme.palette.primary.main,
				data: alerts.thisYear
			},
			{
				label: 'Last year',
				backgroundColor: theme.palette.neutral,
				data: alerts.lastYear
			}
		]
	}

	const options = {
		animation: false,
		responsive: true,
		cornerRadius: 20,
		legend: { display: false },
		maintainAspectRatio: false,
		tooltips: {
			mode: 'index',
			enabled: true,
			borderWidth: 1,
			intersect: false,
			borderColor: theme.palette.divider,
			backgroundColor: theme.palette.white,
			titleFontColor: theme.palette.text.primary,
			bodyFontColor: theme.palette.text.secondary,
			footerFontColor: theme.palette.text.secondary
		},
		layout: { padding: 0 },
		scales: {
			xAxes: [
				{
					barThickness: 12,
					barPercentage: 0.5,
					maxBarThickness: 10,
					categoryPercentage: 0.5,
					ticks: {
						fontColor: theme.palette.text.secondary
					},
					gridLines: {
						display: false,
						drawBorder: false
					}
				}
			],
			yAxes: [
				{
					ticks: {
						min: 0,
						beginAtZero: true,
						fontColor: theme.palette.text.secondary
					},
					gridLines: {
						borderDash: [2],
						drawBorder: false,
						borderDashOffset: [2],
						color: theme.palette.divider,
						zeroLineBorderDash: [2],
						zeroLineBorderDashOffset: [2],
						zeroLineColor: theme.palette.divider
					}
				}
			]
		}
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Latest Alerts'
				subheader='Our current and expected alerts for this weeks frequency'
				action={
					<Button
						size='small'
						variant='text'>
						Last 7 days
					</Button>
				} />

			<Divider />

			<CardContent>
				<div className={classes.chartContainer}>
					<Bar
						data={data}
						options={options} />
				</div>
			</CardContent>
		</Card>
	)
}

LatestAlerts.propTypes = {
	className: PropTypes.string
}

export default LatestAlerts