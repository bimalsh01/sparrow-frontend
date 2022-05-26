import React from 'react'
import Card from '../card/Card'
import "./Loader.css"

const Loader = ({message}) => {
  return (
    <div>
      <Card title="" icon="Just relax and wait, we are working on it.">
        
          <div class="ldSpinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <span>{message}</span>
          </div>
          

      </Card>
    </div>
  )
}

export default Loader