import { useState, useEffect } from "react"
import getMyFriends from "./utils/getMyFriends"
import UserList from "./components/UserList"
import UserListEmpty from "./components/UserListEmpty"
import LoadMore from "./components/LoadMore"
import Loading from "./components/Loading"
import Error from "./components/Error"

const App = () => {
  const [friends, setFriends] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      const { friends, error } = await getMyFriends(page)
			if (!error) {
				setFriends((state) => {
					return { ...state, ...friends }
				})
			} else {
				setError(error)
			}
    })()
  }, [page])

  const loadMoreHandler = async () => {
    setPage((page) => page + 1)
  }

	if (error) {
		return <Error error={error} />
	}

  return !friends && !error ? (
    <Loading />
  ) : Object.keys(friends).length ? (
    <>
      <UserList friends={friends} />
      <LoadMore onClick={loadMoreHandler} />
    </>
  ) : (
    <UserListEmpty />
  )
}

export default App
