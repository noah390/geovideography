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

    const correctIdx = Math.floor(Math.random() * COUNTRIES.length);
    const correctCountry = COUNTRIES[correctIdx];

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
      <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <div className="relative h-40 md:h-48 w-full bg-primary flex items-center justify-center overflow-hidden">
          <BrainCircuit className="h-20 w-20 md:h-24 md:w-24 text-primary-foreground opacity-20 absolute -right-4 -bottom-4 rotate-12" />
          <Trophy className="h-12 w-12 md:h-16 md:w-16 text-accent animate-bounce" />
        </div>
        <CardHeader className="text-center px-6 py-8">
          <CardTitle className="text-2xl md:text-3xl font-headline font-black uppercase tracking-tight">Neural Flag Quiz</CardTitle>
          <p className="text-muted-foreground text-sm sm:text-base pt-2 font-medium">Test your global recognition capabilities. Identify {TOTAL_QUESTIONS} targets correctly.</p>
        </CardHeader>
        <CardContent className="flex justify-center p-6 md:p-8">
          <Button onClick={restart} size="lg" className="w-full sm:w-auto px-12 h-14 text-lg font-bold gap-2 rounded-sm uppercase tracking-tighter scifi-glow">
            Initiate Protocol <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="relative">
          <Loader2 className="h-12 w-12 md:h-16 md:w-16 text-primary animate-spin" />
          <BrainCircuit className="h-6 w-6 md:h-8 md:w-8 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg md:text-xl font-bold font-headline uppercase tracking-widest">Compiling Question...</h3>
          <p className="text-muted-foreground text-xs md:text-sm animate-pulse font-mono uppercase tracking-tighter">Accessing secure geographical archives</p>
        </div>
      </div>
    );
  }

  if (gameState === "playing" && currentQuestion) {
    const isAnswered = selectedOptionId !== null;

    return (
      <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 px-2 sm:px-0">
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] md:text-sm font-black font-mono uppercase tracking-widest text-primary">
            <span>SEQUENCE {questionCount} / {TOTAL_QUESTIONS}</span>
            <span>ACCURACY: {Math.round((score / Math.max(1, questionCount - 1)) * 100) || 0}%</span>
          </div>
          <Progress value={(questionCount / TOTAL_QUESTIONS) * 100} className="h-1.5 md:h-2 bg-primary/20 rounded-none overflow-hidden" />
        </div>

        <Card className="border-primary/20 bg-card/40 backdrop-blur-md shadow-2xl rounded-none">
          <CardHeader className="p-4 md:p-6 text-center">
            <CardTitle className="text-lg sm:text-2xl font-headline font-black uppercase tracking-tight text-foreground leading-snug">
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-8 space-y-6 md:space-y-8">
            <div className="flex justify-center">
              {typeof currentQuestion.promptContent[0] === 'string' ? (
                <div className="text-3xl sm:text-5xl font-black text-primary p-8 md:p-12 bg-secondary/50 rounded-none w-full text-center border-2 border-primary/30 scifi-text-glow font-headline">
                  {currentQuestion.promptContent[0]}
                </div>
              ) : (
                <div className="relative h-48 sm:h-64 w-full max-w-md overflow-hidden border-2 border-primary/30 shadow-inner bg-muted/20">
                  <Image
                    src={(currentQuestion.promptContent[0] as any).media.url}
                    alt="Quiz question target"
                    fill
                    className="object-contain p-2 md:p-4"
                  />
                  <div className="absolute inset-0 scifi-grid opacity-10 pointer-events-none" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectOption = option.id === currentQuestion.correctOptionId;
                
                let variantClass = "bg-secondary/30 hover:bg-secondary/60 border-primary/10";
                if (isAnswered) {
                  if (isCorrectOption) variantClass = "bg-green-500/20 border-green-500 text-green-300";
                  else if (isSelected) variantClass = "bg-red-500/20 border-red-500 text-red-300";
                  else variantClass = "opacity-40 grayscale border-transparent scale-95";
                }

                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(option.id)}
                    className={cn(
                      "p-4 md:p-6 border-2 transition-all flex items-center gap-3 md:gap-4 text-left font-black text-sm md:text-lg uppercase tracking-tighter",
                      variantClass,
                      !isAnswered && "hover:border-primary/50 hover:translate-x-1"
                    )}
                  >
                    {option.flagDataUri && (
                      <div className="relative h-8 w-12 md:h-10 md:w-16 flex-shrink-0">
                        <Image src={option.flagDataUri} alt={option.text} fill className="object-cover rounded-sm shadow-sm" />
                      </div>
                    )}
                    <span className="flex-1 truncate">{option.text}</span>
                    {isAnswered && isCorrectOption && <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-500" />}
                    {isAnswered && isSelected && !isCorrectOption && <XCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="flex flex-col items-center pt-2 space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={cn(
                  "px-4 md:px-6 py-2 md:py-3 rounded-sm font-black text-xs md:text-lg flex items-center gap-2 uppercase tracking-widest border",
                  isCorrect ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"
                )}>
                  {isCorrect ? <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" /> : <XCircle className="h-4 w-4 md:h-5 md:w-5" />}
                  {isCorrect ? "TARGET IDENTIFIED" : "IDENTIFICATION FAILURE"}
                </div>
                <Button onClick={handleNext} size="lg" className="w-full sm:w-auto px-10 h-12 gap-2 rounded-sm font-black uppercase tracking-tighter scifi-glow">
                  {questionCount >= TOTAL_QUESTIONS ? "COMPUTE FINAL RESULTS" : "NEXT DATASET"} <ArrowRight className="h-5 w-5" />
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
      <Card className="max-w-xl mx-auto border-primary/30 shadow-2xl overflow-hidden text-center bg-card/60 backdrop-blur-lg rounded-none">
        <div className="bg-primary/90 p-8 md:p-12 text-primary-foreground space-y-4 relative">
          <div className="absolute inset-0 scifi-grid opacity-20 pointer-events-none" />
          <Trophy className="h-16 w-16 md:h-20 md:w-20 text-accent mx-auto animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-headline font-black uppercase tracking-tighter">Sequence Complete</h2>
          <div className="text-5xl md:text-7xl font-black scifi-text-glow">{score} / {TOTAL_QUESTIONS}</div>
          <p className="text-primary-foreground/80 font-mono font-bold tracking-[0.3em] uppercase text-xs">Intelligence Quotient: {percentage}%</p>
        </div>
        <CardContent className="p-6 md:p-10 space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-black font-headline uppercase tracking-widest text-primary">
              {percentage === 100 ? "OPTIMAL ACCURACY" : percentage >= 60 ? "SUFFICIENT PERFORMANCE" : "TRAINING REQUIRED"}
            </h3>
            <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">
              Target recognition patterns analyzed. System synchronization improved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button onClick={restart} size="lg" className="w-full sm:w-auto gap-2 px-8 rounded-sm uppercase tracking-tighter font-black scifi-glow">
              <RefreshCw className="h-4 w-4" /> RESTART PROTOCOL
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/browse"} className="w-full sm:w-auto px-8 rounded-sm uppercase tracking-tighter font-black border-primary/30">
              BROWSE ARCHIVES
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
