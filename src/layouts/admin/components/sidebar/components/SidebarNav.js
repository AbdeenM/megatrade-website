import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink as RouterLink } from 'react-router-dom'
import { List, ListItem, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		paddingTop: 0,
		display: 'flex',
		paddingBottom: 0
	},
	button: {
		width: '100%',
		letterSpacing: 0,
		padding: '10px 8px',
		textTransform: 'none',
		color: theme.palette.text,
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
		<List
			{...rest}
			className={clsx(classes.root, className)}>
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
	)
}

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
}

export default SidebarNav