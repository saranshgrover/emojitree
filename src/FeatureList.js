import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import KeyboardIcon from '@material-ui/icons/Keyboard'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}))

export default function SimpleList() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<List component='nav'>
				<ListItem>
					<ListItemText primary='About EmojiTree' secondary={<><Typography variant='body'>{`Emoji Tree is a proof-of-concept inspired from Discord & Google keyboard inputs. It is the product of a research done on existing emoji inputs focusing on ease of use, accuracy and speed. You can read the entire paper `}</Typography><Link href='/paper.pdf'>here</Link></>} />
				</ListItem>
				<ListItem>
					<ListItemIcon color='primary'>
						<EmojiObjectsIcon />
					</ListItemIcon>
					<ListItemText
						primary='Remember your Emoji use and frequency'
						secondary='Emoji Tree remembers how often you use certain emojis and what keywords you use to reference emojis 🤯 It always recommends the most frequent emojis for that given keyword'
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<EmojiSymbolsIcon />
					</ListItemIcon>
					<ListItemText
						primary='Add Aliases for all Emojis!'
						secondary='Emoji Tree lets you add keywords for all emojis and look up those emojis with these aliases, because nobody uses emojis like you do 😜'
					/>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<KeyboardIcon />
					</ListItemIcon>
					<ListItemText
						primary='Super easy Emoji Input'
						secondary='You should not have to leave your keyboard to search for emojis. With EmojiTree, simply type a colon (:) and start searching for an emoji. Once you find the perfect 💯 emoji, enter the number that is next to the emoji, and continue typing the very important message! 👩‍🏫'
					/>
				</ListItem>
			</List>
			<Typography align='center' variant='body1'>
				To get started, start typing in the text field!
			</Typography>
		</div>
	)
}
