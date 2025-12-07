'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Group,
  Button,
  Alert,
  Loader,
  Badge,
  Progress,
  List,
  ThemeIcon,
  Blockquote,
  Paper,
} from '@mantine/core'
import {
  IconBrain,
  IconRefresh,
  IconFileText,
  IconUsers,
  IconScale,
  IconClock,
  IconAlertTriangle,
  IconBulb,
  IconCheck,
  IconQuote,
} from '@tabler/icons-react'

interface Props {
  type: 'ustawa' | 'konsultacja' | 'prekonsultacja'
  title: string
  description?: string
  content?: string
  comments?: string[]
}

interface SummaryData {
  humanSummary: string
  summary: {
    confidence: number
    mainPoints: string[]
    impact: string
    complexity: 'low' | 'medium' | 'high'
    stakeholders: string[]
    timeline: string
    risks: string[]
    opportunities: string[]
    recommendation: string
  }
}

export function AISummaryGroq({ type, title, description, content = '', comments = [] }: Props) {
  const [data, setData] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description, content, comments }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setData(json) // { humanSummary, summary }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : 'Błąd analizy')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (content || comments.length > 0) fetchSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading)
    return (
      <Card p="xl" ta="center" withBorder>
        <Loader size="lg" />
        <Text mt="md">AI czyta ustawę...</Text>
      </Card>
    )
  if (error)
    return (
      <Alert color="red" title="Błąd" icon={<IconBrain />}>
        {error}{' '}
        <Button size="xs" onClick={fetchSummary} leftSection={<IconRefresh />}>
          Spróbuj ponownie
        </Button>
      </Alert>
    )
  if (!data) return null

  const s = data.summary

  return (
    <Stack gap="xl">
      {/* TO JEST TO, CZEGO CHCIAŁEŚ – zwięzłe streszczenie całej ustawy */}
      <Paper withBorder p="lg" radius="md" bg="gray.0">
        <Group mb="md">
          <ThemeIcon size="lg" radius="md" color="blue" variant="light">
            <IconQuote />
          </ThemeIcon>
          <Text fw={700} size="lg">
            Streszczenie aktu prawnego
          </Text>
        </Group>
        <Blockquote color="blue" icon={null}>
          <Text size="lg" lh={1.55}>
            {data.humanSummary || 'Brak streszczenia.'}
          </Text>
        </Blockquote>
        <Text size="xs" c="dimmed" mt="md">
          → Wygenerowane przez Groq Llama 3.3 70B
        </Text>
      </Paper>

      {/* Twój piękny szczegółowy UI – zostaje bez zmian */}
      <Group justify="space-between" align="center">
        <Group>
          <ThemeIcon size="lg" color="blue" variant="light">
            <IconBrain />
          </ThemeIcon>
          <Text fw={700} size="lg">
            Szczegółowa analiza AI
          </Text>
        </Group>
        <Group>
          <Badge color="blue" size="lg">
            Pewność: {s.confidence}%
          </Badge>
        </Group>
      </Group>

      <Card withBorder p="md">
        <Group mb="md">
          <ThemeIcon color="blue" variant="light">
            <IconFileText />
          </ThemeIcon>
          <Text fw={600}>Kluczowe punkty</Text>
        </Group>
        <List spacing="xs">
          {s.mainPoints.map((p: string, i: number) => (
            <List.Item key={i}>• {p}</List.Item>
          ))}
        </List>
      </Card>

      <Group grow>
        <Card withBorder p="md">
          <Group mb="xs">
            <ThemeIcon color="orange" variant="light">
              <IconUsers />
            </ThemeIcon>
            <Text fw={600}>Wpływ</Text>
          </Group>
          <Text size="sm">{s.impact}</Text>
        </Card>
        <Card withBorder p="md">
          <Group mb="xs">
            <ThemeIcon
              color={s.complexity === 'high' ? 'red' : s.complexity === 'low' ? 'green' : 'yellow'}
              variant="light"
            >
              <IconScale />
            </ThemeIcon>
            <Text fw={600}>Złożoność</Text>
          </Group>
          <Badge
            color={s.complexity === 'high' ? 'red' : s.complexity === 'low' ? 'green' : 'yellow'}
            variant="filled"
          >
            {s.complexity === 'low' ? 'Niska' : s.complexity === 'high' ? 'Wysoka' : 'Średnia'}
          </Badge>
        </Card>
      </Group>

      <Card withBorder p="md">
        <Group mb="md">
          <ThemeIcon color="grape" variant="light">
            <IconUsers />
          </ThemeIcon>
          <Text fw={600}>Interesariusze</Text>
        </Group>
        <Group gap="xs">
          {s.stakeholders.map((x: string, i: number) => (
            <Badge key={i} variant="outline">
              {x}
            </Badge>
          ))}
        </Group>
      </Card>

      <Card withBorder p="md">
        <Group mb="xs">
          <ThemeIcon color="teal" variant="light">
            <IconClock />
          </ThemeIcon>
          <Text fw={600}>Harmonogram</Text>
        </Group>
        <Text size="sm">{s.timeline}</Text>
      </Card>

      <Group grow>
        <Card withBorder p="md">
          <Group mb="md">
            <ThemeIcon color="red" variant="light">
              <IconAlertTriangle />
            </ThemeIcon>
            <Text fw={600}>Główne ryzyka</Text>
          </Group>
          <List spacing="xs" size="sm">
            {s.risks.map((r: string, i: number) => (
              <List.Item key={i}>• {r}</List.Item>
            ))}
          </List>
        </Card>
        <Card withBorder p="md">
          <Group mb="md">
            <ThemeIcon color="green" variant="light">
              <IconBulb />
            </ThemeIcon>
            <Text fw={600}>Szanse i możliwości</Text>
          </Group>
          <List spacing="xs" size="sm">
            {s.opportunities.map((o: string, i: number) => (
              <List.Item key={i}>• {o}</List.Item>
            ))}
          </List>
        </Card>
      </Group>

      <Card withBorder p="md">
        <Group mb="md">
          <ThemeIcon color="blue" variant="light">
            <IconCheck />
          </ThemeIcon>
          <Text fw={700}>Ostateczna rekomendacja AI</Text>
        </Group>
        <Text size="md" mb="md">
          {s.recommendation}
        </Text>
        <Progress value={s.confidence} color="blue" />
        <Text size="sm" c="dimmed" mt="xs">
          Poziom pewności: {s.confidence}%
        </Text>
      </Card>
    </Stack>
  )
}
