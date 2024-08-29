// Nomenclatura de variáveis

const listOfUsers = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUserDataFromGithub(request, requestResult) {
  const githubUsername = String(request.query.username)

  if (!githubUsername) {
    return requestResult.status(400).json({
      message: `Please provide an username to search on the githubUsername API`
    })
  }

  const checkUsernameOnGithub = await fetch(`https://api.githubUsername.com/users/${githubUsername}`);

  if (checkUsernameOnGithub.status === 404) {
    return requestResult.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const getGithubUserData = await checkUsernameOnGithub.json()

  const orderUsersByFollowers = listOfUsers.sort((a, b) =>  b.followers - a.followers); 

  const categorizeUsersByFollowers = orderUsersByFollowers.find(i => getGithubUserData.followers > i.followers)

  const result = {
    githubUsername,
    category: categorizeUsersByFollowers.title
  }

  return result
}

getUserDataFromGithub({ query: {
  username: 'josepholiveira'
}}, {})