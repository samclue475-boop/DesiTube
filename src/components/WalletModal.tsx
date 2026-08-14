import React, { useState } from 'react';
import { 
  Wallet, 
  X, 
  ArrowUpRight, 
  Coins, 
  Gift, 
  CheckCircle2, 
  CreditCard, 
  History, 
  Sparkles, 
  TrendingUp, 
  Smartphone, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { WalletTransaction } from '../types';
import { sounds } from '../utils/audio';

interface WalletModalProps {
  balance: number;
  transactions: WalletTransaction[];
  onClose: () => void;
  onWithdraw: (amount: number, upiId: string) => void;
  onClaimDailyBonus: () => void;
  hasClaimedDailyBonus: boolean;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  balance,
  transactions,
  onClose,
  onWithdraw,
  onClaimDailyBonus,
  hasClaimedDailyBonus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'withdraw' | 'history'>('overview');
  const [withdrawAmount, setWithdrawAmount] = useState<number>(balance);
  const [upiId, setUpiId] = useState('youtubersuraj6@okhdfcbank');
  const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount <= 0 || withdrawAmount > balance) return;

    sounds.playTap();
    setIsProcessingWithdraw(true);

    setTimeout(() => {
      setIsProcessingWithdraw(false);
      setWithdrawalSuccess(true);
      sounds.playSuccessFanfare();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#F59E0B']
      });
      onWithdraw(withdrawAmount, upiId);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="bg-zinc-950 border border-amber-500/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl shadow-amber-950/40 my-auto"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-950/70 via-zinc-900 to-zinc-950 p-4 sm:p-5 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-zinc-950 font-black text-xl shadow-lg shadow-amber-500/30">
              ₹
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                DesiTube <span className="text-amber-400">Rewards Wallet</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Official Watch-to-Earn & Creator Monetization Hub
              </p>
            </div>
          </div>

          <button
            id="close-wallet-modal-btn"
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            title="Close Wallet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/60 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('overview');
              setWithdrawalSuccess(false);
            }}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Balance & Tasks
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('withdraw');
            }}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'withdraw'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Instant UPI Withdrawal
          </button>
          <button
            onClick={() => {
              sounds.playTap();
              setActiveTab('history');
            }}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Passbook ({transactions.length})
          </button>
        </div>

        {/* Body Content based on activeTab */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 text-xs sm:text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Grand Glowing Balance Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-zinc-900 to-zinc-950 p-5 border border-amber-500/40 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Total DesiTube Balance
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        ₹{balance.toLocaleString('en-IN')}
                      </span>
                      <span className="text-emerald-400 text-xs font-bold">
                        (₹1 = ₹1 Real INR)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playTap();
                      setActiveTab('withdraw');
                      setWithdrawAmount(balance);
                    }}
                    className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-lg shadow-emerald-600/30 cursor-pointer transition-all"
                  >
                    <span>Withdraw</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-breakdown badges */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-[11px]">
                  <div className="bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-400">Watch Rewards</p>
                    <p className="font-bold text-amber-300">₹{Math.round(balance * 0.35)}</p>
                  </div>
                  <div className="bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-400">Upload Royalties</p>
                    <p className="font-bold text-emerald-400">₹{Math.round(balance * 0.45)}</p>
                  </div>
                  <div className="bg-zinc-900/80 p-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-400">Bonus Gifts</p>
                    <p className="font-bold text-sky-400">₹{Math.round(balance * 0.20)}</p>
                  </div>
                </div>
              </div>

              {/* Daily Streak Check-in */}
              <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">
                      Daily Indian Creator Login Bonus
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Claim ₹25 free coins every 24 hours
                    </p>
                  </div>
                </div>

                <button
                  id="claim-daily-bonus-btn"
                  disabled={hasClaimedDailyBonus}
                  onClick={() => {
                    sounds.playCoinChime();
                    confetti({
                      particleCount: 50,
                      spread: 60,
                      origin: { y: 0.7 },
                      colors: ['#F59E0B', '#10B981']
                    });
                    onClaimDailyBonus();
                  }}
                  className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                    hasClaimedDailyBonus
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 shadow-lg shadow-amber-500/20'
                  }`}
                >
                  {hasClaimedDailyBonus ? 'Claimed ✓' : 'Claim +₹25'}
                </button>
              </div>

              {/* Earning Opportunities Checklist */}
              <div>
                <h4 className="font-bold text-zinc-200 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  How to Earn More Rupees on DesiTube:
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-zinc-300">Watch any DesiTube video for 10 seconds</span>
                    </div>
                    <span className="font-bold text-emerald-400">+₹5 / video</span>
                  </div>

                  <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-zinc-300">Upload video via the Green Studio</span>
                    </div>
                    <span className="font-bold text-emerald-400">+₹50 / upload</span>
                  </div>

                  <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-zinc-300">Post thoughtful comments & like videos</span>
                    </div>
                    <span className="font-bold text-emerald-400">+₹2 / action</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: WITHDRAW */}
          {activeTab === 'withdraw' && (
            <div>
              {withdrawalSuccess ? (
                <div className="bg-zinc-900 rounded-3xl p-6 border border-emerald-500/50 text-center flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Payout Request Submitted!
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-sm">
                    ₹{withdrawAmount.toLocaleString('en-IN')} has been transferred to{' '}
                    <span className="text-emerald-400 font-mono font-bold">{upiId}</span> via NPCI Instant Payout.
                  </p>
                  <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 w-full text-left text-xs space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Status:</span>
                      <span className="text-emerald-400 font-bold">Processed ✓</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Transaction ID:</span>
                      <span className="font-mono text-zinc-300">UPI/DESI/{Date.now()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playTap();
                      setActiveTab('history');
                      setWithdrawalSuccess(false);
                    }}
                    className="mt-2 px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    View in Passbook
                  </button>
                </div>
              ) : (
                <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-4">
                  
                  {/* Select Amount */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-zinc-300">
                        Withdrawal Amount (Available: ₹{balance})
                      </label>
                      <button
                        type="button"
                        onClick={() => setWithdrawAmount(balance)}
                        className="text-amber-400 text-xs font-bold hover:underline"
                      >
                        All (₹{balance})
                      </button>
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-zinc-400 font-bold text-base">
                        ₹
                      </span>
                      <input
                        type="number"
                        min={10}
                        max={balance}
                        required
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2.5 pl-8 pr-4 text-white font-bold text-base focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex gap-2 mt-2">
                      {[100, 250, 500, balance].map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => setWithdrawAmount(amt)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold"
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UPI Provider Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      Choose Indian Payout Mode
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'gpay', name: 'GPay', color: 'from-blue-600 to-indigo-600' },
                        { id: 'phonepe', name: 'PhonePe', color: 'from-purple-600 to-violet-700' },
                        { id: 'paytm', name: 'Paytm', color: 'from-sky-500 to-blue-600' },
                        { id: 'bhim', name: 'BHIM UPI', color: 'from-emerald-600 to-green-700' },
                      ].map((prov) => (
                        <button
                          type="button"
                          key={prov.id}
                          onClick={() => setUpiProvider(prov.id as any)}
                          className={`p-2 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            upiProvider === prov.id
                              ? 'bg-zinc-800 border-amber-400 text-white shadow-md'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {prov.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UPI VPA ID Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Your UPI VPA / Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. 9876543210@paytm or name@oksbi"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 px-3 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Instant 24x7 IMPS / UPI transfer directly to your Indian bank account.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-withdraw-btn"
                    type="submit"
                    disabled={isProcessingWithdraw || balance <= 0 || withdrawAmount > balance}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 border border-emerald-400/40 cursor-pointer disabled:opacity-40 transition-all"
                  >
                    {isProcessingWithdraw ? 'Authorizing Payout...' : `Confirm Withdraw ₹${withdrawAmount}`}
                  </button>

                </form>
              )}
            </div>
          )}

          {/* TAB 3: TRANSACTION HISTORY */}
          {activeTab === 'history' && (
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-zinc-900/70 p-3 rounded-2xl border border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      tx.type === 'credit' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">{tx.title}</p>
                      <p className="text-[10px] text-zinc-400">{tx.description}</p>
                      <p className="text-[9px] text-zinc-500 mt-0.5">{tx.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`font-black text-sm ${
                      tx.type === 'credit' ? 'text-emerald-400' : 'text-zinc-200'
                    }`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </span>
                    <p className="text-[10px] text-emerald-500 font-semibold">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};
