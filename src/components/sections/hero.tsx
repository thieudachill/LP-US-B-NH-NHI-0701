"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SavingsForm } from "@/components/savings-form";
import Image from "next/image";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string; }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            const increment = to / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= to) {
                    setCount(to);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, to]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-[#F8FAFC]">
            <div className="absolute top-8 left-0 right-0 z-20">
                <Container>
                    <div className="flex items-center justify-center gap-2">
                        {/* Re-using logo.jpg but adding fallback text if it fails */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="text-2xl font-bold text-[#054e7d] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.5rem', lineHeight: '2rem', color: '#054e7d' }}>CHECKDRAW</span>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
                {/* Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="max-w-[580px]"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-[40px] leading-[1.1] md:text-[56px] font-[800] text-[#0B0F19] mb-6 tracking-tight"
                    >
                        Break Free From <span className="text-[#0059FF]">High-Interest Debt</span> With a Clear, Realistic Plan
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-[16px] md:text-[18px] text-gray-600 mb-8 leading-relaxed max-w-lg">
                        Consolidate multiple debts into one structured monthly payment, potentially reduce interest costs, and regain control of your finances
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex items-start gap-8 mb-8 border-t border-gray-200 pt-6">
                        <div>
                            <p className="text-[#009F00] font-[800] text-[32px] leading-none mb-1">
                                <CountUp to={8500} prefix="$" />
                            </p>
                            <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Average Savings</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div>
                            <p className="text-[#009F00] font-[800] text-[32px] leading-none mb-1">
                                <CountUp to={4.2} suffix="y" />
                            </p>
                            <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Faster payoff</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div>
                            <p className="text-[#009F00] font-[800] text-[32px] leading-none mb-1">
                                <CountUp to={98} suffix="%" />
                            </p>
                            <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Success Rate</p>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p className="text-[11px] text-gray-400 mb-6 italic">(*) Results vary by profile and eligibility.</p>
                        <div className="flex gap-4">
                            <Button size="lg" className="px-8 h-12 text-lg font-bold bg-[#0059FF] hover:bg-[#0040CC] shadow-xl shadow-blue-500/20 rounded-full">
                                Check My Options
                            </Button>
                            <Button variant="outline" size="lg" className="px-8 h-12 text-lg font-bold border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full">
                                Learn More
                            </Button>
                        </div>

                        <div className="mt-8 flex items-center gap-4 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Trust badges placeholders - consistent with finance design */}
                            <div className="h-8 w-auto relative">
                                <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded">A+ BBB RATING</span>
                            </div>
                            <div className="h-8 w-auto relative">
                                <span className="text-xs font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded">SECURE SSL</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Form Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Decor element behind form */}
                    <div className="absolute top-10 -right-10 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[80px] opacity-50 pointer-events-none" />
                    <SavingsForm />
                </motion.div>
            </Container>
        </section>
    );
}
