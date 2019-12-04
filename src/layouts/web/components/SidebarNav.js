/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink as RouterLink } from 'react-router-dom'
import { List, ListItem, Button, colors, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {},
	imageContainer: {
		width: 64,
		height: 64,
		display: 'flex',
		margin: '0 auto',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {},
	company: {
		marginTop: theme.spacing(4),
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(3)
		}
	},
	item: {
		paddingTop: 0,
		display: 'flex',
		paddingBottom: 0
	},
	buttonContainer: {
		marginTop: '50%'
	},
	button: {
		width: '100%',
		letterSpacing: 0,
		padding: '10px 8px',
		textTransform: 'none',
		color: colors.blueGrey[800],
		justifyContent: 'flex-start',
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.icon,
		marginRight: theme.spacing(1)
	},
	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		'& $icon': {
			color: theme.palette.primary.main
		}
	}
}))

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style={{ flexGrow: 1 }}>
		<RouterLink {...props} />
	</div>
))

const SidebarNav = props => {
	const { pages, className, ...rest } = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root)}>
			<div className={classes.imageContainer}>
				<img
					alt='logo'
					className={classes.curvyLines}
					src='/images/sidebar-logo.png' />
			</div>

			<Typography
				variant='h3'
				align='center'
				color='inherit'
				className={classes.company}>
				MEGA TRADE
      		</Typography>

			<List
				{...rest}
				className={clsx(classes.buttonContainer, className)}>
				{
					pages.map(page => (
						<ListItem
							disableGutters
							key={page.title}
							className={classes.item}>
							<Button
								to={page.href}
								className={classes.button}
								component={CustomRouterLink}
								activeClassName={classes.active}>
								<div className={classes.icon}>{page.icon}</div>
								{page.title}
							</Button>
						</ListItem>
					))
				}
			</List>
		</div>
	)
}

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
}

export default SidebarNav