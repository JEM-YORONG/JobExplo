import { api } from './axios'
import { ENDPOINTS } from './endpoints'
import type { EstimatedSalaryParams, EstimatedSalaryResponse, CompanySalaryParams, CompanySalaryResponse } from '@/types/salary'

export const getEstimatedSalary = async (params: EstimatedSalaryParams): Promise<EstimatedSalaryResponse> => {
  const { data } = await api.get(ENDPOINTS.ESTIMATED_SALARY, { params })
  return data
}

export const getCompanySalary = async (params: CompanySalaryParams): Promise<CompanySalaryResponse> => {
  const { data } = await api.get(ENDPOINTS.COMPANY_SALARY, { params })
  return data
}
