'use client'

import { useState } from 'react'
import { Act, PreConsultationProject, ConsultationProject } from '@/types'

export function useHomeSearch(
  actsData: Act[],
  prekonsultacjeData: PreConsultationProject[],
  konsultacjeData: ConsultationProject[],
) {
  const [searchQuery, setSearchQuery] = useState('')

  const query = searchQuery.toLowerCase()

  const filteredActs = !query
    ? actsData
    : actsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.ELI.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query),
      )

  const filteredPrekonsultacje = !query
    ? prekonsultacjeData
    : prekonsultacjeData.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.institution.toLowerCase().includes(query),
      )

  const filteredKonsultacje = !query
    ? konsultacjeData
    : konsultacjeData.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.institution.toLowerCase().includes(query),
      )

  return {
    searchQuery,
    setSearchQuery,
    filteredActs,
    filteredPrekonsultacje,
    filteredKonsultacje,
  }
}
