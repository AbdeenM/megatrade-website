import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'
import QuestionsTable from './components/QuestionsTable'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Questions = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [questionsState, setQuestionsState] = useState([])

	useEffect(() => {
		fetchQuestionsList()
	}, [])

	const fetchQuestionsList = async () => {
		const fetchQuestionsListResult = await adminApi.fetchQuestions({ adminId })
		if (fetchQuestionsListResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchQuestionsListResult.message, { variant: 'error' })
		}

		setQuestionsState(fetchQuestionsListResult.data)
		setIsLoading(false)
	}

	const reloadData = () => fetchQuestionsList()

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={10}>
				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<QuestionsTable
						reloadData={reloadData}
						questions={questionsState} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Questions