export const companyData = [
  {
    companyId: 1,
    name: 'Acme Corp',
    administratorEmail: 'admin@acmecorp.com',
    industry: 'Manufacturing',
    companyLogoURL: '',
    companyBGImageURL: '',
    quizList: ['1aaf4c7b-dc7b-4a4f-b9e0-27968a9a8874',],
  },
  {
    companyId: 2,
    name: 'Beta Corp',
    administratorEmail: 'admin@betacorp.com',
    industry: 'Transportation',
    companyLogoURL: '',
    copmanyBGImageURL: '',
    quizList: ['1aaf4c7b-dc7b-4a4f-b9e0-27968a9a8',],
  }

];


export const userData = [
  {
    userId: 1,
    companyId: 1,
    name: 'Preston Garvey',
    email: 'prestong@example.com',
    scores: [
      { 
        quizId: '1aaf4c7b-dc7b-4a4f-b9e0-27968a9a8874', 
        score: 75, 
        dateTested: '2023-01-15'
      },
      { 
        quizId: '1aaf4c7b-dc7b-4a4f-b9e0-4354543', 
        score: 55, 
        dateTested: '2023-02-15'
      },
    ]
  },
  {
    userId: 23,
    companyId: 1,
    name: 'Piper Wright',
    email: 'piperw@example.com',
    scores: [
      { quizId: '1aaf4c7b-dc7b-4a4f-b9e0-27968a9a8874', 
        score: 80, 
        dateTested: '2023-01-15'
      },
      { quizId: 12,
        score: 100,
        dateTested: '2024-02-02'
      },
      { quizId: 342,
        score: null,
        dateTested: null,
      },
      { quizId: 234234,
        score: 24,
        dateTested: '2024-01-15',
      },
    ],
  },
];