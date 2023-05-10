
import "bootstrap/dist/css/bootstrap.min.css"
import React, { Component } from 'react'
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

import Helmet from 'react-helmet';

<Helmet bodyAttributes={{style: 'background-color : #fff'}}/>

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 5,
    }
  }
  componentDidMount = async () => {
    const allPosts = await axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => res.data) //receive response then convert it to json.
    if (allPosts.length !== 0) {
      this.setState({ posts: allPosts })
    }
  }
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }
  render() { // Handles pagination 
    const { posts, currentPage, postsPerPage } = this.state
    var currentPosts = []
    if (posts.length !== 0) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    }





    return (
      <div className='container mt-3' style={{flex:1, backgroundColor:'#90EE90'}}>
        <h4 style={{textAlign: "center",color:"blue"}}>Mandela Front App</h4>
        <table style={{width: "900px", padding: "30px",backgroundcolor:'#223336',color:'white'}} className="app-container table table-striped rounded-lg border-none shadow-xl">
<tbody>
<tr>
  <th style={{padding: "20px"}}>Id</th>
  <th style={{padding: "20px"}}>Title</th>
  <th style={{padding: "20px"}}>Body</th>
</tr>
          {
            currentPosts.length !== 0 ? currentPosts.map((post, index) => (
               <tr key={post.id} style={{color:'#F0FFF0'}}>
    <td style={{padding: "20px"}}>{post.id}</td>
    <td style={{padding: "20px"}}>{post.title}</td>
    <td style={{padding: "20px"}}>{post.body.substring(0, 100) }</td>
   
  </tr>
            )) : <div>Loading...</div>
          }          
       
</tbody>
</table>





        <div className="mt-4 mr-3 d-flex justify-content-end" >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              currentPage={currentPage}
              paginate={this.paginate}
            />
          </div>
      </div>
    )
  }
}
