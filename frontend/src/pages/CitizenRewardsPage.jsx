import React, { useState } from 'react';
import {
  Award, Gift, Bus, ShoppingBag, Trees, Receipt, ShieldCheck,
  CheckCircle2, Sparkles, AlertCircle, ArrowRight, DollarSign,
  Fuel, HelpCircle, Trophy
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { REWARDS_CATALOG } from '../data/mockData';

export const CitizenRewardsPage = () => {
  const { rewardPoints, redeemedRewards, redeemReward } = useCivic();
  const [activeModalVoucher, setActiveModalVoucher] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const earningTiles = [
    { title: "Reported 12 valid issues", points: "+120 pts", desc: "Verified by municipal inspection", icon: Award },
    { title: "Participated in 3 community polls", points: "+50 pts", desc: "Ward development priorities", icon: CheckCircle2 },
    { title: "Completed civic awareness quiz", points: "+100 pts", desc: "Waste segregation & hygiene score 100%", icon: Sparkles }
  ];

  const badges = [
    { name: "Clean City Guardian", level: "Tier 1", icon: "🛡️", desc: "Reported 10+ verified sanitation issues", unlocked: true },
    { name: "Civic Reporter Level 3", level: "Tier 3", icon: "🥇", desc: "Active in 3 different wards with 95% accuracy", unlocked: true },
    { name: "Community Champion", level: "Master", icon: "🌟", desc: "50+ upvotes received on local solutions", unlocked: false },
    { name: "Zero Waste Hero", level: "Eco", icon: "🌱", desc: "Completed all residential composting milestones", unlocked: true }
  ];

  const handleRedeem = (reward) => {
    setErrorMessage('');
    const result = redeemReward(reward);
    if (result.success) {
      setActiveModalVoucher(result.voucher);
    } else {
      setErrorMessage(result.message);
    }
  };

  const getRewardIcon = (iconName) => {
    switch (iconName) {
      case 'Bus': return Bus;
      case 'ShoppingBag': return ShoppingBag;
      case 'Award': return Award;
      case 'Trees': return Trees;
      case 'Receipt': return Receipt;
      default: return Gift;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Title & Subtitle + Top Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Citizen Rewards & Civic Guarantee
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Earn civic points for active neighborhood reporting and unlock municipal incentives
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const firstAffordable = REWARDS_CATALOG.find(r => r.points <= rewardPoints);
            if (firstAffordable) handleRedeem(firstAffordable);
            else alert("Keep participating to earn more points!");
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Gift className="w-4 h-4" />
          <span>Redeem Points</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
          {errorMessage}
        </div>
      )}

      {/* Your Balance Card: Big Amber Number + 3 Earning Tiles */}
      <div className="bg-white rounded-card border border-gray-200/90 shadow-card p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Balance Display (~4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border border-amber-200/80 text-center lg:text-left">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
              YOUR CIVIC BALANCE
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-amber-500 my-2 tracking-tight">
              {rewardPoints}
            </div>
            <p className="text-xs text-gray-600 font-medium">
              Available points ready for instant voucher redemption
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-center lg:justify-start gap-2 text-xs text-amber-800 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Earn +15 pts per valid complaint</span>
            </div>
          </div>

          {/* Right 3 Earning Tiles (~8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {earningTiles.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-gray-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {tile.points}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                      {tile.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    {tile.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Redeemable Rewards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Redeemable Rewards Catalog
            </h2>
            <p className="text-xs text-gray-500">
              Exchange your points for city transit passes, utility discounts, and municipal vouchers
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-500">Instant Digital Delivery</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REWARDS_CATALOG.map((reward) => {
            const Icon = getRewardIcon(reward.icon);
            const canAfford = rewardPoints >= reward.points;

            return (
              <div
                key={reward.id}
                className="bg-white rounded-card border border-gray-200/90 shadow-card p-6 flex flex-col justify-between hover:shadow-cardHover transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {reward.points} pts
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy-700 bg-navy-50 px-2 py-0.5 rounded">
                    {reward.category}
                  </span>

                  <h3 className="text-base font-bold text-gray-900 mt-2">
                    {reward.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${canAfford ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {canAfford ? 'Points Available' : `Need ${reward.points - rewardPoints} more pts`}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      canAfford
                        ? 'bg-navy-800 hover:bg-navy-900 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem Voucher
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Extra Feature: Badges for Citizens & Civic Compensation Guarantee */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Citizen Badges (~6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-card border border-gray-200/90 shadow-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-800 text-white flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Citizen Recognition Badges</h3>
            </div>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              3 of 4 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {badges.map((b, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  b.unlocked
                    ? 'border-gray-200 bg-white shadow-sm'
                    : 'border-gray-100 bg-gray-50/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {b.level}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mt-2">{b.name}</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-normal">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Civic Service Guarantee & SLA Delay Compensation (~6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-card border border-gray-200/90 shadow-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Civic Service Guarantee & Compensation</h3>
              </div>
              <span className="text-xs text-gray-400">Charter 2026</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              FixMyCity includes a statutory <strong>Delay Redressal Guarantee</strong>. If your reported grievance is not resolved within the municipal SLA deadline, our central administration awards immediate civic compensation:
            </p>

            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-center">
                <DollarSign className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-emerald-900 block">Cash DBT</span>
                <span className="text-[10px] text-emerald-700">₹150 - ₹500 credit</span>
              </div>
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-center">
                <Fuel className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-amber-900 block">Fuel Voucher</span>
                <span className="text-[10px] text-amber-700">Petrol / Diesel rebate</span>
              </div>
              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-center">
                <ShoppingBag className="w-5 h-5 text-blue-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-blue-900 block">Ration Subsidies</span>
                <span className="text-[10px] text-blue-700">Fair price grocery disc.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 flex items-center justify-between">
            <span>Sample awarded: #CM-8890 received ₹200 for 18h sewer lid delay</span>
            <span className="font-bold text-emerald-600">Active</span>
          </div>
        </div>
      </div>

      {/* Voucher Claimed Modal */}
      {activeModalVoucher && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-card max-w-sm w-full p-6 text-center shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Voucher Claimed!</h3>
            <p className="text-xs text-gray-500 mt-1">{activeModalVoucher.title}</p>

            <div className="my-5 p-4 bg-gray-50 rounded-xl border border-dashed border-navy-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">YOUR COUPON CODE</span>
              <p className="text-lg font-mono font-bold text-navy-800 tracking-wider">
                {activeModalVoucher.code}
              </p>
              <p className="text-[11px] text-gray-500">Present this QR/code at municipal transit or partner outlets</p>
            </div>

            <button
              type="button"
              onClick={() => setActiveModalVoucher(null)}
              className="w-full py-2.5 rounded-lg bg-navy-800 text-white font-bold text-xs"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
