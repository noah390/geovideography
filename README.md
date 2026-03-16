# GeoJourney 🌍

GeoJourney is a real-time global atlas where you can explore world flags, national histories, and administrative structures.

## 🚀 How to Go Live on GitHub

Follow these steps to push your project to your GitHub repository and host it.

### 1. Push Code to GitHub
Open your terminal in the project root and run these commands:

```bash
# Initialize git
git init

# Add your GitHub repository as the remote origin
git remote add origin https://github.com/noah390/geovideography.git

# Stage all files
git add .

# Create your first commit
git commit -m "Initial commit: GeoJourney App"

# Push to the main branch
git push -u origin main
```

### 2. Hosting Your Site (Going "Live")
Since this project uses Next.js and Firebase, the best way to go live is using **Firebase App Hosting**.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project: `geographic-77026`.
3.  In the left sidebar, click **Build** > **App Hosting**.
4.  Click **Get Started** and connect your GitHub account.
5.  Select your repository `noah390/geovideography`.
6.  Follow the prompts to set up the backend. Firebase will automatically detect the `apphosting.yaml` file and deploy your Next.js app.
7.  Once the build completes, you will receive a public URL for your live website!

## Features
- **Real-time Data**: Syncs directly with Firestore.
- **Global Atlas**: Browse flags and statistics for nations worldwide.
- **Deep History**: Explore the "Historical Journey" of every country.
- **Administrative Breakdown**: View state-level details and flags for regions.
- **AI-Powered Quiz**: Test your flag knowledge with dynamic questions.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **AI**: Genkit (Google Gemini)
- **Styling**: Tailwind CSS & ShadCN UI
