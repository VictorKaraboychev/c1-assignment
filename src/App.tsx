import React, { useState } from 'react'
import { Box, createTheme, IconButton, ThemeProvider, Tooltip, useMediaQuery } from '@mui/material'
import TransactionList from './components/TransactionList'
import useGlobalState, { useStateManager } from './state/state'
import Typography from '@mui/material/Typography'
import TransactionInput from './components/TransactionInput'
import PointsInfo from './components/PointsInfo'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { GridSelectionModel } from '@mui/x-data-grid'
function App() {
	const { value: THEME_TYPE, set: setThemeType } = useGlobalState.theme()

	const [selections, setSelections] = useState<GridSelectionModel>([])

	useStateManager(true)

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

	let THEME = React.useMemo(
		() => createTheme({
			palette: {
				mode: THEME_TYPE === 'system' ? prefersDarkMode ? 'dark' : 'light' : THEME_TYPE,
				primary: {
					light: '#63ccff',
					main: '#009be5',
					dark: '#006db3',
				},
				secondary: {
					light: '#152336',
					main: '#101F33',
					dark: '#081627',
				}
			},
			typography: {
				h5: {
					fontWeight: 500,
					fontSize: 26,
					letterSpacing: 0.5,
				},
			},
			shape: {
				borderRadius: 8,
			},
			components: {
				MuiTab: {
					defaultProps: {
						disableRipple: true,
					},
				},
			},
			mixins: {
				toolbar: {
					minHeight: 48,
				},
			},
		}),
		[prefersDarkMode, THEME_TYPE],
	)

	const handleToggleTheme = () => {
		setThemeType(THEME_TYPE === 'light' ? 'dark' : 'light')
	}

	return (
		<ThemeProvider theme={THEME}>
			<Box
				sx={{
					backgroundColor: 'background.default',
					height: '100vh',
					width: '100vw',
				}}
			>
				<Box
					sx={{
						p: 5,
						height: 'calc(100% - 80px)',
					}}
				>
					<TransactionInput
						sx={{
							mb: 4,
						}}
						selections={selections}
						onSelect={setSelections}
					/>
					<TransactionList
						sx={{
							flex: 1,
							height: 'calc(100% - 320px)',
							mb: 4,
						}}
						selections={selections}
						onSelect={setSelections}
					/>
					<PointsInfo
						sx={{
							mb: 4,
							height: 150,
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<Typography
							sx={{
								fontWeight: 'bold',
								mr: 2,
							}}
							variant={'body2'}
							color={'text.primary'}
						>
							Capital One Technical Assessment Challenge
						</Typography>
						<Typography
							sx={{
							}}
							variant={'body2'}
							color={'text.secondary'}
						>
							&copy; 2023 Victor Karaboychev
						</Typography>
						<Tooltip
							title={THEME.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
							arrow={true}
						>
							<IconButton
								sx={{
									ml: 'auto'
								}}
								size={'large'}
								edge={'end'}
								onClick={handleToggleTheme}
							>
								{THEME.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default App
