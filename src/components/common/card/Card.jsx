import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Card.css';

const Card = ({title,desc,extra, children}) => {
  return (
    <div className="mt-6 d-flex justify-content-center align-items-center">
      <div className="card  bdr-15">
        <div class="row align-items-center  p-5">
        <div class="col-lg-7 text-lg-start">
            <h1 class="display-6 fw-bold lh-1 mb-3">
            <i class=" logo-color fa-solid fa-dove fs-1"></i>
              parrow {title}
            </h1>
            <p>{desc}</p>
            {
              extra && <h1 class="badge bg-success fs-6 mt-3">{extra} | Verified <i class="fa-solid fa-circle-check"></i></h1>
            }
            <vr/>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card