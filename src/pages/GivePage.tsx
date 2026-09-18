import { useState } from 'react'
import Navbar from '../components/Navbar'

interface AccountCardProps {
  category: string
  description: string
  bankName?: string
  accountName: string
  accountNumber: string
  referenceTag: string
  icon: 'offering' | 'tithe' | 'welfare'
}

function AccountCard({
  category,
  description,
  bankName,
  accountName,
  accountNumber,
  referenceTag,
  icon,
}: AccountCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber.replace(/\s+/g, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea')
      textarea.value = accountNumber.replace(/\s+/g, '')
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 flex flex-col justify-between">
      <div>
        {/* Header with normal text category title & icon */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {category}
          </h3>

          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            {icon === 'offering' && (
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {icon === 'tithe' && (
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            {icon === 'welfare' && (
              <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {description}
        </p>

        {/* Account Details Box */}
        <div data-nosnippet className="bg-slate-50/80 rounded-xl border border-slate-200/70 p-4 space-y-3 mb-6">
          {bankName && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Bank name</span>
              <span className="text-slate-900 font-semibold">{bankName}</span>
            </div>
          )}

          <div className="flex flex-col gap-0.5 text-xs">
            <span className="text-slate-500 font-medium">Account name</span>
            <span className="text-slate-900 font-semibold">{accountName}</span>
          </div>

          <div className="pt-2 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Account number</span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">NGN</span>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-slate-900">
                {accountNumber}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Narration */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Payment description / narration:</span>
        <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{referenceTag}</span>
      </div>
    </div>
  )
}

export default function GivePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* Original Site Navbar */}
      <Navbar borderBottom={true} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col">
        {/* Page Header */}
        <div className="pb-8 border-b border-slate-100">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Online giving &amp; <span className="text-[#c9a030]">kingdom partnership</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Thank you for supporting the ministry of House of Dayspring. Your faithful giving enables us to preach the gospel, transform lives, and advance God's kingdom.
          </p>

          {/* Scripture Encouragement */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/60 max-w-2xl">
            <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            </p>
            <p className="text-xs font-semibold text-[#8a6a10] mt-1.5">
              2 Corinthians 9:7
            </p>
          </div>
        </div>

        {/* Account Cards Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
          {/* 1. Offering & Tithe — Access Bank */}
          <AccountCard
            category="Offering & Tithe"
            icon="offering"
            description="For your regular Sunday worship offering, weekly collections, and faithful tithe to the work of God."
            bankName="Access Bank"
            accountName="HOUSE OF DAYSPRING"
            accountNumber="0057026165"
            referenceTag="Offering / Tithe"
          />

          {/* 2. Welfare — Fidelity Bank */}
          <AccountCard
            category="Welfare"
            icon="welfare"
            description="Supporting members and families in need. Your welfare giving brings hope and practical assistance to lives around you."
            bankName="Fidelity Bank"
            accountName="HOUSE OF DAYSPRING"
            accountNumber="6060434745"
            referenceTag="Welfare"
          />
        </div>

        {/* Advisory / Transfer Reference Info Box */}
        <div className="mt-8 rounded-2xl bg-amber-50/70 border border-amber-200/70 p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 max-w-4xl mx-auto w-full">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1">Notice on bank transfers</p>
            <p>
              When transferring funds via mobile app, USSD, or internet banking, please specify your name and purpose (e.g.{' '}
              <span className="font-semibold text-slate-900">"Offering"</span> or{' '}
              <span className="font-semibold text-slate-900">"Welfare"</span>) in the transfer description. For confirmations, pledges, or international transfers, please feel free to reach out to the church administration.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-slate-400 space-y-1">
          <p>House of Dayspring International Church • The Pacesetters Assembly</p>
          <p className="text-slate-500">
            Built by <span className="font-semibold text-slate-700">Tech Expo</span>
          </p>
        </div>
      </main>
    </div>
  )
}
