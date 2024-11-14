// app/[client]/survey/page.tsx

import ClientSurvey from "@/components/ClientSurvey";

export default function SurveyPage() {
  return (
    <div>
      <ClientSurvey />
    </div>
  );
}

// ClientSurvey コンポーネントが JSX コンポーネントとして使用できないエラーを解決するために、
// ClientSurvey コンポーネントの型定義を確認し、正しい型を返すように修正する必要があります。
