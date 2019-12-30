/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, Divider, Checkbox, CardHeader, Typography, CardContent, CardActions, FormControlLabel, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(() => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
}))

const Alerts = props => {
	const { className, notifications, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(false)
	const [profileState, setProfileState] = useState({
		notifications: {
			alerts: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			},
			promotions: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			},
			partnerPromotions: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			}
		},
		isChanged: false
	})

	useEffect(() => {
		setProfileState(profileState => ({
			...profileState,
			notifications
		}))
	}, [notifications])

	const onChangeAlerts = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			notifications: {
				...profileState.notifications,
				alerts: {
					...profileState.notifications.alerts,
					[event.target.name]: event.target.checked
				}
			},
			isChanged: true
		}))
	}

	const onChangePromotions = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			notifications: {
				...profileState.notifications,
				promotions: {
					...profileState.notifications.promotions,
					[event.target.name]: event.target.checked
				}
			},
			isChanged: true
		}))
	}

	const onChangePartnerPromotions = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			notifications: {
				...profileState.notifications,
				partnerPromotions: {
					...profileState.notifications.partnerPromotions,
					[event.target.name]: event.target.checked
				}
			},
			isChanged: true
		}))
	}

	const onSaveDetails = async () => {
		setIsLoading(true)
		const saveResult = await userApi.updateAccount({
			userId,
			notifications: profileState.notifications
		})

		if (saveResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		enqueueSnackbar(saveResult.message, { variant: 'success' })
		window.location.reload()
	}

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					title='Notifications'
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
								Signal Alerts
              				</Typography>

							<FormControlLabel
								name='dashboard'
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.dashboard} />
								} />

							<FormControlLabel
								name='email'
								label='Email'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.email} />
								} />

							<FormControlLabel
								name='textMessages'
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.textMessages} />
								} />

							<FormControlLabel
								name='phoneCalls'
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										onChange={onChangeAlerts}
										checked={profileState.notifications.alerts.phoneCalls} />
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
								Mega Trade Promotions
              				</Typography>

							<FormControlLabel
								name='dashboard'
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.dashboard} />
								} />

							<FormControlLabel
								name='email'
								label='Email'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.email} />
								} />

							<FormControlLabel
								name='textMessages'
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.textMessages} />
								} />

							<FormControlLabel
								name='phoneCalls'
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePromotions}
										checked={profileState.notifications.promotions.phoneCalls} />
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
								Our Partner Promotions
              				</Typography>

							<FormControlLabel
								name='dashboard'
								label='Dashboard'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePartnerPromotions}
										checked={profileState.notifications.partnerPromotions.dashboard} />
								} />

							<FormControlLabel
								name='email'
								label='Email'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePartnerPromotions}
										checked={profileState.notifications.partnerPromotions.email} />
								} />

							<FormControlLabel
								name='textMessages'
								label='Text Messages'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePartnerPromotions}
										checked={profileState.notifications.partnerPromotions.textMessages} />
								} />

							<FormControlLabel
								name='phoneCalls'
								label='Phone Calls'
								control={
									<Checkbox
										color='primary'
										onChange={onChangePartnerPromotions}
										checked={profileState.notifications.partnerPromotions.phoneCalls} />
								} />
						</Grid>
					</Grid>
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onSaveDetails}
						disabled={!profileState.isChanged}>
						Save Details
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