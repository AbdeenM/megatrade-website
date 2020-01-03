/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

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