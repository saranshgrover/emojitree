import React, { useEffect, useState } from 'react'
import emoji from 'emojilib'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import EmojiField from './EmojiField'
import Button from '@material-ui/core/Button'
import AliasDialog from './AliasDialog'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'
import FeatureList from './FeatureList'

function App() {
	const [emojis, setEmojis] = useState(null)
	React.useEffect(() => {
		emojis !== null &&
			localStorage.setItem('emojiTreeEmojis', JSON.stringify(emojis))
	}, [emojis])
	const [clicked, setClicked] = useState(false)
	useEffect(() => {
		const localEmoji = JSON.parse(localStorage.getItem('emojiTreeEmojis'))
		setEmojis(localEmoji ? localEmoji : emoji.lib)
	}, [])
	return (
		<div className='app'>
			{!emojis ? (
				<LinearProgress />
			) : (
				<>
					<Grid
						container
						spacing={0}
						alignItems='center'
						justify='flex-start'
						direction='column'
					>
						<Grid>
							<Typography align='center' variant='h2' color='primary'>
								{' '}
								Emoji Tree{' '}
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={0}
						alignItems='center'
						alignContent='center'
						justify='center'
						direction='column'
					>
						<Grid item justify='center' container alignItems='center'>
							<Grid item>
								<Button
									onClick={() => setClicked(!clicked)}
									variant='text'
									color='primary'
								>
									Add Aliases for Emojis
								</Button>
							</Grid>
							<Grid item>
								<Tooltip title='You can add custom aliases for Emojis, and then use those to search for them'>
									<HelpIcon color='primary' />
								</Tooltip>
							</Grid>
							<Grid item>
								<Button
									onClick={() => {
										localStorage.clearItem('emojiTreeEmojis')
										setEmojis(emoji.lib)
									}}
									variant='text'
									color='primary'
								>
									Delete Storage
								</Button>
							</Grid>
							<Tooltip title='This will delete any storage of aliases and past emoji input on this device'>
								<HelpIcon color='primary' />
							</Tooltip>
							{clicked && (
								<AliasDialog
									emojis={emojis}
									setEmojis={setEmojis}
									setClicked={setClicked}
								/>
							)}
						</Grid>
						<Grid item style={{ marginBottom: '5vh' }}>
							<FeatureList />
						</Grid>
						<Grid item>
							<EmojiField emojis={emojis} setEmojis={setEmojis} />
						</Grid>
					</Grid>
				</>
			)}
		</div>
	)
}

export default App
