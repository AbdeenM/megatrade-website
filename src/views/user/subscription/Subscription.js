/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { IconButton, Grid, Typography } from '@material-ui/core'

import mockData from './data'
import SubscriptionCard from './components/SubscriptionCard'

import SearchInput from '../../../components/SearchInput'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	},
	content: {
		marginTop: theme.spacing(2)
	},
	pagination: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(3)
	}
}))

const SubscriptionList = () => {
	const classes = useStyles()

	const [subscription] = useState(mockData)

	const onChange = () => {
		console.log('======');

	}

	return (
		<div className={classes.root}>
			<div className={classes.row}>
				<SearchInput
					onChange={onChange}
					placeholder='Search Packages'
					className={classes.searchInput} />
			</div>

			<div className={classes.content}>
				<Grid
					container
					spacing={3}>
					{
						subscription.map(subscription => (
							<Grid
								item
								lg={4}
								md={6}
								xs={12}
								key={subscription.id}>
								<SubscriptionCard subscription={subscription} />
							</Grid>
						))
					}
				</Grid>
			</div>

			<div className={classes.pagination}>
				<Typography variant='caption'>1-6 of 20</Typography>

				<IconButton>
					<ChevronLeftIcon />
				</IconButton>

				<IconButton>
					<ChevronRightIcon />
				</IconButton>
			</div>
		</div>
	)
}

export default SubscriptionList