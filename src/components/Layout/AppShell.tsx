'use client'

import { AppShell, Burger, Group, Anchor } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'
import Link from 'next/link'
import AccessibilityPanel from '../AccessibilityPanel/AccessibilityPanel'

interface AppShellLayoutProps {
  children: ReactNode
}

export default function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Nawigacja"
            />
            <Anchor
              component={Link}
              href="/"
              fw={700}
              c="inherit"
              td="none"
              style={{
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--mantine-color-blue-6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit'
              }}
            >
              INTERAKTYWNY PORTAL ANALIZ LEGISLACYJNYCH (IPAL)
            </Anchor>
          </Group>

          <div>
            <AccessibilityPanel />
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
