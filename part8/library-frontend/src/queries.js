import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`
export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
      title
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`