const FormBlog = (props) => {

return(
  <form onSubmit = {props.onSubmit}>
      <div>
          author: <input
          value = {props.newAuthor} 
          placeholder = "input the author"
          onChange = {props.handleAuthorChange}
          />
      </div>

      <div>
          title: <input
          value = {props.newTitle}
          placeholder = "input the title of the blog"
          onChange = {props.handleTitleChange}
          />
      </div>

      <div>
          likes: <input
          value = {props.newLikes}
          placeholder = "input the amount of likes the blog has"
          onChange = {props.handleLikesChange}
          />
      </div>

      <div>
          url: <input
          value = {props.newUrl}
          placeholder = "input the url of the blog"
          onChange = {props.handleUrlChange}
          />
      </div>
      <div>
          <button type="submit">add</button>
      </div>

      </form>
  )
}
export default FormBlog;