import { Button } from '@/components/ui/button';
import { Features } from './feature';
import { Working } from './working';
import { Connect } from './connect';

export function Landing() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Secure Your APIs with AI-Powered Testing
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                SecuraAPI uses advanced LLMs to automatically generate and run
                OWASP-compliant test cases for your API endpoints.
              </p>
            </div>
            <div className="space-x-4">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <Features />
      <Working />
      <Connect />
    </main>
  );
}
