const UserList = ({ friends }) => {
  return (
    <ul>
      {Object.values(friends).map((name, i) =>
        name.trim().length ? <li key={i}>{name}</li> : null
      )}
    </ul>
  )
}

export default UserList
