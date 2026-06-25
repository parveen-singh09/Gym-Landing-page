import { motion } from "framer-motion";

export function SectionHeading({
    kicker,
    title,
    desc,
}: {
    kicker: string;
    title: string;
    desc: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
        >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-300" />
                {kicker}
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{desc}</p>
        </motion.div>
    );
}

