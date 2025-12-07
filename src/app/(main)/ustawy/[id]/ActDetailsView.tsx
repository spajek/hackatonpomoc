'use client'

import Link from 'next/link'
import {
  Container,
  Title,
  Text,
  Timeline,
  Badge,
  Group,
  Button,
  Tabs,
  Stack,
  Card,
  SimpleGrid,
  ThemeIcon,
} from '@mantine/core'
import {
  IconCheck,
  IconArrowLeft,
  IconFileText,
  IconBrain,
  IconDownload,
  IconExternalLink,
  IconCalendar,
} from '@tabler/icons-react'
import { ActDetails } from '@/mocks/sejmMock'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'

interface ActDetailsViewProps {
  act: ActDetails
}

export default function ActDetailsView({ act }: ActDetailsViewProps) {
  // Ustalanie aktywnego kroku na podstawie wypełnionych dat
  const activeIndex = act.stages.filter((s: { isCompleted: boolean }) => s.isCompleted).length - 1

  // Linki do plików (konstrukcja na podstawie dokumentacji API)
  const pdfUrl = act.textPDF
    ? `https://api.sejm.gov.pl/eli/acts/${act.publisher}/${act.year}/${act.pos}/text.pdf`
    : null

  const htmlUrl = act.textHTML
    ? `https://api.sejm.gov.pl/eli/acts/${act.publisher}/${act.year}/${act.pos}/text.html`
    : null

  return (
    <Container size="md" py="xl">
      <Button
        component={Link}
        href="/ustawy"
        variant="subtle"
        size="sm"
        mb="md"
        leftSection={<IconArrowLeft size={16} />}
      >
        Powrót do listy
      </Button>

      <Group justify="space-between" mb="xs" align="start">
        <Badge size="lg" color={act.status === 'obowiązujący' ? 'green' : 'blue'} tt="uppercase">
          {act.status}
        </Badge>
        <Text c="dimmed" size="sm" fw={700}>
          {act.displayAddress}
        </Text>
      </Group>

      <Title order={2} mb="md" lh={1.3}>
        {act.title}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
        <Card withBorder padding="sm">
          <Group gap="xs">
            <ThemeIcon variant="light" color="gray">
              <IconCalendar size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Data ogłoszenia
              </Text>
              <Text fw={500}>{act.promulgation || 'Brak danych'}</Text>
            </div>
          </Group>
        </Card>
        <Card withBorder padding="sm">
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue">
              <IconFileText size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Typ aktu
              </Text>
              <Text fw={500}>{act.type}</Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Sekcja pobierania tekstów źródłowych */}
      {(pdfUrl || htmlUrl) && (
        <Group mt="md">
          {pdfUrl && (
            <Button
              component="a"
              href={pdfUrl}
              target="_blank"
              variant="outline"
              color="red"
              leftSection={<IconDownload size={16} />}
            >
              Pobierz akt (PDF)
            </Button>
          )}
          {htmlUrl && (
            <Button
              component="a"
              href={htmlUrl}
              target="_blank"
              variant="outline"
              leftSection={<IconExternalLink size={16} />}
            >
              Tekst aktu (HTML)
            </Button>
          )}
        </Group>
      )}

      {/* Słowa kluczowe */}
      {act.keywords && act.keywords.length > 0 && (
        <Group gap="xs" mt="lg">
          {act.keywords.map((keyword: string, index: number) => (
            <Badge key={index} variant="dot" color="gray" tt="none">
              {keyword}
            </Badge>
          ))}
        </Group>
      )}

      <Tabs defaultValue="timeline" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="timeline" leftSection={<IconFileText size={16} />}>
            Status prawny
          </Tabs.Tab>
          <Tabs.Tab value="ai-summary" leftSection={<IconBrain size={16} />}>
            Streszczenie AI
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="timeline" pt="md">
          <Stack gap="md">
            <Title order={4}>Cykl życia aktu prawnego</Title>

            <Timeline active={activeIndex} bulletSize={32} lineWidth={2}>
              {act.stages.map(
                (stage: {
                  stepNumber: number
                  name: string
                  date: string | null
                  isCompleted: boolean
                }) => (
                  <Timeline.Item
                    key={stage.stepNumber}
                    bullet={
                      stage.isCompleted ? (
                        <IconCheck size={18} />
                      ) : (
                        <Text size="xs" fw={700}>
                          {stage.stepNumber}
                        </Text>
                      )
                    }
                    title={
                      <Text fw={600} size="sm" c={stage.isCompleted ? 'dark' : 'dimmed'}>
                        {stage.name}
                      </Text>
                    }
                  >
                    {stage.date ? (
                      <Text size="sm" c="dimmed" mt={4}>
                        {stage.date}
                      </Text>
                    ) : (
                      <Text size="xs" c="dimmed" mt={4}>
                        Oczekuje na realizację
                      </Text>
                    )}
                  </Timeline.Item>
                ),
              )}
            </Timeline>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="ai-summary" pt="md">
          <AISummaryGroq
            type="ustawa"
            entityId={act.ELI}
            title={act.title}
            description={`Akt prawny ${act.displayAddress}`}
            content={
              act.fullText || act.title + ' – treść aktu prawnego zostanie wkrótce załadowana.'
            }
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
