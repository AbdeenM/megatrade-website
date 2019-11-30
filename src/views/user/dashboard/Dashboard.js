/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Budget from './components/Budget'
import TotalPips from './components/TotalPips'
import TotalUsers from './components/TotalUsers'
import TotalProfits from './components/TotalProfits'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Dashboard = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<Budget />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalUsers />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalPips />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalProfits />
				</Grid>
			</Grid>
		</div>
	)
}

export default Dashboard