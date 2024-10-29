import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { 
  Users,
  Trophy,
  Star,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <main>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Boost Your Social Media Presence with Expert Content Creators
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Connect with our talented network of content creators and influencers to amplify your brand's reach and engagement.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Get Started</Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Users className="h-8 w-8" />}
              value="10K+"
              label="Content Creators"
            />
            <StatCard
              icon={<Trophy className="h-8 w-8" />}
              value="500+"
              label="Successful Projects"
            />
            <StatCard
              icon={<Star className="h-8 w-8" />}
              value="98%"
              label="Client Satisfaction"
            />
            <StatCard
              icon={<CheckCircle className="h-8 w-8" />}
              value="24/7"
              label="Support Available"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/about-image.jpg"
                alt="About Buzzerin"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Buzzerin?
              </h2>
              <p className="text-gray-600 mb-8">
                We connect brands with the perfect content creators and influencers 
                to help tell your story authentically. Our platform makes it easy 
                to find, collaborate, and succeed in social media marketing.
              </p>
              <div className="space-y-4">
                <Feature text="Verified content creators with proven track records" />
                <Feature text="Transparent pricing and milestone-based payments" />
                <Feature text="Dedicated account managers for enterprise clients" />
                <Feature text="Analytics and performance tracking tools" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Choose Your Perfect Package
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer flexible packages to suit your needs, whether you're just 
              starting out or looking to scale your social media presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="299"
              features={[
                "5 Social Media Posts",
                "Basic Analytics",
                "1 Platform",
                "24/7 Support"
              ]}
            />
            <PricingCard
              title="Professional"
              price="599"
              isPopular
              features={[
                "15 Social Media Posts",
                "Advanced Analytics",
                "3 Platforms",
                "Priority Support",
                "Content Calendar"
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="999"
              features={[
                "30 Social Media Posts",
                "Premium Analytics",
                "All Platforms",
                "Dedicated Manager",
                "Strategy Consulting"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it – here's what our clients have to say 
              about their experience with Buzzerin.
            </p>
          </div>

          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Buzzerin</h3>
              <p className="text-gray-400">
                Connecting brands with amazing content creators
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-gray-400 hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#packages" className="text-gray-400 hover:text-white">
                    Packages
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: hello@buzzerin.com</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Buzzerin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Components
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
            {icon}
          </div>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          <p className="text-gray-600">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle className="h-5 w-5 text-primary" />
      <span className="text-gray-600">{text}</span>
    </div>
  )
}

function PricingCard({ 
  title, 
  price, 
  features, 
  isPopular 
}: { 
  title: string; 
  price: string; 
  features: string[];
  isPopular?: boolean;
}) {
  return (
    <Card className={cn(
      "relative",
      isPopular && "border-primary shadow-lg scale-105"
    )}>
      {isPopular && (
        <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-primary text-white text-sm rounded-full">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">${price}</span>
          /month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-6">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

const testimonials = [
  {
    content: "Buzzerin has transformed our social media presence. The quality of content creators and their understanding of our brand is exceptional.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Tech Innovations Inc."
  },
  {
    content: "Working with Buzzerin's content creators has been a game-changer. Our engagement rates have increased by 300% since we started.",
    author: "Michael Chen",
    role: "CEO",
    company: "StartUp Labs"
  },
  // Add more testimonials...
]

function TestimonialCard({ 
  content, 
  author, 
  role, 
  company 
}: { 
  content: string; 
  author: string; 
  role: string; 
  company: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className="h-5 w-5 text-yellow-400 fill-current"
              />
            ))}
          </div>
          <p className="text-gray-600 text-center">"{content}"</p>
          <div className="text-center">
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">{role} at {company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}