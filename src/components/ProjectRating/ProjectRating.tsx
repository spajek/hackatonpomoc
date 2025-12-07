import { useState } from 'react'
import {
  Card,
  Text,
  Button,
  Group,
  Rating,
  Stack,
  Progress,
  Badge,
  Modal,
  Textarea,
} from '@mantine/core'
import { IconStar, IconUsers } from '@tabler/icons-react'

interface ProjectRatingProps {
  averageRating: number
  ratingsCount: number
  userRating?: number
  onRate: (rating: number, review?: string) => void
}

interface RatingDistributionProps {
  ratingsCount: number
}

function RatingDistribution({ ratingsCount }: RatingDistributionProps) {
  // Symulowane dane rozkładu ocen
  const distribution = [
    { stars: 5, count: Math.floor(ratingsCount * 0.4), percentage: 40 },
    { stars: 4, count: Math.floor(ratingsCount * 0.3), percentage: 30 },
    { stars: 3, count: Math.floor(ratingsCount * 0.15), percentage: 15 },
    { stars: 2, count: Math.floor(ratingsCount * 0.1), percentage: 10 },
    { stars: 1, count: Math.floor(ratingsCount * 0.05), percentage: 5 },
  ]

  return (
    <Stack gap="xs">
      <Text fw={600} size="sm">
        Rozkład ocen
      </Text>
      {distribution.map((item) => (
        <Group key={item.stars} justify="space-between">
          <Group gap="xs">
            <Text size="xs" w={20}>
              {item.stars}
            </Text>
            <IconStar size={14} />
          </Group>
          <Progress value={item.percentage} style={{ flex: 1 }} size="sm" color="yellow" mx="md" />
          <Text size="xs" c="dimmed" w={30}>
            {item.count}
          </Text>
        </Group>
      ))}
    </Stack>
  )
}

export function ProjectRating({
  averageRating,
  ratingsCount,
  userRating,
  onRate,
}: ProjectRatingProps) {
  const [selectedRating, setSelectedRating] = useState(userRating || 0)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [review, setReview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRateProject = () => {
    setShowRatingModal(true)
  }

  const handleSubmitRating = async () => {
    if (selectedRating === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Symulacja API call

    onRate(selectedRating, review)
    setShowRatingModal(false)
    setReview('')
    setIsSubmitting(false)
  }

  return (
    <>
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text fw={600} mb="xs">
                Ocena projektu
              </Text>
              <Group gap="xs">
                <Rating value={averageRating} readOnly fractions={2} />
                <Text fw={600} size="lg">
                  {averageRating.toFixed(1)}
                </Text>
              </Group>
              <Group gap="xs" mt="xs">
                <IconUsers size={16} />
                <Text size="sm" c="dimmed">
                  {ratingsCount} ocen
                </Text>
              </Group>
            </div>

            <Button
              variant={userRating ? 'light' : 'filled'}
              leftSection={<IconStar size={16} />}
              onClick={handleRateProject}
            >
              {userRating ? 'Zmień ocenę' : 'Oceń projekt'}
            </Button>
          </Group>

          <RatingDistribution ratingsCount={ratingsCount} />

          {userRating && (
            <Badge variant="light" color="green" size="lg">
              Twoja ocena: {userRating}/5 ⭐
            </Badge>
          )}
        </Stack>
      </Card>

      <Modal
        opened={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Oceń projekt"
        size="md"
      >
        <Stack>
          <div>
            <Text mb="xs">Twoja ocena:</Text>
            <Group>
              <Rating size="lg" value={selectedRating} onChange={setSelectedRating} />
              <Text fw={600}>{selectedRating}/5</Text>
            </Group>
          </div>

          <div>
            <Text mb="xs">Uzasadnienie (opcjonalne):</Text>
            <Textarea
              placeholder="Podziel się swoją opinią o tym projekcie..."
              value={review}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReview(event.currentTarget.value)
              }
              minRows={3}
              maxRows={6}
            />
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setShowRatingModal(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={selectedRating === 0}
              loading={isSubmitting}
            >
              Oceń projekt
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
