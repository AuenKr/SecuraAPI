export function Working() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          How It Works
        </h2>
        <ol className="space-y-4 md:space-y-0 md:space-x-8 md:flex justify-center">
          <li className="flex flex-col items-center text-center md:max-w-[200px]">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Connect Your API</h3>
            <p className="text-muted-foreground">
              Integrate SecuraAPI with your existing API infrastructure.
            </p>
          </li>
          <li className="flex flex-col items-center text-center md:max-w-[200px]">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">AI Generates Tests</h3>
            <p className="text-muted-foreground">
              Our LLM creates tailored test cases based on your API structure.
            </p>
          </li>
          <li className="flex flex-col items-center text-center md:max-w-[200px]">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Automated Testing</h3>
            <p className="text-muted-foreground">
              Tests are executed automatically, simulating various attack
              scenarios.
            </p>
          </li>
          <li className="flex flex-col items-center text-center md:max-w-[200px]">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-2">
              4
            </div>
            <h3 className="text-xl font-bold mb-2">Detailed Reporting</h3>
            <p className="text-muted-foreground">
              Receive comprehensive reports on vulnerabilities and recommended
              fixes.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
