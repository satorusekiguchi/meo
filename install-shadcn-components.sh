#!/bin/bash

# shadcn/uiコンポーネントのリスト
components=(
  "accordion"
  "alert"
  "alert-dialog"
  "aspect-ratio"
  "avatar"
  "badge"
  "button"
  "calendar"
  "card"
  "checkbox"
  "collapsible"
  "command"
  "context-menu"
  "dialog"
  "dropdown-menu"
  "form"
  "hover-card"
  "input"
  "label"
  "menubar"
  "navigation-menu"
  "popover"
  "progress"
  "radio-group"
  "scroll-area"
  "select"
  "separator"
  "sheet"
  "skeleton"
  "slider"
  "switch"
  "table"
  "tabs"
  "textarea"
  "toast"
  "toggle"
  "tooltip"
)

# 全コンポーネントの数
total=${#components[@]}

# 各コンポーネントをインストール
for i in "${!components[@]}"; do
  component=${components[$i]}
  echo "インストール中 ($((i+1))/$total): $component"
  npx shadcn@latest add $component -y
  echo "----------------------------------------"
done

echo "全てのshadcn/uiコンポーネントのインストールが完了しました。"

# シミュレーション用の出力
console.log("インストール中 (1/37): accordion")
console.log("✔ コンポーネントをコピーしました")
console.log("✔ スタイルをコピーしました")
console.log("----------------------------------------")
console.log("インストール中 (2/37): alert")
console.log("✔ コンポーネントをコピーしました")
console.log("✔ スタイルをコピーしました")
console.log("----------------------------------------")
console.log("...")
console.log("インストール中 (37/37): tooltip")
console.log("✔ コンポーネントをコピーしました")
console.log("✔ スタイルをコピーしました")
console.log("----------------------------------------")
console.log("全てのshadcn/uiコンポーネントのインストールが完了しました。")