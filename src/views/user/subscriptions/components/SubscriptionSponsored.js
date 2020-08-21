import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, DialogContent, DialogContentText, Divider, Typography, CardContent, CardActions, Button, Dialog, DialogTitle, DialogActions, TextField, LinearProgress } from '@material-ui/core'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {},
	imageContainer: {
		width: 150,
		height: 150,
		display: 'flex',
		margin: '0 auto',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing(5)
	},
	image: {
		width: '100%'
	},
	paddingCode: {
		padding: '5%',
		marginTop: '5%',
		marginBottom: '5%'
	}
}))

const SubscriptionSponsored = props => {
	const { className, onGetSponsorCode, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(false)
	const [isEnteredCode, setIsEnteredCode] = useState(false)
	const [sponsorCodeState, setSponsorCodeState] = useState('')
	const [showSponsoredCodeDialog, setSponsoredCodeDialog] = useState(false)
	const [codeDetailsState, setCodeDetailsState] = useState({
		code: '',
		message: '',
		duration: '',
		durationPick: ''
	})

	const onCheckSponsorCode = async () => {
		setIsLoading(true)
		setIsEnteredCode(true)
		const checkSponsorCodeResult = await userApi.checkSponsor({ userId, code: sponsorCodeState.toUpperCase() })
		if (checkSponsorCodeResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(checkSponsorCodeResult.message, { variant: 'error' })
		}

		setCodeDetailsState(checkSponsorCodeResult.data)
		setIsLoading(false)
	}

	return (
		<div>
			<Card
				{...rest}
				className={clsx(classes.root, className)}>
				<CardContent>
					<div className={classes.imageContainer}>
						<img
							alt='subscription'
							className={classes.image}
							src='/images/logo-black.png' />
					</div>

					<Typography
						variant='h4'
						gutterBottom
						align='center'>
						Sponsored Membership
					</Typography>

					<Typography
						gutterBottom
						align='center'
						variant='body1'>
						Enter the sponsored code and get your premium membership.
					</Typography>
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						fullWidth
						color='primary'
						variant='outlined'
						onClick={() => setSponsoredCodeDialog(true)}
						disabled={props.membership === 'Sponsored Membership'}>
						{props.membership === 'Sponsored Membership' ? 'CURRENT MEMBERSHIP' : 'GET SPONSORED MEMBERSHIP'}
					</Button>
				</CardActions>
			</Card>

			<Dialog
				open={showSponsoredCodeDialog}
				onClose={() => setSponsoredCodeDialog(false)}>
				<DialogTitle>Sponsored Membership</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Enter your sponsored code here:
          			</DialogContentText>

					<TextField
						fullWidth
						name='sponsor'
						margin='normal'
						variant='outlined'
						label='Sponsor Code'
						value={sponsorCodeState}
						inputProps={{ style: { textTransform: 'uppercase' } }}
						onChange={event => setSponsorCodeState(event.target.value)} />

					{isLoading
						? <LinearProgress color='primary' />
						: <Fragment />}

					{isEnteredCode && !isLoading
						? <Fragment>
							{codeDetailsState.message.length > 0
								? <Fragment>
									<Typography gutterBottom color='secondary' variant='h6'>{codeDetailsState.message}</Typography>
								</Fragment>
								: <div className={classes.paddingCode}>
									<Typography gutterBottom>Code: {codeDetailsState.code}</Typography>
									<Typography gutterBottom>Duration: {codeDetailsState.duration} {codeDetailsState.durationPick}</Typography>

									<Button
										fullWidth
										color='primary'
										variant='outlined'
										disabled={sponsorCodeState.length < 1}
										onClick={() => onGetSponsorCode(codeDetailsState.code, codeDetailsState.duration, codeDetailsState.durationPick)}>
										USE CODE
									</Button>
								</div>}
						</Fragment>
						: <Fragment />}
				</DialogContent>

				<DialogActions>
					<Button
						fullWidth
						color='primary'
						variant='contained'
						onClick={onCheckSponsorCode}
						disabled={sponsorCodeState.length < 1}>
						CHECK SPONSOREDED CODE
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

SubscriptionSponsored.propTypes = {
	className: PropTypes.string
}

export default SubscriptionSponsored