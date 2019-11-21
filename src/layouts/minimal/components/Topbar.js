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
import { AppBar, Toolbar } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(() => ({
	root: {
		boxShadow: 'none'
	}
}))

const Topbar = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<AppBar
			{...rest}
			color='primary'
			position='fixed'
			className={clsx(classes.root, className)}>
			<Toolbar>
				<RouterLink to='/'>
					<img
						alt='logo'
						src='/images/logo_white.png' />
				</RouterLink>
			</Toolbar>
		</AppBar>
	)
}

Topbar.propTypes = {
	className: PropTypes.string
}

export default Topbar