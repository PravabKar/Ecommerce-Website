import React from 'react'

const Footer = () => {
  return (
    <div className='d-flex justify-content-between align-items-center' style={{height: "20%", color: "white", backgroundColor: "black"}}>
        <div style={{margin: "1%", paddingLeft: "10%"}}>
            <label>About Us</label>
            <ul>
                <li>xyz</li>
                <li>xyz</li>
                <li>xyz</li>
                <li>xyz</li>
            </ul>
        </div>
        <div style={{margin: "1%", paddingRight: "10%"}}>
            <label>Address : Odisha, India</label>
            <ul>
                <li>xyz</li>
                <li>xyz</li>
                <li>xyz</li>
                <li>xyz</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer