/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	Grid,
	Button,
	Divider,
	Checkbox,
	CardHeader,
	Typography,
	CardContent,
	CardActions,
	FormControlLabel
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

const Alerts = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					title='Alerts'
					subheader='Manage how you want to recieve your notifications' />

				<Divider />

				<CardContent>
					<Grid
						container
						wrap='wrap'
						spacing={6}>
						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							className={classes.item}>
							<Typography
								variant='h6'
								gutterBottom>
								Alerts
              				</Typography>

							<FormControlLabel
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />

							<FormControlLabel
								label='Email'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />

							<FormControlLabel
								label='Text Messages'
								control={
									<Checkbox
										color='primary' />
								} />

							<FormControlLabel
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />
						</Grid>

						<Grid
							item
							md={4}
							sm={6}
							xs={12}
							className={classes.item}>
							<Typography
								variant='h6'
								gutterBottom>
								Promotions
              				</Typography>

							<FormControlLabel
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />

							<FormControlLabel
								label='Email'
								control={
									<Checkbox
										color='primary' />
								} />

							<FormControlLabel
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />

							<FormControlLabel
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										defaultChecked />
								} />
						</Grid>
					</Grid>
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='outlined'>
						Save
         			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

Alerts.propTypes = {
	className: PropTypes.string
}

export default Alerts