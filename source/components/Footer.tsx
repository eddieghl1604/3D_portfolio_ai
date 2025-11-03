export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Crypto Portfolio. Built with React & Three.js
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <span className="text-primary font-bold">Web3</span>
            <span className="text-muted-foreground">×</span>
            <span className="text-secondary font-bold">Blockchain</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
