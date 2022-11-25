import { PostApi } from 'Apis/PostApi'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

export default function ActionPosts() {
    const [Posts, setPosts] = useState([])
    const { slug } = useParams()

    const { data } = useQuery(['posts', slug], async () =>
        PostApi.getPostsBySlug(slug)
    )

    useEffect(() => {
        setPosts(data)
    }, [data])

    return (
        <>
            <div className="sticky top-[70px]">
                <div className="pb-3 border-b-[1px]">
                    <h1 className="font-semibold pt-5 text-center">Idioms</h1>
                    <p className="text-sm text-gray-500">
                        {`Study, learn more, learn forever`}
                    </p>
                </div>
            </div>
        </>
    )
}
