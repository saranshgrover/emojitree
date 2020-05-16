import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function EmojiEdit({ emoji, name, onSave, onCancel }) {
	const [localEmoji, setLocalEmoji] = React.useState(emoji)
	const handleChange = ({ target: { value } }) => {
		const text = value.replace(/\s/g, '')
		const keywords = text.split(',')
		setLocalEmoji({ ...localEmoji, keywords: keywords })
	}
	return (
		<Dialog open={true} onClose={onCancel}>
			<DialogTitle id='form-dialog-title'>Emoji Edit</DialogTitle>
			<DialogContent>
				<DialogContentText align='center'>{`${name} ${emoji.char}`}</DialogContentText>
				<TextField
					autocomplete='off'
					autocorrect='off'
					autocapitalize='off'
					spellcheck='false'
					autoFocus
					margin='dense'
					label='Aliases'
					helperText='Separate aliases with commas. Aliases can not have spaces'
					value={localEmoji.keywords.join(',')}
					onChange={handleChange}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color='primary'>
					Cancel
				</Button>
				<Button onClick={() => onSave(localEmoji)} color='primary'>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}
