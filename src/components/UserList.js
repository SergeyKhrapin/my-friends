const UserList = ({ friends }) => {
	const values = Object.values(friends)

	console.log('friends', friends);

  return values.length ? (
    <ul>
      {values.map((name, i) =>
        name.trim().length ? <li key={i}>{name}</li> : null
      )}
    </ul>
  ) : (
		<h1>I am sorry for you, but you have no friends :(</h1>
  )
}

export default UserList
