export const companyData = [
  {
    companyId: 1,
    name: 'Acme Corp',
    administratorEmail: 'admin@acmecorp.com',
    industry: 'Manufacturing',
    companyLogoURL: '',
    copmanyBGImageURL: '',
    quizList: [1,],
  }

];


export const userData = [
  {
    userId: 1,
    companyId: 1,
    name: 'Preston Garvey',
    email: 'prestong@example.com',
    scores: [
      { quizId: 1, 
        score: 0, 
        dateTested: ''
      },
    ]
  },
  {
    userId: 23,
    companyId: 1,
    name: 'Piper Wright',
    email: 'piperw@example.com',
    scores: [
      { quizId: 1, 
        score: 80, 
        dateTested: '2023-01-15'
      },
    ]
  },
];