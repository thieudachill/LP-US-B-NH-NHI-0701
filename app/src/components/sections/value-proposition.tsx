"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { H2 } from "@/components/ui/typography";
import { BadgeDollarSign, BarChart3, Zap, TrendingUp, Target, Handshake } from "lucide-react";

const features = [
    {
        icon: BadgeDollarSign,
        title: "Lower Interest Exposure",
        description: "Reduce the burden of high revolving APRs by consolidating into a more structured repayment plan.",
    },
    {
        icon: BarChart3,
        title: "One Predictable Payment",
        description: "No more juggling multiple due dates. One plan. One timeline.",
    },
    {
        icon: Zap,
        title: "Faster Decision Process",
        description: "Most qualified applicants receive matching options within 24 hours.",
    },
    {
        icon: TrendingUp,
        title: "Credit-Friendly Over Time",
        description: "Consistent on-time payments may help stabilize your credit profile.",
    },
    {
        icon: Target,
        title: "Flexible Repayment Terms",
        description: "Choose terms that align with your cash flow — typically 24 to 72 months.",
    },
    {
        icon: Handshake,
        title: "Guided Support",
        description: "Clear steps, transparent information, and assistance throughout the process.",
    },
];

export function ValueProposition() {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <p className="text-[var(--color-primary)] font-bold text-sm tracking-widest uppercase mb-4">WHY CHOOSE US</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Transform Your Financial Outlook With a Simpler Structure</h2>
                    <p className="text-gray-500 text-lg">
                        Join thousands of borrowers who replaced scattered payments with a single, manageable plan.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-[20px] shadow-lg shadow-blue-900/5 border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#0059FF] mb-6 group-hover:bg-[#0059FF] group-hover:text-white transition-colors duration-300">
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-[15px]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
