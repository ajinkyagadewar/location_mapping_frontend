import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export const routes = [
    {
        exact: true,
        path: '/home',
        // guard: true,
        component: lazy(() => import('../src/Components/Home'))
    },
    {
        exact: true,
        path: '/regions',
        // guard: true,
        component: lazy(() => import('../src/Components/Reagions'))
    },
    {
        exact: true,
        path: '/country',
        // guard: true,
        component: lazy(() => import('../src/Components/Country'))
    },
    {
        exact: true,
        path: '/city',
        // guard: true,
        component: lazy(() => import('../src/Components/City'))
    },
    {
        exact: true,
        path: '/createcity',
        // guard: true,
        component: lazy(() => import('../src/Components/CreateCity'))
    },
    {
        exact: true,
        path: '/editcity',
        // guard: true,
        component: lazy(() => import('../src/Components/EditCity'))
    },
    {
        exact: true,
        path: '/',
        // guard: true,
        component: lazy(() => import('../src/Components/Login'))
    },
    {
        exact: true,
        path: '/register',
        // guard: true,
        component: lazy(() => import('../src/Components/Register'))
    },
    {
        exact: true,
        path: '/404',
        component: lazy(() => import('../src/Components/PageNotFound'))
    },
    {
        component: () => <Redirect to="/404" />
    }
]