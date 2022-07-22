import React, { useState, useEffect } from 'react';
import "./Search.css";
import { NavSearch } from "../../../http/Index"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState('');

    const handleSearch = async (e) => {
        NavSearch({ username: search }).then(res => {
            setUsers(res.data);
        })

    }

    return (
        <>
            <div className="searchSection">
                <div className="search">
                    <i class=" fa-solid fs-5 fa-magnifying-glass"></i>
                    <form action="" onChange={handleSearch}>
                        <input
                            onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                            type="text"
                            placeholder="Search by username ..."
                            className="searchInput"
                        />
                    </form>
                </div>

            </div>
            {
                users == "" ? null :
                    <div className="SearchUser">
                        {
                            users.map(user => (
                                <div className='d-flex p-3'>
                                    <Link to={`/user/${user.id}`}>
                                        <div className='ms-3'>
                                            <div className="d-flex justify-content-between">
                                                <p className='me-3'>{user.fname} {user.lname}</p>
                                            </div>
                                            <p>@{user.username}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))

                        }
                    </div>
            }

        </>
    )
}
