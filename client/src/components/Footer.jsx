function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">

      <p className="mb-2">
        © {new Date().getFullYear()} Abhishek Kumar Singh
      </p>

      <p className="mb-3">
        Cybersecurity Learning Journal — Built with MERN Stack
      </p>

      <div className="flex justify-center gap-4">

        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          LinkedIn
        </a>

        <a
          href="https://tryhackme.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          TryHackMe
        </a>

      </div>

    </footer>
  );
}

export default Footer;