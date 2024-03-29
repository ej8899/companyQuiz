<br/>
<p align="center">
  <a href="https://github.com/ej8899/companyQuiz">
    <img src="./public/android-chrome-512x512.png" alt="Logo" width="200" height="200">
  </a>

  <h1 align="center">CompanyQuiz!</h1>

  <p align="center">
    Test your Employees on their knowledge of company policy and received detailed and summary reports! CompanyQuiz! is built as a full SaaS application demo with landing page, admin pages and user pages.
    <br/>
    <br/>
    <a href="https://github.com/ej8899/companyQuiz"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://company-quiz.vercel.app/">View Live Demo</a>
    .
    <a href="https://github.com/ej8899/companyQuiz/issues">Report Bug</a>
    .
    <a href="https://github.com/ej8899/companyQuiz/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/ej8899/companyQuiz/total) ![Contributors](https://img.shields.io/github/contributors/ej8899/companyQuiz?color=dark-green) ![Issues](https://img.shields.io/github/issues/ej8899/companyQuiz) ![License](https://img.shields.io/github/license/ej8899/companyQuiz) 
![Commits](https://img.shields.io/github/commit-activity/t/ej8899/companyQuiz)


## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

![Sample quiz](design/scr-quiz.png)


CompanyQuiz! is intended to allow your company to deploy simple quizzes and exams to your staff to test their knowledge on various company policy and proeedures.

![End User Admin](design/scr-user.png)
A simple end user interface allows your staff to select the policy or area of testing.


![Sample quiz](design/scr-admin.png)
A more robust backend allows administrators to review all users quiz results and status, create new quizzes, and add new users for testing.  A summary is also displayed so you can see your company compliance stats at a glance.



## Built With

Built with React, MySQL and PHP.


### Installation

1. You'll need a couple of API keys if rolling your own deployment.  You'll need a key for UnSplash images and for OpenAI..

2. Clone the repo

```sh
git clone git@github.com:ej8899/companyQuiz.git
```

3. Install NPM packages

```sh
npm install
```

4. Enter your database and api keys in `config.php`

```php
<?php
  $servername = "localhost";
  $username = "";
  $password = "";
  $database = "";

  $unsplashkey= "-";

  $openai_api_key = "sk-";
  $openai_url = "https://api.openai.com/v1/chat/completions";
  $openai_model = "gpt-3.5-turbo";
?>
```

## Usage

If using the existing live demo site, you can login under admin@acmecorp.com for the company administrator and wcabot@example.com as an end user/company employee. No password is required for either of those demo accounts as destructive features are disabled for the demo accounts.

## Roadmap

See the [open issues](https://github.com/ej8899/companyQuiz/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/ej8899/companyQuiz/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/ej8899/companyQuiz/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/ej8899/companyQuiz/blob/main/LICENSE.md) for more information.

## Authors

* **[Ernie Johnson](https://erniejohnson.ca)** - *Applicaton Developer & Project Manager*

## Acknowledgements

* [Shields IO badges (on readme)](https://shields.io/badges)
* [React-Icons](https://react-icons.github.io/react-icons/)