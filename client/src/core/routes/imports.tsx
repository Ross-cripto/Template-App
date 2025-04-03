import React, { type JSX } from 'react';

export const LoginPage = React.lazy(() => import('@/modules/users/pages/login/login-page'));
(LoginPage as React.LazyExoticComponent<() => JSX.Element> & { preload?: () => Promise<void> }).preload = () => import('@/modules/users/pages/login/login-page').then(() => {});

export const DashboardPage = React.lazy(() => import('@/core/pages/dashboard/dashboard-page'));
(DashboardPage as React.LazyExoticComponent<() => JSX.Element> & { preload?: () => Promise<void> }).preload = () => import('@/core/pages/dashboard/dashboard-page').then(() => {});

export const TemplatePage = React.lazy(() => import('@/modules/templates/pages/index'));
(TemplatePage as React.LazyExoticComponent<() => JSX.Element> & { preload?: () => Promise<void> }).preload = () => import('@/modules/templates/pages/index').then(() => {});