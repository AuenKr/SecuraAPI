import { features, FeatureType } from './data';

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((each) => {
            return (
              <Feature
                key={each.title}
                title={each.title}
                description={each.description}
                image={each.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Feature(prop: FeatureType) {
  return (
    <div className="flex flex-col items-center text-center">
      {prop.image}
      <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
      <p className="text-muted-foreground">{prop.description}</p>
    </div>
  );
}
