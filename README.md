## プロジェクト概要
[こちらのnotion](https://www.notion.so/PJT-e5bcfbfabfc448b18149fc43d223340b?pvs=4)に書いてあります

## 技術スタック
backend: GraphQL graphql-yoga  
frontend: NextJS GraphQL React  
orm: Prisma  
database: PostgreSQL  
packageManager: turborepo pnpm  
infra: aws
ddd  

## セットアップ
1. `git clone https://github.com/unkly/recipeaceful.git`
2. `npm install -g pnpm && pnpm install && pnpm add -w -D turbo && pnpm build`
3. `make run-database`

## 開発の心得
### turburepoでは基本的にルートディレクトリから移動しない
各種ワークスペースにパッケージを追加したい場合 `pnpm --filter <projectName> add <packageName>`で追加してください

### 各種アプリの起動方法
一括起動: `turbo dev`  
BackEnd: `pnpm --filter api run dev`  
FrontEnd: `pnpm --filter web run dev`  

