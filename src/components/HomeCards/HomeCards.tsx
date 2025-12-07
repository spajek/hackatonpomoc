'use client'

import { useState } from 'react'
import { Container, Stack, Modal, Tabs } from '@mantine/core'
import {
  IconFileText,
  IconMessage,
  IconStar,
  IconBrain,
  IconFileDescription,
} from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { useHomeData } from '@/features/home/hooks/useHomeData'
import { useHomeSearch } from '@/features/home/hooks/useHomeSearch'
import { HomeSearch, HomeTabs } from '@/features/home/components'
import { useProjectComments } from '@/features/consultations/hooks/useProjectComments'
import { Comments } from '@/components/Comments'
import { ProjectRating } from '@/components/ProjectRating/ProjectRating'
import { AICommentsAnalysis } from '@/components/ai/AIAnalysis/AICommentsAnalysis'
import { AISummary } from '@/components/ai/AISummary/AISummary'
import ProjectDetailsTab from './ProjectDetailsTab'

export default function HomeCards() {
  const [activeTab, setActiveTab] = useState<string | null>('ustawy')
  const [selectedProject, setSelectedProject] = useState<PreConsultationProject | null>(null)

  // Load data based on active tab
  const { actsData, prekonsultacjeData, konsultacjeData, loading } = useHomeData(activeTab)

  // Initialize project comments hook
  const {
    projects: prekonsultacjeWithComments,
    addComment,
    rateProject,
  } = useProjectComments(prekonsultacjeData)

  // Search functionality
  const { searchQuery, setSearchQuery, filteredActs, filteredPrekonsultacje, filteredKonsultacje } =
    useHomeSearch(actsData, prekonsultacjeWithComments, konsultacjeData)

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <HomeSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <HomeTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          actsData={filteredActs}
          prekonsultacjeData={filteredPrekonsultacje}
          konsultacjeData={filteredKonsultacje}
          loading={loading}
          searchQuery={searchQuery}
          onProjectClick={setSelectedProject}
        />
      </Stack>

      {/* Project Details Modal */}
      <Modal
        opened={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <Tabs defaultValue="details">
            <Tabs.List>
              <Tabs.Tab value="details" leftSection={<IconFileText size={16} />}>
                Szczegóły
              </Tabs.Tab>
              <Tabs.Tab value="comments" leftSection={<IconMessage size={16} />}>
                Komentarze ({selectedProject.comments.length})
              </Tabs.Tab>
              <Tabs.Tab value="rating" leftSection={<IconStar size={16} />}>
                Oceny
              </Tabs.Tab>
              <Tabs.Tab value="ai-analysis" leftSection={<IconBrain size={16} />}>
                Analiza AI
              </Tabs.Tab>
              <Tabs.Tab value="document-summary" leftSection={<IconFileDescription size={16} />}>
                Streszczenie dokumentu AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="md">
              <ProjectDetailsTab project={selectedProject} />
            </Tabs.Panel>

            <Tabs.Panel value="comments" pt="md">
              <Comments
                comments={selectedProject.comments}
                onAddComment={(content, rating) => addComment(selectedProject.id, content, rating)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="rating" pt="md">
              <ProjectRating
                averageRating={selectedProject.averageRating}
                ratingsCount={selectedProject.ratingsCount}
                onRate={(rating, review) => rateProject(selectedProject.id, rating, review)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="ai-analysis" pt="md">
              <AICommentsAnalysis
                comments={selectedProject.comments}
                projectId={selectedProject.id}
                projectTitle={selectedProject.title}
              />
            </Tabs.Panel>

            <Tabs.Panel value="document-summary" pt="md">
              <AISummary
                type="prekonsultacja"
                title={selectedProject.title}
                description={selectedProject.description}
                content=""
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  )
}
