import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({insideHome}) => {
  return (
    <>
       <Navbar style={{zIndex:1}} className="border rounded bg-secondary">
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='text-danger fw-bolder fs-2'>
            Blogging Platform
            </Navbar.Brand>
          </Link>
            {/* {
                insideHome &&
                <div className="ms-auto">
                    <Link to={'/create'} className='btn btn-primary fw-bolder'>Create <i class="fa-solid fa-plus ms-1"></i></Link>
                </div>
            } */}
        </Container>
      </Navbar> 
    </>
  )
}

export default Header