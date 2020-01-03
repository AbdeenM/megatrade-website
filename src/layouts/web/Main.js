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

import Footer from './components/Footer'

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		height: '100%'
	}
}))

const Main = props => {
	const { children } = props

	const classes = useStyles()

	return (
		<div className={clsx({ [classes.root]: true })}>
			<main className={classes.content}>
				{children}

				<Footer />
			</main>
		</div>
	)
}

Main.propTypes = {
	children: PropTypes.node
}

export default Main