import React from 'react'
import ReactLoading from 'react-loading'

const Loading = () => (
    <>
        <ReactLoading
            type={'spin'}
            color={'#333'}
            height={25}
            width={25}
            className=""
        />
        <span>Please wait...</span>
    </>
)

export default Loading
