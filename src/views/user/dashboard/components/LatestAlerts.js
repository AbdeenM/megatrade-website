/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core'

import { data, options } from './components/Chart'

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

const LatestSales = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Latest Alerts'
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

LatestSales.propTypes = {
	className: PropTypes.string
}

export default LatestSales