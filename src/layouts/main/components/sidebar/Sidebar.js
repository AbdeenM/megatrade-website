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
import EducationIcon from '@material-ui/icons/Book'
import { Divider, Drawer } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SubscriptionIcon from '@material-ui/icons/Payment'
import AccountIcon from '@material-ui/icons/AccountCircle'

import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import { UserApi } from '../../../../config/Api'
import UpgradePlan from './components/UpgradePlan'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		backgroundColor: theme.palette.white
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	}
}))

const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [profileState, setProfileState] = useState({
		avatar: '',
		lastName: '',
		firstName: '',
		membership: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })
		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState({
			...profileState,
			avatar: fetchAccountResult.data.avatar || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || '',
			membership: fetchAccountResult.data.membership || ''
		})
	}

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			title: 'Education',
			href: '/education',
			icon: <EducationIcon />
		},
		{
			title: 'Account',
			href: '/account',
			icon: <AccountIcon />
		},
		{
			title: 'Subscription',
			href: '/subscription',
			icon: <SubscriptionIcon />
		}
	]

	return (
		<Drawer
			open={open}
			anchor='left'
			onClose={onClose}
			variant={variant}
			classes={{ paper: classes.drawer }}>
			<div
				{...rest}
				className={clsx(classes.root, className)}>
				<Profile profile={profileState} />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={pages}
					className={classes.nav} />

				{
					profileState.membership === 'Free Member'
						? <UpgradePlan />
						: <div />
				}
			</div>
		</Drawer>
	)
}

Sidebar.propTypes = {
	onClose: PropTypes.func,
	className: PropTypes.string,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
}

export default Sidebar