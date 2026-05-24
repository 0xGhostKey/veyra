import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー — Veyra',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between max-w-2xl mx-auto px-5 py-4">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full" style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }} />
            <span className="text-[17px] font-bold tracking-wider">Veyra</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] text-gray-500 hover:text-white transition-colors">
              ログイン
            </Link>
            <Link
              href="/signup"
              className="text-[13px] px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-100 active:scale-[0.97] transition-all"
            >
              始める
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-2xl mx-auto px-5 py-16">

        <div className="mb-12">
          <p className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-[28px] font-bold mb-2">プライバシーポリシー</h1>
          <p className="text-[14px] text-gray-400">最終更新日：2026年5月24日</p>
        </div>

        <div className="space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">1. 収集する情報</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>当方は、本サービスの提供にあたり、以下の情報を収集します。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="text-white/80">アカウント情報</span>：メールアドレス、パスワード（ハッシュ化済み）</li>
                <li><span className="text-white/80">プロフィール情報</span>：ユーザー名、表示名、自己紹介文、アイコン画像</li>
                <li><span className="text-white/80">リンク情報</span>：ユーザーが登録したURL・タイトル</li>
                <li><span className="text-white/80">決済情報</span>：購入履歴、サブスクリプション状態（カード番号等はStripeが管理し、当方は保持しません）</li>
                <li><span className="text-white/80">利用ログ</span>：アクセス日時、IPアドレス、ブラウザ情報、ページ閲覧履歴</li>
              </ul>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">2. 情報の利用目的</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>収集した情報は、以下の目的で利用します。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>本サービスの提供・維持・改善</li>
                <li>アカウント認証・セキュリティの確保</li>
                <li>課金処理および購入履歴の管理</li>
                <li>サービスに関する重要な通知の送信</li>
                <li>ユーザーサポートへの対応</li>
                <li>不正利用・規約違反の検知と対処</li>
                <li>アクセス解析による機能改善</li>
              </ul>
              <p>収集した情報を、上記以外の目的で利用する場合は、事前にユーザーの同意を得ます。</p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">3. 第三者への提供</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                当方は、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供しません。ただし、本サービスの運営上、以下のサービスにデータを提供・共有しています。
              </p>
              <div className="space-y-4 pl-2">
                <div>
                  <p className="text-white/80 font-semibold mb-1">Stripe, Inc.</p>
                  <p>決済処理のために利用しています。メールアドレスおよび購入情報がStripeに送信されます。Stripeのプライバシーポリシーは stripe.com/privacy をご確認ください。</p>
                </div>
                <div>
                  <p className="text-white/80 font-semibold mb-1">Supabase, Inc.</p>
                  <p>データベース・認証・ストレージのバックエンドとして利用しています。アカウント情報・プロフィールデータ・リンク情報はSupabaseのサーバーに保存されます。Supabaseのプライバシーポリシーは supabase.com/privacy をご確認ください。</p>
                </div>
              </div>
              <p>
                これらの第三者サービスは、当方から提供された情報を、各社のプライバシーポリシーに従って管理します。
              </p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">4. クッキー・アナリティクス</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本サービスでは、セッション管理・認証のためにクッキー（Cookie）を使用します。これらはサービスの正常な動作に必要なものです。
              </p>
              <p>
                また、サービスの改善を目的としたアクセス解析（ページビュー数、流入経路、利用端末の種別等）を実施する場合があります。アクセス解析では個人を特定する情報は収集しません。
              </p>
              <p>
                ブラウザの設定からクッキーを無効にすることができますが、一部の機能が利用できなくなる場合があります。
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">5. データの保管・セキュリティ</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                ユーザーのデータはSupabaseのサーバーに保存されます。当方は、不正アクセス・紛失・改ざんからデータを保護するために、適切な技術的・組織的措置を講じています。
              </p>
              <p>
                パスワードはハッシュ化して保存されます。クレジットカード情報は当方のサーバーには保存されず、PCI DSSに準拠したStripeが管理します。
              </p>
              <p>
                ただし、インターネット上での完全なデータセキュリティを保証することはできません。ユーザー自身もアカウント情報を安全に管理してください。
              </p>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">6. ユーザーの権利</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>ユーザーは、自身の個人情報に関して以下の権利を有します。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="text-white/80">閲覧・訂正</span>：ダッシュボードからプロフィール情報をいつでも確認・変更できます。</li>
                <li><span className="text-white/80">削除</span>：アカウントの削除を希望する場合は、下記のメールアドレスへご連絡ください。ご要望を受け取ってから30日以内に対応します。</li>
                <li><span className="text-white/80">エクスポート</span>：保有するデータの提供を希望する場合も、下記のメールアドレスへご連絡ください。</li>
              </ul>
              <p>
                お問い合わせ先：<span className="text-white/70">support@veyra.app</span>
              </p>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">7. 本ポリシーの変更</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                当方は、法令の改正やサービスの変更に伴い、本プライバシーポリシーを予告なく変更することがあります。重要な変更を行う場合は、本サービス上での告知またはメールでお知らせします。
              </p>
              <p>
                変更後も本サービスを継続して利用することで、変更後のポリシーに同意したものとみなします。定期的に本ページをご確認ください。
              </p>
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">8. お問い合わせ</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>本プライバシーポリシーに関するご質問・ご要望は、以下のメールアドレスまでお問い合わせください。</p>
              <p className="text-white/70">support@veyra.app</p>
              <p>
                当方は個人運営のサービスのため、返信にお時間をいただく場合があります。あらかじめご了承ください。
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-5 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)' }} />
              <span className="text-sm font-bold tracking-wider">Veyra</span>
            </Link>
            <div className="flex items-center gap-6 text-[12px] text-gray-600">
              <Link href="/#themes"   className="hover:text-gray-400 transition-colors">テーマ</Link>
              <Link href="/#features" className="hover:text-gray-400 transition-colors">機能</Link>
              <Link href="/login"     className="hover:text-gray-400 transition-colors">ログイン</Link>
              <Link href="/signup"    className="hover:text-gray-400 transition-colors">新規登録</Link>
              <Link href="/terms"     className="hover:text-gray-400 transition-colors">利用規約</Link>
              <Link href="/privacy"   className="hover:text-gray-400 transition-colors">プライバシー</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-700">© 2026 Veyra. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
