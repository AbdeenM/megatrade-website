/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SearchInput from '../../../../components/SearchInput'

const useStyles = makeStyles(theme => ({
	root: {},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	},
	spacer: {
		flexGrow: 1
	},
	importButton: {
		marginRight: theme.spacing(1)
	},
	exportButton: {
		marginRight: theme.spacing(1)
	},
	searchInput: {
		marginRight: theme.spacing(1)
	}
}))

const SubscriptionToolbar = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<div className={classes.row}>
				<span className={classes.spacer} />
				<Button className={classes.importButton}>Import</Button>

				<Button className={classes.exportButton}>Export</Button>

				<Button
					color='primary'
					variant='contained'>
					Add subscription
        		</Button>
			</div>

			<div className={classes.row}>
				<SearchInput
					className={classes.searchInput}
					placeholder='Search subscription' />
			</div>
		</div>
	)
}

SubscriptionToolbar.propTypes = {
	className: PropTypes.string
}

export default SubscriptionToolbar