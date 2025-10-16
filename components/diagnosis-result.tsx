"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Sparkles, TrendingUp, Heart, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface DiagnosisResultProps {
  scores: {
    fasting: number
    lowCarb: number
    saladFirst: number
    beautySupport: number
    portionControl: number
  }
}

const dietTypes = {
  fasting: {
    name: "リセット志向（ファスティング）",
    shortName: "ファスティング",
    description:
      "短期集中型のリセットが得意なあなた。定期的なファスティングで体をリセットし、食習慣を見直すことで効果を実感しやすいタイプです。",
    tips: [
      "週1回の16時間断食から始めてみましょう",
      "断食明けは消化の良い食事を心がけて",
      "水分補給を忘れずに（1日2L目安）",
    ],
    icon: Sparkles,
    color: "hsl(var(--chart-1))",
  },
  lowCarb: {
    name: "糖質依存（糖質制限）",
    shortName: "糖質制限",
    description:
      "糖質への依存度が高いあなた。糖質を適切にコントロールすることで、血糖値の安定と体重管理がしやすくなります。",
    tips: [
      "白米を玄米や雑穀米に置き換えてみましょう",
      "間食はナッツやチーズなど低糖質なものを",
      "夕食の炭水化物を控えめにすると効果的",
    ],
    icon: TrendingUp,
    color: "hsl(var(--chart-2))",
  },
  saladFirst: {
    name: "食行動バランス（サラダファースト）",
    shortName: "サラダファースト",
    description:
      "食べる順番を意識することで効果が出やすいタイプ。野菜から食べることで血糖値の急上昇を防ぎ、満腹感も得られます。",
    tips: [
      "食事の最初に野菜を5分かけて食べましょう",
      "次にタンパク質、最後に炭水化物の順で",
      "よく噛むことで満腹中枢を刺激",
    ],
    icon: Heart,
    color: "hsl(var(--chart-3))",
  },
  beautySupport: {
    name: "外的サポート志向（美容・代謝ケア）",
    shortName: "美容・代謝ケア",
    description:
      "サプリメントや美容ケアなど、外的サポートを活用することでモチベーションが上がるタイプ。科学的なアプローチが向いています。",
    tips: [
      "ビタミンB群やL-カルニチンなど代謝サポートサプリを",
      "定期的な体組成計測定で変化を可視化",
      "エステやマッサージで代謝アップ",
    ],
    icon: Sparkles,
    color: "hsl(var(--chart-4))",
  },
  portionControl: {
    name: "習慣依存（食事量調整）",
    shortName: "食事量調整",
    description:
      "食事量のコントロールが鍵となるタイプ。少しずつ量を減らし、新しい習慣を作ることで無理なく続けられます。",
    tips: [
      "小さめの食器を使って視覚的に満足感を",
      "食事の記録をつけて意識を高めましょう",
      "20分以上かけてゆっくり食べる習慣を",
    ],
    icon: TrendingUp,
    color: "hsl(var(--chart-5))",
  },
}

export default function DiagnosisResult({ scores }: DiagnosisResultProps) {
  // Prepare data for radar chart
  const chartData = [
    {
      category: "リセット志向",
      value: scores.fasting,
    },
    {
      category: "糖質依存",
      value: scores.lowCarb,
    },
    {
      category: "食行動バランス",
      value: scores.saladFirst,
    },
    {
      category: "外的サポート",
      value: scores.beautySupport,
    },
    {
      category: "習慣依存",
      value: scores.portionControl,
    },
  ]

  // Find highest and second highest scores
  const scoreEntries = Object.entries(scores).sort(([, a], [, b]) => b - a)
  const primaryType = scoreEntries[0][0] as keyof typeof dietTypes
  const secondaryType = scoreEntries[1][0] as keyof typeof dietTypes

  const primaryTypeData = dietTypes[primaryType]
  const secondaryTypeData = dietTypes[secondaryType]
  const PrimaryIcon = primaryTypeData.icon
  const SecondaryIcon = secondaryTypeData.icon

  const router = useRouter()

  const handleRetake = () => {
    router.push("/quiz")
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-balance text-foreground">
          あなたのダイエットタイプ診断結果
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground text-pretty">
          あなたの食習慣・心理傾向から導かれた最適アプローチはこちら👇
        </p>
      </div>

      {/* Radar Chart Card */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl sm:text-2xl">あなたの傾向分析</CardTitle>
          <CardDescription>5つの指標からあなたのタイプを分析しました</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "スコア",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px] sm:h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                  className="text-xs sm:text-sm"
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Radar
                  name="スコア"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Primary Type Card */}
      <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm">あなたのタイプ</Badge>
            <PrimaryIcon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-balance">{primaryTypeData.name}</CardTitle>
          <CardDescription className="text-base text-foreground/80 mt-2 text-pretty">
            {primaryTypeData.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              おすすめアクション
            </h3>
            <ul className="space-y-2">
              {primaryTypeData.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm sm:text-base">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-pretty leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Type Card */}
      {scoreEntries[1][1] > 50 && (
        <Card className="border shadow-md bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                サブタイプ
              </Badge>
              <SecondaryIcon className="h-5 w-5 text-secondary-foreground" />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-balance">{secondaryTypeData.name}</CardTitle>
            <CardDescription className="text-sm text-foreground/70 mt-2 text-pretty">
              {secondaryTypeData.shortName}も取り入れると、さらに効果的です。
              {secondaryTypeData.tips[0]}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Retake Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleRetake}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          もう一度診断する
        </Button>
      </div>
    </div>
  )
}
