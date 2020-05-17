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
	const downHandler = ({ key, keyCode }) => {
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

	const handleSelectEmoji = (emoji, key) => {
		console.log(key)
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
				setEmojis({
					...emojis,
					[key]: {
						...emojis[key],
						frequency: emojis[key].frequency ? emojis[key].frequency + 1 : 1,
					},
				})
				break
		}
	}
	return (
		<>
			<TextField
				onKeyDown={downHandler}
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
			{emojiInput && anchorRef.current && (
				<EmojiInput
					anchorEl={anchorRef}
					emojis={emojis}
					setEmojis={setEmojis}
					handleSelect={handleSelectEmoji}
				/>
			)}
			<div ref={anchorRef}></div>
		</>
	)
}
