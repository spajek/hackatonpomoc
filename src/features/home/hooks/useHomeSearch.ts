// src/features/home/hooks/useHomeSearch.ts

import { useState, useMemo } from 'react'
import { Act, PreConsultationProject, ConsultationProject } from '@/types'

export function useHomeSearch(
  actsData: Act[],
  prekonsultacjeData: PreConsultationProject[],
  konsultacjeData: ConsultationProject[], // ← poprawny typ
) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredActs = useMemo(() => {
    if (!searchQuery) return actsData
    const q = searchQuery.toLowerCase()
    return actsData.filter((act) => act.title.toLowerCase().includes(q))
  }, [actsData, searchQuery])

  const filteredPrekonsultacje = useMemo(() => {
    if (!searchQuery) return prekonsultacjeData
    const q = searchQuery.toLowerCase()
    return prekonsultacjeData.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }, [prekonsultacjeData, searchQuery])

  const filteredKonsultacje = useMemo(() => {
    if (!searchQuery) return konsultacjeData
    const q = searchQuery.toLowerCase()
    return konsultacjeData.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }, [konsultacjeData, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredActs,
    filteredPrekonsultacje,
    filteredKonsultacje,
  }
}
