import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($input: createUserInput) {
  createUser(input: $input) {
    email
  }
}
`
export const LOGIN_USER = gql`
mutation LoginUser($input: loginInput) {
  loginUser(input: $input) {
    accessToken
    roll
    active
    isVerified
    email
  }
}
`
export const VERIFY_USER = gql`
mutation UserVerify($input: userVerifyInput) {
  userVerify(input: $input) {
    isVerified
  }
}
`

export const VERIFY_TOKEN = gql`
mutation TokenVerification($token: String!) {
  tokenVerification(token: $token)
}
`
export const SEND_FORGOT_PASSWORD_MAIL = gql`
mutation SendForgotPasswordMail($email: String!) {
  sendForgotPasswordMail(email: $email) {
    status
  }
}
`
export const FORGOT_PASSWORD = gql`
mutation ForgotPassword($input: forgotpassword!) {
  forgotPassword(input: $input) {
    status
  }
}
`
export const CREATE_POST = gql`
mutation CreatePost($input: createPostInput) {
  createPost(input: $input) {
    _id
  }
}
`

export const UPDATE_POST = gql`
mutation UpdatePost($input: updatePostInput) {
  updatePost(input: $input) {
    _id
    title
    description
    createdBy
  }
}
`
export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(_id: $id) {
    message
  }
}
`
export const DELETE_USER_BY_ADMIN = gql`
mutation DeleteUserByAdmin($id: ID!) {
  deleteUserByAdmin(_id: $id) {
    message
  }
}
`

export const UPDATE_USER_BY_ADMIN = gql`
mutation UpdateUserByAdmin($input: updateUserByAdminInput) {
  updateUserByAdmin(input: $input) {
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

export const UPLOAD_PROFILE = gql`
mutation UploadProfilePhoto($input: UploadProfilePhotoInput!) {
  uploadProfilePhoto(input: $input)
}
`

export const CHANGE_PASSWORD = gql`
mutation ChangePassword($input: changePasswordInput) {
  changePassword(input: $input) {
    _id
  }
}
`

export const RESENT_VERIFICATION_MAIL = gql`
mutation ResentVerificationMail($email: String!) {
  resentVerificationMail(email: $email)
}
`
export const USER_REQUEST = gql`
mutation CreateFollowers($input: createFollowersInput) {
  createFollowers(input: $input) {
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