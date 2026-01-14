"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const steps = [
    {
        number: "01",
        title: "Apply Online",
        description: "Submit a secure, no-obligation application to see your potential options."
    },
    {
        number: "02",
        title: "Get Matched",
        description: "Our system identifies consolidation-friendly lenders suited to your profile."
    },
    {
        number: "03",
        title: "Review & Decide",
        description: "Compare approved plans and transparent terms. Choose what fits your budget."
    },
    {
        number: "04",
        title: "Start Simplifying",
        description: "Finalize your plan. Your multiple high-interest balances are replaced by one payment."
    },
];

export function ProcessSteps() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-16">
                    <p className="text-[var(--color-primary)] font-bold text-sm tracking-widest uppercase mb-4">SIMPLE PROCESS</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative mt-20">
                    {/* Connecting Line (Desktop) - dashed line through centers */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-blue-200 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={cn(
                                "w-20 h-20 rounded-full bg-white border-[3px] border-[#0059FF] shadow-lg flex items-center justify-center text-2xl font-bold text-[#0059FF] mb-8 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#0059FF] group-hover:text-white"
                            )}>
                                {step.number}
                            </div>
                            <h3 className="text-[20px] font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-500 text-[15px] leading-relaxed px-4">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
