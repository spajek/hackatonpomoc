'use client'
import { Container, Title, Button } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'
import { Comments } from '@/components/Comments'
import { ProjectRating } from '@/components/ProjectRating/ProjectRating'
import { AICommentsAnalysis } from '@/components/ai/AIAnalysis/AICommentsAnalysis'
import { Tabs } from '@mantine/core'
import { useProjectComments } from '@/features/consultations/hooks/useProjectComments'

export default function PrekonsultacjaDetails({ project }: { project: PreConsultationProject }) {
  const { projects, addComment, rateProject } = useProjectComments([project])
  const current = projects[0]

  return (
    <Container size="lg" py="xl">
      <Button
        component={Link}
        href="/prekonsultacje"
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        mb="lg"
      >
        ← Wróć do listy prekonsultacji
      </Button>

      <Title order={1} mb="md">
        {current.title}
      </Title>

      <Tabs defaultValue="summary" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="summary">Streszczenie AI</Tabs.Tab>
          <Tabs.Tab value="comments">Komentarze ({current.comments.length})</Tabs.Tab>
          <Tabs.Tab value="rating">Oceny</Tabs.Tab>
          <Tabs.Tab value="ai-analysis">Analiza AI</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="summary" pt="xl">
          <AISummaryGroq
            type="prekonsultacja"
            entityId={current.id}
            title={current.title}
            description={current.description}
            comments={current.comments.map((c) => c.content)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="comments" pt="xl">
          <Comments
            comments={current.comments}
            onAddComment={(c, r) => addComment(current.id, c, r)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="rating" pt="xl">
          <ProjectRating
            averageRating={current.averageRating}
            ratingsCount={current.ratingsCount}
            onRate={(r, review) => rateProject(current.id, r, review)}
          />
        </Tabs.Panel>

        <Tabs.Panel value="ai-analysis" pt="xl">
          <AICommentsAnalysis
            comments={current.comments}
            projectId={current.id}
            projectTitle={current.title}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
