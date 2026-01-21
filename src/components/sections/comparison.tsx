"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const comparisonData = [
    { metric: "Monthly Payment", before: "$1,245", after: "$485" },
    { metric: "Interest Rate", before: "23.4% APR", after: "9.8% APR" },
    { metric: "Payoff Time", before: "12.5 Years", after: "4.2 Years" },
    { metric: "Total Interest Paid", before: "$32,840", after: "$8,420" },
    { metric: "Estimated Savings", before: "—", after: "$24,420" },
];

export function ComparisonTable() {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="text-center mb-12">
                    <p className="text-[var(--color-primary)] font-bold text-sm tracking-widest uppercase mb-4">BEFORE vs AFTER</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">See How Consolidation Can Change the Numbers</h2>
                </div>

                <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    {/* Header */}
                    <div className="grid grid-cols-3 bg-[#F1F5F9] border-b border-gray-200">
                        <div className="py-6 px-6 text-left font-bold text-gray-500 text-sm uppercase tracking-wider flex items-center">Metric</div>
                        <div className="py-6 px-6 text-center font-bold text-gray-800 text-lg border-l border-r border-gray-200">Managing Multiple Debts</div>
                        <div className="py-6 px-6 text-center font-bold text-[#0059FF] text-lg bg-[#EBF5FF]">One Consolidated Loan</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-gray-200">
                        {comparisonData.map((row, index) => (
                            <div key={index} className="grid grid-cols-3 items-stretch group">
                                <div className="py-5 px-6 text-left text-gray-600 font-semibold flex items-center bg-white group-hover:bg-gray-50 transition-colors">
                                    {row.metric}
                                </div>
                                <div className="py-5 px-6 text-center text-gray-500 font-medium flex items-center justify-center bg-white border-l border-r border-gray-200 group-hover:bg-gray-50 transition-colors">
                                    {row.before}
                                </div>
                                <div className={cn(
                                    "py-5 px-6 text-center font-bold text-gray-900 flex items-center justify-center bg-[#EBF5FF]",
                                    index === comparisonData.length - 1 ? "text-[#009F00] text-2xl" : ""
                                )}>
                                    {row.after}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-white text-center border-t border-gray-100">
                        <p className="text-xs text-gray-400">(*) Example scenario for illustration only. Actual results depend on eligibility and creditor terms.</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
