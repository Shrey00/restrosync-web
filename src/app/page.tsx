import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  ClipboardList,
  Calendar,
  Package,
  CreditCard,
  BarChart2,
  Smartphone,
  CheckCircle,
  Menu,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background text-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Restaurant Management
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Streamline operations, boost efficiency, and delight customers with our all-in-one platform and
                  white-labeled mobile apps.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Powerful Features for Modern Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <ClipboardList className="mr-2 h-6 w-6" />
                    Order Management
                  </CardTitle>
                </CardHeader>
                <CardContent>Efficiently manage online and in-house orders in real-time.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Calendar className="mr-2 h-6 w-6" />
                    Reservation System
                  </CardTitle>
                </CardHeader>
                <CardContent>Streamline table bookings and manage guest lists effortlessly.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Package className="mr-2 h-6 w-6" />
                    Inventory Management
                  </CardTitle>
                </CardHeader>
                <CardContent>Keep track of stock levels and automate reordering processes.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Billing & Invoicing
                  </CardTitle>
                </CardHeader>
                <CardContent>Generate accurate bills and manage finances with ease.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <BarChart2 className="mr-2 h-6 w-6" />
                    Analytics & Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent>Gain valuable insights with comprehensive business analytics.</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Smartphone className="mr-2 h-6 w-6" />
                    White-Label Mobile Apps
                  </CardTitle>
                </CardHeader>
                <CardContent>Custom iOS and Android apps tailored to your brand.</CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              See RestroSync in Action
            </h2>
            <div className="aspect-video mx-auto max-w-3xl rounded-xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="RestroSync Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="John Doe"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    John Doe
                  </CardTitle>
                  <Badge>Owner, Pizza Palace</Badge>
                </CardHeader>
                <CardContent>
                  "RestroSync has transformed our operations. The white-labeled app has been a game-changer for our
                  customer engagement."
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Jane Smith"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    Jane Smith
                  </CardTitle>
                  <Badge>Manager, Cafe Delight</Badge>
                </CardHeader>
                <CardContent>
                  "The inventory management feature alone has saved us countless hours and reduced waste significantly."
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Mike Johnson"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    Mike Johnson
                  </CardTitle>
                  <Badge>CEO, Burger Bonanza</Badge>
                </CardHeader>
                <CardContent>
                  "With RestroSync, we've seen a 30% increase in online orders and improved customer satisfaction."
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Basic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2 text-primary">$99<span className="text-xl font-normal">/mo</span></div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Order Management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Reservation System
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Basic Reporting
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2 text-primary">$199<span className="text-xl font-normal">/mo</span></div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      All Basic Features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Inventory Management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Advanced Analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      White-Label Android App
                    </li>
                  </ul>
                  <Button className="w-full">Get Started</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2 text-primary">$399<span className="text-xl font-normal">/mo</span></div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      All Pro Features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      White-Label iOS & Android Apps
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      24/7 Priority Support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Custom Integrations
                    </li>
                  </ul>
                  <Button className="w-full">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Seamless Integrations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Square Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Square</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Shopify Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Shopify</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Uber Eats Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Uber Eats</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="DoorDash Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">DoorDash</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Stripe Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Stripe</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="QuickBooks Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">QuickBooks</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Grubhub Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Grubhub</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Toast Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto"
                />
                <span className="text-sm font-medium">Toast</span>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does the white-label app work?</AccordionTrigger>
                <AccordionContent>
                  Our white-label app solution allows you to have a custom-branded mobile app for your restaurant on
                  both iOS and Android platforms. We handle the development and maintenance, while you get a
                  personalized app that reflects your brand identity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I integrate with my existing POS system?</AccordionTrigger>
                <AccordionContent>
                  Yes, RestroSync is designed to integrate with a wide range of popular POS systems. Our team will work
                  with you to ensure smooth integration with your existing setup.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is there a contract or minimum commitment?</AccordionTrigger>
                <AccordionContent>
                  We offer flexible monthly plans with no long-term contracts. You can upgrade, downgrade, or cancel
                  your subscription at any time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How secure is my restaurant's data?</AccordionTrigger>
                <AccordionContent>
                  We take data security very seriously. RestroSync uses industry-standard encryption and security
                  protocols to ensure your data is always protected. We are also compliant with relevant data protection
                  regulations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 RestroSync. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}