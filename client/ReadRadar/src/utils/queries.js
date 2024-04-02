import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;


export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      books
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      books
    }
  }
`;
