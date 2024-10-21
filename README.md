# Chit Chat

> Connect with friends and communities in real-time with Chit Chat. Share messages, photos and create groups for communication. Experience secure and interactive conversations anytime, anywhere.

## Live Demo

- You can access the live demo via [Vercel](https://burakbilgili-chitchat.vercel.app/).

## Screens

[<img src="/public/screen1.png" />](https://burakbilgili-chitchat.vercel.app/)
[<img src="/public/screen2.png" />](https://burakbilgili-chitchat.vercel.app/)

## Features

**Here are some of the current features that Chit Chat has:**

- [x] User authentication with Next Auth
- [x] Route protection
- [x] User profile modal
- [x] Realtime messages with 'seen by' feature
- [x] Image upload feature
- [x] Responsive design (Tailwind)
- [x] Next.js Actions

**Chit Chat uses the following technologies:**

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Pusher](https://pusher.com/)
- [Next Auth](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/en) version 20 or higher
- Sign up and create a new project at [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- Sign up and create a new environment at [Cloudinary](https://cloudinary.com/users/register_free)
- Sign up and create a new channel at [Pusher](https://dashboard.pusher.com/accounts/sign_up)



#### `.env` File

Create `.env` file and fill in the following environment variables:

```
DATABASE_URL=[YOUR_MONGODB_URI]

NEXTAUTH_SECRET=[YOUR_STRING_SECRET]

GITHUB_ID=[GITHUB_API_ID_FOR_AUTH]
GITHUB_SECRET=[GITHUB_API_SECRET]

GOOGLE_CLIENT_ID=[GOOGLE_CLIENT_ID_FOR_AUTH]
GOOGLE_CLIENT_SECRET=[GOOGLE_API_SECRET]

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=[YOUR_CLOUDINARY_NAME]

NEXT_PUBLIC_PUSHER_APP_KEY=[YOUR_PUSHER_KEY]
PUSHER_APP_ID=[YOUR_PUSHER_ID]
PUSHER_SECRET=[YOUR_PUSHER_SECRET]
```

#### Install Dependencies

```bash
npm install
```

#### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details