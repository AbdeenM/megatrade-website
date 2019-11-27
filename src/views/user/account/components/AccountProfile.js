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
import {
	Card,
	Avatar,
	Button,
	Divider,
	Typography,
	CardActions,
	CardContent,
	LinearProgress
} from '@material-ui/core'

import { UserApi } from '../../../../config/Api'

const userApi = new UserApi()

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
	progress: {
		marginTop: theme.spacing(2)
	},
	locationText: {},
	dateText: {},
	uploadButton: {
		marginRight: theme.spacing(2)
	}
}))

const AccountProfile = props => {
	const { className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [profileState, setProfileState] = useState({
		city: '',
		status: '',
		avatar: '',
		country: '',
		lastName: '',
		firstName: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const toBase64 = file => {
		return new Promise(resolve => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => { resolve(reader.result) }
			reader.onerror = () => { return enqueueSnackbar('Error while uploading your picture, please try again', { variant: 'error' }) }
		})
	}

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })
		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState(profileState => ({
			...profileState,
			city: fetchAccountResult.data.city || '',
			avatar: fetchAccountResult.data.avatar || '',
			status: fetchAccountResult.data.status || '',
			country: fetchAccountResult.data.country || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || ''
		}))
	}

	const onUploadPicture = async event => {
		event.persist()

		const imageBase64 = await toBase64(event.target.files[0])

		const userId = localStorage.getItem('userId')
		const uploadPictureResult = await userApi.updateAccount({
			userId,
			avatar: {
				base64: true,
				image: imageBase64
			}
		})

		if (uploadPictureResult.error)
			return enqueueSnackbar(uploadPictureResult.message, { variant: 'error' })

		enqueueSnackbar(uploadPictureResult.message, { variant: 'success' })
		window.location.reload()
	}

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

				<div className={classes.progress}>
					<Typography variant='body1'>Account Status: {profileState.status}%</Typography>

					<LinearProgress
						variant='determinate'
						value={profileState.status} />
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