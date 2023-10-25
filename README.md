<a name="readme-top"></a>
<div align="center">
  <a href="https://github.com/seanoliver/audioflare">
    <img src="public/images/audioflare-header.png" alt="Audioflare Logo">
  </a>

  <h1 align="center">Audioflare</h1>

  <p align="center">
    An all-in-one AI audio playground using Cloudflare AI Workers to transcribe, analyze, summarize, and translate any audio file.
    <br />
    <br />
    <a href="https://audioflare.seanoliver.dev/" target="_blank">View Demo</a>
    ·
    <a href="https://github.com/seanoliver/audioflare/issues">Report Bug</a>
    ·
    <a href="https://github.com/seanoliver/audioflare/issues">Request Feature</a>
  </p>
</div>
<div align="center">

![Top Languages](https://img.shields.io/github/languages/top/seanoliver/audioflare)
![GitHub repo size](https://img.shields.io/github/repo-size/seanoliver/audioflare)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/seanoliver/audioflare)
![GitHub contributors](https://img.shields.io/github/contributors/seanoliver/audioflare)
![GitHub last commit](https://img.shields.io/github/last-commit/seanoliver/audioflare)
![GitHub issues](https://img.shields.io/github/issues/seanoliver/audioflare)
![GitHub](https://img.shields.io/github/license/seanoliver/audioflare)

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
         <li><a href="#demo">Demo</a></li>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About This Project

Audioflare emerged from my side project endeavors at [Smol AI](https://smol.ai), specifically aimed at exploring the capabilities of [Cloudflare AI workers](https://developers.cloudflare.com/workers-ai/). The project demonstrates a practical use case by orchestrating a series of AI workers to process an audio file of up to 30 seconds. Here’s a walkthrough of the core functionality:

1. **Transcription**:
   - Initially, the audio file is transcribed using Cloudflare's Speech to Text worker, which is built on OpenAI's `whisper` API.

2. **Summarization**:
   - The transcribed text is then summarized using Cloudflare's LLM AI worker, based on Meta's `llama-2-7b-chat-int8` model. It's worth noting that the LLM model struggles with lengthy prompts.

3. **Sentiment Analysis**:
   - Sentiment analysis is performed on the transcribed text using Cloudflare's Text Classification AI worker, leveraging the Huggingface’s `distilbert-sst-2-int8` model.

4. **Translation**:
   - The transcribed text is translated into nine languages using Cloudflare's Translation AI workers, which utilize Meta's `m2m100-1.2b` model.

5. **Performance Metrics**:
   - The time taken for each request to be processed is calculated and disclosed, providing insight into the performance metrics.

6. **Observability and Monitoring**:
   - The [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) is used to add observability and monitoring to the AI workers, including analytics, logging, caching, and rate limiting.

The current setup has its limitations; transcription is confined to 30 seconds, and the LLM model's performance on summarization could be better.

The underlying concept of Audioflare underscores the potential of Cloudflare AI workers by standardizing the AI API request framework, simplifying multi-step AI activities. Although the models in use have limitations and are marked as 'beta' by Cloudflare, there's a clear path toward enhancing this project as more models become available.

Your engagement is encouraged. Feel free to submit pull requests and issues as you experiment with Audioflare. This project is intended to serve as a template for learning and working with Cloudflare AI workers, and while it doesn’t currently include Cloudflare's Image Classification or Text Embedding workers due to their irrelevance to the audio use case, it’s a step towards understanding and utilizing the Cloudflare AI ecosystem better.

As Cloudflare broadens its model support, I look forward to refining Audioflare, making it a more robust and informative template for the developer community.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Demo

<p>
  <img src="public/images/audioflare-demo.gif" alt="Audioflare Demo">
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

- **Audio Processing**:
   - Users can upload an audio file for processing.
      - Drag and drop a local audio file from their computer.
      - Alternatively, drag and drop one of three pre-provided audio files included on the main page and in this repo.
   - Audio files longer than 30 seconds are supported, but only the first 30 seconds will be transcribed.
   - Audio transcription is handled by Cloudflare's Speech to Text worker (based on OpenAI's `Whisper` API).

- **Text Summarization**:
   - Transcribed text is summarized using Cloudflare's LLM AI worker (based on Meta's `llama-2-7b-chat-int8` model).

- **Sentiment Analysis**:
   - Sentiment analysis is performed on the transcribed text using Cloudflare's Text Classification AI worker (based on Huggingface’s `distilbert-sst-2-int8` model).

- **Translation**:
   - Transcribed text is translated into nine different languages using Cloudflare's Translation AI workers (based on Meta's `m2m100-1.2b` model).

- **Performance Metrics**:
   - Time taken for each request to be processed is calculated and displayed.

- **Observability and Monitoring**:

   - Uses [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/) to add observability and monitoring to the AI workers:
     - **Analytics**: View metrics like the number of requests and tokens.
     - **Logging**: Monitor requests and errors.
     - **Caching**: Serve requests from Cloudflare’s cache for faster response and cost savings.
     - **Rate Limiting**: Control application scaling by limiting the number of received requests.

- **Learning and Exploration**:
   - Audioflare serves as a template for learning and working with Cloudflare AI workers.
   - Users can explore the functionality of different Cloudflare AI workers excluding the Image Classification or Text Embedding workers as they are not integrated due to their irrelevance to the audio use case.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project was built in 2023 using the following technologies.

- ![React][React]
- ![Next.js][Next.js]
- ![Cloudflare][Cloudflare]
- ![Vercel][Vercel]
- ![TailwindCSS][TailwindCSS]
- ![Bun][Bun]
- ![shadcn/ui][shadcn/ui]

See [package.json](https://github.com/seanoliver/audioflare/blob/main/package.json) for a full list of dependencies.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

1. Clone this repository

   ```bash
   git clone https://github.com/seanoliver/audioflare.git
   ```

2. Install dependencies

   ```bash
    cd audioflare
    bun install
   ```

3. Create a [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages)

4. Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) and login
    ``` bash
    bun add wrangler --dev
    wrangler login
    ```

5. Create a `.env` file using the `.env.example` file as a template

6. Run the app

   ```bash
    bun dev
   ```

7. Go to `http://localhost:3000` to check it out

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

This is a great project for learning Cloudflare, AI Workers, and simple Next.js API Routes. Feel free to fork this repo and make it your own. If you have any questions or suggestions, please feel free to contact me!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](https://github.com/seanoliver/audioflare/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@SeanOliver](https://twitter.com/SeanOliver) - helloseanoliver@gmail.com

Project Link: [https://github.com/seanoliver/audioflare](https://github.com/seanoliver/audioflare)

Live Demo: [https://audioflare.seanoliver.dev/](https://audioflare.seanoliver.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNOLOGY BADGES -->

[React]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white
[Next.js]: https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white
[Cloudflare]: https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white
[Vercel]: https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white
[Bun]: https://img.shields.io/badge/Bun-black?logo=bun&logoColor=f9f1e1
[shadcn/ui]: https://img.shields.io/badge/shadcn/ui-007ACC?logo=shadcn/ui&logoColor=black