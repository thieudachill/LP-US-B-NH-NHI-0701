"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

import { motion } from "framer-motion";

export function CTABanner() {
    return (
        <section className="py-24 bg-white">
            <Container>
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 grid md:grid-cols-2 items-center">
                    {/* Image Side */}
                    <div className="h-full min-h-[400px] bg-gray-200 relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop')" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
                    </div>
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="p-12 md:p-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Ready to take the next step?</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            If you're dealing with ongoing balances or high-interest payments, checking your options could help you understand what's realistically available for your situation.
                        </p>

                        <div className="flex flex-col gap-4">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button className="w-full bg-[#0052FF] hover:bg-[#0040CC] h-14 text-lg">
                                    Check My Options
                                </Button>
                            </motion.div>
                            <div className="flex items-center gap-2 justify-center text-sm text-gray-500">
                                <Lock className="w-4 h-4" />
                                <span>Secure • Confidential • No obligation</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Legal Text from Ref */}
                <div className="mt-16 text-xs text-justify text-gray-400 space-y-4 max-w-5xl mx-auto">
                    <p>This is not an offer or solicitation to lend. We do not make any loan or credit decisions and are not representatives, brokers or agents of any lender. Participating lenders offer loans from $200 up to $5,000. Not all lenders can offer you amounts up to $5,000. Our service is not available in all states. Submission of a request through this website does not guarantee that you will receive a loan offer or an offer you’ll be satisfied with. Funds transfer time may vary depending on your lender and/or financial institution. If you have any questions about your loan, please contact your lender directly. Credit checks may be performed with the three reporting credit bureaus: Experian, Equifax, and TransUnion. Submission of a request means you are authorizing the lenders to check your creditworthiness and your personal details.</p>
                    <p>This service is not a solicitation for loan products and does not constitute a loan offer for any loan products that are prohibited by state law. This service is void where prohibited.</p>
                    <p><strong>State Availability:</strong> Not all lenders from our system operate in all US states. Residents of some US states may not be eligible for loan products in accordance with their legislation. By selecting your State at the start of our loan offer process, you shall be informed of any limitations regarding obtaining a loan if you reside in individual US states.</p>
                    <p>This website collects personal information and transfers it to its third-party partners. The website contains links to third-party websites. Accessing them may result in a commission.</p>
                    <p>Please note that personal loans should not be treated as financial cure-it-all. If you have major budget difficulties, consult specialists first.</p>
                </div>
            </Container>
        </section>
    );
}
