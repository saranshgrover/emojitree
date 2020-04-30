import React, { useEffect, useState } from 'react'
import emoji from 'emojilib'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import EmojiField from './EmojiField'

function App() {
	const [emojis, setEmojis] = useState(null)
	useEffect(() => {
		setEmojis(emoji.lib)
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
						style={{ height: '20vh' }}
					>
						<Grid>
							<Typography align='center' variant='h2' color='primary'>
								{' '}
								Emoji Tree{' '}
							</Typography>
							<Typography align='center' variant='h6' color='initial'>
								Personalized Emoji Input
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={0}
						alignItems='center'
						justify='center'
						direction='column'
						style={{ minHeight: '80vh' }}
					>
						{/* <Grid item>
							<Typography
								variant='h6'
								style={{ marginBottom: '5vh' }}
								align='center'
							>
								Enter <code>:</code> followed by text to search for emojis. To
								select an emoji, either go down the list to find it, or press
								the number associated with the emoji
							</Typography>
						</Grid> */}
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
