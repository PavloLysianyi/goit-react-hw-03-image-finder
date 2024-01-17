import React from 'react';

class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button"></button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Шукати зображення та фотографії"
            value={this.state.query}
            onChange={e => this.setState({ query: e.target.value })}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
