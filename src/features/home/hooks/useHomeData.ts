'use client'

import { useState, useEffect } from 'react'
import { fakeFetchUstawy, Act } from '@/mocks/sejmMock'
import { preConsultationProjects, consultationProjects } from '@/mocks/prekonsultacjeMock'

export function useHomeData(activeTab: string | null) {
  const [actsData, setActsData] = useState<Act[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 'ustawy') {
        setLoading(true)
        try {
          const response = await fakeFetchUstawy('DU', '2025', 1, 6)
          setActsData(response.items)
        } catch (error) {
          console.error('Błąd pobierania danych', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadData()
  }, [activeTab])

  return {
    actsData,
    prekonsultacjeData: preConsultationProjects,
    konsultacjeData: consultationProjects,
    loading,
  }
}
