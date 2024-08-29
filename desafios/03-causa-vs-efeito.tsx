// Causa vs Efeito
import { useEffect, useState } from "react"

interface User {
  userName: string;
  userLinkOnGithub: string;
}

function fetchUser() {
  return {
    userData: {
      user: {
        userName: 'Joseph Oliveira',
        userLinkOnGithub: 'https://github.com/josepholiveira'
      }
    }
  }
}

export function UserProfile() {
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(false)
  const [userData, setUserData] = useState<User>()

  useEffect(() => {
    function loadUser() {
      setIsLoadingUserProfile(true)

      const fetchUserResponse = fetchUser()

      setUserData(fetchUserResponse.userData.user)
      
      setIsLoadingUserProfile(false)
    }

    loadUser()
  })

  if (isLoadingUserProfile) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={`${userData?.userLinkOnGithub}.png`} alt="" />
      <a href={userData?.userLinkOnGithub}>{userData?.userName}</a>
    </div>
  )
}


