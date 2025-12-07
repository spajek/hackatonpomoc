'use client'

import { Stack, Group, Text, Badge, Grid } from '@mantine/core'
import { PreConsultationProject } from '@/types'
import { StatusBadge } from '@/components/shared'

interface ProjectDetailsTabProps {
  project: PreConsultationProject
}

export default function ProjectDetailsTab({ project }: ProjectDetailsTabProps) {
  return (
    <Stack gap="md">
      <Group>
        <StatusBadge status={project.status} variant="light" />
        <Badge variant="outline">{project.category}</Badge>
      </Group>

      <Text>{project.description}</Text>

      <Grid>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Instytucja:
          </Text>
          <Text size="sm">{project.institution}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Termin:
          </Text>
          <Text size="sm">{new Date(project.deadline).toLocaleDateString('pl-PL')}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Data utworzenia:
          </Text>
          <Text size="sm">{new Date(project.createdAt).toLocaleDateString('pl-PL')}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Dokumenty:
          </Text>
          <Text size="sm">{project.documentsCount} plików</Text>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
