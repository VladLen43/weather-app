import { lazy, Suspense } from 'react'
import { ProtectedLayout } from '../app/ProtectedLayout/index.tsx'

const LazyAppPage = lazy(() => import('../app/PageWrapper.tsx'))
const LazyLoginPage = lazy(() => import('../pages/LoginPage/index.tsx'))
const LazyNotFoundPage = lazy(() => import('../pages/NotFoundPage/index.tsx'))
const LazyRegisterPage = lazy(() => import('../pages/RegisterPage/index.tsx'))

export const routes = [
  {
    path: '/login',
    element: (
      <Suspense fallback="Loading...">
        <LazyLoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback="Loading...">
        <LazyRegisterPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <Suspense fallback="Loading...">
          <LazyAppPage />
        </Suspense>
      </ProtectedLayout>
    ),
  },
  {
    path: '*',
    element: <LazyNotFoundPage />,
  },
]
