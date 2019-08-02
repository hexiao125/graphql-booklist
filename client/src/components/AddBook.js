import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  state = { name: "", genre: "", authorId: "" };

  displayAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  validate = () => {
    const { name, genre, authorId } = this.state;
    if (!name) {
      alert("You must enter book name!");
    }
    if (!genre) {
      alert("You must enter genre!");
    }
    if (!authorId) {
      alert("You must select an author!");
    }
  };

  submitForm = e => {
    e.preventDefault();
    this.validate();
    const { name, genre, authorId } = this.state;
    if (name && genre && authorId) {
      this.props.addBookMutation({
        variables: {
          name,
          genre,
          authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      });
      this.setState({ name: "", genre: "", authorId: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={e => this.setState({ authorId: e.target.value })}
            value={this.state.authorId}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
