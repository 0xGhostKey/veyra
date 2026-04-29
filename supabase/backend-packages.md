# バックエンド追加パッケージ

フロントエンドエンジニアが作成した `package.json` に以下を追記してください。

## dependencies

```json
"stripe": "^17.0.0",
"@supabase/ssr": "^0.6.0",
"@supabase/supabase-js": "^2.49.0"
```

## インストールコマンド

```bash
npm install stripe@^17.0.0 @supabase/ssr @supabase/supabase-js
```

## 用途

| パッケージ | 用途 |
|---|---|
| `stripe` | Stripe Checkout Session 作成・Webhook 署名検証 |
| `@supabase/ssr` | Next.js App Router でサーバーサイドセッション取得 |
| `@supabase/supabase-js` | Supabase DB 操作（service_role クライアント含む） |

## 環境変数（.env.local に設定）

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **注意**: `SUPABASE_SERVICE_ROLE_KEY` と `STRIPE_SECRET_KEY` は
> `NEXT_PUBLIC_` プレフィックスを付けず、サーバーサイド専用にすること。
