# HF Chat Playground

Welcome to **HF Chat Playground**, a sleek and modern AI chat interface built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Hugging Face Inference API**. This project allows you to send prompts to a powerful AI model (`Qwen2.5-7B-Instruct`) and get instant, dynamic responses in a stylish UI.

![Screenshot](/public/hf-ai-screanshot.png)

---

## ✨ Features

- **Modern UI:** Dark theme, smooth animations with **Framer Motion**. Includes a custom chat scrollbar and a Lucide `Bot` avatar icon.
- **Responsive Design:** Works on desktop and mobile.
- **Interactive Chat:** Send prompts and get AI-generated replies in real-time.
- **Fast Setup:** Ready-to-go Next.js + TypeScript + Tailwind project.

---

## 🚀 Demo

You can run it locally

---

## 💻 Installation

1. Clone the repo:

```bash
git clone https://github.com/arash-jj/ai-playground.git
cd ai-playground
```

2. Install dependencies:

```bash
npm install
# or yarn
```

3. Install required packages for UI and animations (if not already installed):

```bash
npm install framer-motion lucide-react
```

4. Install Tailwind CSS if not present:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

5. Add your Hugging Face API key:

Create `.env.local` file in the root:

```
HF_TOKEN=your_huggingface_token_here
```

---

## 🏗 Usage

1. Start the development server:

```bash
npm run dev
```

2. Open your browser:

```
http://localhost:3000
```

3. Type your prompt in the input box and hit **Send**. The AI will respond below.

---

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Hugging Face Inference API](https://huggingface.co/docs/inference)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)

---

## 🎨 Customization

- **Change AI Model:** Edit `app/api/chat/route.ts` to use any Hugging Face chat model.
- **Theme:** Modify Tailwind classes for light or custom themes.

---

## 🔑 Notes

- Ensure your HF_TOKEN has **inference API permissions only**.
- Free-tier Hugging Face models may have occasional rate limits.
- This project is **fully compatible with free HF models** and does not require paid endpoints.

---

Feel free to fork, star, and showcase your AI playground on GitHub! 🚀
