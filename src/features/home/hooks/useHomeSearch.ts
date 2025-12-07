import { useState, useMemo } from 'react'
import { Act, PreConsultationProject, ConsultationProject } from '@/types'

export function useHomeSearch(
  actsData: Act[],
  prekonsultacjeData: PreConsultationProject[],
  konsultacjeData: ConsultationProject[],
) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredActs = useMemo(() => {
    if (!searchQuery) return actsData
    const query = searchQuery.toLowerCase()
    return actsData.filter(
      (act) =>
        act.title.toLowerCase().includes(query),
    )
  }, [actsData, searchQuery])

  const filteredPrekonsultacje = useMemo(() => {
    if (!searchQuery) return prekonsultacjeData
    const query = searchQuery.toLowerCase()
    return prekonsultacjeData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query),
    )
  }, [prekonsultacjeData, searchQuery])

  const filteredKonsultacje = useMemo(() => {
    if (!searchQuery) return konsultacjeData
    const query = searchQuery.toLowerCase()
    return konsultacjeData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query),
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
