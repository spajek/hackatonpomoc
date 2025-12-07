export interface Act {
  ELI: string
  title: string
  year: number
  pos: number
  status: string
  type: string
  publisher: string
  displayAddress: string
  announcementDate: string
  textPDF?: boolean
  textHTML?: boolean
}

export interface Stage {
  stepNumber: number
  name: string
  date: string | null
  isCompleted: boolean
}

export interface ActDetails extends Act {
  promulgation?: string
  entryIntoForce?: string
  stages: Stage[]
  keywords: string[]
  fullText?: string
}

export interface ApiResponse {
  totalCount: number
  count: number
  offset: number
  items: Act[]
}

const isServer = typeof window === 'undefined'

function getBaseUrl() {
  if (!isServer) return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL
  return 'http://localhost:3000'
}

const API_BASE = `${getBaseUrl()}/api/proxy/eli`

export async function fakeFetchUstawy(
  publisher: string = 'DU',
  year: string = '2025',
  page: number = 1,
  limit: number = 20,
): Promise<ApiResponse> {
  const offset = (page - 1) * limit
  const params = new URLSearchParams({
    publisher,
    year,
    offset: offset.toString(),
    limit: limit.toString(),
    sortBy: 'pos',
    sortDir: 'desc',
  })

  const url = `${API_BASE}/acts/search?${params}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl/',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    return {
      totalCount: data.totalCount || 0,
      count: data.count || 0,
      offset: data.offset || 0,
      items: (data.items || []).map((item: Act) => ({
        ELI: item.ELI,
        title: item.title,
        year: item.year,
        pos: item.pos,
        status: item.status || 'nieznany',
        type: item.type || 'Inny',
        publisher: item.publisher,
        displayAddress: item.displayAddress,
        announcementDate: item.announcementDate,
        textPDF: item.textPDF,
        textHTML: item.textHTML,
      })),
    }
  } catch (error) {
    console.error('Błąd listy ustaw:', error)
    return { totalCount: 0, count: 0, offset: 0, items: [] }
  }
}

export async function fakeFetchActDetails(eliId: string): Promise<ActDetails | null> {
  const decoded = decodeURIComponent(eliId)
  const parts = decoded.split('/')
  if (parts.length < 3) return null
  const [publisher, year, pos] = parts

  const url = `${API_BASE}/acts/${publisher}/${year}/${pos}`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl',
      },
      next: { revalidate: 3600 },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    return {
      ...data,
      fullText: `Pełny tekst aktu prawnego ${data.displayAddress}\n\nTytuł: ${data.title}\n\nTreść dostępna w formacie PDF i HTML na stronie Sejmu RP.\n\nAI wkrótce przeanalizuje pełną treść!`,
      stages: [
        {
          stepNumber: 1,
          name: 'Data wydania',
          date: data.announcementDate,
          isCompleted: true,
        },
        {
          stepNumber: 2,
          name: 'Data ogłoszenia',
          date: data.promulgation,
          isCompleted: !!data.promulgation,
        },
        {
          stepNumber: 3,
          name: 'Wejście w życie',
          date: data.entryIntoForce,
          isCompleted: true,
        },
      ],
      keywords: data.keywords || [],
    }
  } catch (error) {
    console.error('Błąd szczegółów aktu:', eliId, error)
    return null
  }
}
