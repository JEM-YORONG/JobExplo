import { Route } from 'react-router'
import { createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layouts/main-layout'
import { HomePage } from '@/pages/HomePage'
import { JobsPage } from '@/pages/JobsPage'
import { JobDetailsPage } from '@/pages/JobDetailsPage'
import { SalaryPage } from '@/pages/SalaryPage'
import { CompaniesPage } from '@/pages/CompaniesPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailsPage />} />
      <Route path="/salary" element={<SalaryPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
    </Route>
  )
)
