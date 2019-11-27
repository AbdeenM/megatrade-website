/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import AccountDetails from './components/AccountDetails'
import AccountProfile from './components/AccountProfile'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Account = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={4}
					md={6}
					xl={4}
					xs={12}>
					<AccountProfile />
				</Grid>

				<Grid
					item
					lg={8}
					md={6}
					xl={8}
					xs={12}>
					<AccountDetails />
				</Grid>
			</Grid>
		</div>
	)
}

export default Account