import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Group,
  Alert,
  Loader,
  ThemeIcon,
  Badge,
  List,
  Progress,
} from '@mantine/core'
import {
  IconBrain,
  IconInfoCircle,
  IconBulb,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconScale,
  IconUsers,
  IconFileText,
} from '@tabler/icons-react'

interface AISummaryProps {
  type: 'ustawa' | 'konsultacja' | 'prekonsultacja'
  title: string
  description?: string
  content?: string
  comments?: string[]
  participants?: number
  status?: string
}

interface AISummaryData {
  mainPoints: string[]
  impact: string
  complexity: 'low' | 'medium' | 'high'
  stakeholders: string[]
  timeline: string
  risks: string[]
  opportunities: string[]
  recommendation: string
  confidence: number
}

export function AISummary({ type, title, comments, participants }: AISummaryProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [summary, setSummary] = useState<AISummaryData | null>(null)

  useEffect(() => {
    const generateAISummary = async () => {
      setIsAnalyzing(true)

      // Symulacja czasu analizy
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mockowe streszczenie AI na podstawie typu
      let mockSummary: AISummaryData

      if (type === 'ustawa') {
        mockSummary = {
          mainPoints: [
            'Wprowadzenie nowych standardów ochrony danych osobowych',
            'Wzmocnienie kar za naruszenie przepisów',
            'Uproszczenie procedur dla małych organizacji',
            'Rozszerzenie definicji danych wrażliwych',
          ],
          impact: 'Średni - wpłynie na wszystkie instytucje publiczne i część sektora prywatnego',
          complexity: 'medium',
          stakeholders: [
            'Instytucje publiczne',
            'Firmy IT',
            'Organizacje pozarządowe',
            'Obywatele',
          ],
          timeline: 'Wejście w życie planowane na 6 miesięcy od publikacji',
          risks: [
            'Wysokie koszty implementacji dla małych firm',
            'Możliwe opóźnienia w dostosowaniu systemów IT',
            'Potrzeba szkoleń dla personelu',
          ],
          opportunities: [
            'Zwiększenie zaufania obywateli do instytucji',
            'Harmonizacja z regulacjami UE',
            'Rozwój sektora cyberbezpieczeństwa',
          ],
          recommendation:
            'Ustawa jest potrzebna, ale wymaga wydłużenia okresu przejściowego i dodatkowego wsparcia dla małych organizacji.',
          confidence: 87,
        }
      } else if (type === 'konsultacja') {
        mockSummary = {
          mainPoints: [
            'Reforma ma na celu poprawę dostępności usług zdrowotnych',
            'Planowane zwiększenie finansowania o 15%',
            'Digitalizacja procesów medycznych',
            'Nowe standardy jakości opieki',
          ],
          impact: 'Wysoki - dotknie wszystkich pacjentów i pracowników służby zdrowia',
          complexity: 'high',
          stakeholders: [
            'Pacjenci',
            'Lekarze',
            'Pielęgniarki',
            'Szpitale',
            'NFZ',
            'Firmy farmaceutyczne',
          ],
          timeline: 'Implementacja w ciągu 2-3 lat w fazach',
          risks: [
            'Opór środowiska medycznego wobec zmian',
            'Wysokie koszty modernizacji infrastruktury',
            'Możliwe przerwy w świadczeniu usług',
          ],
          opportunities: [
            'Skrócenie kolejek do specjalistów',
            'Lepsza koordynacja opieki',
            'Rozwój telemedycyny',
          ],
          recommendation: `Na podstawie ${
            participants || 'wielu'
          } uczestników konsultacji, reforma jest potrzebna ale wymaga ostrożnej implementacji.`,
          confidence: 92,
        }
      } else {
        // prekonsultacja
        mockSummary = {
          mainPoints: [
            'Projekt wprowadza nowe mechanizmy partycypacji obywatelskiej',
            'Cyfryzacja procesów konsultacyjnych',
            'Zwiększenie transparentności procesów legislacyjnych',
            'Nowe narzędzia komunikacji z społeczeństwem',
          ],
          impact: 'Średni - wpłynie na jakość procesów demokratycznych',
          complexity: 'low',
          stakeholders: ['Obywatele', 'Organizacje społeczne', 'Urzędy', 'Media', 'Eksperci'],
          timeline: 'Pilotaż w wybranych urzędach w ciągu 6 miesięcy',
          risks: [
            'Niska aktywność obywateli w nowych formach konsultacji',
            'Problemy techniczne z platformami cyfrowymi',
            'Opór części urzędników',
          ],
          opportunities: [
            'Większe zaangażowanie społeczne w tworzenie prawa',
            'Lepsza jakość projektów ustaw',
            'Wzrost zaufania do instytucji',
          ],
          recommendation: `Projekt ma duży potencjał. ${
            comments?.length || 0
          } komentarzy wskazuje na zainteresowanie społeczne.`,
          confidence: 78,
        }
      }

      setSummary(mockSummary)
      setIsAnalyzing(false)
    }

    generateAISummary()
  }, [type, title, participants, comments])

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'green'
      case 'medium':
        return 'yellow'
      case 'high':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'Niska'
      case 'medium':
        return 'Średnia'
      case 'high':
        return 'Wysoka'
      default:
        return 'Nieznana'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ustawa':
        return 'Ustawy'
      case 'konsultacja':
        return 'Konsultacji'
      case 'prekonsultacja':
        return 'Prekonsultacji'
      default:
        return 'Dokumentu'
    }
  }

  if (isAnalyzing) {
    return (
      <Card shadow="sm" p="md" withBorder>
        <Stack align="center" gap="md">
          <ThemeIcon color="blue" size="xl">
            <IconBrain size={24} />
          </ThemeIcon>
          <Loader size="md" />
          <Text>AI analizuje {getTypeLabel(type).toLowerCase()}...</Text>
          <Text size="sm" c="dimmed">
            Przetwarzanie treści i generowanie streszczenia
          </Text>
        </Stack>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Alert icon={<IconInfoCircle size={16} />} title="Streszczenie AI" color="blue">
        Brak danych do analizy. Spróbuj ponownie później.
      </Alert>
    )
  }

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between">
        <Group>
          <ThemeIcon color="blue" variant="light">
            <IconBrain size={20} />
          </ThemeIcon>
          <div>
            <Text fw={600}>Streszczenie AI</Text>
            <Text size="sm" c="dimmed">
              Automatyczna analiza {getTypeLabel(type).toLowerCase()}
            </Text>
          </div>
        </Group>
        <Group>
          <Badge color="blue" variant="light">
            Pewność: {summary.confidence}%
          </Badge>
        </Group>
      </Group>

      {/* Główne punkty */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconFileText size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowe punkty
          </Text>
        </Group>
        <List spacing="xs" size="sm">
          {summary.mainPoints.map((point, index) => (
            <List.Item key={index}>{point}</List.Item>
          ))}
        </List>
      </Card>

      {/* Wpływ i złożoność */}
      <Group grow>
        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color="orange" variant="light" size="sm">
              <IconUsers size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Wpływ
            </Text>
          </Group>
          <Text size="sm">{summary.impact}</Text>
        </Card>

        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color={getComplexityColor(summary.complexity)} variant="light" size="sm">
              <IconScale size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Złożoność
            </Text>
          </Group>
          <Badge color={getComplexityColor(summary.complexity)} variant="light">
            {getComplexityLabel(summary.complexity)}
          </Badge>
        </Card>
      </Group>

      {/* Interesariusze */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="grape" variant="light" size="sm">
            <IconUsers size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowi interesariusze
          </Text>
        </Group>
        <Group gap="xs">
          {summary.stakeholders.map((stakeholder, index) => (
            <Badge key={index} variant="outline" size="sm">
              {stakeholder}
            </Badge>
          ))}
        </Group>
      </Card>

      {/* Timeline */}
      <Card p="md" withBorder>
        <Group mb="xs">
          <ThemeIcon color="teal" variant="light" size="sm">
            <IconClock size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Harmonogram
          </Text>
        </Group>
        <Text size="sm">{summary.timeline}</Text>
      </Card>

      {/* Ryzyka i możliwości */}
      <Group grow align="flex-start">
        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="red" variant="light" size="sm">
              <IconAlertTriangle size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Ryzyka
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.risks.map((risk, index) => (
              <List.Item key={index}>{risk}</List.Item>
            ))}
          </List>
        </Card>

        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="green" variant="light" size="sm">
              <IconBulb size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Możliwości
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.opportunities.map((opportunity, index) => (
              <List.Item key={index}>{opportunity}</List.Item>
            ))}
          </List>
        </Card>
      </Group>

      {/* Rekomendacja */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconCheck size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Rekomendacja AI
          </Text>
        </Group>
        <Text size="sm">{summary.recommendation}</Text>
        <Progress value={summary.confidence} color="blue" size="xs" mt="xs" />
        <Text size="xs" c="dimmed" mt="xs">
          Poziom pewności: {summary.confidence}%
        </Text>
      </Card>
    </Stack>
  )
}
