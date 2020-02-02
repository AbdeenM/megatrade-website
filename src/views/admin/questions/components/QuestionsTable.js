/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import moment from 'moment'
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ExpandIcon from '@material-ui/icons/ExpandMore'
import { Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

const schema = {
	message: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 15000
		}
	}
}

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
	deleteButton: {
		marginRight: theme.spacing(1)
	},
	editButton: {
		marginRight: theme.spacing(9)
	},
	searchInput: {
		marginRight: theme.spacing(1),
		backgroundColor: theme.palette.background.paper
	},
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
	},
	image: {
		width: 150,
		height: 150
	},
	imageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing(2)
	},
	checkboxes: {
		marginTop: theme.spacing(5)
	},
	rowStatus: {
		display: 'flex',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	rowSignalStatus: {
		marginLeft: 'auto'
	},
	membership: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}))

const QuestionsTable = props => {
	const { className, questions, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [page, setPage] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchState, setSearchState] = useState('')
	const [allQuestions, setAllQuestions] = useState([])
	const [listedQuestions, setListedQuestions] = useState([])
	const [selectedQuestions, setSelectedQuestions] = useState([])
	const [showReplyQuestionDialog, setShowReplyQuestionDialog] = useState(false)
	const [questionState, setQuestionState] = useState({
		errors: {},
		values: {
			name: '',
			email: '',
			message: '',
			questionId: '',
			messageRecieved: ''
		},
		touched: {},
		isValid: false,
		isChanged: false
	})

	useEffect(() => {
		setAllQuestions(questions)
		setListedQuestions(questions)
	}, [questions])

	useEffect(() => {
		const errors = Validate(questionState.values, schema)

		setQuestionState(questionState => ({
			...questionState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [questionState.values])

	const onChangeText = event => {
		event.persist()

		setQuestionState(questionState => ({
			...questionState,
			values: {
				...questionState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...questionState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onChangeSearch = event => {
		setSearchState(event.target.value)

		const searchTerm = event.target.value.toLowerCase()

		setListedQuestions(allQuestions.filter(question => question.name.toLowerCase().includes(searchTerm) || question.email.toLowerCase().includes(searchTerm)))
	}

	const onSelectAll = event => {
		const { questions } = props

		let selectedQuestions

		if (event.target.checked)
			selectedQuestions = questions.map(question => question._id)
		else
			selectedQuestions = []

		setSelectedQuestions(selectedQuestions)
	}

	const onSelectOne = (event, id) => {
		const selectedIndex = selectedQuestions.indexOf(id)
		let newSelectedQuestions = []

		if (selectedIndex === -1)
			newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions, id)
		else if (selectedIndex === 0)
			newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions.slice(1))
		else if (selectedIndex === selectedQuestions.length - 1)
			newSelectedQuestions = newSelectedQuestions.concat(selectedQuestions.slice(0, -1))
		else if (selectedIndex > 0) {
			newSelectedQuestions = newSelectedQuestions.concat(
				selectedQuestions.slice(0, selectedIndex),
				selectedQuestions.slice(selectedIndex + 1)
			)
		}

		setSelectedQuestions(newSelectedQuestions)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const onReplyQuestionClick = () => {
		let questionDetails = allQuestions.filter(question => question._id === selectedQuestions[0])[0]

		setQuestionState(questionState => ({
			...questionState,
			errors: {},
			values: {
				...questionState.values,
				message: '',
				name: questionDetails.name,
				email: questionDetails.email,
				questionId: questionDetails._id,
				messageRecieved: questionDetails.message
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setShowReplyQuestionDialog(true)
	}

	const onSendMessage = async () => {
		setIsLoading(true)
		const replyQuestionResult = await adminApi.replyQuestion({
			adminId,
			email: questionState.values.email,
			message: questionState.values.message,
			questionId: questionState.values.questionId
		})

		if (replyQuestionResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(replyQuestionResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		setShowReplyQuestionDialog(false)
		enqueueSnackbar(replyQuestionResult.message, { variant: 'success' })
		reloadData()
	}

	const onDeleteQuestions = async () => {
		setIsLoading(true)
		const deleteQuestionsResult = await adminApi.deleteQuestions({
			adminId,
			questions: selectedQuestions
		})

		if (deleteQuestionsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(deleteQuestionsResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		enqueueSnackbar(deleteQuestionsResult.message, { variant: 'success' })
		reloadData()
	}

	const hasError = field =>
		questionState.touched[field] && questionState.errors[field] ? true : false

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<div>
				<div className={classes.row}>
					<TextField
						margin='normal'
						name='questions'
						variant='outlined'
						value={searchState}
						label='Search Questions'
						className={classes.searchInput}
						onChange={onChangeSearch} />

					<span className={classes.spacer} />

					<Button
						color='secondary'
						variant='contained'
						onClick={onDeleteQuestions}
						className={classes.deleteButton}
						disabled={selectedQuestions.length < 1}>DELETE</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onReplyQuestionClick}
						className={classes.editButton}
						disabled={selectedQuestions.length > 1 || selectedQuestions.length < 1}>REPLY</Button>
				</div>

				<div className={classes.row} />
			</div>

			<Card>
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
												checked={selectedQuestions.length === questions.length}
												indeterminate={selectedQuestions.length > 0 && selectedQuestions.length < questions.length} />
										</TableCell>

										<TableCell>Questions</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										listedQuestions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((question, i) => (
											<TableRow
												hover
												key={i}
												selected={selectedQuestions.indexOf(question._id) !== -1}>
												<TableCell padding='checkbox'>
													<Checkbox
														value='true'
														color='primary'
														onChange={event => onSelectOne(event, question._id)}
														checked={selectedQuestions.indexOf(question._id) !== -1} />
												</TableCell>

												<TableCell>
													<ExpansionPanel>
														<ExpansionPanelSummary
															expandIcon={<ExpandIcon />}
															aria-controls='panella-conent'>
															<Typography color={question.isReplied ? 'inherit' : 'primary'} variant='subtitle1'>
																{question.name} | {question.email} | {`${question.number ? `${question.number} |` : ' '}`} {question.company ? `Company: ${question.company} |` : ' '} Sent on: {moment(question.createdAt).format('DD/MM/YYYY')} at {moment(question.createdAt).format('hh:mm')}
															</Typography>
														</ExpansionPanelSummary>

														<ExpansionPanelDetails>
															<Typography variant='subtitle2' gutterBottom>
																{question.message}
															</Typography>
														</ExpansionPanelDetails>
													</ExpansionPanel>
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
						count={questions.length}
						rowsPerPage={rowsPerPage}
						onChangePage={onPageChange}
						rowsPerPageOptions={[10, 50, 100, 300]}
						onChangeRowsPerPage={onRowsPerPageChange} />
				</CardActions>
			</Card>

			<Dialog
				open={showReplyQuestionDialog}
				onClose={() => setShowReplyQuestionDialog(false)}>
				<DialogTitle>Reply to the message</DialogTitle>

				<DialogContent>
					<DialogContentText>
						This message will be delivered to the recipent with the respective email.
          			</DialogContentText>
					<TextField
						disabled
						fullWidth
						name='name'
						label='Name'
						margin='normal'
						variant='outlined'
						value={questionState.values.name} />

					<TextField
						disabled
						fullWidth
						name='email'
						label='Email'
						margin='normal'
						variant='outlined'
						value={questionState.values.email} />

					<TextField
						disabled
						fullWidth
						multiline
						margin='normal'
						variant='outlined'
						name='theirMessage'
						label='Their Message'
						value={questionState.values.messageRecieved} />

					<TextField
						required
						fullWidth
						multiline
						name='message'
						label='Message'
						margin='normal'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('message')}
						value={questionState.values.message}
						helperText={
							hasError('message') ? questionState.errors.message[0] : null
						} />
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setShowReplyQuestionDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onSendMessage}
						disabled={!questionState.isChanged || hasError('message') || questionState.values.message.length < 1}>
						SEND MESSAGE
         			 </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

QuestionsTable.propTypes = {
	className: PropTypes.string,
	questions: PropTypes.array.isRequired
}

export default QuestionsTable