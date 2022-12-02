import Login from 'Components/Auth/Login'
import AuthPage from 'Pages/Auth'
import HomePage from 'Pages/Home'
import Blog from 'Pages/Home/Blog'
import LearningPage from 'Pages/Home/Learning'
import MarketplacePage from 'Pages/Marketplace/index'
import Learning from 'Pages/Home/Learning/Learning'
import Main from 'Pages/Home/Main'
import NotFound from 'Pages/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostsPage from 'Pages/Posts'
import CreatePostPage from 'Pages/CreatePost'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BookMark from 'Pages/Home/BookMark'
import ToastTuyn from 'Components/Toast/ToastTuyn'

function App() {
    return (
        <>
            <ToastTuyn />
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route path="new-post" element={<CreatePostPage />} />
                {/* <Route path="@:username" element={<PersonalPage />} /> */}
                <Route path="blog/:slug" element={<PostsPage />} />
                {/* <Route path="auth" element={<AuthPage />}>
                    <Route path="login" element={<Login />} /> */}
                {/* <Route path="register" element={<Register />} /> */}
                {/* </Route> */}
                <Route path="blog/:slug" element={<PostsPage />} />
                <Route path="/" element={<HomePage />}>
                    <Route path="" element={<Main />} />
                    <Route path="marketplace" element={<MarketplacePage />} />
                    <Route path="project" element={<LearningPage />}>
                        <Route path="" element={<Learning />} />
                    </Route>
                    <Route path="me/bookmark/posts" element={<BookMark />} />
                    <Route path="blog" element={<Blog />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
