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
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: theme.spacing(2)
	},
	option: {
		textAlign: 'center',
		padding: theme.spacing(1)
	},
	optionIcon: {
		color: theme.palette.icon
	}
}))

const TradePie = props => {
	const { className, focus, ...rest } = props

	const theme = useTheme()
	const classes = useStyles()

	const data = {
		datasets: [
			{
				borderWidth: 8,
				data: focus.data,
				borderColor: theme.palette.background.paper,
				hoverBorderColor: theme.palette.background.paper,
				backgroundColor: focus.backgroundColor
			}
		],
		labels: focus.labels
	}

	const options = {
		animation: false,
		responsive: true,
		cutoutPercentage: 70,
		maintainAspectRatio: false,
		legend: {
			display: true,
			labels: {
				fontColor: theme.palette.text.primary
			}
		},
		layout: {
			padding: 0
		},
		tooltips: {
			mode: 'index',
			enabled: false,
			borderWidth: 1,
			intersect: false,
			borderColor: theme.palette.divider,
			backgroundColor: theme.palette.background.paper,
			titleFontColor: theme.palette.text.primary,
			bodyFontColor: theme.palette.text.secondary,
			footerFontColor: theme.palette.text.secondary
		}
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Trade Focus'
				subheader='Our current trade option focus' />

			<Divider />

			<CardContent>
				<div className={classes.chartContainer}>
					<Doughnut
						data={data}
						options={options} />
				</div>

				<div className={classes.stats}>
					{
						focus.labels.map((option, i) => (
							<div
								key={i}
								className={classes.option}>
								<Typography
									variant='body1'>
									{option}
								</Typography>

								<Typography
									variant='h2'
									style={{ color: focus.backgroundColor[i] }}>
									{focus.data[i]}%
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