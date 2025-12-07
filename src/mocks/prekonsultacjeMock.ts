import { Status } from '@/types/common'
import { ConsultationProject } from '@/types/consultations'

export interface Comment {
  id: string
  author: string
  content: string
  date: string
  rating?: number
}

export interface PreConsultationProject {
  id: string
  title: string
  description: string
  category: string
  status: Status
  deadline: string
  createdAt: string
  institution: string
  comments: Comment[]
  averageRating: number
  ratingsCount: number
  documentsCount: number
}

export const preConsultationProjects: PreConsultationProject[] = [
  {
    id: '1',
    title: 'Projekt ustawy o ochronie danych osobowych w sektorze publicznym',
    description:
      'Projekt ustawy mającej na celu wzmocnienie ochrony danych osobowych obywateli w instytucjach publicznych oraz wprowadzenie nowych standardów bezpieczeństwa informacji.',
    category: 'Ochrona danych',
    status: 'active',
    deadline: '2025-01-15',
    createdAt: '2024-11-01',
    institution: 'Ministerstwo Cyfryzacji',
    averageRating: 4.2,
    ratingsCount: 87,
    documentsCount: 3,
    comments: [
      {
        id: '1-1',
        author: 'Jan Kowalski',
        content:
          'Uważam, że projekt jest bardzo potrzebny, ale należałoby doprecyzować definicję "danych wrażliwych" w artykule 3.',
        date: '2024-12-01',
        rating: 4,
      },
      {
        id: '1-2',
        author: 'Anna Nowak',
        content:
          'Proponuję dodanie przepisów przejściowych dla małych gmin, które mogą mieć problemy z implementacją nowych wymogów technicznych.',
        date: '2024-12-03',
        rating: 5,
      },
      {
        id: '1-3',
        author: 'Piotr Wiśniewski',
        content:
          'Artykuł 15 dotyczący kar finansowych wydaje się zbyt surowy dla jednostek samorządu terytorialnego.',
        date: '2024-12-05',
        rating: 3,
      },
    ],
  },
  {
    id: '2',
    title: 'Nowelizacja ustawy o transporcie publicznym',
    description:
      'Projekt nowelizacji mający na celu usprawnienie systemu transportu publicznego w miastach oraz zwiększenie dostępności dla osób niepełnosprawnych.',
    category: 'Transport',
    status: 'active',
    deadline: '2025-02-28',
    createdAt: '2024-11-15',
    institution: 'Ministerstwo Infrastruktury',
    averageRating: 3.8,
    ratingsCount: 124,
    documentsCount: 5,
    comments: [
      {
        id: '2-1',
        author: 'Maria Zielińska',
        content:
          'Świetna inicjatywa! Szczególnie podoba mi się nacisk na dostępność dla osób niepełnosprawnych.',
        date: '2024-11-20',
        rating: 5,
      },
      {
        id: '2-2',
        author: 'Tomasz Lewandowski',
        content:
          'Czy przewidziano dodatkowe finansowanie dla mniejszych miast na implementację tych rozwiązań?',
        date: '2024-11-25',
        rating: 4,
      },
      {
        id: '2-3',
        author: 'Katarzyna Dąbrowska',
        content:
          'Warto rozważyć również ekologiczne aspekty transportu - może warto dodać zachęty dla pojazdów elektrycznych?',
        date: '2024-12-02',
        rating: 4,
      },
    ],
  },
  {
    id: '3',
    title: 'Ustawa o cyfryzacji usług administracyjnych',
    description:
      'Projekt kompleksowej ustawy wprowadzającej cyfrowe usługi administracyjne oraz upraszczającej procedury biurokratyczne dla obywateli i przedsiębiorców.',
    category: 'Cyfryzacja',
    status: 'draft',
    deadline: '2025-03-31',
    createdAt: '2024-12-01',
    institution: 'Ministerstwo Cyfryzacji',
    averageRating: 4.5,
    ratingsCount: 45,
    documentsCount: 2,
    comments: [
      {
        id: '3-1',
        author: 'Adam Kowalczyk',
        content:
          'Projekt bardzo potrzebny! Mam nadzieję, że rzeczywiście uprości życie przedsiębiorców.',
        date: '2024-12-04',
        rating: 5,
      },
      {
        id: '3-2',
        author: 'Beata Sikora',
        content: 'Czy przewidziano szkolenia dla urzędników z obsługi nowych systemów cyfrowych?',
        date: '2024-12-05',
        rating: 4,
      },
    ],
  },
  {
    id: '4',
    title: 'Projekt rozporządzenia w sprawie ochrony środowiska',
    description:
      'Nowe rozporządzenie mające na celu ograniczenie emisji zanieczyszczeń oraz wprowadzenie surowszych norm ekologicznych dla przemysłu.',
    category: 'Środowisko',
    status: 'closed',
    deadline: '2024-12-01',
    createdAt: '2024-09-15',
    institution: 'Ministerstwo Klimatu i Środowiska',
    averageRating: 3.9,
    ratingsCount: 203,
    documentsCount: 7,
    comments: [
      {
        id: '4-1',
        author: 'Michał Górski',
        content:
          'Normy są bardzo restrykcyjne, może warto wprowadzić okres przejściowy dla małych firm?',
        date: '2024-10-10',
        rating: 3,
      },
      {
        id: '4-2',
        author: 'Agnieszka Król',
        content: 'Doskonały projekt! Wreszcie konkretne działania na rzecz środowiska.',
        date: '2024-10-15',
        rating: 5,
      },
      {
        id: '4-3',
        author: 'Robert Pawlak',
        content: 'Czy przeprowadzono analizę wpływu na konkurencyjność polskich firm?',
        date: '2024-10-20',
        rating: 3,
      },
    ],
  },
]

export const consultationProjects: ConsultationProject[] = [
  {
    id: 'c1',
    title: 'Konsultacje ws. reformy systemu opieki zdrowotnej',
    description:
      'Szerokie konsultacje społeczne dotyczące planowanej reformy systemu opieki zdrowotnej w Polsce.',
    category: 'Zdrowie',
    status: 'active',
    deadline: '2025-04-30',
    createdAt: '2024-12-01',
    institution: 'Ministerstwo Zdrowia',
    participantsCount: 1250,
    documentsCount: 12,
    meetingsCount: 8,
  },
  {
    id: 'c2',
    title: 'Konsultacje reformy edukacji',
    description:
      'Konsultacje społeczne dotyczące zmian w systemie edukacji podstawowej i średniej.',
    category: 'Edukacja',
    status: 'active',
    deadline: '2025-05-15',
    createdAt: '2024-11-20',
    institution: 'Ministerstwo Edukacji i Nauki',
    participantsCount: 890,
    documentsCount: 8,
    meetingsCount: 12,
  },
  {
    id: 'c3',
    title: 'Konsultacje ws. polityki mieszkaniowej',
    description:
      'Konsultacje dotyczące nowych rozwiązań w polityce mieszkaniowej i wsparcia dla młodych rodzin.',
    category: 'Mieszkalnictwo',
    status: 'closed',
    deadline: '2024-11-30',
    createdAt: '2024-09-01',
    institution: 'Ministerstwo Rozwoju i Technologii',
    participantsCount: 2100,
    documentsCount: 15,
    meetingsCount: 20,
  },
]
