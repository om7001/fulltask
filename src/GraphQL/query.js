import { gql } from '@apollo/client';

export const GET_ALL_USER = gql`
query GetUsersByAdmin {
  getUsersByAdmin {
    _id
    firstName
    lastName
    email
    active
    roll
    gender
    age
    dateofbirth
    hobbies
    createdAt
    updatedAt
  }
}
`

export const GET_ALL_USER_PAGINATION = gql`
query GetPaginatedUsers($input: getPaginatedUsersInput) {
  getPaginatedUsers(input: $input) {
    docs {
      _id
      profile
      firstName
      lastName
      email
      active
      roll
      gender
      age
      dateofbirth
      hobbies
      createdAt
      updatedAt
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}
`


export const GET_USER_BY_ADMIN = gql`
query GetUsersByAdmin($id: ID!) {
  getUserByAdmin(_id: $id) {
    firstName
    lastName
    active
    gender
    age
    dateofbirth
    hobbies
  }
}
`

export const GET_ALL_POST = gql`
query GetAllPost {
  getAllPost {
    _id
    title
    description
    createdBy {
      firstName
      lastName
    }
  }
}
`

export const GET_ALL_POST_PAGINATION = gql`
query GetPaginatedPosts($input: getPaginatedPostsInput) {
  getPaginatedPosts(input: $input) {
    docs {
      _id
      title
      description
      createdBy {
        firstName
        lastName
      }
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}
`


export const GET_POST = gql`
query GetPost($id: ID!) {
  getPost(_id: $id) {
    _id
    title
    description
  }
}
`

export const GET_USER = gql`
query GetUser {
  getUser {
    firstName
    lastName
    email
    gender
    age
    dateofbirth
    hobbies
    createdAt
    updatedAt
    followers
    following
    blockedUsers
  }
}
`

export const GET_ALL_POST_BY_ADMIN = gql`
query GetUserPostByAdmin($id: ID!) {
  getUserPostByAdmin(_id: $id) {
    _id
    title
    description
    createdBy {
      firstName
      lastName
    }
  }
}
`

export const GET_ALL_POST_PAGINATION_BY_ADMIN = gql`
query GetPaginatedPostsByAdmin($input: getPaginatedPostByAdminInput) {
  getPaginatedPostsByAdmin(input: $input) {
    docs {
      _id
      title
      description
      createdBy {
        lastName
        firstName
      }
    }
    totalDocs
    limit
    page
    totalPages
    nextPage
    prevPage
  }
}
`



export const GET_PROFILE = gql`
query Query {
  getProfilePhoto{
     url
  }
}
`
export const GET_FOLLOWERS = gql`
query GetFollower($followerId: ID) {
  getFollower(followerId: $followerId) {
    followerId{
      _id
      userName
    }
    status
    userId {
      userName
    }
  }
}
`
export const GET_FOLLOWING = gql`
query GetFollowing($userId: ID) {
  getFollowing(userId: $userId) {
    followerId{
      _id
      userName
    }
    userId {
      _id
      userName
    }
    status
  }
}
`

export const GET_BLOCKED = gql`
query GetBlockUser($userId: ID) {
  getBlockUser(userId: $userId) {
    userId{
      _id
      userName
    }
    followerId{
      _id
      userName
    }
    status
  }
}
`

export const GET_REQUESTED = gql`
query GetRequestedUser($userId: ID) {
  getRequestedUser(userId: $userId) {
    followerId {
      _id
      userName
    }
    status
    userId {
      _id
      userName
    }
  }
}
`

export const GET_SEARCH_FOLLOW = gql`
query GetFollow($search: String) {
  getFollow(search: $search) {
    _id 
    userName
  }
}
`