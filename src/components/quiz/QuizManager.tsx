
"use client";

import { useState, useEffect } from "react";
import { generateFlagQuizQuestion, GenerateFlagQuizQuestionOutput } from "@/ai/flows/interactive-flag-quiz";
import { COUNTRIES, Country } from "@/lib/countries-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, Loader2, CheckCircle2, XCircle, ArrowRight, RefreshCw, Trophy } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const TOTAL_QUESTIONS = 5;

export function QuizManager() {
  const [gameState, setGameState] = useState<"intro" | "loading" | "playing" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState<GenerateFlagQuizQuestionOutput | null>(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  async function fetchNewQuestion() {
    setGameState("loading");
    setSelectedOptionId(null);
    setIsCorrect(null);

    // Pick a random country
    const correctIdx = Math.floor(Math.random() * COUNTRIES.length);
    const correctCountry = COUNTRIES[correctIdx];

    // Pick 3 random distractor countries
    const distractors = COUNTRIES
      .filter((_, idx) => idx !== correctIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const quizType = Math.random() > 0.5 ? "flagToCountry" : "countryToFlag";

    try {
      const result = await generateFlagQuizQuestion({
        quizType: quizType as any,
        correctCountry: {
          name: correctCountry.name,
          flagDataUri: correctCountry.flagUrl,
        },
        distractorCountries: distractors.map(d => ({
          name: d.name,
          flagDataUri: d.flagUrl
        })),
      });

      setCurrentQuestion(result);
      setGameState("playing");
      setQuestionCount(prev => prev + 1);
    } catch (error) {
      console.error("Failed to generate question", error);
      // Fallback or retry?
      setGameState("intro");
    }
  }

  function handleAnswer(optionId: string) {
    if (selectedOptionId || !currentQuestion) return;

    setSelectedOptionId(optionId);
    const correct = optionId === currentQuestion.correctOptionId;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  }

  function handleNext() {
    if (questionCount >= TOTAL_QUESTIONS) {
      setGameState("result");
    } else {
      fetchNewQuestion();
    }
  }

  function restart() {
    setScore(0);
    setQuestionCount(0);
    fetchNewQuestion();
  }

  if (gameState === "intro") {
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden">
        <div className="relative h-48 w-full bg-primary flex items-center justify-center overflow-hidden">
          <BrainCircuit className="h-24 w-24 text-primary-foreground opacity-20 absolute -right-4 -bottom-4 rotate-12" />
          <Trophy className="h-16 w-16 text-accent animate-bounce" />
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline font-bold">World Flag Quiz</CardTitle>
          <p className="text-muted-foreground pt-2">Test your global knowledge! Can you identify these {TOTAL_QUESTIONS} countries correctly?</p>
        </CardHeader>
        <CardContent className="flex justify-center p-8">
          <Button onClick={restart} size="lg" className="px-12 h-14 text-lg font-bold gap-2">
            Start Quiz <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <BrainCircuit className="h-8 w-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold font-headline">Generating Question...</h3>
          <p className="text-muted-foreground animate-pulse">Our AI is fetching a unique flag puzzle for you.</p>
        </div>
      </div>
    );
  }

  if (gameState === "playing" && currentQuestion) {
    const isAnswered = selectedOptionId !== null;

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Question {questionCount} of {TOTAL_QUESTIONS}</span>
            <span>Score: {score}</span>
          </div>
          <Progress value={(questionCount / TOTAL_QUESTIONS) * 100} className="h-2" />
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-headline">
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex justify-center">
              {typeof currentQuestion.promptContent[0] === 'string' ? (
                <div className="text-5xl font-bold text-primary p-12 bg-secondary rounded-2xl w-full text-center">
                  {currentQuestion.promptContent[0]}
                </div>
              ) : (
                <div className="relative h-64 w-full max-w-md overflow-hidden rounded-xl border shadow-inner bg-muted">
                  <Image
                    src={(currentQuestion.promptContent[0] as any).media.url}
                    alt="Quiz question target"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectOption = option.id === currentQuestion.correctOptionId;
                
                let variantClass = "bg-card hover:bg-secondary border-2";
                if (isAnswered) {
                  if (isCorrectOption) variantClass = "bg-green-100 border-green-500 text-green-700 dark:bg-green-950 dark:text-green-300";
                  else if (isSelected) variantClass = "bg-red-100 border-red-500 text-red-700 dark:bg-red-950 dark:text-red-300";
                  else variantClass = "opacity-50 grayscale border-transparent";
                }

                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(option.id)}
                    className={cn(
                      "p-6 rounded-xl transition-all flex items-center gap-4 text-left font-semibold text-lg",
                      variantClass
                    )}
                  >
                    {option.flagDataUri && (
                      <div className="relative h-10 w-16 flex-shrink-0">
                        <Image src={option.flagDataUri} alt={option.text} fill className="object-cover rounded shadow-sm" />
                      </div>
                    )}
                    <span className="flex-1">{option.text}</span>
                    {isAnswered && isCorrectOption && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    {isAnswered && isSelected && !isCorrectOption && <XCircle className="h-6 w-6 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="flex flex-col items-center pt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={cn(
                  "px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2",
                  isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  {isCorrect ? "Brilliant! You're correct." : "Not quite! Keep going."}
                </div>
                <Button onClick={handleNext} size="lg" className="px-10 h-12 gap-2">
                  {questionCount >= TOTAL_QUESTIONS ? "See Results" : "Next Question"} <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === "result") {
    const percentage = (score / TOTAL_QUESTIONS) * 100;
    return (
      <Card className="max-w-xl mx-auto border-none shadow-2xl overflow-hidden text-center">
        <div className="bg-primary p-12 text-primary-foreground space-y-4">
          <Trophy className="h-20 w-20 text-accent mx-auto" />
          <h2 className="text-4xl font-headline font-bold">Quiz Complete!</h2>
          <div className="text-6xl font-black">{score}/{TOTAL_QUESTIONS}</div>
          <p className="text-primary-foreground/80 font-medium">You scored {percentage}%</p>
        </div>
        <CardContent className="p-10 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-headline">
              {percentage === 100 ? "Flawless Victory!" : percentage >= 60 ? "Great Job!" : "Keep Practicing!"}
            </h3>
            <p className="text-muted-foreground">Your knowledge of world flags is growing every day.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={restart} size="lg" className="gap-2 px-8">
              <RefreshCw className="h-5 w-5" /> Try Again
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/browse"} className="px-8">
              Browse Flags
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
