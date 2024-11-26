import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addPostsAPI } from '../../services/allAPI';

const Add = ({getAllPosts}) => {

    const [show, setShow] = useState(false);

    const [createPosts,setCreatePosts] = useState({
        title:"",content:"",author:"",date:"",tags:"",postVideo:""
      })
    
      console.log(createPosts);
    
      const handleClose = () => {
        setShow(false);
        setCreatePosts({ title:"",content:"",author:"",date:"",tags:"",postVideo:""})
      }
        const handleShow = () => setShow(true);

      const handleAddPosts = async () =>{
        const {title,content,author,date,tags,postVideo} = createPosts
        if(title && content && author && date && tags && postVideo){
          const reqBody = new FormData()
          reqBody.append("title",title)
          reqBody.append("content",content)
          reqBody.append("author",author)
          reqBody.append("date",date)
          reqBody.append("tags",tags)
          reqBody.append("postVideo",postVideo)
    
            const reqHeader = {
              "Content-Type":"multipart/form-data",
            }
            try{
              const result = await addPostsAPI(reqBody,reqHeader)
              if(result.status==200){
                alert("Post added successfully")
                handleClose()
                setCreatePosts({ title:"",content:"",author:"",date:"",tags:"",postVideo:""})
                getAllPosts()
              }
              else{
                alert(result.response.data)
              }
            }
            catch(err){
              console.log(err);
            }
          }
          else{
            alert("Please fill the form completely!!!")
          }
      }

  return (
    <>
        <Button variant="success" className='me-5 mt-2' onClick={handleShow}>Create <i class="fa-solid fa-plus ms-1"></i></Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{width:'100%'}} className='d-flex flex-column justify-content- align-items-center'>
        <div className='border p-5 rounded'>
          <div className='w-100'>
            <TextField value={createPosts.title} onChange={e=>setCreatePosts({...createPosts,title:e.target.value})} className='w-100 mb-4' id="outlined-basic" label="Title" variant="outlined" />
            <TextField value={createPosts.content} onChange={e=>setCreatePosts({...createPosts,content:e.target.value})} className='w-100 mb-4' id="outlined-basic" label="Content" variant="outlined" />
            <TextField value={createPosts.author} onChange={e=>setCreatePosts({...createPosts,author:e.target.value})} className='w-100 mb-4' id="outlined-basic" label="Author Information" variant="outlined" />
            <TextField value={createPosts.date} onChange={e=>setCreatePosts({...createPosts,date:e.target.value})} className='w-100 mb-4' id="outlined-basic" type='date' variant="outlined" />
            <TextField value={createPosts.tags} onChange={e=>setCreatePosts({...createPosts,tags:e.target.value})} className='w-100' id="outlined-basic" label="Tags" variant="outlined" />
            <div>
              <TextField onChange={e=>setCreatePosts({...createPosts,postVideo:e.target.files[0]})} className='w-100 mt-4' id="outlined-basic" type='file' variant="outlined" />
            </div>
            </div>
        </div>
      </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="info" onClick={handleAddPosts}>Add</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default Add