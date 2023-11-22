import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Main from './shared/Main';
import History from "./pages/manageRequests/History";
import ManageRequests from "./pages/manageRequests/ManageRequests";
import LogIn from "./pages/Auth/logIn/LogIn";
import SignUp from "./pages/Auth/register/SignUp";
import ManageBooks from "./pages/manageBooks/MangeBooks";
//import NotFound from "./shared/NotFound";
import ManageReaders from "./pages/manageReaders/ManageReaders";
import BookInfo from "./pages/User/products/components/BookInfo";
//import Homepage from "./shared/HomePage";
import ManageChapters from "./pages/manageChapters/ManageChapters"
import Guest from "./middleware/Guest";
import Requests from "./pages/User/Requests/Requests";
import BooksList from "./pages/User/products/components/BookDetails/BooksList";
import Admin from "./middleware/Admin";
import UpdateBook from "./pages/manageBooks/UpdateBook";
import AddBook from "./pages/manageBooks/AddBook";
import AddUser from "./pages/manageReaders/AddUser";
import UpdateUser from "./pages/manageReaders/UpdateUser";
import AddChapter from "./pages/manageChapters/AddChapter";
import UpdateChapter from "./pages/manageChapters/UpdateChapter";

export const router = createBrowserRouter([

    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />,


            },
            {
                path: "/viewBooks",
                element: <BooksList />,

            },
            {
                path: ":id",
                element: <BookInfo />,
            },
            {
                path: "/Requests",
                element: <Requests />

            },


            //GUEST MIDDLEWARE
            {
                element: <Guest />,
                children: [
                    {
                        path: "/logIn",
                        element: <LogIn />,
                    },
                    {
                        path: "/logIn/SingUp",
                        element: <SignUp />,
                    },
                ],

            },

            //ADMIN MIDDLEWARE
            {
                element: <Admin />,
                children: [
                    {
                        //path:"/manageBooks",
                        //element: <ManageBooks/>,
                        path: "/manageBooks",
                        children: [
                            {
                                path: "",
                                element: <ManageBooks />
                            },
                            {
                                path: "add",
                                element: <AddBook />
                            },

                            {
                                path: ":id",
                                element: <UpdateBook />
                            },
                            {
                                path: "manageChapters",
                                children: [
                                    {
                                        path: ":id",
                                        element: <ManageChapters />
                                    },
                                    {
                                        path: "add",
                                        children: [
                                            {
                                                path: ":id",
                                                element: <AddChapter />
                                            },
                                        ],
                                    },
                                    {
                                        path: "update",
                                        children: [
                                            {
                                                path: ":id",
                                                element: <UpdateChapter />
                                            },
                                        ],
                                    },
        
                                ],
                            },
                        ],

                    }, {
                        path: "/manageReaders",
                        children: [
                            {
                                path: "",
                                element: <ManageReaders />
                            },
                            {
                                path: "add",
                                element: <AddUser />
                            },

                            {
                                path: ":id",
                                element: <UpdateUser />
                            },
                        ],

                    },
                    {
                        path: "/manageRequests",
                        children: [
                            {
                                path: "",
                                element: <ManageRequests />
                            },
                            {
                                path: "user_request",
                                children: [
                                    {
                                        path: ":id",
                                        element: <History />
                                    },
                                ],
                            },
                        ],
                    },


                   
                ],

            },
            /*{
                path:"/book-info/:id",
                element: <BookInfo/>,
        
            },
            */

            {
                path: "*",
                element: <Navigate to={"/"} />,

            },
        ],

    },

]);