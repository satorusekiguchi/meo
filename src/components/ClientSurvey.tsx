"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Survey from "@/components/Survey";
import SurveyResult from "@/components/SurveyResult";
import { getClientConfig, ClientConfig, ClientId } from "@/config/clientConfig";

export default function ClientSurvey() {
  const params = useParams();
  const [clientConfig, setClientConfig] = useState<ClientConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [generatedReview, setGeneratedReview] = useState("");

  useEffect(() => {
    const fetchClientConfig = async () => {
      const clientId = Array.isArray(params.client)
        ? params.client[0]
        : params.client;
      console.log("Client ID in ClientSurvey:", clientId);

      if (!clientId) {
        setError("クライアントIDが指定されていません。");
        return;
      }

      try {
        const config = getClientConfig(clientId as ClientId);
        if (config) {
          setClientConfig(config);
        } else {
          throw new Error("クライアント設定が見つかりません。");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "不明なエラーが発生しました。"
        );
      }
    };

    fetchClientConfig();
  }, [params]);

  const handleSurveyComplete = (review: string) => {
    setGeneratedReview(review);
    setSurveyCompleted(true);
  };

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="text-center" role="alert">
          <h1 className="text-3xl font-bold mb-4">エラーが発生しました</h1>
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (!clientConfig) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="text-center" aria-live="polite">
          <h1 className="text-3xl font-bold mb-4">読み込み中...</h1>
          <p className="text-xl">クライアント設定を取得しています</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#ffffff" }}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          {clientConfig.name}
        </h1>
        {!surveyCompleted ? (
          <Survey
            questions={clientConfig.questions}
            onComplete={handleSurveyComplete}
          />
        ) : (
          <SurveyResult generatedReview={generatedReview} />
        )}
      </div>
      <footer className="text-center py-4">
        <p className="text-sm text-gray-500">
          © 2024 エス・オー・データ株式会社
        </p>
      </footer>
    </div>
  );
}
