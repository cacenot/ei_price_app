import { createMuiTheme } from '@material-ui/core/styles'


export default createMuiTheme({
    palette: {
        primary: {
            light: '#7a7cff',
            main: '#304ffe',
            dark: '#0026ca',
            contrastText: '#fff'
        },
        secondary: {
            light: '#838383',
            main: '#565656',
            dark: '#2d2d2d',
            contrastText: '#fff'
        },
        blue: {
            light: '#1891ff',
            main: '#3b7fed',
            dark: '#3469c0',
            contrastText: '#fff'
        },
        text: {
            secondary: 'rgba(0, 0, 0, 0.68)'
        },
        background: {
            default: '#fff'
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: '"Overpass", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
        },
        h2: {
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
        },
        h3: {
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Overpass", "Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 500,
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        },
    },
    overrides: {
        MuiButton: {
            root: {
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                textTransform: 'initial',
                fontWeight: 600,
                fontSize: '0.75rem',
            },
            contained: {
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
                '&:active': {
                    boxShadow: 'none',
                },
            }
        },
        MuiIconButton: {
            root: {
                padding: 8
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 8
            }
        },
        MuiPopover: {
            paper: {
                borderRadius: 8
            }
        },
        MuiLinearProgress: {
            root: {
                height: 2.5
            }
        },
        MuiListItemText: {
            primary: {
                fontSize: '0.75rem',
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 600,
            }
        },
        MuiTableCell: {
            head: {
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.3
            }
        },
        MuiTab: {
            root: {
                fontWeight: 600
            }
        }
    }
})
