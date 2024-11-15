"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Survey from "@/components/Survey";
import SurveyResult from "@/components/SurveyResult";
import { getClientConfig, ClientId } from "@/config/clientConfig";
import { ClientConfig } from "@/config/types";

export default function ClientSurvey() {
  const router = useRouter();
  const { clientId } = router.query;
  const [config, setConfig] = useState<ClientConfig | undefined>(undefined);
  const [generatedReview, setGeneratedReview] = useState<string | null>(null);

  useEffect(() => {
    if (clientId) {
      const clientConfig = getClientConfig(clientId as ClientId);
      setConfig(clientConfig);
    }
  }, [clientId]);

  const handleComplete = () => {
    console.log("Survey completed");
    // ここでレビューを生成する処理を追加
    setGeneratedReview("これは生成されたレビューです。");
  };

  if (!config) {
    return <div>クライアント設定が見つかりません。</div>;
  }

  return (
    <div>
      <Survey questions={config.questions} onComplete={handleComplete} />
      <SurveyResult generatedReview={generatedReview} clientConfig={config} />
    </div>
  );
}
