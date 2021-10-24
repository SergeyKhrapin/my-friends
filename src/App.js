import { useState, useEffect } from "react"
import getMyFriends from "./utils/getMyFriends"
import UserList from "./components/UserList"
import UserListEmpty from "./components/UserListEmpty"
import LoadMore from "./components/LoadMore"
import Loading from "./components/Loading"
import Error from "./components/Error"

const App = () => {
  const [{ list, showLoadMore }, setFriends] = useState({
		list: null,
		showLoadMore: true,
	})
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    (async () => {
      const { friends, error, total_pages } = await getMyFriends(page)
			if (!error) {
				setFriends((state) => {
					return {
						...state,
						list: {...state.list, ...friends},
						showLoadMore: page < total_pages
					}
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

  return !list && !error ? (
    <Loading />
  ) : Object.keys(list).length ? (
    <>
      <UserList friends={list} />
      {showLoadMore && <LoadMore onClick={loadMoreHandler} />}
    </>
  ) : (
    <UserListEmpty />
  )
}

export default App
