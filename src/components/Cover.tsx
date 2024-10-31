'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { Cover } from "@/components/ui/cover"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Calendar, Users, Sparkles, Gift, Rocket, Heart } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  
  const features = [
    {
      title: "Collaborative Video-Enhanced Wishes",
      description: "Create dynamic, personalized video cards that bring your celebrations to life.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
    },
    {
      title: "Smart Event Management",
      description: "Seamlessly track RSVPs, manage guest lists, and send automated invitations.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
    },
    {
      title: "Interactive Invitations",
      description: "Create wonderful cards built on top of Framer motion. Share within seconds",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    
  ]

  const testimonials = [
    {
      quote: "Made my sister's birthday invitation unforgettable!",
      name: "Emily R.",
      highlight: "Birthday Party Planner"
    },
    {
      quote: "The collaborative features are a game-changer for event planning.",
      name: "Michael T.",
      highlight: "Wedding Coordinator"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-16 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-200 dark:via-white dark:to-white">
          Reimagine Digital <Cover>Celebrations</Cover>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 font-medium text-lg max-w-2xl mx-auto text-center mb-8">
          Transform ordinary invitations into extraordinary memories. Create, share, and celebrate 
          with digital experiences that capture the magic of your most important moments.
        </p>
        <div className="flex justify-center space-x-4 mb-16">
          <Button
            onClick={() => router.push('/home')}
            className="px-6 py-3 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Create Invitation
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/create')}
            className="px-6 py-3 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Birthday wish
          </Button>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <div className="bg-neutral-50 dark:bg-neutral-900 py-16 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8 px-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
            >
              <p className="italic text-lg mb-4 text-neutral-700 dark:text-neutral-300">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">{testimonial.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-24 bg-primary/10 p-12 rounded-xl"
      >
        <Rocket className="mx-auto w-16 h-16 text-primary mb-6" />
        <h2 className="text-4xl font-bold mb-6">Looking for more?</h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
          We will regularly update our platform with new templates, features, and integrations based on your feedback.
        </p>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>Contact Us</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
              <DialogDescription>
                Feel free to reach out to us at the following email address:
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center text-lg font-medium">dhruvnaik21@gmail.com</p>
            </div>
          </DialogContent>
        </Dialog>
        
      </motion.div>
    </div>
  )
}

export default HomePage