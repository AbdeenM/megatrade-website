/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	chartContainer: {
		height: '300px',
		position: 'relative'
	},
	stats: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(2)
	},
	device: {
		textAlign: 'center',
		padding: theme.spacing(1)
	},
	deviceIcon: {
		color: theme.palette.icon
	}
}))

const TradePie = props => {
	const { className, ...rest } = props

	const theme = useTheme()
	const classes = useStyles()

	const data = {
		datasets: [
			{
				data: [63, 15, 22],
				backgroundColor: [
					theme.palette.primary.main,
					theme.palette.error.main,
					theme.palette.warning.main
				],
				borderWidth: 8,
				borderColor: theme.palette.white,
				hoverBorderColor: theme.palette.white
			}
		],
		labels: ['Desktop', 'Tablet', 'Mobile']
	}

	const options = {
		animation: false,
		responsive: true,
		cutoutPercentage: 80,
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		layout: {
			padding: 0
		},
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
		}
	}

	const devices = [
		{
			title: 'Desktop',
			value: '63',
			color: theme.palette.primary.main
		},
		{
			title: 'Tablet',
			value: '15',
			color: theme.palette.error.main
		},
		{
			title: 'Mobile',
			value: '23',
			color: theme.palette.warning.main
		}
	]

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Trade Focus' />

			<Divider />

			<CardContent>
				<div className={classes.chartContainer}>
					<Doughnut
						data={data}
						options={options} />
				</div>

				<div className={classes.stats}>
					{
						devices.map(device => (
							<div
								key={device.title}
								className={classes.device}>
								<Typography
									variant='title'>
									{device.title}
								</Typography>

								<Typography
									variant='h2'
									style={{ color: device.color }}>
									{device.value}%
              					</Typography>
							</div>
						))
					}
				</div>
			</CardContent>
		</Card>
	)
}

TradePie.propTypes = {
	className: PropTypes.string
}

export default TradePie