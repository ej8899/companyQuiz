export const quizData = {
  quizID: 1,
  quizName: 'Cyber Security Review',
  
  // TODO - make public and private quizes to work
  quizType: 'public', // (or 'private' if it's proprietary to the company)

  // TODO - make allow Retry option to work
  allowRetry: true, // allow retaking quiz after failing (or false to deny)

  backgroundImage : 'http://www.tcmd.com/lhl/final1.jpeg',

  // TODO below if not null searches unsplash for the bg image
  backgroundImageSearch: '',

  // TODO - apply a mute level to the background image
  backgroundMuteLevel : 0.5,

  // TODO - below sets teh overall colors for any accents, text etc via tailwindcss colors
  colorTheme: '',


  // TODO - make below work:
  passingGrade: 70,
  numQuestions: 10,

  // TODO - below if set to true would show an option on quiz screen for 'help' and then remove a wrong answer from list (just blur it w styles)
  allowHints: false,
  
  // TODO - source data can be blank for 'qna' type or 'ai' for AI data source (on the fly generation)
  sourceData: '',
  qna : [
    {
      question: 'What should you do if you receive an email from an unknown sender with an attachment?',
      options: ['Open the attachment to see what it contains.', 'Delete the email without opening the attachment.', 'Forward the email to colleagues for their opinion.'],
      correctAnswer: 'Delete the email without opening the attachment.',
      image: 'email attachment',
    },
    {
      question: 'What is a strong password?',
      options: ['A word found in the dictionary.', 'A combination of letters, numbers, and special characters.', 'Your name followed by your birthdate.'],
      correctAnswer: 'A combination of letters, numbers, and special characters.',
      image: 'strong password',
    },
    {
      question: 'You receive a phone call from someone claiming to be from IT support, asking for your login credentials. What should you do?',
      options: ['Provide your login credentials.', 'Hang up and call the IT department to verify the request.', 'Ask for their name and provide the information.'],
      correctAnswer: 'Hang up and call the IT department to verify the request.',
      image: 'phone call',
    },
    {
      question: 'What is phishing?',
      options: ['A type of fishing sport.', 'A fraudulent attempt to obtain sensitive information through deceitful means.', 'A form of exercise.'],
      correctAnswer: 'A fraudulent attempt to obtain sensitive information through deceitful means.',
      image: 'phishing computer security',
    },
    {
      question: 'When should you lock your computer?',
      options: ['Only when you leave the office for the day.', 'Whenever you step away from your desk or leave your computer unattended.', 'Never, because it\'s unnecessary.'],
      correctAnswer: 'Whenever you step away from your desk or leave your computer unattended.',
      image: 'computer security',
    },
    {
      question: 'What does "HTTPS" stand for in a website URL?',
      options: ['Hypertext Text Transfer Protocol', 'Hyperlink Transfer Transmission Protocol', 'Hypertext Transfer Protocol Secure'],
      correctAnswer: 'Hypertext Transfer Protocol Secure',
      image: 'https',
    },
    {
      question: 'What is the purpose of antivirus software?',
      options: ['To make your computer run faster.', 'To protect your computer from malware and viruses.', 'To block internet access.'],
      correctAnswer: 'To protect your computer from malware and viruses.',
      image: 'antivirus software',
    },
    {
      question: 'You receive a message on social media from a friend with a link to a funny video. What should you do?',
      options: ['Click on the link without hesitation.', 'Ask your friend if they sent the message.', 'Ignore the message.'],
      correctAnswer: 'Ask your friend if they sent the message.',
      image: 'social media video',
    },
    {
      question: 'What should you do if you suspect your computer is infected with malware?',
      options: ['Keep using it as usual.', 'Run a trusted antivirus scan and follow its recommendations.', 'Shut it down and never use it again.'],
      correctAnswer: 'Run a trusted antivirus scan and follow its recommendations.',
      image: 'malware computer virus',
    },
    {
      question: 'When setting up Wi-Fi at home or in the office, what should you do to enhance security?',
      options: ['Keep the default Wi-Fi password.', 'Use an easily guessable password.', 'Choose a strong, unique password and enable WPA2/WPA3 encryption.'],
      correctAnswer: 'Choose a strong, unique password and enable WPA2/WPA3 encryption.',
      image: 'internet wifi security',
    },
    {
      question: 'What is two-factor authentication (2FA)?',
      options: [
        'A type of antivirus software.',
        'A security feature that requires two forms of verification to access an account.',
        'A type of phishing attack.'
      ],
      correctAnswer: 'A security feature that requires two forms of verification to access an account.',
      image: '2fa',
    },
    {
      question: 'What is the primary purpose of a firewall?',
      options: [
        'To keep your computer warm.',
        'To prevent unauthorized access to or from a private network.',
        'To increase internet speed.'
      ],
      correctAnswer: 'To prevent unauthorized access to or from a private network.',
      image: 'computer firewall',
    },
    {
      question: 'Why is it important to keep your operating system and software up to date?',
      options: [
        'To give you the latest emojis.',
        'To ensure compatibility with old hardware.',
        'To fix security vulnerabilities and bugs.'
      ],
      correctAnswer: 'To fix security vulnerabilities and bugs.',
      image: 'computer update',
    },
    {
      question: 'What is a common method of protecting sensitive information when using public Wi-Fi?',
      options: [
        'Nothing, public Wi-Fi is always secure.',
        'Using a VPN (Virtual Private Network).',
        'Sharing your data with everyone.'
      ],
      correctAnswer: 'Using a VPN (Virtual Private Network).',
      image: 'public computer',
    },
    {
      question: 'What is a strong email password practice?',
      options: [
        'Using "password" as your password.',
        'Sharing your password with friends.',
        'Creating a complex password with a mix of letters, numbers, and symbols.'
      ],
      correctAnswer: 'Creating a complex password with a mix of letters, numbers, and symbols.',
      image: 'password',
    },
    {
      question: 'What is the best way to verify the authenticity of a website before entering sensitive information?',
      options: [
        'Enter your information first and check if the website responds.',
        'Look for the padlock icon in the browser\'s address bar and use secure websites (HTTPS).',
        'Trust the website\'s appearance; if it looks professional, it\'s secure.'
      ],
      correctAnswer: 'Look for the padlock icon in the browser\'s address bar and use secure websites (HTTPS).',
      image: 'computer security',
    },
    {
      question: 'What is the most secure way to dispose of old documents containing sensitive information?',
      options: [
        'Throw them in the trash.',
        'Burn them in the backyard.',
        'Shred them with a cross-cut shredder.'
      ],
      correctAnswer: 'Shred them with a cross-cut shredder.',
      image: 'documents',
    },
    {
      question: 'Why is it important to log out of your accounts on shared or public computers?',
      options: [
        'It isn\'t necessary; the computer will log you out automatically.',
        'To protect your account from unauthorized access by others.',
        'To save time during future logins.'
      ],
      correctAnswer: 'To protect your account from unauthorized access by others.',
      image: 'public computer',
    },
    {
      question: 'What is the term for a program that appears legitimate but performs malicious actions when executed?',
      options: [
        'Friendly software.',
        'Trusted program.',
        'Trojan horse.'
      ],
      correctAnswer: 'Trojan horse.',
      image: 'computer program hacker',
    },
    {
      question: 'Why is it essential to back up your data regularly?',
      options: [
        'To free up storage space on your devices.',
        'To avoid receiving annoying backup notifications.',
        'To protect your data in case of hardware failure or data loss.'
      ],
      correctAnswer: 'To protect your data in case of hardware failure or data loss.',
      image: 'data backup',
    },
    {
      question: 'What is the term for the practice of tricking people into revealing their confidential information, such as passwords or credit card numbers?',
      options: [
        'Cyberbullying',
        'Social engineering',
        'Phishing'
      ],
      correctAnswer: 'Phishing',
      image: 'confidential information',
    },
    {
      question: 'What should you do if you suspect your email account has been compromised?',
      options: [
        'Change your password to a simple one.',
        'Ignore it; it\'s probably a false alarm.',
        'Change your password and enable two-factor authentication (2FA).'
      ],
      correctAnswer: 'Change your password and enable two-factor authentication (2FA).',
      image: 'hacked computer',
    },
    {
      question: 'What is the purpose of a pop-up blocker in a web browser?',
      options: [
        'To display more ads to users.',
        'To prevent annoying pop-up notifications.',
        'To block unwanted pop-up windows, often used for advertising or malicious purposes.'
      ],
      correctAnswer: 'To block unwanted pop-up windows, often used for advertising or malicious purposes.',
      image: 'computer ads',
    },
    {
      question: 'What is the best practice when it comes to software updates on your devices?',
      options: [
        'Always delay updates to avoid potential issues.',
        'Only update when you have free time to spare.',
        'Regularly install software updates to keep your devices secure.'
      ],
      correctAnswer: 'Regularly install software updates to keep your devices secure.',
      image: 'windows update',
    },
    {
      question: 'What is the purpose of a CAPTCHA?',
      options: [
        'To prove you are a robot.',
        'To test your knowledge of random trivia.',
        'To distinguish between human users and automated bots, reducing spam and fraud.'
      ],
      correctAnswer: 'To distinguish between human users and automated bots, reducing spam and fraud.',
      image: 'captcha',
    },
    {
      question: 'Why is it important to be cautious when clicking on links in emails or messages?',
      options: [
        'Links are always safe; you can click on them without worry.',
        'Clicking on links can lead to malware downloads or phishing websites.',
        'Clicking on links increases the speed of your internet connection.'
      ],
      correctAnswer: 'Clicking on links can lead to malware downloads or phishing websites.',
      image: 'computer web browser',
    },
    {
      question: 'What should you do if you find a USB drive lying around in your workplace?',
      options: [
        'Plug it into your computer to see what\'s on it.',
        'Pick it up and give it to your colleague.',
        'Hand it over to IT or a responsible authority for security reasons.'
      ],
      correctAnswer: 'Hand it over to IT or a responsible authority for security reasons.',
      image: 'computer usb',
    },
    {
      question: 'Why is it important to log out of your online accounts when using public computers?',
      options: [
        'To save energy.',
        'To prevent others from accessing your accounts and personal information.',
        'Logging out is not necessary on public computers.'
      ],
      correctAnswer: 'To prevent others from accessing your accounts and personal information.',
      image: 'library computer',
    },
    {
      question: 'What should you do if you receive an unexpected message from a friend on social media asking for personal or financial information?',
      options: [
        'Immediately provide the requested information.',
        'Ask your friend for more details about the request.',
        'Verify the message with your friend through another channel before sharing any information.'
      ],
      correctAnswer: 'Verify the message with your friend through another channel before sharing any information.',
      image: 'socia media message',
    },
    {
      question: 'What is a common way to protect your smartphone from unauthorized access?',
      options: [
        'Don\'t use any security features; it\'s unnecessary.',
        'Use a strong PIN, password, or biometric authentication (e.g., fingerprint or face recognition).',
        'Share your PIN or password with friends for convenience.'
      ],
      correctAnswer: 'Use a strong PIN, password, or biometric authentication (e.g., fingerprint or face recognition).',
      image: 'smartphone security',
    },
  ]
};
