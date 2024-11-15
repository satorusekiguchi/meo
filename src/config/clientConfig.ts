export interface Question {
  id: string;
  question: string;
  options: readonly string[];
}

export interface ClientConfig {
  name: string;
  questions: readonly Question[];
  logoUrl: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName: string;
}

const SATISFACTION_OPTIONS = [
  "非常に満足",
  "満足",
  "どちらでもない",
  "やや不満",
  "不満",
] as const;

const QUALITY_OPTIONS = [
  "非常に良い",
  "良い",
  "普通",
  "やや悪い",
  "悪い",
] as const;

const RECOMMENDATION_OPTIONS = [
  "強く勧めたい",
  "勧めたい",
  "どちらでもない",
  "あまり勧めたくない",
  "勧めたくない",
] as const;

const clientConfigs = {
  "client-01": {
    name: "和食レストラン 匠",
    questions: [
      {
        id: "food-quality",
        question: "料理の味と品質はいかがでしたか？",
        options: SATISFACTION_OPTIONS,
      },
      {
        id: "service",
        question: "スタッフの接客サービスについてどう感じましたか？",
        options: QUALITY_OPTIONS,
      },
      {
        id: "atmosphere",
        question: "お店の雰囲気や内装は好みでしたか？",
        options: [
          "とても好み",
          "好み",
          "普通",
          "あまり好みでない",
          "好みでない",
        ],
      },
      {
        id: "value",
        question: "価格に対する満足度はいかがですか？",
        options: SATISFACTION_OPTIONS,
      },
      {
        id: "recommendation",
        question: "当店を知人や家族に勧めたいと思いますか？",
        options: RECOMMENDATION_OPTIONS,
      },
    ],
    logoUrl: "/images/logo-a.png",
    logoWidth: 200,
    logoHeight: 100,
    logoClassName:
      "transform hover:scale-105 transition-transform duration-300",
  },
  "client-02": {
    name: "ビューティーサロン Bloom",
    questions: [
      {
        id: "stylist-skill",
        question: "スタイリストの技術力に満足しましたか？",
        options: SATISFACTION_OPTIONS,
      },
      {
        id: "consultation",
        question: "カウンセリングは丁寧でしたか？",
        options: ["とても丁寧", "丁寧", "普通", "やや不十分", "不十分"],
      },
      {
        id: "salon-cleanliness",
        question: "サロンの清潔さはいかがでしたか？",
        options: ["非常に清潔", "清潔", "普通", "やや不潔", "不潔"],
      },
      {
        id: "waiting-time",
        question: "待ち時間はいかがでしたか？",
        options: [
          "ほとんどなかった",
          "短かった",
          "普通",
          "やや長かった",
          "長すぎた",
        ],
      },
      {
        id: "overall-experience",
        question: "全体的な満足度を教えてください。",
        options: SATISFACTION_OPTIONS,
      },
    ],
    logoUrl: "/images/logo-b.png",
    logoWidth: 180,
    logoHeight: 90,
    logoClassName: "transform hover:rotate-6 transition-transform duration-300",
  },
  "client-03": {
    name: "ファッションストア Chic",
    questions: [
      {
        id: "product-variety",
        question: "商品の品揃えはいかがでしたか？",
        options: QUALITY_OPTIONS,
      },
      {
        id: "staff-knowledge",
        question: "スタッフの商品知識は十分でしたか？",
        options: ["非常に十分", "十分", "普通", "やや不十分", "不十分"],
      },
      {
        id: "store-layout",
        question: "店舗のレイアウトは買い物しやすかったですか？",
        options: [
          "とても買い物しやすい",
          "買い物しやすい",
          "普通",
          "やや買い物しにくい",
          "買い物しにくい",
        ],
      },
      {
        id: "price-range",
        question: "価格帯は適切だと感じましたか？",
        options: ["非常に適切", "適切", "普通", "やや高い", "高すぎる"],
      },
      {
        id: "return-intention",
        question: "今後も当店を利用したいと思いますか？",
        options: [
          "ぜひ利用したい",
          "利用したい",
          "どちらでもない",
          "あまり利用したくない",
          "利用したくない",
        ],
      },
    ],
    logoUrl: "/images/logo-c.png",
    logoWidth: 220,
    logoHeight: 110,
    logoClassName:
      "transform hover:scale-110 transition-transform duration-300",
  },
  alegria: {
    name: "メンズエステ アレグリア",
    questions: [
      {
        id: "massage-point",
        question: "特に効果を感じた施術箇所はどちらでしたか？",
        options: [
          "肩こりがスッキリ",
          "腰の張りが改善",
          "足のむくみが解消",
          "頭痛が軽減",
          "首のコリがとれた",
        ],
      },
      {
        id: "facility-point",
        question: "店舗の設備で特によかった点は？",
        options: [
          "シャワールームが清潔",
          "アメニティが充実",
          "空調が快適",
          "ベッドが広くて寝心地がいい",
          "更衣室が使いやすい",
        ],
      },
      {
        id: "location-merit",
        question: "ルームへのアクセスで便利だと感じた点は？",
        options: [
          "駅から徒歩5分以内",
          "見つけやすい場所",
          "人目を気にせず入店できる",
          "コインパーキングが近い",
          "ビジネス街で立ち寄りやすい",
        ],
      },
      {
        id: "therapist-point",
        question: "セラピストのどのような点が良かったですか？",
        options: [
          "丁寧な施術",
          "話しやすい雰囲気",
          "施術の強さの調整が上手い",
          "清潔感がある",
          "マナーが良い",
        ],
      },
      {
        id: "time-value",
        question: "コースの時間についてどう感じましたか？",
        options: [
          "ちょうど良い時間でリフレッシュできた",
          "施術時間が長めで満足",
          "休憩時間も適度にあって良い",
          "急いでいても利用できる時間",
          "余裕を持って利用できる",
        ],
      },
    ],
    logoUrl: "/images/logo-alegria.png",
    logoWidth: 220,
    logoHeight: 110,
    logoClassName:
      "transform hover:scale-110 transition-transform duration-300",
  },
} as const;

export type ClientId = keyof typeof clientConfigs;

export function getClientConfig(clientId: ClientId): ClientConfig | undefined {
  console.log("getClientConfig called with clientId:", clientId);
  if (!clientId) {
    console.error("Invalid clientId provided");
    return undefined;
  }
  const config = clientConfigs[clientId];
  if (!config) {
    console.error(`No configuration found for clientId: ${clientId}`);
  }
  console.log("Retrieved config:", config);
  return config;
}
