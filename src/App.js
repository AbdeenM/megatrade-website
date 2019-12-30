/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import Validate from 'validate.js'
import { Chart } from 'react-chartjs-2'
import { Router } from 'react-router-dom'
import 'react-chat-widget/lib/styles.css'
import { SnackbarProvider } from 'notistack'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@material-ui/styles'
import { Widget, addResponseMessage } from 'react-chat-widget'

import theme from './theme'
import Routes from './Routes'
import './assets/scss/index.scss'
import Chartjs from './helpers/chartjs'
import Validators from './common/Validators'
import 'react-perfect-scrollbar/dist/css/styles.css'

const browserHistory = createBrowserHistory()

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
	draw: Chartjs.draw
})

Validate.validators = {
	...Validate.validators,
	...Validators
}

export default class App extends React.Component {
	state = {
		isFirstMessage: true,
		botResponse: 'Thank you for visiting our website! One of our team members will get back to you shortly. In the mean time feel free to create a free account and checkout your personal dashboard.'
	}

	onUserMessage = message => {
		console.log(`New message incoming! ${message}`)
		console.log(localStorage.getItem('userId'))

		if (this.state.isFirstMessage)
			this.setState({ isFirstMessage: false }, () => setTimeout(() => addResponseMessage(this.state.botResponse), 2000))
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
					<Router history={browserHistory}>
						<Widget
							title='Mega Trade Chat'
							subtitle='Got any questions for us?'
							profileAvatar='/images/chat-avatar.png'
							titleAvatar='/images/chat-header-logo.png'
							handleNewUserMessage={() => this.onUserMessage()} />

						<Routes />
					</Router>
				</SnackbarProvider>
			</ThemeProvider>
		)
	}
}