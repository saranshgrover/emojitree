import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import EmojiEdit from './EmojiEdit'

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialog({ emojis, setEmojis, setClicked }) {
	const [emojiSearch, setEmojiSearch] = useState(
		Object.keys(emojis)
			.sort((e1, e2) =>
				!emojis[e1].frequency && !emojis[e2].frequency
					? 0
					: !emojis[e1].frequency
					? 1
					: !emojis[e2].frequency
					? -1
					: emojis[e2].frequency - emojis[e1].frequency
			)
			.slice(0, 10)
	)
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState(null)
	useEffect(() => {
		query !== ''
			? setEmojiSearch(
					Object.keys(emojis)
						.sort((e1, e2) =>
							!emojis[e1].frequency && !emojis[e2].frequency
								? 0
								: !emojis[e1].frequency
								? 1
								: !emojis[e2].frequency
								? -1
								: emojis[e2].frequency - emojis[e1].frequency
						)
						.filter((key) =>
							emojis[key].keywords.some((word) => word.includes(query))
						)
						.slice(0, 10)
			  )
			: setEmojiSearch(
					Object.keys(emojis)
						.sort((e1, e2) =>
							!emojis[e1].frequency && !emojis[e2].frequency
								? 0
								: !emojis[e1].frequency
								? 1
								: !emojis[e2].frequency
								? -1
								: emojis[e2].frequency - emojis[e1].frequency
						)
						.slice(0, 10)
			  )
	}, [query, emojis])
	const classes = useStyles()

	const handleEmojiEdit = (emoji) => {
		setEmojis({ ...emojis, emoji })
		setSelected(null)
	}

	return (
		<Dialog
			fullScreen
			open={true}
			onClose={() => setClicked(false)}
			TransitionComponent={Transition}
		>
			{selected && (
				<EmojiEdit
					emoji={emojis[selected]}
					name={selected}
					onSave={handleEmojiEdit}
					onCancel={() => setSelected(null)}
				/>
			)}
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => setClicked(false)}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						Emoji Alias
					</Typography>
				</Toolbar>
			</AppBar>
			<List>
				<ListItem alignItems='center'>
					<TextField
						label='Search...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</ListItem>
				{emojiSearch.map((emoji) => (
					<ListItem
						onClick={() => setSelected(emoji)}
						alignItems='center'
						button
						key={emoji}
					>
						<ListItemText primary={emoji} secondary={emojis[emoji].char} />
						<Divider />
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}
