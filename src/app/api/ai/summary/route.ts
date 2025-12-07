// src/app/api/ai/summary/route.ts
import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
})

export const maxDuration = 30

export async function POST(req: Request) {
  const { title, description = '', content = '', comments = [] } = await req.json()

  const prompt = `Jesteś najlepszym polskim ekspertem legislacyjnym. Masz dwie rzeczy do zrobienia:

1. Napisz KRÓTKIE (4-6 zdań), bardzo treściwe, profesjonalne streszczenie całej ustawy/projektu – tak, jakbyś tłumaczył to posłowi w windzie. To ma być jasne, bez żargonu, z sensem.

2. Następnie zwróć szczegółową analizę w ścisłym formacie JSON (bez żadnego dodatkowego tekstu!).

Tytuł: ${title}
${description ? `Opis: ${description}` : ''}
${content ? `Treść aktu (fragment): ${content.slice(0, 12000)}...` : ''}
${
  comments.length > 0
    ? `Komentarze obywateli (${comments.length}): ${comments.slice(0, 8).join('; ')}...`
    : ''
}

Zwróć dokładnie tak:

### Streszczenie dla człowieka
[Tutaj Twoje 4-6 zdań]

### Szczegółowa analiza (JSON)
{
  "mainPoints": string[],
  "impact": string,
  "complexity": "low"|"medium"|"high",
  "stakeholders": string[],
  "timeline": string,
  "risks": string[],
  "opportunities": string[],
  "recommendation": string,
  "confidence": number
}`

  try {
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: 0.2,
    })

    // Wyciągamy część ludzką
    const humanMatch = text.match(/### Streszczenie dla człowieka([\s\S]*?)### Szczegółowa analiza/)
    const humanSummary = humanMatch
      ? humanMatch[1].trim()
      : 'Nie udało się wygenerować streszczenia.'

    // Wyciągamy JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Brak JSON w odpowiedzi AI')

    const data = JSON.parse(jsonMatch[0])

    return Response.json({
      humanSummary, // ← to jest to, czego chciałeś
      summary: data, // ← Twój szczegółowy UI
    })
  } catch (error: unknown) {
    console.error('Groq error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Błąd AI'
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
