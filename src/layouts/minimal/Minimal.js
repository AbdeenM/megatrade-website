/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import Topbar from './components/Topbar'

const useStyles = makeStyles(() => ({
	root: {
		height: '100%',
		paddingTop: 64
	},
	content: {
		height: '100%'
	}
}))

const Minimal = props => {
	const { children } = props

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Topbar />

			<main className={classes.content}>{children}</main>
		</div>
	)
}

Minimal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
}

export default Minimal