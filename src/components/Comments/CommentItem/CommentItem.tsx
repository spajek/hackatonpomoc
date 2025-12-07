'use client'

import { useState } from 'react'
import { Card, Text, Group, Avatar, Rating, Badge } from '@mantine/core'
import { Comment } from '@/types'
import { CommentActions } from './CommentActions'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [showReply, setShowReply] = useState(false)

  const initials = comment.author
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <Card shadow="sm" p="md" radius="md">
      <Group justify="space-between" mb="xs">
        <Group>
          <Avatar size={40} radius="xl" color="blue">
            {initials}
          </Avatar>
          <div>
            <Text fw={500} size="sm">
              {comment.author}
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(comment.date).toLocaleDateString('pl-PL')}
            </Text>
          </div>
        </Group>
        {comment.rating && (
          <Badge variant="light" color="yellow">
            <Rating value={comment.rating} readOnly size="xs" />
          </Badge>
        )}
      </Group>

      <Text size="sm" mb="md">
        {comment.content}
      </Text>

      <CommentActions
        likes={likes}
        dislikes={dislikes}
        onLike={() => setLikes(likes + 1)}
        onDislike={() => setDislikes(dislikes + 1)}
        onReply={() => setShowReply(!showReply)}
      />

      {showReply && (
        <Card mt="md" p="sm" withBorder>
          <Text size="sm" c="dimmed">
            Funkcja odpowiedzi będzie dostępna wkrótce
          </Text>
        </Card>
      )}
    </Card>
  )
}
