import { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Loader from '@/core/components/loading-snipper';
import DashboardLayout from '@/core/layout/DashboardLayout';
import { AuthProvider } from '../context/auth-context';
import { DashboardPage, LoginPage, TemplatePage } from './imports';

/*
    File to define the application's routes using react-router-dom.
    It configures the navigation structure, including layouts, authentication context,
    lazy-loaded components, and redirects.
*/

const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                {/* Outlet is where the content of the nested routes will be rendered. */}
                <Outlet />
            </AuthProvider>
        ),
        children: [
            {
                path: '/users',
                element: <Outlet />, 
                children: [
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <LoginPage />
                            </Suspense>
                        ),
                    },
                    {
                        index: true,
                        element: <Navigate to="login" replace />,
                    },
                ],
            },
            {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loader />}>
                                <DashboardPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '/templates',
                element: <DashboardLayout />, 
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<Loader />}>
                                <TemplatePage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '*',
                element: <Navigate to="/users/login" replace />,
            },
        ],
    },
]);

export default router;