import { Bot, CheckCircle, Zap } from 'lucide-react';

export interface FeatureType {
  title: string;
  description: string;
  image: React.ReactNode | string;
}
export const features: FeatureType[] = [
  {
    title: 'AI-Powered Test Generation',
    description:
      'Leverage LLMs to create comprehensive test cases automatically.',
    image: <Zap className="h-12 w-12 text-primary mb-4" />,
  },
  {
    title: 'Automated Execution',
    description:
      'Run tests automatically and get detailed reports on vulnerabilities.',
    image: <Bot className="h-12 w-12 text-primary mb-4" />,
  },
  {
    title: 'OWASP Compliance',
    description:
      'Ensure your APIs are protected against common OWASP vulnerabilities.',
    image: <CheckCircle className="h-12 w-12 text-primary mb-4" />,
  },
];
