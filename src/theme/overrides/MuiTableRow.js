/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import Palette from '../Palette'

export default {
	root: {
		'&$selected': {
			backgroundColor: Palette.background.default
		},
		'&$hover': {
			'&:hover': {
				backgroundColor: Palette.background.default
			}
		}
	}
}