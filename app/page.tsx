"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4 sm:py-12 flex items-center justify-center">
      <Card className="max-w-2xl w-full border-2 shadow-lg">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-balance">ダイエットタイプ診断</CardTitle>
          <CardDescription className="text-base sm:text-lg text-pretty leading-relaxed">
            あなたの食習慣・心理傾向から最適なダイエット方法を診断します。
            <br />
            10個の質問に答えて、あなたにぴったりのアプローチを見つけましょう。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">診断内容</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>リセット志向（ファスティング）</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>糖質依存（糖質制限）</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>食行動バランス（サラダファースト）</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>外的サポート志向（美容・代謝ケア）</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>習慣依存（食事量調整）</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => router.push("/quiz")}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl"
          >
            診断を始める
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">所要時間：約2分</p>
        </CardContent>
      </Card>
    </main>
  )
}
