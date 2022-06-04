import React from 'react'
import "./Admin.css"

const Admin = () => {
  return (
    <>
        <div className="container">
            {/* Sidear */}
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <a href="#" className="list-group-item active">
                            
                            <span className="ml-2">Admin panel</span>
                        </a>
                        <a href="#" className="list-group-item">
                            {/* <i className="fa fa-user" aria-hidden="true"></i> */}
                            <span className="ml-2">User List</span>
                        </a>
                        <a href="#" className="list-group-item">
                            {/* <i className="fa fa-users" aria-hidden="true"></i> */}
                            <span className="ml-2">Users</span>
                        </a>
                        <a href="#" className="list-group-item">
                            {/* <i className="fa fa-question" aria-hidden="true"></i> */}
                            <span className="ml-2">Questions</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Admin