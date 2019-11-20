/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

export default (name = '') =>
	name
		.replace(/\s+/, ' ')
		.split(' ')
		.slice(0, 2)
		.map(v => v && v[0].toUpperCase())
		.join('')