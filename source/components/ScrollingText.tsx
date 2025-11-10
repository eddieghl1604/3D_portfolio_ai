export default function ScrollingText({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden py-3 sm:py-4 border-y border-primary/20">
      <div className="flex animate-slide-left whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 mr-4 sm:mr-6 md:mr-8">
            {text.split(' • ').map((item, idx) => (
              <span
                key={idx}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary/40 uppercase tracking-wider"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
