import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';
import NavBar from './components/NavBar';
import PostList from './components/PostList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(
  mapStateToProps,
  { fetchPosts }
)(App);
