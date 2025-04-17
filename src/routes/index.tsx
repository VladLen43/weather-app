import { lazy, Suspense } from 'react'
import { ProtectedLayout } from '../app/ProtectedLayout/index.tsx'
import { NotFoundPage } from '../pages/NotFoundPage/index.tsx'

const LazyAppPage = lazy(() => import('../app/App.tsx').then((module) => ({ default: module.default })))
const LazyLoginPage = lazy(() =>
  import('../pages/LoginPage/index.tsx').then((module) => ({ default: module.LoginPage })),
)
const LazyChartsPage = lazy(() =>
  import('../pages/ChartsPage/index.tsx').then((module) => ({ default: module.ChartsPage })),
)

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
    path: '/',
    element: (
      <ProtectedLayout>
        <Suspense fallback="Loading...">
          <LazyAppPage />
        </Suspense>
      </ProtectedLayout>
    ),
    children: [
      {
        path: 'charts',
        element: (
          <Suspense fallback="Loading...">
            <LazyChartsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
