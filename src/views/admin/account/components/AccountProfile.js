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
import { Card, Avatar, Button, Divider, Typography, CardActions, CardContent, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from '../../../../config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		width: 100,
		height: 110,
		flexGrow: 0,
		flexShrink: 0,
		marginLeft: 'auto'
	},
	locationText: {},
	dateText: {},
	uploadButton: {
		marginRight: theme.spacing(2)
	}
}))

const AccountProfile = props => {
	const { className, profile, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(false)
	const [profileState, setProfileState] = useState({
		city: '',
		avatar: '',
		country: '',
		lastName: '',
		firstName: ''
	})

	useEffect(() => {
		setProfileState(profileState => ({
			...profileState,
			city: profile.city,
			avatar: profile.avatar,
			country: profile.country,
			lastName: profile.lastName,
			firstName: profile.firstName
		}))
	}, [profile])

	const toBase64 = file => {
		return new Promise(resolve => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => { resolve(reader.result) }
			reader.onerror = () => { return enqueueSnackbar('Error while uploading your picture, please try again', { variant: 'error' }) }
		})
	}

	const onUploadPicture = async event => {
		event.persist()

		const imageBase64 = await toBase64(event.target.files[0])

		setIsLoading(true)
		const uploadPictureResult = await adminApi.updateAccount({
			adminId,
			avatar: {
				base64: true,
				image: imageBase64
			}
		})

		if (uploadPictureResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(uploadPictureResult.message, { variant: 'error' })
		}

		enqueueSnackbar(uploadPictureResult.message, { variant: 'success' })
		setIsLoading(false)
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
			<CardContent>
				<div className={classes.details}>
					<div>
						<Typography
							variant='h2'
							gutterBottom>
							{profileState.firstName + ' ' + profileState.lastName}
						</Typography>

						{
							profileState.city || profileState.country
								? <Typography
									variant='body1'
									color='textSecondary'
									className={classes.locationText}>
									{profileState.city ? profileState.city : ''}, {profileState.country ? profileState.country : ''}
								</Typography>
								: <div />
						}

						<Typography
							variant='body1'
							color='textSecondary'
							className={classes.dateText}>
							{new Date().toTimeString()}
						</Typography>
					</div>

					<Avatar
						className={classes.avatar}
						src={profileState.avatar || '/images/profile-avatar.png'} />
				</div>
			</CardContent>

			<Divider />

			<CardActions>
				<input
					type='file'
					accept='image/*'
					id='upload-image'
					onChange={onUploadPicture}
					style={{ display: 'none' }} />

				<label htmlFor='upload-image'>
					<Button
						variant='text'
						color='primary'
						component='span'
						className={classes.uploadButton}>
						Upload picture
					</Button>
				</label>
			</CardActions>
		</Card>
	)
}

AccountProfile.propTypes = {
	className: PropTypes.string
}

export default AccountProfile