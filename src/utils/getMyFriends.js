import { serverURL } from "../server"

async function getMyFriends(page) {
  const myFriends = {
      friends: {},
      error: {
        failed: null,
        statusOk: null,
      },
      total_pages: null,
  }
  
  try {
    const response = await fetch(`${serverURL}${page ? `?page=${page}` : ""}`)
    // const response = await fetch("https://mock.codes/500", {
    //     mode: "no-cors"
    // })

    if (response.ok) {
        const { data, total_pages } = await response.json()
        data?.map((friend = {}) => {
          Object.assign(myFriends.friends, {
            [friend.email]: `${friend.first_name || ""} ${friend.last_name || ""}`
          })
        })
        myFriends.error = null
        myFriends.total_pages = total_pages
    } else {
        myFriends.error.statusOk = false
    }
  } catch(err) {
    myFriends.error.failed = err
  }

  return myFriends
}

export default getMyFriends
