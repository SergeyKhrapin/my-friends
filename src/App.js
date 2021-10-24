import { useEffect, useReducer } from "react"
import getMyFriends from "./utils/getMyFriends"
import UserList from "./components/UserList"
import LoadMore from "./components/LoadMore"
import Loading from "./components/Loading"
import Error from "./components/Error"
import createAction from './store/action'
import { FETCH_FRIENDS, LOAD_MORE, ERROR} from './store/const'

const App = () => {
	const initialState = {
		list: null,
		showLoadMore: true,
		error: null,
		page: 1,
	}
	const reducer = (state, action) => {
		switch (action.type) {
			case FETCH_FRIENDS:
				return {
					...state,
					list: {...state.list, ...action.payload.friends},
					showLoadMore: state.page < action.payload.totalPages
				}
			case LOAD_MORE:
				return {...state, page: state.page + 1}
			case ERROR:
				return {...state, error: action.payload}
		}
	}
	const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    (async () => {
      const { friends, error, total_pages } = await getMyFriends(state.page)
			if (!error) {
				dispatch(createAction(FETCH_FRIENDS, {
					friends,
					totalPages: total_pages
				}))
			} else {
				dispatch(createAction(ERROR, error))
			}
    })()
  }, [state.page])

  const loadMoreHandler = async () => {
		dispatch(createAction(LOAD_MORE))
  }

	if (state.error) {
		return <Error error={state.error} />
	}

  return !state.list && !state.error ? (
    <Loading />
  ) : (
    <>
      <UserList friends={state.list} />
      {state.showLoadMore && <LoadMore onClick={loadMoreHandler} />}
    </>
  )
}

export default App
