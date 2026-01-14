"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function SavingsForm() {
    return (
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 p-8 border border-gray-100 max-w-md mx-auto w-full relative z-10 transition-all duration-300 hover:shadow-blue-900/15">
            <div className="mb-6 text-center">
                <h3 className="text-[26px] font-bold text-gray-900 leading-tight">Check Your Potential Savings</h3>
                <p className="text-gray-400 text-sm mt-1 font-medium">(≈ 60 seconds)</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Total Debt Amount</label>
                    <div className="relative">
                        <select className="w-full h-[50px] pl-4 pr-10 rounded-xl border border-gray-200 appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0059FF] focus:border-transparent text-gray-600 font-medium transition-all cursor-pointer hover:bg-white hover:border-gray-300">
                            <option>Select amount</option>
                            <option>$10,000 - $20,000</option>
                            <option>$20,000 - $50,000</option>
                            <option>$50,000+</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Credit Score Range</label>
                    <div className="relative">
                        <select className="w-full h-[50px] pl-4 pr-10 rounded-xl border border-gray-200 appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0059FF] focus:border-transparent text-gray-600 font-medium transition-all cursor-pointer hover:bg-white hover:border-gray-300">
                            <option>Select range</option>
                            <option>Excellent (720+)</option>
                            <option>Good (680-719)</option>
                            <option>Fair (640-679)</option>
                            <option>Poor (639 or less)</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Full name</label>
                    <input
                        type="text"
                        placeholder="John Smith"
                        className="w-full h-[50px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0059FF] focus:border-transparent transition-all placeholder:text-gray-400 hover:bg-white hover:border-gray-300"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Email Address</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full h-[50px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0059FF] focus:border-transparent transition-all placeholder:text-gray-400 hover:bg-white hover:border-gray-300"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-widest">Phone Number</label>
                    <input
                        type="tel"
                        placeholder="(503) 486-2846"
                        className="w-full h-[50px] px-4 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0059FF] focus:border-transparent transition-all placeholder:text-gray-400 hover:bg-white hover:border-gray-300"
                    />
                </div>

                <div className="pt-2">
                    <p className="text-[11px] text-gray-400 mb-4 leading-relaxed text-center font-medium">
                        No obligation. Secure & confidential.<br />
                        Please apply only if you have an active debt consolidation need.
                    </p>
                    <Button size="lg" className="w-full text-lg h-[56px] bg-[#0059FF] hover:bg-[#0040CC] shadow-lg shadow-blue-500/30 rounded-full font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Check My Options
                    </Button>
                </div>
            </div>
        </div>
    );
}
