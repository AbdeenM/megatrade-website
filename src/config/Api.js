/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

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
}

class MiscellaneousApi {
}

export {
    UserApi,
    MiscellaneousApi
}