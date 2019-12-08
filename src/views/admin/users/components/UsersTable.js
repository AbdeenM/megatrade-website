/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CardActions, CardContent, Avatar, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, TablePagination } from '@material-ui/core'

import getInitials from '../../../../helpers/getInitials'

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 1050
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		marginRight: theme.spacing(2)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}))

const UsersTable = props => {
	const { className, users, ...rest } = props

	const classes = useStyles()

	const [selectedUsers, setSelectedUsers] = useState([])
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [page, setPage] = useState(0)

	const onSelectAll = event => {
		const { users } = props

		let selectedUsers

		if (event.target.checked)
			selectedUsers = users.map(user => user._id)
		else
			selectedUsers = []


		setSelectedUsers(selectedUsers)
	}

	const onSelectOne = (event, id) => {
		const selectedIndex = selectedUsers.indexOf(id)
		let newSelectedUsers = []

		if (selectedIndex === -1) {
			newSelectedUsers = newSelectedUsers.concat(selectedUsers, id)
		} else if (selectedIndex === 0) {
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1))
		} else if (selectedIndex === selectedUsers.length - 1) {
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelectedUsers = newSelectedUsers.concat(
				selectedUsers.slice(0, selectedIndex),
				selectedUsers.slice(selectedIndex + 1)
			)
		}

		setSelectedUsers(newSelectedUsers)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(event.target.value)
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell padding='checkbox'>
										<Checkbox
											color='primary'
											onChange={onSelectAll}
											checked={selectedUsers.length === users.length}
											indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length} />
									</TableCell>

									<TableCell>Name</TableCell>

									<TableCell>Package</TableCell>

									<TableCell>Email</TableCell>

									<TableCell>Location</TableCell>

									<TableCell>Phone</TableCell>

									<TableCell>Registration date</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{
									users.slice(0, rowsPerPage).map(user => (
										<TableRow
											className={classes.tableRow}
											hover
											key={user._id}
											selected={selectedUsers.indexOf(user._id) !== -1}>
											<TableCell padding='checkbox'>
												<Checkbox
													value='true'
													color='primary'
													checked={selectedUsers.indexOf(user._id) !== -1}
													onChange={event => onSelectOne(event, user._id)} />
											</TableCell>

											<TableCell>
												<div className={classes.nameContainer}>
													<Avatar
														src={user.avatar}
														className={classes.avatar}>
														{getInitials(user.firstName + ' ' + user.lastName)}
													</Avatar>

													<Typography variant='body1'>{user.firstName + ' ' + user.lastName}</Typography>
												</div>
											</TableCell>

											<TableCell>{user.package}</TableCell>

											<TableCell>{user.email}</TableCell>

											<TableCell>
												{user.city}, {user.country}
											</TableCell>

											<TableCell>{user.number}</TableCell>

											<TableCell>
												{moment(user.joinedAt).format('DD/MM/YYYY')}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>

			<CardActions className={classes.actions}>
				<TablePagination
					page={page}
					component='div'
					count={users.length}
					rowsPerPage={rowsPerPage}
					onChangePage={onPageChange}
					rowsPerPageOptions={[5, 10, 25]}
					onChangeRowsPerPage={onRowsPerPageChange} />
			</CardActions>
		</Card>
	)
}

UsersTable.propTypes = {
	className: PropTypes.string,
	users: PropTypes.array.isRequired
}

export default UsersTable