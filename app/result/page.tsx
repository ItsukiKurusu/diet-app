"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import DiagnosisResult from "@/components/diagnosis-result"

function ResultContent() {
  const searchParams = useSearchParams()

  const scores = {
    fasting: Number(searchParams.get("fasting")) || 0,
    lowCarb: Number(searchParams.get("lowCarb")) || 0,
    saladFirst: Number(searchParams.get("saladFirst")) || 0,
    beautySupport: Number(searchParams.get("beautySupport")) || 0,
    portionControl: Number(searchParams.get("portionControl")) || 0,
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:py-12">
      <DiagnosisResult scores={scores} />
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">結果を読み込んでいます...</p>
          </div>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
