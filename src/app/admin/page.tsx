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
import Modal from "@/components/ui/modal";
import { templates } from "@/data/templates";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
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
          description: "すべての質問と回答を入力してくださ。",
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
        setIsModalOpen(true);
      } else {
        const errorText = await response.text();
        console.error("Failed to save JSON:", errorText);
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
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold">設定が完了しました👩‍💻</h2>
            <p className="mt-2">{data.name}の公開URLはこちらになります。</p>
            <div className="bg-gray-100 rounded-md p-3 mt-2 text-center">
              <a
                href={`/${jsonFilename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 inline-flex items-center"
              >
                {window.location.origin}/{jsonFilename}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Modal>
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
                      src={data.logo.previewUrl || "/images/common/logo.png"}
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
