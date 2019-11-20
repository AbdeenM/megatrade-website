/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { createMuiTheme } from '@material-ui/core'

import Palette from './Palette'
import overrides from './overrides'
import Typography from './Typography'

const theme = createMuiTheme({
    overrides,
    palette: Palette,
    typography: Typography,
    zIndex: {
        appBar: 1200,
        drawer: 1100
    }
});

export default theme