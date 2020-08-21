import Axios from 'axios'

import Constants from './Constants'

Axios.defaults.baseURL = `${Constants.SERVER_URL}/api`

class UserApi {
	constructor() {
		this.path = '/users'
	}

	register = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/register`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	login = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/login`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	socialLogin = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/socialLogin`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchAccount = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchAccount`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	updateAccount = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/updateAccount`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchStatistics = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchStatistics`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchSubscriptions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchSubscriptions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createSubscription = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createSubscription`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	cancelSubscription = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/cancelSubscription`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchSignals = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchSignals`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	checkSponsor = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/checkSponsor`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	getSponsor = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/getSponsor`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	forgotPassword = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/forgotPassword`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	resetPassword = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/resetPassword`, args)
			return data
		} catch (error) {
			throw error
		}
	}
}

class AdminApi {
	constructor() {
		this.path = '/admin'
	}

	register = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/register`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	login = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/login`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchAccount = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchAccount`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	updateAccount = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/updateAccount`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchUserDashboard = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchUserDashboard`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createUserDashboard = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createUserDashboard`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchSubscriptions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchSubscriptions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createSubscriptions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createSubscriptions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	removeSubscriptions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/removeSubscriptions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchUsersList = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchUsersList`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteUsers = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteUsers`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	editUser = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/editUser`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createUser = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createUser`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchSignals = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchSignals`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchFreeSignals = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchFreeSignals`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteSignals = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteSignals`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	editSignal = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/editSignal`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createSignal = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createSignal`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteFreeSignals = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteFreeSignals`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	editFreeSignal = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/editFreeSignal`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createFreeSignal = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createFreeSignal`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchStatistics = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchStatistics`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchLogs = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchLogs`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteLogs = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteLogs`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchQuestions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchQuestions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	replyQuestion = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/replyQuestion`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteQuestions = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteQuestions`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	fetchSponsors = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/fetchSponsors`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	createSponsors = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/createSponsors`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	editSponsors = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/editSponsors`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	deleteSponsors = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/deleteSponsors`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	messageUsers = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/messageUsers`, args)
			return data
		} catch (error) {
			throw error
		}
	}
}

class MiscellaneousApi {
	constructor() {
		this.path = '/miscellaneous'
	}

	twitterPost = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/twitterPost`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	facebook = async () => {
		try {
		} catch (error) {
			throw error
		}
	}

	newsLetter = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/newsLetter`, args)
			return data
		} catch (error) {
			throw error
		}
	}

	question = async args => {
		try {
			const { data } = await Axios.post(`${this.path}/question`, args)
			return data
		} catch (error) {
			throw error
		}
	}
}

export {
	UserApi,
	AdminApi,
	MiscellaneousApi
}