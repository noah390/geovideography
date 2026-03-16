
import { Navbar } from "@/components/layout/Navbar";
import { QuizManager } from "@/components/quiz/QuizManager";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <QuizManager />
      </main>
    </div>
  );
}
