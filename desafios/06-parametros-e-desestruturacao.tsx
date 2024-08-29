function updateUserRoute({body, params}) {
  updateUserController({
    data: body,
    params
  }
  )
}

// Always receive objects in function params when possible
function updateUserController({data, params}) {
  userRepository.update(
    {data, params}
  )
}

const userRepository = {
  update: ({data, params}) => {
    return {data, params}
  },
}