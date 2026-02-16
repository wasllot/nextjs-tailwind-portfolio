"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 font-mono text-primary">04. What's Next?</p>
          <h2 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl">Get In Touch</h2>
          <p className="mb-12 text-secondary sm:text-lg">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a
            href="mailto:rei.vzl@gmail.com"
            className="inline-block border border-primary px-8 py-4 font-mono text-primary transition-colors hover:bg-primary/10"
          >
            Say Hello
          </a>
        </motion.div>

        <footer className="mt-24 flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-secondary hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/reinaldotineo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-secondary hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:rei.vzl@gmail.com"
              className="font-mono text-sm text-secondary hover:text-primary transition-colors"
            >
              Email
            </a>
          </div>
          <p className="font-mono text-xs text-secondary">
            Built with Next.js & Tailwind CSS
          </p>
        </footer>
      </div>
    </section>
  );
}
