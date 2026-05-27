'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThemeCard from '@/components/ThemeCard'
import { THEMES } from '@/themes'

type Tab = 'free' | 'neon' | 'luxury' | 'sakura' | 'chrome' | 'ocean' | 'snow' | 'ember' | 'botanical' | 'glitch'

function tabForTheme(themeId: string): Tab {
  const theme = THEMES.find((t) => t.id === themeId)
  if (!theme || theme.series === 'free') return 'free'
  return theme.series as Tab
}

export default function ThemesPage() {
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<Tab>('free')
  const [selectedTheme, setSelectedTheme] = useState('free_basic')
  const [profileId, setProfileId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('id, selected_theme')
      .eq('user_id', user.id)
      .single()

    if (profileData) {
      setProfileId(profileData.id)
      setSelectedTheme(profileData.selected_theme)
      setActiveTab(tabForTheme(profileData.selected_theme))
    }

    setLoading(false)
  }

  const handleSelectTheme = async (themeId: string) => {
    if (!profileId) return
    setSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ selected_theme: themeId, updated_at: new Date().toISOString() })
      .eq('id', profileId)
    if (!error) setSelectedTheme(themeId)
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-white/10 border-t-[#d4af37] rounded-full animate-spin" />
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'free',      label: '無料'      },
    { key: 'neon',      label: 'Neon'      },
    { key: 'luxury',    label: 'Luxury'    },
    { key: 'sakura',    label: 'Sakura'    },
    { key: 'chrome',    label: 'Chrome'    },
    { key: 'ocean',     label: 'Ocean'     },
    { key: 'snow',      label: 'Snow'      },
    { key: 'ember',     label: 'Ember'     },
    { key: 'botanical', label: 'Botanical' },
    { key: 'glitch',    label: 'Glitch'    },
  ]

  const seriesThemes: Record<Tab, typeof THEMES> = {
    free:      THEMES.filter((t) => t.series === 'free'),
    neon:      THEMES.filter((t) => t.series === 'neon'),
    luxury:    THEMES.filter((t) => t.series === 'luxury'),
    sakura:    THEMES.filter((t) => t.series === 'sakura'),
    chrome:    THEMES.filter((t) => t.series === 'chrome'),
    ocean:     THEMES.filter((t) => t.series === 'ocean'),
    snow:      THEMES.filter((t) => t.series === 'snow'),
    ember:     THEMES.filter((t) => t.series === 'ember'),
    botanical: THEMES.filter((t) => t.series === 'botanical'),
    glitch:    THEMES.filter((t) => t.series === 'glitch'),
  }

  const currentThemeName = THEMES.find((t) => t.id === selectedTheme)?.name ?? selectedTheme

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 py-3.5">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-1.5">
            <div className="w-[7px] h-[7px] rounded-full bg-[#d4af37]" />
            <span className="text-[16px] font-bold tracking-wider">Veyra</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 pb-safe">
        {/* Title */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-gray-600 tracking-[0.15em] uppercase mb-1">Themes</p>
          <h1 className="text-[22px] font-bold mb-0.5">テーマを選択</h1>
          <p className="text-[13px] text-gray-500">
            現在:{' '}
            <span className="text-gray-300 font-medium">{currentThemeName}</span>
            {saving && <span className="text-[#d4af37] ml-2">保存中...</span>}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-none px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Theme cards */}
        <div className="flex flex-col gap-3">
          {seriesThemes[activeTab].map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={selectedTheme === theme.id}
              onSelect={handleSelectTheme}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
