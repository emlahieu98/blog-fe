import { AuthApi } from 'Apis/AuthApi'
import clsx from 'clsx'
import Modal from 'Components/Modal'
import { navLink } from 'Constants/NavLink'
import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useWeb3Store } from '../../store/web3Store'
import UserModal from '../UserModal/UserModal'
import {
    FcPortraitMode,
    FcLike,
    FcEngineering,
    FcCamera,
    FcCloth,
    FcDam,
    FcCalculator,
    FcDisplay,
    FcDeleteDatabase,
} from 'react-icons/fc'
export default function Header() {
    const [isMenu, setMenu] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const { connect, isConnected } = useWeb3Store()

    return (
        <div className="fixed top-0 bg-white w-full z-40 ">
            <Modal isModal={isMenu} setModal={setMenu}>
                <div
                    className={clsx(
                        'fixed top-0 left-0 h-screen w-10/12 bg-white shadow-xl z-50 transition-transform duration-500 pl-4 pt-12',
                        {
                            'translate-x-0': isMenu,
                            'translate-x-[-100%]': !isMenu,
                        }
                    )}
                >
                    <div>
                        <>
                            <div
                                className={
                                    'py-4 my-1 px-4 flex gap-4 w-auto items-center'
                                }
                            >
                                <FcPortraitMode />
                                <FcLike />
                                <FcEngineering />
                                <FcCamera />
                                <FcDam />
                                <FcCalculator />
                                <FcDeleteDatabase />
                                <FcCloth />
                                <FcDisplay />
                            </div>
                        </>
                    </div>
                    <div className="border-y-[1px] py-3">
                        {navLink.map((val, index) => (
                            <NavLink
                                to={val.path}
                                key={index}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'py-4 my-1 px-4 flex gap-4 w-auto items-center bg-[#e8ebed] rounded-l-lg'
                                        : 'py-4 my-1 px-4 flex gap-4 items-center w-auto'
                                }
                            >
                                {val.icon}
                                <p className="capitalize text-xs font-semibold">
                                    {val.title}
                                </p>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </Modal>
            <header className="px-5 lg:px-7 py-4 flex justify-between items-center border-b-[1px]">
                <section
                    className="lg:hidden"
                    onClick={() => {
                        setMenu(true)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </section>

                <section className="3 items-center hidden lg:flex gap-3">
                    <Link to="/">
                        <img
                            className="h-9 w-9 rounded-full"
                            src="/favicon/logo.png"
                            alt="blog"
                        />
                    </Link>
                    {!!location.pathname.split('/')[1] ? (
                        <div className="flex items-center text-gray-500 hover:animate-pulse">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <p
                                className="font-semibold text-sm cursor-pointer"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Go back
                            </p>
                        </div>
                    ) : (
                        <h3 className="font-bold text-sm">emlahieu</h3>
                    )}
                </section>

                <section className="max-w-[420px] w-full hidden md:flex gap-2 items-center border-2 rounded-full h-9 focus-within:border-black">
                    <div className="pl-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color="gray"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        className="w-full outline-0 border-0 rounded-r-[inherit] text-sm"
                        type="text"
                        placeholder="Searching everything..."
                    />
                </section>
                <section className="flex gap-5 items-center">
                    <div className="md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {!isConnected ? (
                        <button
                            className="px-4 py-2 rounded-full bg-orange-500 text-white"
                            onClick={connect}
                        >
                            Connect wallet
                        </button>
                    ) : (
                        <>
                            <div className="flex gap-6">
                                <UserModal />
                            </div>
                            <div></div>
                        </>
                    )}
                </section>
            </header>
        </div>
    )
}
