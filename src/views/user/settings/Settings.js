/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Alerts from './components/Alerts'
import Password from './components/Password'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Settings = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					md={7}
					xs={12}>
					<Alerts />
				</Grid>

				<Grid
					item
					md={5}
					xs={12}>
					<Password />
				</Grid>
			</Grid>
		</div>
	)
}

export default Settings