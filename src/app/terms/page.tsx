import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約 — Veyra',
}

export default function TermsPage() {
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
          <h1 className="text-[28px] font-bold mb-2">利用規約</h1>
          <p className="text-[14px] text-gray-400">最終更新日：2026年5月24日</p>
        </div>

        <div className="space-y-10">

          {/* 1 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">1. はじめに</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本利用規約（以下「本規約」）は、Veyra 運営者（以下「当方」）が提供するプロフィールリンクサービス「Veyra」（以下「本サービス」）の利用条件を定めるものです。
              </p>
              <p>
                本サービスをご利用になる前に、本規約をよくお読みください。本サービスに登録またはアクセスすることで、本規約に同意したものとみなします。本規約に同意いただけない場合は、本サービスをご利用いただけません。
              </p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">2. アカウント登録</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>本サービスの利用にはアカウント登録が必要です。登録にあたり、以下の条件に同意してください。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>正確かつ最新の情報を提供すること</li>
                <li>アカウント情報（パスワード等）を安全に管理し、第三者に開示しないこと</li>
                <li>不正アクセスやアカウントの不正利用が発生した場合、速やかに当方へ通知すること</li>
                <li>1人につき1アカウントのみ保有できること</li>
              </ul>
              <p>
                アカウントの登録は13歳以上を対象としています。未成年者が利用する場合は、保護者の同意を得てください。
              </p>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">3. サービスの利用</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本サービスは、ユーザーが自分のプロフィールページを作成し、各種リンクをまとめて公開するためのプラットフォームです。
              </p>
              <p>
                ユーザーは、本サービス上に投稿・公開するコンテンツ（テキスト、画像、リンク等）について、すべての責任を負います。当方は、ユーザーが投稿したコンテンツの内容について責任を負いません。
              </p>
              <p>
                当方は、本規約に違反するコンテンツを事前の通知なく削除する権利を有します。
              </p>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">4. 課金・決済</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>本サービスでは、以下の有料機能を提供しています。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><span className="text-white/80">テーマ（買い切り）</span>：一度購入したテーマは永続的に利用できます。</li>
                <li><span className="text-white/80">ロゴ非表示（月額制）</span>：月額サブスクリプションによりVeyraのクレジット表記を非表示にできます。</li>
              </ul>
              <p>
                決済はStripe, Inc.が提供する決済プラットフォームを通じて処理されます。クレジットカード情報は当方のサーバーには保存されず、Stripeが安全に管理します。
              </p>
              <p>
                月額サブスクリプションは、次回請求日の前日までにキャンセルしない限り、自動的に更新されます。キャンセルはダッシュボードからいつでも行えます。キャンセル後も、その請求期間が終了するまでサービスを利用できます。
              </p>
              <p>
                購入済みのテーマおよび月額課金については、原則として返金対応を行っておりません。ただし、サービス側の重大な不具合等が原因の場合は、個別にご相談ください。
              </p>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">5. 禁止事項</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>ユーザーは、以下の行為を行ってはなりません。</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>法令または公序良俗に違反するコンテンツの投稿・公開</li>
                <li>他者の著作権、商標権、プライバシー権等の権利を侵害する行為</li>
                <li>虚偽の情報を掲載したり、他者になりすます行為</li>
                <li>スパム、フィッシング、マルウェア等の有害なコンテンツの配布</li>
                <li>本サービスへの不正アクセス、リバースエンジニアリング、または過度な負荷をかける行為</li>
                <li>本サービスを通じた商業的スパム行為</li>
                <li>未成年者に有害なコンテンツの投稿</li>
              </ul>
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">6. 知的財産</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本サービスのデザイン、テーマ、ロゴ、コード、その他のコンテンツに関する知的財産権は、すべて当方に帰属します。
              </p>
              <p>
                ユーザーが本サービス上に投稿したコンテンツの著作権はユーザーに帰属します。ただし、ユーザーは当方に対し、本サービスの運営・改善・宣伝に必要な範囲で、当該コンテンツを無償・非独占的に利用する権利を許諾するものとします。
              </p>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">7. 免責事項</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本サービスは「現状のまま」提供されます。当方は、本サービスの完全性・正確性・継続性・特定目的への適合性について、明示または黙示を問わず、いかなる保証も行いません。
              </p>
              <p>
                当方は、本サービスの利用または利用不能により生じた損害（データの損失、利益の損失、業務の中断等）について、契約・不法行為・その他いかなる法律理論に基づいても、一切の責任を負いません。
              </p>
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">8. サービスの変更・停止</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                当方は、事前の通知なく、本サービスの内容を変更・追加・削除する権利を有します。また、システムのメンテナンスやその他の理由により、一時的にサービスを停止する場合があります。
              </p>
              <p>
                当方は、サービスの終了を決定した場合、可能な範囲でユーザーへ事前に通知します。サービス終了に伴う損害について、当方は一切責任を負いません。
              </p>
            </div>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">9. 準拠法・管轄</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>
                本規約は、日本法に準拠し、解釈されます。本サービスに関して紛争が生じた場合、当方の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-[13px] font-bold text-white/60 uppercase tracking-widest mb-4">10. お問い合わせ</h2>
            <div className="text-[14px] text-gray-400 leading-relaxed space-y-3">
              <p>本規約に関するご質問は、以下のメールアドレスまでお問い合わせください。</p>
              <p className="text-white/70">support@veyra.app</p>
              <p>
                当方は、個人運営のサービスのため、返信にお時間をいただく場合があります。あらかじめご了承ください。
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
