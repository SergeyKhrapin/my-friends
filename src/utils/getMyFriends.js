import { serverURL } from "../server"

async function getMyFriends(page) {
//   console.log("URL", `${serverURL}${page ? `?page=${page}` : ""}`)

  const myFriends = {}
  const response = await fetch(`${serverURL}${page ? `?page=${page}` : ""}`)
  const { data } = await response.json()
  data?.map((friend = {}) => {
    Object.assign(myFriends, {
      [friend.email]: `${friend.first_name || ""} ${friend.last_name || ""}`
    })
  })

  return myFriends
}

export default getMyFriends
