"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Trash2,
  Save,
  Store,
  MessageSquare,
  Link,
  Share2,
  Download,
  Upload,
  X,
  Eye,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface UrlConfig {
  url: string;
  visible: boolean;
  buttonText?: string;
}

interface AdminData {
  name: string;
  questions: Question[];
  reviewUrls: Record<string, UrlConfig>;
  socialUrls: Record<string, UrlConfig>;
  logo: {
    file: File | null;
    previewUrl: string | null;
    serverPath: string | null;
  } | null;
  coupon: {
    file: File | null;
    previewUrl: string | null;
    serverPath: string | null;
  } | null;
}

const templates = {
  ramen: [
    {
      id: "1",
      question: "ラーメンのスープの味はいかがでしたか？",
      options: [
        "濃厚で深みがある",
        "ちょうど良い塩加減",
        "あっさりしていて飲みやすい",
        "少し塩辛い",
        "味が薄くて物足りない",
      ],
    },
    {
      id: "2",
      question: "麺の食感はどうでしたか？",
      options: [
        "コシがあってもちもち",
        "適度な歯ごたえがある",
        "少し柔らかめ",
        "硬すぎる",
        "のびていて残念",
      ],
    },
    {
      id: "3",
      question: "トッピングの量は十分でしたか？",
      options: [
        "具沢山で満足",
        "ちょうど良い量",
        "もう少し欲しかった",
        "種類が少ない",
        "量が少なすぎる",
      ],
    },
    {
      id: "4",
      question: "店内の雰囲気はいかがでしたか？",
      options: [
        "活気があって良い",
        "落ち着いた雰囲気",
        "清潔で快適",
        "少し狭く感じた",
        "騒がしくて気になった",
      ],
    },
    {
      id: "5",
      question: "接客サービスはどうでしたか？",
      options: [
        "とても丁寧で親切",
        "テキパキとしていて良い",
        "普通のサービス",
        "もう少し気配りが欲しい",
        "接客に不満がある",
      ],
    },
  ],
  cafe: [
    {
      id: "1",
      question: "注文したコーヒーの味はいかがでしたか？",
      options: [
        "香り豊かで絶品",
        "バランスが良く美味しい",
        "普通の味",
        "少し薄く感じた",
        "好みではなかった",
      ],
    },
    {
      id: "2",
      question: "提供された食事やデザートの質はどうでしたか？",
      options: [
        "見た目も味も最高",
        "美味しくて満足",
        "普通においしい",
        "期待はずれだった",
        "まずくて食べられない",
      ],
    },
    {
      id: "3",
      question: "店内の雰囲気はいかがでしたか？",
      options: [
        "居心地が良く落ち着く",
        "おしゃれで気に入った",
        "普通のカフェの雰囲気",
        "少し狭く感じた",
        "居心地が悪かった",
      ],
    },
    {
      id: "4",
      question: "Wi-Fiや電源などの設備は充実していましたか？",
      options: [
        "非常に充実している",
        "必要十分な設備がある",
        "基本的な設備はある",
        "一部の設備が不足",
        "設備が整っていない",
      ],
    },
    {
      id: "5",
      question: "価格設定はどう感じましたか？",
      options: [
        "品質を考えるとリーズナブル",
        "妥当な価格設定",
        "少し高いが許容範囲",
        "割高に感じた",
        "価格が高すぎる",
      ],
    },
  ],
  izakaya: [
    {
      id: "1",
      question: "注文した料理の味はいかがでしたか？",
      options: [
        "絶品で感動した",
        "美味しくて満足",
        "普通においしい",
        "一部の料理が期待外れ",
        "全体的に味が良くない",
      ],
    },
    {
      id: "2",
      question: "お酒の種類は十分でしたか？",
      options: [
        "豊富な種類で大満足",
        "好みの酒が見つかった",
        "一般的な品揃え",
        "もう少し種類が欲しい",
        "品揃えが乏しい",
      ],
    },
    {
      id: "3",
      question: "店内の雰囲気はどうでしたか？",
      options: [
        "活気があり楽しめた",
        "落ち着いた良い雰囲気",
        "普通の居酒屋の雰囲気",
        "少し騒がしく感じた",
        "居心地が悪かった",
      ],
    },
    {
      id: "4",
      question: "接客サービスはいかがでしたか？",
      options: [
        "とても丁寧で気配りがある",
        "テキパキとしていて良い",
        "普通のサービス",
        "対応に改善の余地あり",
        "接客に不満がある",
      ],
    },
    {
      id: "5",
      question: "コストパフォーマンスはどうでしたか？",
      options: [
        "価格以上の満足感",
        "料理の質を考えると妥当",
        "普通のコスパ",
        "少し割高に感じた",
        "価格が高すぎる",
      ],
    },
  ],
  massage: [
    {
      id: "1",
      question: "マッサージの効果はいかがでしたか？",
      options: [
        "驚くほど体が軽くなった",
        "リラックスできて満足",
        "ある程度の効果を感じた",
        "あまり効果を感じなかった",
        "期待はずれだった",
      ],
    },
    {
      id: "2",
      question: "施術者の技術はどうでしたか？",
      options: [
        "非常に高度で満足",
        "丁寧で気持ち良かった",
        "普通の技術レベル",
        "もう少し改善が必要",
        "技術に不満がある",
      ],
    },
    {
      id: "3",
      question: "店内の清潔さや雰囲気はいかがでしたか？",
      options: [
        "非常に清潔で落ち着く",
        "清潔感があり快適",
        "普通の清潔さ",
        "もう少し改善が必要",
        "清潔さに不安がある",
      ],
    },
    {
      id: "4",
      question: "予約や受付の対応はスムーズでしたか？",
      options: [
        "とてもスムーズで満足",
        "特に問題なく対応",
        "普通の対応",
        "少し待たされた",
        "対応に不満がある",
      ],
    },
    {
      id: "5",
      question: "料金に対する満足度はいかがですか？",
      options: [
        "価格以上の価値があった",
        "適切な価格設定",
        "普通の価格帯",
        "少し高く感じた",
        "価格が高すぎる",
      ],
    },
  ],
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [data, setData] = useState<AdminData>({
    name: "SOD株式会社",
    questions: [
      {
        id: "1",
        question: "",
        options: ["", "", ""],
      },
    ],
    reviewUrls: {
      google: {
        url: "https://g.page/clientAlegria_review/review",
        visible: true,
      },
      tabelog: {
        url: "https://tabelog.com/clientAlegria_review/review/",
        visible: true,
      },
      gurunavi: {
        url: "https://www.gnavi.co.jp/clientAlegria_review/review/",
        visible: false,
      },
      hotpepper: {
        url: "https://beauty.hotpepper.jp/clientAlegria_review/review/BCSTOP/SALON_ID/",
        visible: true,
      },
      custom1: {
        url: "https://customurl1-clientAlegria.com/review",
        visible: true,
        buttonText: "custom1",
      },
      custom2: {
        url: "https://customurl2-clientAlegria.com/review",
        visible: false,
        buttonText: "custom2",
      },
    },
    socialUrls: {
      instagram: {
        url: "https://www.instagram.com/clientAlegria_handle/",
        visible: true,
      },
      line: { url: "https://line.me/R/ti/p/@clientAlegria_ID", visible: true },
      x: { url: "https://twitter.com/clientAlegria_handle", visible: false },
    },
    logo: null,
    coupon: null,
  });

  const [jsonOutput, setJsonOutput] = useState<string>("");
  const [jsonFilename, setJsonFilename] = useState<string>("sod-inc");
  const [filenameError, setFilenameError] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isJsonGenerated, setIsJsonGenerated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    setData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      return { ...prev, questions: newQuestions };
    });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions: newQuestions };
    });
  };

  const addOption = (questionIndex: number) => {
    setData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options.push("");
      return { ...prev, questions: newQuestions };
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setData((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      return { ...prev, questions: newQuestions };
    });
  };

  const addQuestion = () => {
    setData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: String(prev.questions.length + 1), question: "", options: [""] },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    setData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleUrlChange = (
    type: "reviewUrls" | "socialUrls",
    key: string,
    field: keyof UrlConfig,
    value: string | boolean
  ) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: {
          ...prev[type][key],
          [field]: value,
        },
      },
    }));
  };

  const handleImageUpload = useCallback(
    async (type: "logo" | "coupon", file: File) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", type);

          const response = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const result = await response.json();
            setData((prev) => ({
              ...prev,
              [type]: {
                file: file,
                previewUrl: reader.result as string,
                serverPath: result.path,
              },
            }));
            toast({
              title: "画像がアップロードされました",
              description: `${
                type === "logo" ? "ロゴ" : "クーポン"
              }画像が正常にアップロードされました。`,
            });
          } else {
            throw new Error("Image upload failed");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast({
            title: "エラー",
            description: "画像のアップロード中にエラーが発生しました。",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  const removeImage = useCallback((type: "logo" | "coupon") => {
    setData((prev) => ({ ...prev, [type]: null }));
  }, []);

  const generateJson = async () => {
    setIsLoading(true);
    try {
      const hasEmptyQuestions = data.questions.some(
        (q) =>
          !q.question.trim() ||
          q.options.length === 0 ||
          q.options.some((o) => !o.trim())
      );
      if (hasEmptyQuestions) {
        toast({
          title: "エラー",
          description: "すべての質問と回答を入力してください。",
          variant: "destructive",
        });
        return;
      }

      const jsonData = {
        name: data.name,
        questions: data.questions,
        reviewUrls: data.reviewUrls,
        socialUrls: data.socialUrls,
        logo: data.logo ? data.logo.serverPath : null,
        coupon: data.coupon ? data.coupon.serverPath : null,
      };
      const jsonString = JSON.stringify(jsonData, null, 2);
      setJsonOutput(jsonString);
      setIsJsonGenerated(true);

      toast({
        title: "JSONが生成されました",
        description: "JSONデータが更新されました。上部で確認できます。",
      });
    } catch (error) {
      console.error("Error generating JSON:", error);
      toast({
        title: "エラー",
        description: "JSONの生成中にエラーが発生しました。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveJson = async () => {
    try {
      const jsonData = {
        name: data.name,
        questions: data.questions,
        reviewUrls: data.reviewUrls,
        socialUrls: data.socialUrls,
        logo: data.logo ? data.logo.serverPath : null,
        coupon: data.coupon ? data.coupon.serverPath : null,
      };

      const response = await fetch("/api/save-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: `${jsonFilename}.json`,
          content: JSON.stringify(jsonData, null, 2),
        }),
      });

      if (response.ok) {
        toast({
          title: "JSONが保存されました",
          description: `${jsonFilename}.json として src/config/clients/ に保存されました。`,
        });
      } else {
        throw new Error("Failed to save JSON");
      }
    } catch (error) {
      console.error("Error saving JSON:", error);
      toast({
        title: "エラー",
        description: "JSONの保存中にエラーが発生しました。",
        variant: "destructive",
      });
    }
  };

  const handleJsonFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9_-]*$/.test(value)) {
      setJsonFilename(value);
      setFilenameError("");
    } else {
      setFilenameError(
        "ファイル名には英数字、ハイフン、アンダースコアのみ使用できます。"
      );
    }
  };

  const downloadJson = () => {
    const jsonData = {
      name: data.name,
      questions: data.questions,
      reviewUrls: data.reviewUrls,
      socialUrls: data.socialUrls,
      logo: data.logo ? data.logo.serverPath : null,
      coupon: data.coupon ? data.coupon.serverPath : null,
    };
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${jsonFilename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "JSONがダウンロードされました",
      description: `${jsonFilename}.json として保存されました。`,
    });
  };

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    if (value in templates) {
      setData((prev) => ({
        ...prev,
        questions: templates[value as keyof typeof templates],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <header className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            アンケートMEO 管理画面
          </h1>
          <Button
            onClick={generateJson}
            className="btn bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner mr-2"></span>
                処理中...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                JSONをプレビュー
              </>
            )}
          </Button>
        </div>
      </header>

      {jsonOutput && (
        <div className="flex space-x-4 mb-8">
          <Card className="card flex-grow transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-normal">
                生成されたJSON
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] overflow-auto bg-gray-900 rounded-md json-preview">
                <SyntaxHighlighter
                  language="json"
                  style={atomDark}
                  className="text-xs"
                  wrapLongLines
                >
                  {jsonOutput}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col space-y-4">
            <Button
              onClick={saveJson}
              className="btn bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              JSONを保存
            </Button>
            <Button
              onClick={downloadJson}
              className="btn bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              JSONをダウンロード
            </Button>
          </div>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-10 gap-8">
        <div className="md:col-span-3">
          <Card className="card mb-8 transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-normal">
                <Store className="w-6 h-6 mr-2" />
                店舗情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="store-name"
                  className="text-sm font-medium text-gray-600"
                >
                  店舗名
                </Label>
                <Input
                  id="store-name"
                  value={data.name}
                  onChange={handleNameChange}
                  className="input mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                />
              </div>
              <div>
                <Label
                  htmlFor="json-filename"
                  className="text-sm font-medium text-gray-600"
                >
                  JSONファイル名
                </Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="json-filename"
                    value={jsonFilename}
                    onChange={handleJsonFilenameChange}
                    className="input w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                  />
                  <span className="ml-2">.json</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  半角英数字、アンダースコア(_)、ハイフン(-)のみ使用可能です。
                </p>
                {filenameError && (
                  <p className="text-red-500 text-sm mt-1">{filenameError}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card mb-8 transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-normal">
                <Upload className="w-6 h-6 mr-2" />
                画像アップロード
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="logo-upload"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  ロゴ画像
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="logo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200"
                      >
                        <span>画像をアップロード</span>
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("logo", file);
                          }}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF（最大10MB）
                    </p>
                    <p className="text-xs text-gray-500">
                      推奨サイズ: 600px × 240px
                    </p>
                  </div>
                </div>
                {data.logo && (
                  <div className="mt-4 relative">
                    <img
                      src={data.logo.previewUrl}
                      alt="ロゴ"
                      className="max-w-full h-auto rounded-md shadow-md"
                    />
                    <Button
                      onClick={() => removeImage("logo")}
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label
                  htmlFor="coupon-upload"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  クーポン画像
                </Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="coupon-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200"
                      >
                        <span>画像をアップロード</span>
                        <Input
                          id="coupon-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload("coupon", file);
                          }}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF（最大10MB）
                    </p>
                    <p className="text-xs text-gray-500">
                      推奨サイズ: 600px × 600px
                    </p>
                  </div>
                </div>
                {data.coupon && (
                  <div className="mt-4 relative">
                    <img
                      src={data.coupon.previewUrl}
                      alt="クーポン"
                      className="max-w-full h-auto rounded-md shadow-md"
                    />
                    <Button
                      onClick={() => removeImage("coupon")}
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                注意:
                アップロードする画像は高品質で、著作権に問題がないものを使用してください。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-7">
          <Tabs defaultValue="questions" className="space-y-4">
            <TabsList className="bg-white shadow-md rounded-full p-1 inline-flex space-x-1">
              <TabsTrigger
                value="questions"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                アンケート質問
              </TabsTrigger>
              <TabsTrigger
                value="review"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Link className="w-4 h-4 mr-2" />
                レビューURL
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                ソーシャルメディア
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions">
              <Card className="card mb-6 transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-normal">
                    テンプレート選択
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { key: "ramen", label: "ラーメン屋", emoji: "🍜" },
                      { key: "cafe", label: "カフェ", emoji: "☕" },
                      { key: "izakaya", label: "居酒屋", emoji: "🍶" },
                      { key: "massage", label: "マッサージ", emoji: "💆" },
                    ].map(({ key, label, emoji }) => (
                      <Button
                        key={key}
                        onClick={() => handleTemplateChange(key)}
                        variant={
                          selectedTemplate === key ? "default" : "outline"
                        }
                        className={`w-full text-sm py-3 px-4 flex items-center justify-center space-x-2 ${
                          selectedTemplate === key
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        } transition-colors duration-200 btn font-medium`}
                      >
                        <span className="text-xl">{emoji}</span>
                        <span>{label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {data.questions.map((question, qIndex) => (
                <Card
                  key={question.id}
                  className="card mb-6 overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex justify-between items-center text-xl font-normal">
                      <span className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                        質問 {qIndex + 1}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuestion(qIndex)}
                        className="btn bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 font-medium"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        質問を削除
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <Label
                        htmlFor={`question-${qIndex}`}
                        className="text-sm font-medium text-gray-600"
                      >
                        質問文
                      </Label>
                      <Input
                        id={`question-${qIndex}`}
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "question",
                            e.target.value
                          )
                        }
                        placeholder="質問を入力してください"
                        className="input mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        選択肢
                      </Label>
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <Input
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            placeholder={`選択肢 ${oIndex + 1}`}
                            className="input flex-grow mr-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                          />
                          <Button
                            onClick={() => removeOption(qIndex, oIndex)}
                            variant="destructive"
                            size="icon"
                            className="rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => addOption(qIndex)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        選択肢を追加
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                onClick={addQuestion}
                className="w-full btn bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                質問を追加
              </Button>
            </TabsContent>

            <TabsContent value="review">
              <Card className="card transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-normal">
                    レビューURL設定
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(data.reviewUrls).map(([key, value]) => (
                    <div
                      key={key}
                      className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label
                          htmlFor={`${key}-visible`}
                          className="text-sm font-medium text-gray-600"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <Switch
                          id={`${key}-visible`}
                          checked={value.visible}
                          onCheckedChange={(checked) =>
                            handleUrlChange(
                              "reviewUrls",
                              key,
                              "visible",
                              checked
                            )
                          }
                        />
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={key}>
                          <AccordionTrigger className="text-sm text-blue-600">
                            {key}の詳細設定
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              <div>
                                <Label
                                  htmlFor={`${key}-url`}
                                  className="text-sm font-medium text-gray-600"
                                >
                                  URL
                                </Label>
                                <Input
                                  id={`${key}-url`}
                                  value={value.url}
                                  onChange={(e) =>
                                    handleUrlChange(
                                      "reviewUrls",
                                      key,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  className="input mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                                />
                              </div>
                              {key.startsWith("custom") && (
                                <div>
                                  <Label
                                    htmlFor={`${key}-button-text`}
                                    className="text-sm font-medium text-gray-600"
                                  >
                                    ボタンテキスト
                                  </Label>
                                  <Input
                                    id={`${key}-button-text`}
                                    value={value.buttonText || ""}
                                    onChange={(e) =>
                                      handleUrlChange(
                                        "reviewUrls",
                                        key,
                                        "buttonText",
                                        e.target.value
                                      )
                                    }
                                    className="input mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                                  />
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card className="card transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-normal">
                    ソーシャルメディア設定
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {Object.entries(data.socialUrls).map(([key, value]) => (
                    <div
                      key={key}
                      className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Label
                          htmlFor={`${key}-visible`}
                          className="text-sm font-medium text-gray-600"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <Switch
                          id={`${key}-visible`}
                          checked={value.visible}
                          onCheckedChange={(checked) =>
                            handleUrlChange(
                              "socialUrls",
                              key,
                              "visible",
                              checked
                            )
                          }
                        />
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={key}>
                          <AccordionTrigger className="text-sm text-blue-600">
                            {key}の詳細設定
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              <div>
                                <Label
                                  htmlFor={`${key}-url`}
                                  className="text-sm font-medium text-gray-600"
                                >
                                  URL
                                </Label>
                                <Input
                                  id={`${key}-url`}
                                  value={value.url}
                                  onChange={(e) =>
                                    handleUrlChange(
                                      "socialUrls",
                                      key,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  className="input mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
