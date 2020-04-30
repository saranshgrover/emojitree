import React, { useState, useEffect, useRef } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Portal from '@material-ui/core/Portal'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	menu: {
		width: '80vw',
		height: '10vh',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'hidden',
	},
}))

export default function EmojiInput({ anchorEl, emojis, handleSelect }) {
	const menuRef = useRef(null)
	const [keyWord, _setKeyWord] = useState(null)
	const keyWordRef = useRef(keyWord)
	const classes = useStyles()
	const setKeyWord = (data) => {
		keyWordRef.current = data
		_setKeyWord(data)
	}
	const [selected, setSelected] = useState(0)
	const upHandler = (event) => {
		const { key } = event
		if (key === 'Enter') {
			const emoji = menuRef.current.childNodes[selected].innerText.slice(3)
			handleSelect(emoji)
		} else if (event.keyCode === 32) {
			handleSelect(' ')
		} else if (key === 'Escape') {
			handleClose()
		} else if (key === 'Backspace') {
			const newKeyWord =
				keyWordRef.current?.length > 0
					? keyWordRef.current.slice(0, -1)
					: keyWordRef.current
			setKeyWord(newKeyWord)
		} else if (49 <= event.keyCode && 57 >= event.keyCode) {
			const number = parseInt(event.keyCode) - 48
			if (menuRef.current.childNodes.length >= number + 1) {
				const emoji = menuRef.current.childNodes[number].innerText.slice(3)
				handleSelect(emoji)
			}
			// } else if (key === 'ArrowUp') {
			// 	setSelected(Math.max(0, selected - 1))
			// } else if (key === 'ArrowDown') {
			// 	setSelected(Math.min(9, selected + 1))
		} else if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
			setKeyWord(keyWordRef.current !== null ? keyWordRef.current + key : key)
		}
	}
	const handleClose = () => {
		handleSelect()
	}
	return (
		<Popper
			open={true}
			anchorEl={anchorEl.current}
			role={undefined}
			transition
			disablePortal
		>
			{({ TransitionProps, placement }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: 'left center',
					}}
				>
					<Paper className={classes.paper}>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								variant='selected-menu'
								onKeyUp={upHandler}
								className={classes.menu}
								ref={menuRef}
								autoFocus
							>
								{keyWord ? (
									[
										<Grid container direction='row'>
											<Grid item container justify='space-around'>
												<Grid item>
													<Typography
														variant='body1'
														align='center'
														color='primary'
													>
														{keyWord}
													</Typography>
												</Grid>
												<Grid item>
													<Typography
														variant='subtitle2'
														color='primary'
													>{`Esc to cancel`}</Typography>
												</Grid>
											</Grid>
										</Grid>,
										Object.keys(emojis)
											.filter((key) =>
												emojis[key].keywords.some((word) =>
													word.includes(keyWord)
												)
											)
											.slice(0, 9)
											.map((key, value) => (
												<MenuItem
													key={value}
													onClick={(e) => handleSelect(emojis[key].char)}
												>
													{`${value + 1}. ${emojis[key].char}`}
												</MenuItem>
											)),
									]
								) : (
									<Typography variant='body1' color='primary'>
										Type to Search...
									</Typography>
								)}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}
