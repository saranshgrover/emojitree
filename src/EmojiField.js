import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import EmojiInput from './EmojiInput'

export default function EmojiField({ emojis, setEmojis }) {
	const [value, setValue] = useState('')
	useEffect(() => {
		if (value.indexOf(':') === -1) {
			setEmojiInput(false)
		}
	}, [value])
	const [emojiInput, setEmojiInput] = useState(false)
	useEffect(() => {
		if (!emojiInput && textAreaRef !== null) {
			textAreaRef.current.focus()
		}
	}, [emojiInput])
	const anchorRef = useRef(null)
	const textAreaRef = useRef(null)
	const upHandler = ({ key, keyCode }) => {
		if (key === ':') {
			setEmojiInput(!emojiInput)
		}
	}
	// useEffect(() => {
	// 	window.addEventListener('keyup', upHandler)
	// 	return () => {
	// 		window.removeEventListener('keyup', upHandler)
	// 	}
	// }, [])

	const handleSelectEmoji = (emoji) => {
		switch (emoji) {
			case ' ':
				setValue(value + emoji)
				setEmojiInput(false)
				break
			case undefined:
				setEmojiInput(false)
				break
			default:
				setValue(value.slice(0, -1) + emoji)
				break
		}
	}
	return (
		<>
			<TextField
				onKeyUp={upHandler}
				inputRef={textAreaRef}
				style={{ width: '80vw' }}
				rows={4}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				id=''
				label='Enter Text'
				variant='outlined'
				color='primary'
				fullWidth
				multiline
			/>
			<div ref={anchorRef}></div>
			{emojiInput && anchorRef.current && (
				<EmojiInput
					anchorEl={anchorRef}
					emojis={emojis}
					handleSelect={handleSelectEmoji}
				/>
			)}
		</>
	)
}
