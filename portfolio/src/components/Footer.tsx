/**
 * Footer — Minimal site footer.
 * Uses dynamic year via Date so the copyright stays current.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-satoshi text-sm text-white/30">
          © 2026 Meghanath Dineshkumar. All rights reserved.
        </p>
        <p className="font-satoshi text-sm text-white/30">
          Crafted with precision &amp; passion
        </p>
      </div>
    </footer>
  );
}
