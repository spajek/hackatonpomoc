import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Progress,
  Group,
  Badge,
  SimpleGrid,
  Title,
  Button,
  Alert,
  Loader,
  ThemeIcon,
  Accordion,
} from '@mantine/core'
import {
  IconBrain,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconRefresh,
  IconThumbUp,
  IconExclamationMark,
  IconInfoCircle,
  IconUsers,
  IconMessage,
  IconChartBar,
} from '@tabler/icons-react'
import { Comment } from '../../../mocks/prekonsultacjeMock'

interface AIAnalysisProps {
  comments: Comment[]
  projectId: string
  projectTitle: string
}

interface SentimentAnalysis {
  positive: number
  negative: number
  neutral: number
  overall: 'positive' | 'negative' | 'neutral'
}

interface KeyTheme {
  theme: string
  count: number
  sentiment: 'positive' | 'negative' | 'neutral'
  examples: string[]
}

interface AIInsight {
  type: 'concern' | 'suggestion' | 'praise' | 'issue'
  title: string
  description: string
  confidence: number
  commentsCount: number
}

export function AICommentsAnalysis({ comments, projectTitle }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    sentiment: SentimentAnalysis
    keyThemes: KeyTheme[]
    insights: AIInsight[]
    summary: string
  } | null>(null)

  // Symulacja analizy AI
  const runAIAnalysis = async () => {
    setIsAnalyzing(true)

    // Symulacja czasu analizy
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mockowa analiza na podstawie komentarzy
    const mockAnalysis = {
      sentiment: {
        positive: Math.floor(Math.random() * 40) + 30, // 30-70%
        negative: Math.floor(Math.random() * 30) + 10, // 10-40%
        neutral: 0,
        overall: 'positive' as 'positive' | 'negative' | 'neutral',
      },
      keyThemes: [
        {
          theme: 'Definicja danych wrażliwych',
          count: 12,
          sentiment: 'neutral' as const,
          examples: ['Należy doprecyzować definicję', 'Zbyt ogólne sformułowania'],
        },
        {
          theme: 'Kary finansowe',
          count: 8,
          sentiment: 'negative' as const,
          examples: ['Zbyt wysokie kary', 'Nieproporcjonalne sankcje'],
        },
        {
          theme: 'Okres przejściowy',
          count: 15,
          sentiment: 'positive' as const,
          examples: ['Potrzebny dłuższy okres', 'Wsparcie dla małych firm'],
        },
        {
          theme: 'Bezpieczeństwo danych',
          count: 20,
          sentiment: 'positive' as const,
          examples: ['Ważne dla obywateli', 'Krok w dobrą stronę'],
        },
      ],
      insights: [
        {
          type: 'concern' as const,
          title: 'Obawy dotyczące implementacji',
          description:
            'Wiele komentarzy wyraża obawy o trudności w implementacji nowych wymogów, szczególnie w małych jednostkach.',
          confidence: 85,
          commentsCount: 23,
        },
        {
          type: 'suggestion' as const,
          title: 'Sugestie dotyczące kar finansowych',
          description:
            'Użytkownicy sugerują wprowadzenie progresywnej skali kar w zależności od wielkości instytucji.',
          confidence: 78,
          commentsCount: 15,
        },
        {
          type: 'praise' as const,
          title: 'Pozytywne przyjęcie celów ustawy',
          description:
            'Większość komentarzy pozytywnie ocenia cel ustawy i potrzebę wzmocnienia ochrony danych.',
          confidence: 92,
          commentsCount: 31,
        },
      ],
      summary:
        'Analiza wykazuje generalnie pozytywny odbiór projektu ustawy, jednak z istotnymi zastrzeżeniami dotyczącymi praktycznej implementacji i wysokości kar finansowych.',
    }

    mockAnalysis.sentiment.neutral =
      100 - mockAnalysis.sentiment.positive - mockAnalysis.sentiment.negative

    let overallSentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    if (mockAnalysis.sentiment.positive > mockAnalysis.sentiment.negative + 20) {
      overallSentiment = 'positive'
    } else if (mockAnalysis.sentiment.negative > mockAnalysis.sentiment.positive + 15) {
      overallSentiment = 'negative'
    } else {
      overallSentiment = 'neutral'
    }

    mockAnalysis.sentiment.overall = overallSentiment

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    if (comments.length > 0) {
      const performAnalysis = async () => {
        await runAIAnalysis()
      }
      performAnalysis()
    }
  }, [comments])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'green'
      case 'negative':
        return 'red'
      case 'neutral':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'concern':
        return <IconAlertTriangle size={16} />
      case 'suggestion':
        return <IconInfoCircle size={16} />
      case 'praise':
        return <IconThumbUp size={16} />
      case 'issue':
        return <IconExclamationMark size={16} />
      default:
        return <IconInfoCircle size={16} />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'concern':
        return 'orange'
      case 'suggestion':
        return 'blue'
      case 'praise':
        return 'green'
      case 'issue':
        return 'red'
      default:
        return 'gray'
    }
  }

  if (comments.length === 0) {
    return (
      <Alert icon={<IconInfoCircle size={16} />} title="Brak komentarzy" color="blue">
        Nie ma jeszcze komentarzy do analizy. Dodaj pierwsze komentarze, aby uruchomić analizę AI.
      </Alert>
    )
  }

  return (
    <Stack gap="xl">
      {/* Header z możliwością odświeżenia analizy */}
      <Group justify="space-between">
        <div>
          <Title order={3}>Analiza AI komentarzy</Title>
          <Text size="sm" c="dimmed">
            Analiza {comments.length} komentarzy dla: {projectTitle}
          </Text>
        </div>
        <Button
          variant="light"
          leftSection={<IconRefresh size={16} />}
          onClick={runAIAnalysis}
          loading={isAnalyzing}
        >
          Odśwież analizę
        </Button>
      </Group>

      {isAnalyzing ? (
        <Card p="xl" ta="center">
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text>Analizowanie komentarzy...</Text>
            <Text size="sm" c="dimmed">
              AI przetwarza {comments.length} komentarzy
            </Text>
          </Stack>
        </Card>
      ) : analysis ? (
        <>
          {/* Analiza sentymentu */}
          <Card shadow="sm" p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Analiza sentymentu</Title>
              <Badge
                color={getSentimentColor(analysis.sentiment.overall)}
                size="lg"
                variant="light"
              >
                {analysis.sentiment.overall === 'positive'
                  ? 'Pozytywny'
                  : analysis.sentiment.overall === 'negative'
                  ? 'Negatywny'
                  : 'Neutralny'}
              </Badge>
            </Group>

            <Stack gap="xs">
              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="green" variant="light" size="sm">
                    <IconTrendingUp size={12} />
                  </ThemeIcon>
                  <Text size="sm">Pozytywne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.positive}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.positive} color="green" size="sm" />

              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="red" variant="light" size="sm">
                    <IconTrendingDown size={12} />
                  </ThemeIcon>
                  <Text size="sm">Negatywne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.negative}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.negative} color="red" size="sm" />

              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="gray" variant="light" size="sm">
                    <IconMessage size={12} />
                  </ThemeIcon>
                  <Text size="sm">Neutralne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.neutral}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.neutral} color="gray" size="sm" />
            </Stack>
          </Card>

          {/* Kluczowe tematy */}
          <Card shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              Kluczowe tematy w komentarzach
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              {analysis.keyThemes.map((theme, index) => (
                <Card key={index} p="sm" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="sm">
                      {theme.theme}
                    </Text>
                    <Badge color={getSentimentColor(theme.sentiment)} variant="light" size="sm">
                      {theme.count}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={2}>
                    {theme.examples[0]}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Card>

          {/* Kluczowe spostrzeżenia */}
          <Card shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              Kluczowe spostrzeżenia AI
            </Title>
            <Accordion>
              {analysis.insights.map((insight, index) => (
                <Accordion.Item key={index} value={`insight-${index}`}>
                  <Accordion.Control>
                    <Group>
                      <ThemeIcon color={getInsightColor(insight.type)} variant="light" size="sm">
                        {getInsightIcon(insight.type)}
                      </ThemeIcon>
                      <div>
                        <Text fw={500}>{insight.title}</Text>
                        <Group gap="xs">
                          <Text size="xs" c="dimmed">
                            Pewność: {insight.confidence}%
                          </Text>
                          <Text size="xs" c="dimmed">
                            •
                          </Text>
                          <Text size="xs" c="dimmed">
                            {insight.commentsCount} komentarzy
                          </Text>
                        </Group>
                      </div>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{insight.description}</Text>
                    <Progress
                      value={insight.confidence}
                      color={getInsightColor(insight.type)}
                      size="xs"
                      mt="xs"
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card>

          {/* Podsumowanie */}
          <Card shadow="sm" p="md" withBorder>
            <Group mb="md">
              <ThemeIcon color="blue" variant="light">
                <IconBrain size={20} />
              </ThemeIcon>
              <Title order={4}>Podsumowanie AI</Title>
            </Group>
            <Text>{analysis.summary}</Text>
          </Card>

          {/* Statystyki */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Card p="md" withBorder ta="center">
              <ThemeIcon color="blue" size="lg" mx="auto" mb="xs">
                <IconMessage size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {comments.length}
              </Text>
              <Text size="sm" c="dimmed">
                Komentarzy
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="green" size="lg" mx="auto" mb="xs">
                <IconUsers size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {new Set(comments.map((c) => c.author)).size}
              </Text>
              <Text size="sm" c="dimmed">
                Unikalnych autorów
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="orange" size="lg" mx="auto" mb="xs">
                <IconChartBar size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {analysis.keyThemes.length}
              </Text>
              <Text size="sm" c="dimmed">
                Głównych tematów
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="violet" size="lg" mx="auto" mb="xs">
                <IconBrain size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {analysis.insights.length}
              </Text>
              <Text size="sm" c="dimmed">
                Spostrzeżeń AI
              </Text>
            </Card>
          </SimpleGrid>
        </>
      ) : null}
    </Stack>
  )
}
