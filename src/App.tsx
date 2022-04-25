import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import Card from './components/Card'
import Searchbar from './components/Searchbar'

const Container = styled.div`
	height: 100vh;
	background: #eee;

	display: flex;
	align-items: center;
	justify-content: center;
`

const Window = styled.div`
	background: #fff;
	width: 564px;
	height: 643px;
	padding: 19px 0;
	overflow-y: scroll;
`

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	grid-gap: 20px;
	align-items: center;
	justify-content: flex-start;
`
type User = {
	address: string
	avatar: string
	city: string
	email: string
	name: string
	title: string
}

const url =
	'https://gist.githubusercontent.com/SergeyKhval/4f1160e2f3ef20a57c05e7edda43b426/raw/e128ec437ac009db94e94cf317e1badc37218691/users_slice.json'

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
	const [searchInput, setSearchInput] = useState(() => searchParams.get("searchInput") || "")
	const [users, setUsers] = useState<User[]>([])
	const [selected, setSelected] = useState<User['email'][]>([])
  console.log( users)

	const filtered = useMemo(() => users.map(user => JSON.stringify(user).toLowerCase()).filter(user => user.includes(searchInput.toLowerCase())), [searchInput, selected])
	const filteredUsers = useMemo(() => filtered.map(user => JSON.parse(user)), [filtered])
  
  console.log(searchParams)
  
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				// console.log(users)
				setUsers(data)
			})
			.catch(console.log)
	}, [])

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setSearchInput(input)
    setSearchParams(input.trim() ? { searchInput: e.target.value} : {})
  }, [setSearchParams])

	const toggleSelect = useCallback(
		(email: User['email']) =>
			setSelected(prev => (prev.includes(email) ? prev.filter(selectedEmail => selectedEmail !== email) : [...prev, email])),
		[]
	)

	return (
		<Container>
			<Window>
				<InnerContainer>
					<Searchbar onChange={handleChange} value={searchInput} />
					{/* {users.map(user => <Card key={user.email} {...user} onSelect={(email) => {
          console.log(user.email, selected)
          toggleSelect(email)
        }} selected={selected.includes(user.email)} />)} */}

					{searchInput.trim()
						? filteredUsers.map(user => (
								<Card
                  searchInput={searchInput}
									key={user.email}
									{...user}
									onSelect={email => {
										toggleSelect(email)
									}}
									selected={selected.includes(user.email)}
								/>
						  ))
						: users.map(user => (
								<Card
									key={user.email}
                  searchInput={searchInput}
									{...user}
									onSelect={email => {
										toggleSelect(email)
									}}
									selected={selected.includes(user.email)}
								/>
						  ))}
				</InnerContainer>
			</Window>
		</Container>
	)
}

export default App
