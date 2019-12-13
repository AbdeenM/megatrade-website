/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import axios from 'axios'

import Constants from './Constants'

axios.defaults.baseURL = `${Constants.SERVER_URL}/api`

class UserApi {
    constructor() {
        this.path = '/users'
    }

    register = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/register`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    login = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/login`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    socialLogin = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/socialLogin`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchAccount = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchAccount`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    updateAccount = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/updateAccount`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchStatistics = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchStatistics`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchSubscriptions = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchSubscriptions`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createSubscription = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createSubscription`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    cancelSubscription = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/cancelSubscription`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchSignals = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchSignals`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    offersRegister = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/offersRegister`, args)
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

    register = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/register`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    login = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/login`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchAccount = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchAccount`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    updateAccount = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/updateAccount`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchUserDashboard = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchUserDashboard`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createUserDashboard = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createUserDashboard`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchSubscriptions = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchSubscriptions`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createSubscriptions = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createSubscriptions`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    removeSubscriptions = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/removeSubscriptions`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchUsersList = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchUsersList`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    deleteUsers = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/deleteUsers`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    editUser = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/editUser`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createUser = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createUser`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchSignals = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchSignals`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchFreeSignals = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchFreeSignals`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    deleteSignals = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/deleteSignals`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    editSignal = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/editSignal`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createSignal = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createSignal`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    deleteFreeSignals = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/deleteFreeSignals`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    editFreeSignal = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/editFreeSignal`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    createFreeSignal = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/createFreeSignal`, args)
            return data
        } catch (error) {
            throw error
        }
    }

    fetchStatistics = async (args) => {
        try {
            const { data } = await axios.post(`${this.path}/fetchStatistics`, args)
            return data
        } catch (error) {
            throw error
        }
    }
}

class MiscellaneousApi {

}

export {
    UserApi,
    AdminApi,
    MiscellaneousApi
}