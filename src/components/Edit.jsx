import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { editPostAPI } from '../../services/allAPI';

const Edit = ({post,getAllPosts}) => {

  const [createPosts,setCreatePosts] = useState({
    title:post.title ,content:post.content ,author:post.author ,date:post.date,tags: post.tags ,postVideo:post.postVideo
  })

  const handleUpdate = async(id)=>{
    const {title,content,author,date,tags,postVideo} = createPosts
    if(title && content && author && date && tags && postVideo){
      try{
        const result = await editPostAPI(id,createPosts)
        if(result.status == 200){
          alert("Post updated successfully!!")
          handleClose()
          getAllPosts()
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>Edit</Button>

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
          <Button onClick={()=>handleUpdate(post._id)} variant="info">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit