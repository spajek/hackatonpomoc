'use client'

import { Tabs, Group, Button } from '@mantine/core'
import { IconMessageCircle, IconGavel, IconFileText, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { ActsTab } from './ActsTab'
import { PreConsultationsTab } from './PreConsultationsTab'
import { ConsultationsTab } from './ConsultationsTab'
import { Act, PreConsultationProject, ConsultationProject } from '@/types'

interface HomeTabsProps {
  activeTab: string | null
  onTabChange: (value: string | null) => void
  actsData: Act[]
  prekonsultacjeData: PreConsultationProject[]
  konsultacjeData: ConsultationProject[]
  loading: boolean
  searchQuery: string
  onProjectClick: (project: PreConsultationProject) => void
}

export function HomeTabs({
  activeTab,
  onTabChange,
  actsData,
  prekonsultacjeData,
  konsultacjeData,
  loading,
  searchQuery,
  onProjectClick,
}: HomeTabsProps) {
  return (
    <>
      <Tabs value={activeTab} onChange={onTabChange} variant="default" keepMounted={false}>
        <Tabs.List grow mb="lg">
          <Tabs.Tab value="konsultacje" leftSection={<IconMessageCircle size={18} />}>
            Konsultacje (Aktywne)
          </Tabs.Tab>
          <Tabs.Tab value="ustawy" leftSection={<IconGavel size={18} />}>
            Nowe Ustawy
          </Tabs.Tab>
          <Tabs.Tab value="prekonsultacje" leftSection={<IconFileText size={18} />}>
            Prekonsultacje
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ustawy">
          <ActsTab data={actsData} loading={loading} searchQuery={searchQuery} />
        </Tabs.Panel>

        <Tabs.Panel value="konsultacje">
          <ConsultationsTab data={konsultacjeData} loading={false} searchQuery={searchQuery} />
        </Tabs.Panel>

        <Tabs.Panel value="prekonsultacje">
          <PreConsultationsTab
            data={prekonsultacjeData}
            loading={false}
            onProjectClick={onProjectClick}
            searchQuery={searchQuery}
          />
        </Tabs.Panel>
      </Tabs>

      <Group justify="center" mt="xl">
        <Button
          variant="subtle"
          rightSection={<IconArrowRight size={16} />}
          component={Link}
          href={`/${activeTab}`}
        >
          Zobacz wszystkie {activeTab}
        </Button>
      </Group>
    </>
  )
}
