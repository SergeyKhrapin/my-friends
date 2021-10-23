const UserList = ({ friends }) => {
  return (
    <ul>
      {Object.values(friends).map((name) =>
        name.trim().length ? <li>{name}</li> : null
      )}
    </ul>
  )
}

export default UserList
