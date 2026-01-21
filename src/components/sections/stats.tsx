"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { H2 } from "@/components/ui/typography";

const stats = [
    { label: "Active Partners", value: 10000, suffix: "+", prefix: "" },
    { label: "Total Payouts", value: 5, suffix: "M+", prefix: "$" },
    { label: "Years Experience", value: 10, suffix: "+", prefix: "" },
];

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
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

export function Stats() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="py-6 md:py-0"
                        >
                            <div className="text-[48px] md:text-[60px] font-bold text-[var(--color-success)] mb-2">
                                <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <p className="text-[var(--text-body)] font-medium text-lg uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
