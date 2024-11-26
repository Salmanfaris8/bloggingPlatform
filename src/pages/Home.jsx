import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Edit from '../components/Edit'
import Add from '../components/Add'
import { getAllPostsAPI, removePostAPI } from '../../services/allAPI'
import SERVER_URL from '../../services/serverUrl'

const Home = () => {

  const [createPosts,setCreatePosts] = useState({
    title:"",content:"",author:"",date:"",tags:"",postVideo:""
  })
  const [searchKey,setSearchKey] = useState("")

  useEffect(()=>{
    getAllPosts()
  },[searchKey])

  const getAllPosts = async()=>{
    try{
      const result = await getAllPostsAPI(searchKey)
      if(result.status == 200){
        setCreatePosts(result.data)
      }
    }
    catch(err){
      console.log(err);
    }
  }

  console.log(createPosts);

  const deletePost=async(id)=>{
    try{
      await removePostAPI(id)
      alert("Are you sure you want to delete")
      getAllPosts()
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
      <Header insideHome={true}/>
      <div className='d-flex justify-content-between ms-5'>
        <input onChange={e=>setSearchKey(e.target.value)} style={{width:"400px"}} className='p-2 rounded mt-3' type="text" placeholder='Enter title / tag' />
        <Add getAllPosts={getAllPosts}/>
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        {
          createPosts?.length>0?
          createPosts?.map(post=>(
            <div style={{width:"400px"}} className='border mt-4 p-2'>
          <h3 className='text-center'>{post.title}</h3>
          <video width={'100%'} src={`${SERVER_URL}/uploads/${post.postVideo}`}></video>
          <h5><span className='fw-bolder'>Content: </span>{post.content}</h5>
          <span>{post.tags}</span>
          <div className='d-flex justify-content-around my-4'>
            <Edit getAllPosts={getAllPosts} post={post}/>
            <button onClick={()=>deletePost(post._id)} className='btn btn-primary'>Delete</button>
          </div>
        </div>
          ))
          :
          <div>No posts added yet!!!</div>
        }
      </div>
    </>
  )
}

export default Home