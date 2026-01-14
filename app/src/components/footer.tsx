import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    Services: ["Investment", "Partnership", "Consulting", "Analytics"],
    Company: ["About Us", "Careers", "Press", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold">
                                B
                            </div>
                            <span className="text-xl font-bold text-[var(--color-primary)]">
                                BÌNH NHI
                            </span>
                        </div>
                        <p className="text-[var(--text-body)] text-sm leading-relaxed mb-6 max-w-xs">
                            Empowering your financial future with expert strategies and trusted partnerships. Join thousands of successful investors today.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Linkedin} />
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-[var(--text-heading)] mb-6">{title}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-[var(--text-body)] text-sm hover:text-[var(--color-primary)] transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © 2024 US BÌNH NHI 0701. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-gray-400 hover:text-gray-600">Privacy</Link>
                        <Link href="#" className="text-sm text-gray-400 hover:text-gray-600">Terms</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a
            href="#"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all duration-300"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}
