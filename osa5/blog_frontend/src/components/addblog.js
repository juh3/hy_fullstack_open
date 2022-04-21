import { useState } from "react"

const FormBlog = ({createBlog, blogs}) => {

    const [newUrl, setUrl] = useState('')
    const [newLikes, setLikes] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newTitle, setTitle] = useState('')

    const handleUrlChange = (event) =>{
        console.log(event.target.value)
        setUrl(event.target.value)
    }

    const handleTitleChange = (event) =>{
        console.log(event.target.value)
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) =>{
        console.log(event.target.value)
        setAuthor(event.target.value)
    }
    
    const handleLikesChange = (event) => {
        console.log(event.target.value)
        setLikes(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        console.log('trying to add a blog')
        
        createBlog({
            author: newAuthor,
            title: newTitle,
            likes: newLikes,
            url: newUrl,
            id: blogs.length + 1,
    
        })
        
        setAuthor('')
        setTitle('')
        setLikes('')
        setUrl('')
    }
        
    
return(
  <form onSubmit = {addBlog}>
    <div>
        <h2> Add a blog </h2>
        author: <input
        value = {newAuthor} 
        placeholder = "input the author"
        onChange = {handleAuthorChange}
        />
    </div>

    <div>
        title: <input
        value = {newTitle}
        placeholder = "input the title of the blog"
        onChange = {handleTitleChange}
        />
    </div>

    <div>
        likes: <input
        value = {newLikes}
        placeholder = "input the amount of likes the blog has"
        onChange = {handleLikesChange}
        />
    </div>

    <div>
        url: <input
        value = {newUrl}
        placeholder = "input the url of the blog"
        onChange = {handleUrlChange}
        />
    </div>
    <div>
        <button type="submit">add</button>
    </div>

    </form>
  )
}
export default FormBlog;