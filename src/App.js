import React from 'react'
import ReactGA from 'react-ga'
import Validate from 'validate.js'
import { Chart } from 'react-chartjs-2'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { createBrowserHistory } from 'history'
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core'

import theme from './theme'
import Routes from './Routes'
import './assets/scss/index.scss'
import Chartjs from './helpers/chartjs'
import Constants from 'config/Constants'
import Validators from './common/Validators'

import 'animate.css/animate.css'
import 'vendors/slick/slick.css'
import 'vendors/animate-extends.css'
import 'vendors/page-transition.css'
import 'vendors/slick/slick-theme.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const browserHistory = createBrowserHistory()

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
	draw: Chartjs.draw
})

Validate.validators = {
	...Validate.validators,
	...Validators
}

let themeType = 'light'
if (typeof Storage !== 'undefined')
	themeType = localStorage.getItem('theme') || 'light'

export default class App extends React.Component {
	state = {
		mainTheme: {
			...theme('main', themeType)
		},
		isFirstMessage: true,
		botResponse: 'Thank you for visiting our website! One of our team members will get back to you shortly. In the mean time feel free to create a free account and check out your personal dashboard.'
	}

	componentDidMount = () => {
		ReactGA.initialize(Constants.GOOGLE_TRACKING_ID, {
			gaOptions: {
				userId: localStorage.getItem('userId') || '-'
			}
		})

		ReactGA.pageview(window.location.pathname + window.location.search)

		browserHistory.listen(location => {
			ReactGA.set({ page: location.pathname })
			ReactGA.pageview(location.pathname)
		})
	}

	toggleDarkTheme = () => {
		const { mainTheme } = this.state
		const newPaletteType = mainTheme.palette.type === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', mainTheme.palette.type === 'light' ? 'dark' : 'light')

		this.setState({
			mainTheme: {
				...theme('main', newPaletteType),
				direction: theme.direction
			}
		})
	}

	toggleDirection = dir => {
		const { mainTheme } = this.state
		document.dir = dir

		this.setState({
			mainTheme: {
				...mainTheme,
				direction: dir,
				palette: {
					...mainTheme.palette
				}
			}
		})
	}

	render() {
		const { mainTheme } = this.state
		const appTheme = createMuiTheme(mainTheme)

		return (
			<MuiThemeProvider theme={appTheme}>
				<CssBaseline />

				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
					<Router history={browserHistory}>
						<div id='main-wrap'>
							<Routes
								onToggleDir={this.toggleDirection}
								onToggleDark={this.toggleDarkTheme} />
						</div>
					</Router>
				</SnackbarProvider>
			</MuiThemeProvider>
		)
	}
}