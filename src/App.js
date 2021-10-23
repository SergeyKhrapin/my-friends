import { useState, useEffect } from "react"
import getMyFriends from "./utils/getMyFriends"
import UserList from "./components/UserList"
import UserListEmpty from "./components/UserListEmpty"
import LoadMore from "./components/LoadMore"

const App = () => {
  const [friends, setFriends] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      const response = await getMyFriends(page)
      setFriends((state) => {
        return { ...state, ...response }
      })
    })()
  }, [page])

  const loadMoreHandler = async () => {
    setPage((page) => page + 1)
  }

  return Object.keys(friends).length ? (
    <>
      <UserList friends={friends} />
      <LoadMore onClick={loadMoreHandler} />
    </>
  ) : (
    <UserListEmpty />
  )
}

export default App
