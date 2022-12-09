import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => (
    <>
        <ReactLoading
            type={type}
            color={color}
            height={25}
            width={25}
            className=""
        />
        <span>Please wait...</span>
    </>
)

export default Loading
