# Zenly | Complaint Management System

A platform where students and lecturers can manage complaints on courses they are taking/teaching.

## Functional Requirements

The functional requirements are as follows:

- Students can submit complaints regarding their courses.
- Lecturers can view complaints related to their courses and provide responses.
- Users can track the status of their complaints.
- Notifications are sent to users upon updates to complaints.

## Technologies and Dependencies

- [Next.js](https://nextjs.org/ 'Next.js')
- [React](https://react.dev/ 'React')
- [Zustand](https://zustand-demo.pmnd.rs/ 'Zustand')
- [Axios](https://www.npmjs.com/package/axios 'Axios')
- [React Hook Form](https://react-hook-form.com/ 'React Hook Form')
- [React Hot Toast](https://react-hot-toast.com/ 'React Hot Toast')
- [Moment.js](https://momentjs.com/ 'Moment.js')
- [Tailwind CSS](https://tailwindcss.com/ 'Tailwind CSS')
- [ESLint](https://eslint.org/ 'ESLint')
- [Autoprefixer](https://github.com/postcss/autoprefixer 'Autoprefixer')
- [PostCSS](https://postcss.org/ 'PostCSS')

## Prerequisites

To run the web application, you need:
- Node.js
- NPM or Yarn
- A code editor (e.g., VSCode with ESLint installed)

## Environment Variables

Environment variables are stored in the `.env.local` file in the root directory.

## Setup

- Clone the project:

```bash
git clone https://github.com/Charvine-300/Complaint-Management-System.git
```

- Navigate to the project root path:

```bash
cd Complaint-Management-System
```

- Install dependencies:

```bash
npm install
```

- Run the development server:

```bash
npm run dev
```

## Code Structure

- `.github`: Contains GitHub-specific configurations for CI/CD workflows.
- `public`: Stores static assets such as images.
- `src`: Contains the source code for the application.
  - `app`: Handles Next.js file-based routing.
  - `components`: Reusable UI components.
  - `lib`: Contains API and state management configurations.
    - `utils`: Utility functions, variables, and TypeScript interfaces.
  - `styles`: Global styles and Tailwind CSS configurations.

## Development Process

- Pull from the main branch.
- Create a feature branch off the main branch.
- Implement changes and push to the feature branch.
- Merge to the development branch after resolving conflicts.
- QA tests the changes on the development branch.
- If approved, merge to staging.
- If no staging, proceed to production.

## Deployment

Deployed on Vercel for seamless hosting and automatic deployment.
You can view the web app live [here](https://zenly-complaint-mgmt-system.vercel.app/ 'here').

## Contributors

| Role             | People                             |
|-----------------|----------------------------------|
| Code 💻          | Chidera Ezenwekwe, Olowokudejo Olaolu, Oshodi Jesutomison John,  ⁠Ifediogor Onyedikachi best                |
| Maintenance 🛠   | Chidera Ezenwekwe, Olowokudejo Olaolu, Oshodi Jesutomison John,  ⁠Ifediogor Onyedikachi best                |
| Documentation 📖 | Chidera Ezenwekwe                |

